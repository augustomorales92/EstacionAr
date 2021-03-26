import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import Login from '../components/Login'
import Signin from '../components/Signin'
import Addcar from '../components/Addcar'
import Userscars from '../components/Userscars'
const Stack = createStackNavigator()



const Main = () => {
    return (
        
        <Stack.Navigator  
        /* screenOptions={{headerShown: false}} */
        >
            <Stack.Screen name='Iniciar Sesion' component={Login} />
            <Stack.Screen name='Registrate' component={Signin} />
            <Stack.Screen name='agregar un auto' component={Addcar} />
            <Stack.Screen name='autos' component={Userscars} />
         </Stack.Navigator>
 
    );
};

export default Main;

