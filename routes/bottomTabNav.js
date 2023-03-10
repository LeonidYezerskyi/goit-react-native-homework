import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import PostsScreen from "../Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreen/ProfileScreen";

const MainTab = createBottomTabNavigator();

const BottomTabNav = ({ navigation }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
        tabBarItemStyle: {
          borderRadius: 25,
          maxWidth: 80,
          height: 45,
          margin: 11,
        },

        tabBarStyle: [
          {
            backgroundColor: "#FFFFFF",
            height: 83,
            borderTopColor: "#808080",
            borderTopWidth: 1,
            alignItems: "center",
          },
          null,
        ],
      }}
    >
      <MainTab.Screen
        options={{
          title: "Posts",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <View style={{ paddingRight: 10 }}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome name="list-ul" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Create Post",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default BottomTabNav;
