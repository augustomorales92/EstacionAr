import React from "react";
import { styles } from "./TimerStyle";
import { View, SafeAreaView, Modal, Pressable } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import firebase from "../../back/db/firebase";
import ClockTimer from "./ClockTimer";
import { format } from "./Format";
import { useNavigation } from "@react-navigation/native";
import { addNewParking } from "../../redux/reducer/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addParkingDocument,
  deleteParkingDocument,
  addZoneDocument,
} from "../../redux/reducer/carActions";
const RandExp = require('randexp')  

const Timer = (props) => {
  const dispatch = useDispatch();
  const vehiculo = props.route.params;

  const [isRunning, setRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [finalTime, setFinalTime] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [credit, setCredit] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [mode, setMode] = React.useState("libre");

  const navigation = useNavigation();
  const { user } = useSelector((state) => state.userReducer);
  const patente = useSelector((state) => state.carReducer.selectCar.patenteId);
  const marca = useSelector((state) => state.carReducer.selectCar.marcaId);
  const modelo = useSelector((state) => state.carReducer.selectCar.modeloId);
  const { zone } = vehiculo;

  const getUserCreditNow = (userId) => {
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .onSnapshot((querySnap) => {
        return setCredit(querySnap.data().credit);
      });
  };

  function runningOn() {
    const time = credit / 100;
    dispatch(
      addParkingDocument({ user, time, zone, mode, patente, marca, modelo })
    );
    setRunning(true);
  }

  function endParking() {
    setRunning(false);
    setIsFinished(true);
    setFinalTime(format(time));
    calculateParkingPrice(time);
    deleteParkingDocument(patente);
    dispatch(
      addZoneDocument({ user, time, zone, patente, mode, marca, modelo })
    );
  }

  function calculateParkingPrice(time) {
    let priceHalfHour = 50;
    let splitTime = Math.round(time / 180000);
    setPrice(priceHalfHour * splitTime);
    if (time < 3000) {
      setPrice(priceHalfHour);
    }
  }

  React.useEffect(() => {
    getUserCreditNow(user);
  }, [credit]);

  React.useEffect(() => {
    isFinished &&
      dispatch(addNewParking({ user, patente, price, finalTime, zone }));
  }, [isRunning]);

  React.useEffect(
    function () {
      let intervalo;
      if (isRunning) {
        intervalo = setInterval(() => {
          setTime((time) => time + 100);
        }, 1000);
      }
      return () => {
        clearInterval(intervalo);
      };
    },
    [isRunning]
  );

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View>
        <Card containerStyle={styles.card}>
          <Text h4>Veh??culo a estacionar</Text>
          <Text h5>Patente: {vehiculo.patenteId}</Text>
          <Text h5>Modelo: {vehiculo.modeloId}</Text>
          <Text h5>Marca: {vehiculo.marcaId}</Text>
          <Text h5>C??digo de manzana: {zone}</Text>
          <Text h5>Tiempo disponible: {credit / 100} hs</Text>
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
                  onPress={() => setModalVisible(!modalVisible)}
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
                  <Text>Tiempo:</Text>
                  <Text>{finalTime}</Text>
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
                title="CONFIRMAR"
                buttonStyle={styles.button}
                onPress={() => {
                  navigation.navigate("drawer");
                  navigation.goBack();
                }}
              />
            </Card>
          </>
        )}
        {/* vvvv------------------ MODAL ----------------vvvv*/}
        {
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  ??Desea finalizar?
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Pressable
                      style={[styles.button2, styles.buttonClose]}
                      onPress={() => {
                        endParking();
                        dispatch(
                          addNewParking({
                            user,
                            patente,
                            price,
                            finalTime,
                            zone,
                          })
                        );
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}> SI </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.button2,
                        styles.buttonClose,
                        { marginTop: 10 },
                      ]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>NO</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        }
        {/*^^^^------------------ MODAL ----------------^^^^ */}
      </View>
    </SafeAreaView>
  );
};

export default Timer;
