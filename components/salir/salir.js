import React from "react";
import { useDispatch } from "react-redux";
import { View, Button } from "react-native";
import { signOutUser } from "../../redux/reducer/userReducer";
import { StackActions, useNavigation } from "@react-navigation/native";

const salir = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logOut = () => {
    dispatch(signOutUser()).then(() =>
      setTimeout(() => navigation.navigate("home"), 2000)
    );
  };
  return (
    <View>
      <Button onPress={() => logOut()} />
    </View>
  );
};

export default salir;
