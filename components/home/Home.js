import React, { useEffect, useState } from "react";
import { styles } from "./HomeStyle";
import { View, SafeAreaView, Modal, Pressable, ScrollView } from "react-native";
import { Button, Card, Text, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { setUserCredit, getUserInfo } from "../../redux/reducer/userActions";
import firebase from "../../back/db/firebase";
import {coord, coord1} from './coordenadas'
import MapView , { Marker,PROVIDER_GOOGLE,Polyline,Polygon,Circle }from 'react-native-maps';
import { selectedCar } from "../../redux/reducer/carActions";



const Home = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfoNow, setUserInfoNow] = useState("");
  const [input, setInput] = useState({
    credit: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { selectCar, allUserCars } = useSelector((state) => state.carReducer);
  const [location, setLocation] = useState({});
  const navigation = useNavigation();

  
  
const _getLocation = async ()=>{
  const {status} = Permissions.askAsync(Permissions.LOCATION);
  if(status !== 'granted');{
      console.log('permiso no garantizado');
      
  }
  const userLocation = await Location.getCurrentPositionAsync({});
  setLocation(userLocation)
}

 
  
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
    _getLocation()
  }, []);



  useEffect(() => {
    !allUserCars.length && dispatch(selectedCar({}));
  }, [allUserCars]);

  return (
    <ScrollView style={{ backgroundColor: "black", height: "100%" }}>
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
      {/* <Text style={{color:'white'}}>{JSON.stringify(location)}</Text> */}
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
          {location.coords &&
          <MapView
      initialRegion={{
        latitude:location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.09,
        latitudeDelta: 0.05,
      }}  
      minZoomLevel={13}
      showsUserLocation = { true }
      followUserLocation = { true }
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
       
      </MapView>}
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
