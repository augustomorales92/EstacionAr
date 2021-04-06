import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Userscars from '../components/UsersCars/Userscars'
import Editcar from '../components/editCar/Editcar'
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator()



export const UsersCarsContainer = () => {

    
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="autos"
        component={Userscars}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "orange",
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
      <Stack.Screen
        name="editarAutos"
        component={Editcar}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "orange",
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
   
    </Stack.Navigator>
  );
};

