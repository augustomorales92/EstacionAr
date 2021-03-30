import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Userscars from '../components/UsersCars/Userscars'
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
    </Stack.Navigator>
  );
};

