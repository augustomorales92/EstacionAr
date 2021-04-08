import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, SafeAreaView, Modal, Pressable } from "react-native";
import { Button, Card, Text, Input } from "react-native-elements";
import ClockTimer from "./ClockTimer";
import { styles } from "./CountdownStyle";
import { format } from "./Format";
import { addNewParking } from "../../redux/reducer/userActions";

const Countdown = (props) => {
  const vehiculo = props.route.params;

  const timer = useSelector((state) => state.userReducer.time);
  const userId = useSelector((state) => state.userReducer.user);
  const patente = useSelector(
    (state) => state.carReducer.allUserCars[0].patente
  );

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState(timer);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [parkingTime, setParkingTime] = useState(0)
  const [isFinished, setIsFinished] = React.useState(false);

  const [addTime, setAddTime] = useState(0);

  const startParking = () => {
    setRunning(!isRunning);
    calculateParkingPrice(time + addTime);
  };

  const endParking = () => {
    setParkingTime(format(timer + addTime - time));
    setRunning(false);
    setIsFinished(true);
   // calculateParkingPrice(timer+addTime)
   console.log("ACA TENEMOS TOOODOOO", userId, patente, price, parkingTime);
   //dispatch(addNewParking(userId, patente, price, parkingTime))
   
  };

  function calculateParkingPrice(time) {
    let priceHalfHour = 50;

    // cuando inicia tiene que cobrar el tiempo de estacionamiento seleccionado.- y se presionamos +30 tiene que agregar $50.

    let splitTime = Math.round(time / 3000);
    setPrice(priceHalfHour * splitTime);
  }

  const setInputValue = (e) => {
    const newTime = e.target.value;
    if (!isRunning) {
      // valido si isRunning esta corriendo(o sea q su valor es true)
      if (!isNaN(newTime)) {
        // valido lo que me ingresaron es un numero
        setValue(newTime); // si pasa las validaciones entonces setea el valor del input y
        setTime(parseInt(newTime)); // setea el tiempo (convirtiendo el value en numero entero)
      }
    }
  };

  useEffect(
    function () {
      let intervalo;
      if (isRunning) {
        intervalo = setInterval(() => {
          setTime((time) => time - 1);
        }, 1);
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
    isFinished && dispatch(addNewParking({userId, patente, price, parkingTime}))
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
              title="Iniciar"
              buttonStyle={styles.buttontimer}
              onPress={() => startParking()}
              disabled={time === 0 ? true : false}
            ></Button>
            <Button
              title="Finalizar"
              buttonStyle={styles.buttontimer}
              onPress={() => {
                endParking();
                
              }}
              disabled={time === 0 ? true : false}
            ></Button>
            <Button
              buttonStyle={styles.buttontimer}
              title="+30 min"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            ></Button>
          </View>
        </Card>

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
                      calculateParkingPrice(time+addTime);

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
      </View>
    </SafeAreaView>
  );
};

export default Countdown;
