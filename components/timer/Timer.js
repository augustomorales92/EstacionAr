import React from "react";
import { styles } from "./TimerStyle";
import { View, SafeAreaView } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import ClockTimer from "./ClockTimer";
import { format } from "./Format";
import { useNavigation } from "@react-navigation/native";
import { NavigationHelpersContext } from "@react-navigation/core";

const Timer = (props) => {
  const [isRunning, setRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [finalTime, setFinalTime] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const vehiculo = props.route.params;
  const navigation = useNavigation();

  function runningOn() {
    setRunning(true);
  }

  function endParking() {
    setRunning(false);
    setIsFinished(true);
    setFinalTime(format(time));
    calculateParkingPrice(time);
    // setear el history parking
    // pedir de redux: {userId, card.patente, price y finalTime} 
  }

  function calculateParkingPrice(time) {
    let priceHalfHour = 50;
    let splitTime = Math.round(time / 3000);
    setPrice(priceHalfHour * splitTime);
    if(time<3000){
      setPrice(priceHalfHour)
    }
  }

  React.useEffect(
    function () {
      let intervalo;
      if (isRunning) {
        intervalo = setInterval(() => {
          setTime((time) => time + 1);
        }, 10); // tiempo original es 1000
      }
      return () => {
        clearInterval(intervalo);
      };
    },
    [isRunning]
  );

  return (
    <SafeAreaView>
      <View>
        <Card containerStyle={styles.card}>
          <Text h4>Vehiculo a estacionar</Text>
          <Text h5>{vehiculo.patenteId}</Text>
          <Text h5>{vehiculo.modeloId}</Text>
          <Text h5>{vehiculo.marcaId}</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <ClockTimer time={time} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {!isFinished ? (
              <>
              <Button
                  title="CANCELAR"
                  disabled={isRunning && true}
                  buttonStyle={styles.button}
                  onPress={() => navigation.goBack()}
                />
                <Button
                  title="INICIAR"
                  disabled={isRunning ? true : false}
                  buttonStyle={styles.button}
                  onPress={() => runningOn()}
                />
                <Button
                  title="FINALIZAR"
                  disabled={false}
                  buttonStyle={styles.button}
                  onPress={() => endParking()}
                />
              </>
            ) : (
              <>
                <Button
                  title="INICIAR"
                  disabled={true}
                  buttonStyle={styles.button}
                />
                <Button
                  title="FINALIZAR"
                  disabled={true}
                  buttonStyle={styles.button}
                />
              </>
            )}
          </View>
        </Card>
        {isFinished && (
          <>
            <Card containerStyle={styles.card}>
              <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <Text>Tiempo:</Text> <Text>{finalTime}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <Text>Monto a pagar:</Text>
                  <Text>${price}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <Text>ID Transaccion:</Text>
                  <Text>d5g4s65fg4</Text>
                </View>
              </View>
              <Button
                title="PAGAR CON MERCADOPAGO"
                buttonStyle={styles.button}
              />
            </Card>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Timer;
