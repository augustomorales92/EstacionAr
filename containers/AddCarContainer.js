import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Addcar from '../components/addCar/Addcar'

import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



const Stack = createStackNavigator()



export const AddCarContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="agregar un auto"
        component={Addcar}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#F9B233",
            elevation: 0,
            shadowColor: 'transparent',
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

