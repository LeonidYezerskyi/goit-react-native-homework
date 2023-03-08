// import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Font from "expo-font";
// import { AppLoading } from "expo";

SplashScreen.preventAutoHideAsync();

const MainStack = createStackNavigator();

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//   });
// };

export default function App() {
  // const [isReady, setIsReady] = useState(false);

  // if (!isReady) {
  //   return (
  //     <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />
  //   );
  // }

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Registration">
          <MainStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <MainStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          {/* <MainStack.Screen name="Home" component={Home} /> */}
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
