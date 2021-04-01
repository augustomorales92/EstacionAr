import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/login/Login";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/home/Home";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { View } from "react-native";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export const HomeContainer = () => {
  let userInTheApp = useSelector((state) => state.userReducer);
    
  return (
    <Stack.Navigator>
      {!userInTheApp.user ? (
        <>
          <Stack.Screen
            name="Iniciar Sesion"
            component={Login}
            options={{
              title: "",
              headerTransparent: true
            }}
          />

          <Stack.Screen
            name="Registrate"
            component={SignUp}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "orange",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="drawer"
          component={Home}
          options={({ navigation }) => ({
            title: "",
            headerStyle: {
              backgroundColor: "black",
            },
            
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <Button
                type="clear"
                icon={
                  <Icon
                    name="bars"
                    color="white"
                    style={{ marginRight: 10 }}
                    size={30}
                  />
                }
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            ),
          })}
        />
      )}
    </Stack.Navigator>
  );
};
