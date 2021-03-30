import React from "react";
import { styles } from "./TimerStyle";
import { View, SafeAreaView } from "react-native";
import { Button, Card, Header, Text } from "react-native-elements";
import ClockTimer from "./ClockTimer"

const Timer = () => {

    // const [isRunning, setRunning] = useState(false);
    // const [time, setTime] = useState(0);
  
    // function toggleState() {
    //   setRunning(!isRunning);
    // }
    //poner en el boton de detener -->  onPress={() => toggleState()}
  
    // const reset = () => {
    //   setTime(0);
    //   setRunning(false);
    // };
  
    // useEffect(
    //   function () {
    //     let intervalo;
    //     if (isRunning) {
    //       intervalo = setInterval(() => {
    //         setTime((time) => time + 1);
    //       }, 1000);
    //     }
    //     return () => {
    //       clearInterval(intervalo);
    //     };
    //   },
    //   [isRunning]
    // );


  return (
    <SafeAreaView>
      <Header
        placement="left"
        containerStyle={styles.headerStyle}
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "EstacionAr", style: { color: "#fff" } }}
      />
      <View>
        <Card containerStyle={styles.card}>
            <Text h4>Vehiculo a estacionar</Text>
            <Text>AAA 123 BB</Text>
            <Text>Corsita</Text>
        </Card>
        <Card containerStyle={styles.card}>
        <ClockTimer/>
        <View  style={{flexDirection: "row", justifyContent: "space-around"}}>
        <Button
            title="DETENER"
            buttonStyle={styles.button}
            onPress={() => alert("boton detener presionado!")}
          /> 
          <Button
            title="FINALIZAR"
            buttonStyle={styles.button}
            onPress={() => alert("boton finalizar presionado!")}
          /> 
        </View>
        </Card> 
      </View>
    </SafeAreaView>
  );
};

export default Timer;
