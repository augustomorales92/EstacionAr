import React, { useState } from "react";
import { View, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./addCarStyle";

//IMPORTAMOS LA FUNCION PARA AGREGAR UN AUTO Y TRAER A TODOS LOS AUTOS DEL reducer
import { addNewCar, getAllCars } from "../../redux/reducer/carReducer";


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
      setTimeout(() => props.navigation.navigate("autos"), 2000);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <Input
          label="Marca"
          placeholder="chevrolet"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("marca", value)}
        />
        <Input
          label="Modelo"
          placeholder="corsa"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("modelo", value)}
        />
        <Input
          label="Año"
          placeholder="2021"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("año", value)}
        />
        <Input
          label="Patente"
          placeholder="AB 123 CD"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("patente", value)}
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
  );
};
export default addcar;
