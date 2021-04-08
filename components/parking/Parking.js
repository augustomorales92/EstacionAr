import React, { useState, useEffect } from "react";
import { View, Alert, SafeAreaView, Text } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/EvilIcons";
import { styles } from "./ParkingStyle";
import Clock from "../clock/clock";
import {useNavigation} from '@react-navigation/native'

import Timer from "../timer/Timer"

//importamos la funcion para guardar el TIME del Users
import { setUserTime, getUserTime } from "../../redux/reducer/userActions";

import { useDispatch, useSelector } from "react-redux";

const Parking = (props) => {
  // const vehiculo = props.route.params
  // console.log(vehiculo)

  const navigation = useNavigation();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userReducer);
  let { time } = useSelector((state) => state.userReducer);

  console.log(time)

  useEffect(() => {
    dispatch(getUserTime(user));
  }, []);

  const addTime = (num) => {
    let totalTime;
    num == 0 ? (totalTime = 0) : (totalTime = time + num);
    dispatch(setUserTime({ totalTime, user }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <Input
          label="Ingresar codigo"
          placeholder="182"
          inputStyle={styles.colorInput}
        />
      </Card>
      <View style={{ justifyContent: "space-around" }}>
        <Card containerStyle={styles.input}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.colores}>Escanear QR</Text>
            <Button
              buttonStyle={styles.button}
              onPress={() => {
                Alert.alert("abrir camara");
                /*    return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */
              }}
              icon={<Icon name="camera" size={60} color="white" />}
            ></Button>
          </View>
        </Card>
      </View>
      <View style={styles.fixToText}>
        <Text style={styles.colores2}>Tiempo de estacionamiento</Text>
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            setTime(0)
            // navigation.navigate('Timer')
            // Alert.alert("libre");
            /* return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */
          }}
          icon={<Icon name='sc-telegram' size={60} color="white" />}
        ></Button>
      </View>

      <Card containerStyle={styles.input}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.colores}>0.5hs</Text>

          <Button
            buttonStyle={styles.button}
            onPress={() => {
              addTime(3000);
            }}
            icon={<Icon name="clock" size={60} color="white" />}
          ></Button>
        </View>
      </Card>

      <Card containerStyle={styles.input}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.colores}> Libre</Text>

          <Button
            buttonStyle={styles.button}
            onPress={() => {
              Alert.alert("libre");
              /* return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */
            }}
            icon={<Icon name="play" size={60} color="white" />}
          ></Button>
        </View>
      </Card>

      {/* <View style={styles.fixToText}>
        <Text style={styles.colores}>0.5hs</Text>
        <Text style={styles.colores}>Libre</Text>
        </View>
        <View style={styles.fixToText}>
        
        <Button rounded dark
        style={styles.button}
        onPress={timer}>
              <Icon name='clock' size={80} color="white"/>
              
              
              </Button>
              <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("libre")  
                return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)    }}
          >
              <Icon name='play' size={80} color="white"/>
              
              </Button>
      </View> */}
      <Card containerStyle={styles.input2}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.clock}>
            <Clock time={time} />
          </Text>

          <Button
            buttonStyle={styles.buttons2}
            title="reset"
            onPress={() => {
              addTime(0);
            }}
          ></Button>
        </View>
      </Card>

    <View style={styles.lastButton}>
      <Button
      buttonStyle={styles.buttons}
        title="ir a estacionar"
        onPress={() => {time > 0 ? navigation.navigate('Countdown') : navigation.navigate('Timer')}}
      ></Button>
    </View>
  </SafeAreaView>
)};

export default Parking;
