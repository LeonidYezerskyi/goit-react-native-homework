import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import app from "../../config/firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const storage = getStorage(app);
const db = getFirestore(app);

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState(null);
  const [country, setCountry] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
    })();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access camera was denied");
      }
    })();
    getLocation();
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      getAddress();
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
  };

  const getAddress = async () => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(`${address[0].city}, ${address[0].country}`);
      setCountry(address[0].country);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    await getDownloadURL(storageRef).then((url) => {
      photoUrl = url;
    });
    return photoUrl;
  };

  const resetFunction = () => {
    setPhoto(null);
    setName("");
    setAddress(null);
    setCountry(null);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    try {
      await addDoc(collection(db, "posts"), {
        photo: photo,
        name: name,
        location: location,
        address: address,
        userId: userId,
        login: login,
        country: country,
      }).then(() => {
        console.log("Uploaded!");
      });
    } catch (e) {
      Alert.alert("Some error happened");
    }
  };

  const publishPost = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    resetFunction();
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageWrapper}>
        <Camera style={styles.cameraContainer} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 343, height: 240 }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto} activeOpacity={0.4}>
            {!photo ? (
              <Image
                source={require("../../assets/images/addImage.png")}
                style={styles.addImage}
              />
            ) : (
              <Image
                source={require("../../assets/images/addImageMore.png")}
                style={styles.addImage}
              />
            )}
          </TouchableOpacity>
        </Camera>
        <View>
          <Text style={styles.textAddPhoto}>Upload image</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View>
          <TextInput
            placeholder="Name..."
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
        </View>
        <View>
          <TextInput
            placeholder="Location..."
            value={country}
            onChangeText={(text) => setCountry(text)}
            style={[styles.input, styles.input2]}
          />
          <Image
            source={require("../../assets/images/mapPin.png")}
            style={styles.mapPin}
          />
        </View>
        <TouchableOpacity
          onPress={photo ? publishPost : () => {}}
          activeOpacity={0.6}
          style={[
            !photo
              ? styles.btnPublish
              : [styles.btnPublish, { backgroundColor: "#FF6C00" }],
          ]}
        >
          <Text
            style={[
              !photo
                ? styles.btnPublishText
                : [styles.btnPublishText, { color: "#FFFFFF" }],
            ]}
          >
            Publish
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.btnDelete}>
          <Image
            source={require("../../assets/images/trash.png")}
            style={{ width: 70, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopColor: "#808080",
    borderTopWidth: 1,
  },
  cameraContainer: {
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderColor: "#fff",
    borderWidth: 1,
  },
  ImageWrapper: {
    marginTop: 32,
    marginHorizontal: 32,
  },
  textAddPhoto: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  form: {
    width: "100%",
    height: 549,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    height: 50,
    marginHorizontal: 32,
    marginBottom: 16,
    textAlign: "left",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input2: {
    paddingLeft: 24,
    fontFamily: "Roboto-Regular",
  },
  mapPin: {
    position: "absolute",
    bottom: 28,
    left: 28,
  },
  btnPublish: {
    backgroundColor: "#F6F6F6",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 120,
  },
  btnPublishText: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  btnDelete: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
