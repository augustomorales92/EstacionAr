import React, { useEffect, useState } from "react";
import { styles } from "./HomeStyle";
import { View, SafeAreaView, Modal, Pressable } from "react-native";
import { Button, Card, Text, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {setUserCredit, getUserInfo} from "../../redux/reducer/userActions"
//import { MercadoPagoCheckout } from 'react-native-mercadopago-checkout';

//import MapView , { Marker }from 'react-native-maps';

import MapView , { Marker }from 'react-native-maps';

const Home = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState({
    credit: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const info = useSelector((state) => state.userReducer.info);
  const navigation = useNavigation();

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const chargeCredit = () => {
    const { credit } = input;
    dispatch(setUserCredit({ user, credit }));
  };

  useEffect(() => {
    !modalVisible && dispatch(getUserInfo(user));
  }, []);


  const vehiculo = props.route.params;
  return (
    <SafeAreaView style={{ backgroundColor: "black", height: "100%" }}>
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <Card containerStyle={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
            }}
          >
            <Text h4>Saldo disponible:</Text>
            <Text h4>{info && info.credit}</Text>
          </View>
          <View style={{ marginHorizontal: 17, marginBottom: 7 }}>
            <Button
              block
              title="CARGAR SALDO"
              buttonStyle={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            ></Button>
          </View>
        </Card>
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <Card containerStyle={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <>
              {vehiculo == undefined ? (
                <>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text h4>Seleccione un vehiculo </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Button
                      title="VEHICULOS"
                      buttonStyle={styles.button}
                      onPress={() => props.navigation.navigate("autos")}
                    ></Button>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text h3>{vehiculo.modeloId} </Text>
                    <Card.Divider style={{ color: "black" }} />
                    <Text h4>{vehiculo.patenteId}</Text>
                    <Text h4>{vehiculo.marcaId}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      title="ESTACIONAR"
                      buttonStyle={styles.button}
                      onPress={() =>
                        props.navigation.navigate("estacionar", vehiculo)
                      }
                    ></Button>
                    <Button
                      title="CAMBIAR VEHICULO"
                      buttonStyle={styles.button}
                      onPress={() => props.navigation.navigate("autos")}
                    ></Button>
                  </View>
                </>
              )}
            </>
          </View>
        </Card>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <Card containerStyle={styles.card}>
          <MapView
      initialRegion={{
        latitude: -26.8248387,
        longitude: -65.2050432,
        longitudeDelta: 0.09,
        latitudeDelta: 0.05,
      }}  
      minZoomLevel={15}
      style={styles.map} /> 
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
              <Text style={styles.modalText}>
                Ingresa el monto que desea cargar
              </Text>
              <Input
                //label="Email"
                placeholder="$"
                //errorMessage={message}
                inputStyle={styles.colorInput}
                onChangeText={(value) => handleChangeText("credit", value)}
              />
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
                      chargeCredit();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Cargar saldo</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Home;
