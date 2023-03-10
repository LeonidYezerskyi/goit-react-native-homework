import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={{ width: 60, height: 60 }}
          source={require("../../assets/images/user.jpg")}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.postsWrapper}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{
                width: 343,
                height: 240,
              }}
              source={require("../../assets/images/forest.jpg")}
            />
          </View>
          <View style={styles.postMainInfo}>
            <Text style={styles.postName}>Forest</Text>
            <View style={styles.postInfo}>
              <View style={{ flexDirection: "row", marginLeft: -7 }}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.commentsNumber}>0</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => navigation.navigate("Map")}
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.postLocation}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.postsWrapper}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{
                width: 343,
                height: 240,
              }}
              source={require("../../assets/images/forest.jpg")}
            />
          </View>
          <View style={styles.postMainInfo}>
            <Text style={styles.postName}>Forest</Text>
            <View style={styles.postInfo}>
              <View style={{ flexDirection: "row", marginLeft: -7 }}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.commentsNumber}>0</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity activeOpacity={0.4}>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.postLocation}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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

export default PostsScreen;
