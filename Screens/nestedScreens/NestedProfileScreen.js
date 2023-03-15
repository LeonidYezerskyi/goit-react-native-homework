import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { MaterialIcons, EvilIcons, AntDesign } from "@expo/vector-icons";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import app from "../../config/firebase";
const db = getFirestore(app);

const NestedProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/background.jpg")}
      >
        <View style={styles.profileWrapper}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.avatarImage}
            />
            <TouchableOpacity
              style={styles.removeAvatarBtn}
              activeOpacity={0.4}
            >
              <Image
                source={require("../../assets/images/removeAvatarBtn.png")}
                style={styles.removeAvatarBtn}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={signOut}>
            <View style={styles.logoutBtn}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.profileTitle}>{login}</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postsWrapper}>
                <View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{
                        width: 343,
                        height: 240,
                      }}
                      source={{ uri: item.photo }}
                    />
                  </View>
                  <View style={styles.postMainInfo}>
                    <Text style={styles.postName}>{item.name}</Text>
                    <View style={styles.postInfo}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: -7,
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.4}
                          onPress={() =>
                            navigation.navigate("Comments", {
                              photo: item.photo,
                              postId: item.id,
                            })
                          }
                        >
                          <EvilIcons name="comment" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                        <Text style={styles.commentsNumber}>0</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity activeOpacity={0.4}>
                          <AntDesign name="like2" size={20} color="#BDBDBD" />
                        </TouchableOpacity>
                        <Text style={styles.commentsNumber}>0</Text>
                      </View>
                      <View style={{ flexDirection: "row", marginLeft: 100 }}>
                        <TouchableOpacity
                          activeOpacity={0.4}
                          onPress={() =>
                            navigation.navigate("Map", {
                              location: item.location,
                            })
                          }
                        >
                          <EvilIcons
                            name="location"
                            size={24}
                            color="#BDBDBD"
                          />
                        </TouchableOpacity>
                        <Text style={styles.postLocation}>{item.country}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileWrapper: {
    width: "100%",
    height: 549,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatarImage: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  removeAvatarBtn: {
    width: 25,
    left: 30,
    top: 10,
  },
  logoutBtn: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: -10,
  },
  profileTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 32,
    marginBottom: 33,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 32,
    marginBottom: 32,
  },
  commentsNumber: {
    marginLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 28,
    marginTop: 8,
    marginBottom: 8,
  },
  postLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});

export default NestedProfileScreen;
