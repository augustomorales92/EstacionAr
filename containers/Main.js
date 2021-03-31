import React, { useEffect } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { UsersCarsContainer } from "./UsersCarsContainer";
import { ParkingContainer } from "./ParkingContainer";
import { HomeContainer } from "./HomeContainer";
import { AddCarContainer } from "./AddCarContainer";
// import Login from "../components/login/Login";
import { getUserLogged } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import CustomDrawerContent from './drawerContainer/Drawer';
import {drawerItemsMain} from './drawerContainer/DrawerItemsMain';

const Drawer = createDrawerNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserLogged(dispatch);
  }, []);

  return (
    // <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="home"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
        <Drawer.Screen name="home" component={HomeContainer} />
        <Drawer.Screen name="agregar un auto" component={AddCarContainer} />
        <Drawer.Screen name="autos" component={UsersCarsContainer} />
        <Drawer.Screen name="estacionar" component={ParkingContainer} />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
};

export default Main;
