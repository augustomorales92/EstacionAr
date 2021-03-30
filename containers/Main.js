import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {UsersCarsContainer} from './UsersCarsContainer'
import {ParkingContainer} from './ParkingContainer'
import {HomeContainer} from './HomeContainer'
import {AddCarContainer} from './AddCarContainer'
import Login from '../components/login/Login';


const Drawer = createDrawerNavigator();

const Main = () => {
 
    
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="home" component={HomeContainer} />
      <Drawer.Screen name="agregar un auto" component={AddCarContainer} />
      <Drawer.Screen name="autos" component={UsersCarsContainer} />
      <Drawer.Screen name="estacionar" component={ParkingContainer} />
      <Drawer.Screen name="Salir" component={Login} />
    </Drawer.Navigator>
  );
};

export default Main;

