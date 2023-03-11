import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    };
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  const publishPost = () => {
    getLocation();
    navigation.navigate("DefaultScreen", { photo, location });
    setPhoto(null);
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
          <TextInput placeholder="Name..." style={styles.input} />
        </View>
        <View>
          <TextInput
            placeholder="Location"
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
