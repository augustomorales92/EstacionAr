import React, {useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Parking from "../components/parking/Parking";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Timer from "../components/timer/Timer"
import Countdown from '../components/timer/Countdown';

// PROBANDO VALIDACION DE CREDITO

import firebase from "../back/db/firebase";


const Stack = createStackNavigator();

export const ParkingContainer = () => {
  const {selectCar} = useSelector(state => state.carReducer);
  const vehiculo = selectCar

  // VALIDACION DE CREDITO
  const {user} = useSelector(state => state.userReducer)
  const [userInfoNow, setUserInfoNow] = useState('')

  const getUserInfoNow = (userId) => {
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .onSnapshot((querySnap) => {
        return setUserInfoNow(querySnap.data().credit / 100 * 6000);
      });
  };

  React.useEffect(()=> {
    getUserInfoNow(user)
  }, [])

  console.log(userInfoNow)

  return (
    <Stack.Navigator>
      <Stack.Screen
      initialParams={vehiculo} 
        name="estacionar"
        component={Parking}
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
             name='Countdown' 
             initialParams={vehiculo} 
            component={Countdown}
           options={({ navigation}) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#F9B233',
                    elevation: 0,
                    shadowColor: 'transparent',
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


      <Stack.Screen name="Timer" component={Timer} initialParams={vehiculo} options={({ navigation }) => ({
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
        })}/> 
    </Stack.Navigator>

    
  );
};
