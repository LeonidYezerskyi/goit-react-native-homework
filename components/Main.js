import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../routes/router";
import { getAuth } from "firebase/auth";
import app from "../config/firebase";
import { authStateCahngeUser } from "../redux/auth/authOperations";

const auth = getAuth(app);

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  const routing = useRoute(stateChange);
  useEffect(() => {}, []);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
