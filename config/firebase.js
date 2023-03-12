import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWZXxCSzKs1RY4uYJXCB6fHbhTOrIxMno",
  authDomain: "react-native-photomap.firebaseapp.com",
  projectId: "react-native-photomap",
  storageBucket: "react-native-photomap.appspot.com",
  messagingSenderId: "1027380065533",
  appId: "1:1027380065533:web:86325ab00159d9f3f87a94",
  measurementId: "G-8SLRDGSB8L",
};

const app = initializeApp(firebaseConfig);

export default app;
