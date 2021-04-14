import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Modal, Pressable } from "react-native";
import { Button, Card, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./UsersCarsStyle";
import { useSelector, useDispatch } from "react-redux";
import { deleteOneCar, getAllCars} from "../../redux/reducer/carActions";
import firebase from "../../back/db/firebase";

const Userscars = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [patenteRef, setPatenteRef] = useState("");
  const [userCarsNow, setUserCarsNow] = useState([]);

  const getUserCarsNow = (userId) => {
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .collection("CARS")
      .onSnapshot((querySnap) => {
        let autos = []
        querySnap.forEach((doc) => {
          autos.push(doc.data());
        });
        return setUserCarsNow(autos)
      });
  };

  useEffect(() => {
    getUserCarsNow(user);
    getAllCars(dispatch, user);
  }, []);

  const deleteCars = () => {
    return deleteOneCar(user, patenteRef, dispatch);
  };
  return (
    <ScrollView style={styles.container}>
      {userCarsNow?.map((car) => (
        <Card containerStyle={styles.input} key={car.patente}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Icon
              name="times-circle"
              color="white"
              size={20}
              onPress={() => {
                setPatenteRef(car.patente);
                setModalVisible(!modalVisible);
              }}
            />
          </View>
          <Card.Title style={styles.titulo}>{car.modelo}</Card.Title>
          <Card.Divider />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.texto}>
              {car.patente} {"\n"} {car.marca}
            </Text>
            <View>
              <CheckBox
                title="Seleccionar"
                checkedColor="white"
                checked={true}
                onPress={()=> {
                  dispatch(selectedCar({
                    patenteId : car.patente,
                    marcaId: car.marca,
                    modeloId:car.modelo}))
                        
                  props.navigation.navigate('drawer') 
                  
                }}
                containerStyle={styles.cardButton}
                textStyle={styles.colorText}
              />

              <CheckBox
                title="Editar"
                uncheckedIcon="edit"
                uncheckedColor="white"
                containerStyle={styles.cardButton}
                textStyle={styles.colorText}
                onPress={() => {
                  props.navigation.navigate("editarAutos", {
                    patenteId: car.patente,
                    marcaId: car.marca,
                    modeloId: car.modelo,
                    añoId: car.año,
                  });
                }}
              />
            </View>
          </View>
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
                  Desea eliminar su vehiculo?
                </Text>

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
                        deleteCars();
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Eliminar</Text>
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
        </Card>
      ))}

      <View style={styles.fixToText}>
        {!userCarsNow.length > 0 && (
          <Button
            title="Agregar Vehiculo"
            buttonStyle={styles.button1}
            icon={<Icon name="car" color="white" style={{ marginRight: 10 }} />}
            onPress={() => {
              /* Alert.alert("Auto estacionado")  */
              return setTimeout(
                () => props.navigation.navigate("agregar un auto"),
                1000
              );
            }}
          ></Button>
        )}
      </View>
    </ScrollView>
  );
};

export default Userscars;
