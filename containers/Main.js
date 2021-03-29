import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/login/Login";
import SignUp from "../components/SignUp/SignUp";
import Addcar from "../components/addCar/Addcar";
import Userscars from "../components/UsersCars/Userscars";
import Nocars from "../components/Nocars/Nocars";
import Parking from "../components/parking/Parking";

const Stack = createStackNavigator();

//importamos getUserLogged
import { getUserLogged } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  return (
    <Stack.Navigator
    /* screenOptions={{headerShown: false}} */
    >
      <Stack.Screen name="Iniciar Sesion" component={Login} />
      <Stack.Screen name="Registrate" component={SignUp} />
      <Stack.Screen name="sin autos" component={Nocars} />
      <Stack.Screen name="agregar un auto" component={Addcar} />
      <Stack.Screen name="autos" component={Userscars} />
      <Stack.Screen name="estacionar" component={Parking} />
    </Stack.Navigator>
  );
};

export default Main;
