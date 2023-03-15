import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import app from "../../config/firebase";
const db = getFirestore(app);

const CommentsScreen = ({ route }) => {
  const { postiId } = route.params;
  const { avatar, login } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { postId } = route.params;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    getAllComments();
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
  }, []);

  const getAllComments = async () => {
    const postRef = doc(db, "posts", postiId);
    const q = query(collection(postRef, "comments"));
    onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      setComments(comments);
    });
  };

  const createComment = async () => {
    const postRef = doc(db, "posts", postId);
    await addDoc(collection(postRef, "comments"), {
      login: login,
      comment: comment,
    });
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setComment("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* <View style={{ alignItems: "center" }}>
            <Image
              style={styles.image}
              source={require("../../assets/images/forest.jpg")}
            />
          </View> */}

          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View style={styles.commentsWrapper}>
                <View style={styles.userComment}>
                  <Image style={styles.userImage} source={item.avatar} />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.commentDate}>
                      09 june, 2020 | 09:14
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, indx) => indx.toString()}
          />
          <View>
            <TextInput
              style={{
                ...styles.input,
                width: dimensions,
                marginBottom: isShowKeyboard ? 40 : 0,
              }}
              placeholder="Enter comment..."
              onFocus={() => setIsShowKeyboard(true)}
              value={comment}
              onChangeText={(value) => setComment(value)}
            />
          </View>
          <TouchableOpacity
            onPress={createComment}
            activeOpacity={0.6}
            style={styles.btnComment}
          >
            <Ionicons
              name="md-arrow-up-circle-sharp"
              size={34}
              color="#FF6C00"
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 343,
    height: 240,
  },
  userImage: {
    width: 28,
    height: 28,
  },

  commentsWrapper: {
    alignItems: "center",
    marginHorizontal: 38,
    marginTop: 32,
  },
  userComment: {
    flexDirection: "row",
    marginBottom: 24,
  },
  commentContent: {
    backgroundColor: "#E8E8E8",
    marginLeft: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    width: 299,
  },
  commentContentAnswer: {
    marginLeft: 0,
    marginRight: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },

  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    lineHeight: 12,
    fontSize: 10,
    textAlign: "right",
    marginRight: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 50,
    marginHorizontal: 24,
    marginTop: 7,
    paddingLeft: 16,
    textAlign: "left",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "Roboto-Medium",
  },
  btnComment: {
    position: "absolute",
    bottom: 55,
    right: 30,
  },
});

export default CommentsScreen;
