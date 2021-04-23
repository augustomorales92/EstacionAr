import React, { useState, useEffect } from "react";
import { View, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./EditCarStyle";

//IMPORTAMOS LA FUNCION PARA AGREGAR UN AUTO Y TRAER A TODOS LOS AUTOS DEL reducer
import { updateCar, getAllCars } from "../../redux/reducer/carActions";

const addcar = (props) => {
  const dispatch = useDispatch();
  let userInTheApp = useSelector((state) => state.userReducer);
  const vehiculo = props.route.params;
  const [car, setCar] = useState({
    owner: userInTheApp.user,
    marca: vehiculo.marcaId,
    modelo: vehiculo.modeloId,
    año: vehiculo.añoId,
    patente: vehiculo.patenteId,
  });

  const handleChangeText = (name, value) => {
    setCar({ ...car, [name]: value});
  };

  const setUserCar = () => {
    const { owner, marca, modelo, año, patente } = car;
    dispatch(updateCar({ ...car, owner, marca, modelo, año, patente })).then(
      () => {
        getAllCars(dispatch, userInTheApp.user);
        props.navigation.navigate("autos");
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input} key={car.patente}>
        <Card.Title style={styles.titulo}>{`PATENTE`}</Card.Title>
        <Card.Title
          style={styles.titulo}
        >{` ${car.patente}`}</Card.Title>
        <Card.Divider />
        <View>
          <Input
            label="Marca"
            value={car.marca}
            placeholder="Chevrolet"
            inputStyle={styles.colorInput}
            onChangeText={(value) => handleChangeText("marca", value)}
          />
          <Input
            label="Modelo"
            value={car.modelo}
            placeholder="Corsa"
            inputStyle={styles.colorInput}
            onChangeText={(value) => handleChangeText("modelo", value)}
          />
          <Input
            label="Año"
            value={car.año}
            placeholder="2021"
            inputStyle={styles.colorInput}
            onChangeText={(value) => handleChangeText("año", value)}
          />
        </View>
      </Card>
      <View style={styles.fixToText}>
        <Button
          title="Editar Vehículo"
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
