import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import EditUser from '../components/EditUser/EditUser'
import EditLogin from '../components/EditLogin/EditLogin'

import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator()

export const UserContainer = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="datos usuario"
          component={EditUser}
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
        <Stack.Screen
        name="datos login"
        component={EditLogin}
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
            }})}
        />
      </Stack.Navigator>
    );
};
