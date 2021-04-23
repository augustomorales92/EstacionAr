import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Addcar from "../components/addCar/Addcar";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

export const AddCarContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="agregar un auto"
        component={Addcar}
        options={({ navigation }) => ({
          title: "Agregar vehículo",
          headerTitleAlign: "center",
          headerTintColor: "#774D00",
          headerStyle: {
            backgroundColor: "#F9B233",
            elevation: 0,
            shadowColor: "transparent",
          },
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
          headerRight: () => (
            <Button
              type="clear"
              icon={
                <Icon
                  name="arrow-circle-left"
                  size={35}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              }
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
