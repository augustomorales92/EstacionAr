//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Native
import { View, Alert, SafeAreaView, Text } from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/EvilIcons";
//STYLE
import { styles } from "./ParkingStyle";
//COMPONENTS
import Clock from "../clock/clock";
//importamos la funcion para guardar el TIME del Users
import { setUserTime, getUserTime } from "../../redux/reducer/userActions";


const Parking = (props) => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userReducer);
  let { time } = useSelector((state) => state.userReducer);

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
            Alert.alert("libre");
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
          onPress={() => {
            setTime(0);
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default Parking;
