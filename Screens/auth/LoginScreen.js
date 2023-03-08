import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;

      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  const keyboardHide2 = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsShowKeyboard(true);
  };
  const handleFocus2 = () => {
    setIsFocused2(true);
    setIsShowKeyboard(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsShowKeyboard(false);
  };
  const handleBlur2 = () => {
    setIsFocused2(false);
    setIsShowKeyboard(false);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide2}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/background.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            keyboardVerticalOffset={100}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -240 : 0,
                width: dimensions,
              }}
            >
              <View>
                <Text style={styles.formTitle}>Enter</Text>
              </View>
              <View>
                <TextInput
                  placeholder="Email address"
                  style={[styles.input, isFocused && styles.focusedInput]}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  style={[styles.input, isFocused2 && styles.focusedInput]}
                  secureTextEntry={hidePassword}
                  onFocus={handleFocus2}
                  onBlur={handleBlur2}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {hidePassword ? (
                    <Text style={styles.hideBtn}>Show password</Text>
                  ) : (
                    <Text style={styles.hideBtn}>Hide password</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.textBottom}>
                  Don't have an account?{" "}
                  <Text onPress={() => navigation.navigate("Registration")}>
                    Register
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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

  form: {
    width: "100%",
    height: 489,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formTitle: {
    fontWeight: 500,
    fontSize: 30,
    fontFamily: "Roboto-Regular",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 32,
    marginBottom: 33,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    marginHorizontal: 32,
    backgroundColor: "#F6F6F6",
    textAlign: "left",
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
  },
  focusedInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    color: "#212121",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  textBottom: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },
  hideBtn: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    top: -50,
    left: 83,
    marginLeft: 145,
    width: 120,
  },
});
