//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Native
import { View, Alert, SafeAreaView, Text } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "./ParkingStyle";
import Camera from './Camera'
//COMPONENTS
import Clock from "../clock/clock";
import {useNavigation} from '@react-navigation/native'

import Time from "../timer/Timer"

//importamos la funcion para guardar el TIME del Users
import { setUserTime, getUserTime } from "../../redux/reducer/userActions";


const Parking = (props) => {
  // const vehiculo = props.route.params
  // console.log(vehiculo)

  const navigation = useNavigation();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userReducer);
  let { time } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUserTime(user));
  }, []);

 console.log(time)

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
                
              return <Camera />
                /*    return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */
              }}
              icon={<Icon name="camera" size={60} color="white" />}
            ></Button>
          </View>
        </Card>
      </View>
      <View style={styles.fixToText}>
        <Text style={styles.colores2}>Tiempo de estacionamiento</Text>
       
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
              Alert.alert("algo");
              /* return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */
            }}
            icon={<Icon name="stopwatch" size={60} color="white" />}
          ></Button>
        </View>
      </Card>

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
        onPress={() => {time > 0 ? navigation.navigate('Countdown',time) : navigation.navigate('Timer')}}
      ></Button>
    </View>
  </SafeAreaView>
)};

export default Parking;
