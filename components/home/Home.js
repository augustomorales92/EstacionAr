import React, { useEffect, useState } from "react";
import { styles } from "./HomeStyle";
import { View, SafeAreaView, Modal, Pressable, ScrollView } from "react-native";
import { Button, Card, Text, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredit, getUserInfo } from "../../redux/reducer/userActions";
import firebase from "../../back/db/firebase";

// import MapView , { Marker,PROVIDER_GOOGLE,Polyline,Polygon,Callout }from 'react-native-maps';
import { selectedCar } from "../../redux/reducer/carActions";

const coord = [
  {
    latitude: -26.820214,
    longitude: -65.194147,
  },
  {
    latitude: -26.816051,
    longitude: -65.215484,
  },
  {
    latitude: -26.840433,
    longitude: -65.221531,
  },
  {
    latitude: -26.844661,
    longitude: -65.20025,
  },
  {
    latitude: -26.820214,
    longitude: -65.194147,
  },
];
const coord1 = [
  {
    latitude: -26.82233,
    longitude: -65.198042,
  },
  {
    latitude: -26.822056,
    longitude: -65.199482,
  },
  {
    latitude: -26.823411,
    longitude: -65.199813,
  },
  {
    latitude: -26.82367,
    longitude: -65.198375,
  },
  {
    latitude: -26.82233,
    longitude: -65.198042,
  },
];

const Home = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfoNow, setUserInfoNow] = useState("");
  const [input, setInput] = useState({
    credit: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { selectCar, allUserCars } = useSelector((state) => state.carReducer);

  const navigation = useNavigation();

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const chargeCredit = () => {
    const { credit } = input;
    dispatch(setUserCredit({ user, credit }));
  };

  const getUserInfoNow = (userId) => {
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .onSnapshot((querySnap) => {
        return setUserInfoNow(querySnap.data());
      });
  };


  useEffect(() => {
    !modalVisible && getUserInfoNow(user);
  }, []);



  useEffect(() => {
    !allUserCars.length && dispatch(selectedCar({}));
  }, [allUserCars]);

  return (
    <ScrollView style={{ backgroundColor: "black", height: "100%" }}>
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
            <Text h4>{`$${userInfoNow && userInfoNow.credit}`}</Text>
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
              {!selectCar.modeloId ? (
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
                    <Text h3>{selectCar.modeloId} </Text>
                    <Card.Divider style={{ color: "black" }} />
                    <Text h4>{selectCar.patenteId}</Text>
                    <Text h4>{selectCar.marcaId}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      title={userInfoNow.credit <= 0 ? "CARGUE SALDO" : "ESTACIONAR"}
                      buttonStyle={styles.button}
                      onPress={() => navigation.navigate("estacionar")}
                      disabled={userInfoNow.credit <= 0 && true}
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
          {/* <MapView
      initialRegion={{
        latitude: -26.8248387,
        longitude: -65.2050432,
        longitudeDelta: 0.09,
        latitudeDelta: 0.05,
      }}  
      minZoomLevel={10}
      style={styles.map} > 
      <Polygon
      coordinates={coord1}
      fillColor="rgba(0, 200, 0, 0.5)"
      strokeColor="rgba(0,0,0,0.5)"
      strokeWidth={2}
      
      >

      </Polygon>
      <Polyline
      coordinates={coord}
      strokeColor='red'
      geodesic={true}
      strokeWidth={3}
      >
       
      </Polyline>
       <Marker
      coordinate={{ latitude: -26.822815,
        longitude: -65.198970}}
        title='182'
        provider={PROVIDER_GOOGLE}
        anchor={{x: 1, y: 2}}
      ></Marker> 
      </MapView> */}
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
                placeholder="$"
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
    </ScrollView>
  );
};

export default Home;
