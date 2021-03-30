import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import Login from '../components/login/Login'
import Signin from '../components/SignIn/Signin'
import Addcar from '../components/addCar/Addcar'
import Userscars from '../components/UsersCars/Userscars'
import Nocars from '../components/Nocars/Nocars'
import Parking from '../components/parking/Parking'
import Home from "../components/home/Home"
import Timer from "../components/timer/Timer"

const Stack = createStackNavigator()



const Main = () => {
    return (
        
        <Stack.Navigator  
        screenOptions={{headerShown: false}}
        >   
            <Stack.Screen name='Timer' component={Timer} />
            <Stack.Screen name='Inicio' component={Home} />
            <Stack.Screen name='Iniciar Sesion' component={Login} />
            <Stack.Screen name='Registrate' component={Signin} />
            <Stack.Screen name='sin autos' component={Nocars} />
            <Stack.Screen name='agregar un auto' component={Addcar} />
            <Stack.Screen name='autos' component={Userscars} />
            <Stack.Screen name='estacionar' component={Parking} />

         </Stack.Navigator>
 
    );
};

export default Main;

