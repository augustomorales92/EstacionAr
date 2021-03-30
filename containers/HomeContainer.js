import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../components/login/Login'
import SignUp from "../components/SignUp/SignUp"
import Home from "../components/home/Home"
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements'
import {View} from 'react-native'


const Stack = createStackNavigator()


const user = true
export const HomeContainer = () => {

    
  return (
    <Stack.Navigator>
      
      
      {!user? 
      <>
      <Stack.Screen
        name="Iniciar Sesion"
        component={Login}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      />

      <Stack.Screen
        name="Registrate"
        component={SignUp}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      
          </>
          :
      <Stack.Screen
        name="drawer"
        component={Home}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
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
      
    
      }
    
      </Stack.Navigator>
  );
};

