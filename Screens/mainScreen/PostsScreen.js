import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        options={{
          title: "Posts",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={signOut}>
              <View style={{ paddingRight: 10 }}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          ),
        }}
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
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
      <NestedScreen.Screen
        options={{
          title: "Map",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
