import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ParkingHistory from '../components/parkingHistory/ParkingHistory'

import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator()

export const ParkingHistoryContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="parkingHistory"
        component={ParkingHistory}
        options={({ navigation }) => ({
          title: "Historial",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F9B233",
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: "#774D00",
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