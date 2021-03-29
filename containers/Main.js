import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import Login from '../components/login/Login'
import SignUp from '../components/SignUp/SignUp'
import Addcar from '../components/addCar/Addcar'
import Userscars from '../components/UsersCars/Userscars'
import Nocars from '../components/Nocars/Nocars'
import Parking from '../components/parking/Parking'

const Stack = createStackNavigator()



const Main = () => {
    return (
        
        <Stack.Navigator  
        /* screenOptions={{headerShown: false}} */
        >
            <Stack.Screen name='Iniciar Sesion' component={Login} />
            <Stack.Screen name='Registrate' component={SignUp} />
            <Stack.Screen name='sin autos' component={Nocars} />
            <Stack.Screen name='agregar un auto' component={Addcar} />
            <Stack.Screen name='autos' component={Userscars} />
            <Stack.Screen name='estacionar' component={Parking} />

         </Stack.Navigator>
 
    );
};

export default Main;

