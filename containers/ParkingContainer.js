import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Parking from '../components/parking/Parking'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



const Stack = createStackNavigator()



export const ParkingContainer = () => {

    
  return (
        
    <Stack.Navigator >
            <Stack.Screen
             name='estacionar' 
            component={Parking}
           options={({ navigation}) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                headerLeft: () => (
                  <Button
                  type='clear'
                  icon={<Icon name='bars' color='white' style={{marginRight:10}} size={30}/>} 
                   onPress={() => {
                    navigation.toggleDrawer()}
                      }/>
                ),
              })}/> 

              
              

   
         </Stack.Navigator>
);
};

