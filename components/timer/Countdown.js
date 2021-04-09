import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, SafeAreaView, Modal, Pressable } from "react-native";
import { Button, Card, Text, Input } from "react-native-elements";
import ClockTimer from "./ClockTimer";
import { styles } from "./CountdownStyle";
import { format } from "./Format";
import { useNavigation } from "@react-navigation/native";
import { addNewParking } from "../../redux/reducer/userActions";

const Countdown = (props) => {
  const vehiculo = props.route.params;

  const timer = useSelector((state) => state.userReducer.time);
  const user = useSelector((state) => state.userReducer.user);
  const patente = useSelector(
    (state) => state.carReducer.allUserCars[0].patente
  );

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);

  const [message, setMessage] = useState("");
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState(timer);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [isFinished, setIsFinished] = React.useState(false);

  const [addTime, setAddTime] = useState(0);
  const navigation = useNavigation();

  const startParking = () => {
    setRunning(!isRunning);
    calculateParkingPrice(timer + addTime);
  };

  const endParking = () => {
    setFinalTime(format(timer + addTime - time));
    //setTimeParking(parkingTime)
    setRunning(false);
    setIsFinished(true);
    calculateParkingPrice(timer + addTime);
  };

  function calculateParkingPrice(time) {
    let priceHalfHour = 50;
    let splitTime = Math.round(time / 3000);
    setPrice(priceHalfHour * splitTime);
  }

  useEffect(
    function () {
      let intervalo;
      if (isRunning) {
        intervalo = setInterval(() => {
          setTime((time) => time - 1);
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
    isFinished && dispatch(addNewParking({ user, patente, price, finalTime }));
  }, [isRunning]);

  return (
    <SafeAreaView style={{ backgroundColor: "black", height: "100%" }}>
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
             <Button
                  title="Cancelar"
                  disabled={isRunning && true}
                  buttonStyle={styles.button}
                  onPress={() => navigation.goBack()}
                />
            <Button
              title="Iniciar"
              buttonStyle={styles.button}
              onPress={() => startParking()}
              disabled={isRunning && true}
            ></Button>
            <Button
              title="Finalizar"
              buttonStyle={styles.button}
              onPress={() => {
                calculateParkingPrice(timer + addTime);
                //endParking();
                setModalAlert(!modalAlert);
              }}
              disabled={time === 0 ? true : false}
            ></Button>
            <Button
              buttonStyle={styles.button}
              title="+30 min"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
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
                      setTime(time + 3000);
                      setAddTime(addTime + 3000);
                      calculateParkingPrice(timer + addTime);
                      setModalVisible(!modalVisible)
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
                      setModalAlert(!modalAlert)
                      calculateParkingPrice(timer + addTime);
                      endParking();
                      dispatch(
                        addNewParking({ user, patente, price, finalTime })
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
