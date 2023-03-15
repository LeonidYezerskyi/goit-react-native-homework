import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NestedProfileScreen from "../nestedScreens/NestedProfileScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const ProfileStack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={NestedProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
        }}
      />
      <ProfileStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Comments",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreen;
