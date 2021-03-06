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
  let {user} = useSelector((state) => state.userReducer);

  const [car, setCar] = useState({
    marca: "",
    modelo: "",
    año: "",
    patente: "",
  });

  const handleChangeText = (name, value) => {
    if (name === 'patente') setCar({ ...car, [name]: value.toUpperCase() })
    else setCar({ ...car, [name]: value});
  };

  const setUserCar = () => {
    const { marca, modelo, año, patente } = car;
    dispatch(addNewCar({ user, marca, modelo, año, patente })).then(() => {
      getAllCars(dispatch,user);
      setTimeout(() => {
        setCar({
          marca: "",
          modelo: "",
          año: "",
          patente: "",
        });
        return props.navigation.navigate("autos");
      }, 500);
    });
  };

  return (
  
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <Input
          label="Marca"
          placeholder="Chevrolet"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("marca", value)}
          value={car.marca}
        />
        <Input
          label="Modelo"
          placeholder="Corsa"
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
          title="Agregar vehículo"
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
