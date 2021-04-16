import React, { useState } from "react";
import {
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./addCarStyle";

//IMPORTAMOS LA FUNCION PARA AGREGAR UN AUTO Y TRAER A TODOS LOS AUTOS DEL reducer
import { addNewCar, getAllCars, selectedCar } from "../../redux/reducer/carActions";

const addcar = (props) => {
  const dispatch = useDispatch();
  let userInTheApp = useSelector((state) => state.userReducer);

  const [car, setCar] = useState({
    owner: userInTheApp.user,
    marca: "",
    modelo: "",
    año: 0,
    patente: "",
  });

  const handleChangeText = (name, value) => {
    setCar({ ...car, [name]: value });
  };

  const setUserCar = () => {
    const { owner, marca, modelo, año, patente } = car;
    dispatch(addNewCar({ owner, marca, modelo, año, patente })).then(() => {
      getAllCars(dispatch, userInTheApp.user);
      setTimeout(() => {
        setCar({
          marca: "",
          modelo: "",
          año: 0,
          patente: "",
        });
        return props.navigation.navigate("autos");
      }, 500);
    });
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <Input
          label="Marca"
          placeholder="chevrolet"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("marca", value)}
          value={car.marca}
        />
        <Input
          label="Modelo"
          placeholder="corsa"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("modelo", value)}
          value={car.modelo}
        />
        <Input
          label="Año"
          placeholder="2021"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("año", value)}
          value={car.año}
        />
        <Input
          label="Patente"
          placeholder="AB 123 CD"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("patente", value)}
          value={car.patente}
        />
      </Card>
      <View style={styles.fixToText}>
        <Button
          title="Agregar vehiculo"
          buttonStyle={styles.colores}
          onPress={() => {
            setUserCar();
          }}
        ></Button>
      </View>
      <View style={styles.imagen}>
        <Image
          style={styles.stretch}
          source={{
            uri: "https://i.postimg.cc/mrWQN3x1/logo-final-8.png",
          }}
        />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};
export default addcar;
