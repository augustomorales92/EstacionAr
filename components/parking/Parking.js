//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//Native
import {
  View,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "./ParkingStyle";
import { Camera } from "expo-camera";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

//COMPONENTS
import Clock from "../timer/ClockTimer";
import { useNavigation } from "@react-navigation/native";

//importamos la funcion para guardar el TIME del Users
import { setUserTime, getUserTime } from "../../redux/reducer/userActions";
import { setUserZone } from "../../redux/reducer/userActions";

const Parking = (props) => {
  const vehiculo = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userReducer);
  let { time } = useSelector((state) => state.userReducer);
  const [scanned, setScanned] = React.useState(false);
  const [zone, setZone] = React.useState(0);
  const [isOkZone, setIsOkZone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [input, setInput] = React.useState({
    zone: '',
  });

  const handleBarCodeScanned = async (/* {type, data} */) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setScanned(true);
      //Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`)
      /* setDato({data}) */
    } else {
      Alert.alert("Access denied");
    }
  };
  const scanner = ({ type, data }) => {
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setScanned(false);
  };

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const onBlurValidateZone = (e) => {
    if (e) {
      setIsOkZone(true);
    } else {
      setIsOkZone(false);
      setErrorMessage("Debe ingresar un código de manzana");
    }
  };

  const saveZone = (zone) => {
    console.log(zone, user)
    dispatch(setUserZone(zone))
  }

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
      {!scanned ? (
        <>
          <Card containerStyle={styles.input}>
            <Input
              type="number"
              label="Ingresar código de zona"
              placeholder="182"
              value={input.zone}
              inputStyle={styles.colorInput}
              keyboardType="numeric"
              onChangeText={(value) => handleChangeText("zone", value)}
              onBlur={(e) => onBlurValidateZone(e.nativeEvent.text)}
              errorMessage={!isOkZone && errorMessage}
            />
          </Card>
          <View style={{ justifyContent: "space-around" }}>
            <Card containerStyle={styles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.colores}>Escanear QR</Text>
                <Button
                  buttonStyle={styles.button}
                  onPress={() => setScanned(true)}
                  icon={<Icon name="camera" size={60} color="white" />}
                ></Button>
              </View>
            </Card>
          </View>
          <View style={styles.fixToText}>
            <Text style={styles.colores2}>Tiempo de estacionamiento</Text>
          </View>

          <Card containerStyle={styles.input}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.clock}>
                <Clock time={time} />
              </Text>

              <Button
                buttonStyle={styles.button}
                onPress={() => {
                  addTime(1800);
                }}
                icon={<Icon name="clock" size={60} color="white" />}
              ></Button>
            </View>
          </Card>

          <Card containerStyle={styles.input}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.colores}> Libre</Text>

              <Button
                buttonStyle={styles.button}
                onPress={() => {
                  addTime(0);
                }}
                icon={<Icon name="stopwatch" size={60} color="white" />}
              ></Button>
            </View>
          </Card>

          {/* <Card containerStyle={styles.input2}>
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
      </Card> */}

          <View style={styles.lastButton}>
            <Button
              buttonStyle={styles.buttons}
              disabled={!isOkZone}
              title="ir a estacionar"
              onPress={() => {
                if (vehiculo) {
                  saveZone(input.zone)
                  time > 0
                    ? navigation.navigate("Countdown", time)
                    : navigation.navigate("Timer");
                } else {
                  Alert.alert(
                    "No tiene un vehiculo",
                    "Seleccione un vehiculo",
                    [
                      {
                        text: "ok",
                        onPress: () => {
                          navigation.navigate("autos");
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }
              }}
            ></Button>
          </View>
        </>
      ) : (
        <View style={{ flex: 1, width: "100%", backgroundColor: "black" }}>
          <BarCodeScanner
            style={{
              flex: 1,
              height: "50%",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "40%",
              marginBottom: "40%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
            onBarCodeScanned={scanned ? scanner : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          ></BarCodeScanner>
          {scanned && (
            <Button
              title={"Salir"}
              type="outline"
              buttonStyle={{ backgroundColor: "white" }}
              titleStyle={{ color: "black", fontWeight: "bold" }}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Parking;
