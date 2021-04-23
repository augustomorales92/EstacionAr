import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, SafeAreaView, Modal, Pressable } from "react-native";
import { Button, Card, Text, Input } from "react-native-elements";
import ClockTimer from "./ClockTimer";
import { styles } from "./CountdownStyle";
import { format } from "./Format";
import { useNavigation } from "@react-navigation/native";
import { addNewParking, setUserZone } from "../../redux/reducer/userActions";
import {addParkingDocument, deleteParkingDocument, addZoneDocument} from "../../redux/reducer/carActions"
import firebase from "../../back/db/firebase";
const RandExp = require('randexp')

const Countdown = (props) => {
  const vehiculo = props.route.params;
  const { zone } = vehiculo;

  const timer = useSelector(state => state.userReducer.time);
  const user = useSelector(state => state.userReducer.user);
  const patente = useSelector(state => state.carReducer.selectCar.patenteId);
  const marca = useSelector(state => state.carReducer.selectCar.marcaId)
  const modelo = useSelector(state => state.carReducer.selectCar.modeloId)
  const dispatch = useDispatch();
  const [userInfoNow, setUserInfoNow] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState(timer);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [addTime, setAddTime] = useState(0);
  const [button, setButton] = useState(true);
  const [mode, setMode] = useState("fraccionado");
  
  console.log('el userrrrrrrr --->',userInfoNow)
  const [inicio, setInicio] = useState(null);

  const navigation = useNavigation();

  const startParking = () => {
    let arranqueH = new Date().getHours();
    let arranqueM = (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();
    let arranque = `${arranqueH}:${arranqueM}`;
    setInicio(arranque);
    dispatch(
      addParkingDocument({ user, time, zone, patente, mode, marca, modelo })
    );
    setRunning(!isRunning);
    calculateParkingPrice(timer + addTime);
    getUserInfoNow()
  };

  const endParking = () => {
    let finalH = new Date().getHours();
    let finalM = (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();
    let final = `${finalH}:${finalM}`;
    setFinalTime(format(timer + addTime - time));
    setRunning(false);
    setIsFinished(true);
    calculateParkingPrice(timer + addTime);
    setButton(!button);
    deleteParkingDocument(patente);
    dispatch(
      addZoneDocument({ user, time, zone, patente, mode, marca, modelo, final, inicio })
    );
  };

  function calculateParkingPrice(time) {
    let priceHalfHour = 50;
    let splitTime = Math.round(time / 180000);
    setPrice(priceHalfHour * splitTime);
  }

  const getUserInfoNow = () => {
   return firebase.db
      .collection("users")
      .doc(user)
      .onSnapshot((querySnap) => {
        setUserInfoNow(querySnap.data());
      });
  };

  useEffect(
    function () {
      let intervalo;
      if (isRunning) {
        intervalo = setInterval(() => {
          setTime((time) => time - 100);
        }, 1000);
      }
      return () => {
        clearInterval(intervalo);
      };
    },
    [isRunning]
  );

  useEffect(() => {
    if (time === 0) {
      setRunning(false);
      setValue("0");
    }
  }, [time]);

  useEffect(() => {
    isFinished && dispatch(addNewParking({ user, patente, price, finalTime, zone }));

  }, [isRunning]);



  return (
    <SafeAreaView style={{ backgroundColor: "black", height: "100%" }}>
      <View>
        <Card containerStyle={styles.card}>
          <Text h4>Vehículo a estacionar</Text>
          <Text h5>Patente: {vehiculo.patenteId}</Text>
          <Text h5>Modelo: {vehiculo.modeloId}</Text>
          <Text h5>Marca: {vehiculo.marcaId}</Text>
          <Text h5>Código de manzana: {zone}</Text>
          {/* <Text h5>Precio: ${price}</Text> */}
        </Card>
        <Card containerStyle={styles.card}>
          <ClockTimer time={time} style={{color: "red"}} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Cancelar"
              disabled={(isRunning && true) || (!button && true)}
              buttonStyle={styles.button}
              onPress={() => navigation.goBack()}
            />
            <Button
              title="Iniciar"
              buttonStyle={styles.button}
              onPress={() => startParking()}
              disabled={(isRunning && true) || (!button && true)}
            ></Button>
            <Button
              title="Finalizar"
              buttonStyle={styles.button}
              onPress={() => {
                calculateParkingPrice(timer + addTime);
                setModalAlert(!modalAlert);
              }}
              disabled={time === 0 ? true : false || (!button && true)}
            ></Button>
            <Button
              buttonStyle={styles.button}
              title="+30 min"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              disabled={!button && true}
            ></Button>
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
                  <Text>ID Transacción:</Text>
                  <Text>{new RandExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/).gen()}</Text>
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

        {/*--------------------------MODAl--------------------*/}
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
              <Text style={styles.modalText}>¿Agregar +30 min?</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setTime(time + 180000);
                      setAddTime(addTime + 180000);
                      calculateParkingPrice(timer + addTime);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Agregar +30 min</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      { marginTop: 10 },
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Volver</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/*--------------------------MODAl--------------------*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAlert}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalAlert(!modalAlert);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Desea finalizar?</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalAlert(!modalAlert);
                      calculateParkingPrice(timer + addTime);
                      endParking();
                      dispatch(
                        addNewParking({ user, patente, price, finalTime, zone })
                      );
                    }}
                  >
                    <Text style={styles.textStyle}>Finalizar</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonClose,
                      { marginTop: 10 },
                    ]}
                    onPress={() => setModalAlert(!modalAlert)}
                  >
                    <Text style={styles.textStyle}>Volver</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Countdown;
