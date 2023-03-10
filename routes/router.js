import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/auth/LoginScreen";
import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import HomeScreen from "../Screens/HomeScreen";
import MapScreen from "../Screens/MapScreen";
import CommentsScreen from "../Screens/CommentsScreen";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <MainStack.Screen name="Map" component={MapScreen} />
      <MainStack.Screen
        options={{
          title: "Comments",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </MainStack.Navigator>
  );
};
