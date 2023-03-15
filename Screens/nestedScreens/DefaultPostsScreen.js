import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import app from "../../config/firebase";
const db = getFirestore(app);
import { EvilIcons } from "@expo/vector-icons";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const { login, email, avatar } = useSelector((state) => state.auth);
  console.log({ login, email, avatar });

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(allPosts);
      console.log(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image style={{ width: 60, height: 60 }} source={{ uri: avatar }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.postsWrapper}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: 343, height: 240 }}
                />
              </View>
              <View style={styles.postMainInfo}>
                <Text style={styles.postName}>{item.title}</Text>
                <View style={styles.postInfo}>
                  <View style={{ flexDirection: "row", marginLeft: -7 }}>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          photo,
                          postId: item.id,
                        })
                      }
                    >
                      <EvilIcons name="comment" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                    <Text style={styles.commentsNumber}>0</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={() =>
                        navigation.navigate("Map", { location: item.location })
                      }
                    >
                      <EvilIcons name="location" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                    <Text style={styles.postLocation}>{country}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopColor: "#808080",
    borderTopWidth: 1,
  },
  userWrapper: {
    marginTop: 32,
    marginLeft: 16,
    flexDirection: "row",
  },
  userInfo: { marginLeft: 8 },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    lineHeight: 13,
    color: "#212121",
  },
  postsWrapper: {
    marginHorizontal: 32,
    marginTop: 32,
    alignItems: "center",
  },
  postInfo: {
    flexDirection: "row",
    marginHorizontal: 32,
  },
  commentsNumber: {
    marginRight: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
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

export default DefaultPostsScreen;
