import React from "react";
import { styles } from "./TimerStyle";
import { View, SafeAreaView } from "react-native";
import { Button, Card, Header, Text } from "react-native-elements";
import ClockTimer from "./ClockTimer"

const Timer = () => {

    const [isRunning, setRunning] = React.useState(false);
    const [time, setTime] = React.useState(0);
    const [finalTime, setFinalTime] = React.useState(0);

    function runningOn() {
      setRunning(true);
    }
    
    function endParking() {
      setRunning(false);
    }
  
    // const reset = () => {
    //   setTime(0);
    //   setRunning(false);
    // };
  
    React.useEffect(
      function () {
        let intervalo;
        if (isRunning) {
          intervalo = setInterval(() => {
            setTime((time) => time + 1);
          }, 1000);
        }
        return () => {
          clearInterval(intervalo);
        };
      },
      [isRunning]
    );

  return (
    <SafeAreaView>
      {/* <Header
        placement="left"
        containerStyle={styles.headerStyle}
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "EstacionAr", style: { color: "#fff" } }}
      /> */}
      <View>
        <Card containerStyle={styles.card}>
            <Text h4>Vehiculo a estacionar</Text>
            <Text>AAA 123 BB</Text>
            <Text>Corsita</Text>
        </Card>
        <Card containerStyle={styles.card}>
        <ClockTimer time={time}/>
        <View  style={{flexDirection: "row", justifyContent: "space-around"}}>
          {isRunning ? 
          (
            <Button
            title="INICIAR"
            disabled
            buttonStyle={styles.button}
            />
          ) : 
          (
            <Button
            title="INICIAR"
            buttonStyle={styles.button}
            onPress={() => runningOn()}
            />
          )}
         
          <Button
            title="FINALIZAR"
            buttonStyle={styles.button}
            onPress={() => endParking()}
          /> 
        </View>
        </Card> 
      </View>
    </SafeAreaView>
  );
};

export default Timer;
