import React, { useState,useEffect } from "react";
import { View, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./EditCarStyle";

//IMPORTAMOS LA FUNCION PARA AGREGAR UN AUTO Y TRAER A TODOS LOS AUTOS DEL reducer
import { updateCar, getAllCars } from "../../redux/reducer/carReducer";


const addcar = (props) => {
  const dispatch = useDispatch();
  let userInTheApp = useSelector((state) => state.userReducer);
  const vehiculo= props.route.params
  const [car, setCar] = useState({
    owner: userInTheApp.user,
    marca: vehiculo.marcaId,
    modelo: vehiculo.modeloId,
    año: vehiculo.añoId,
    patente: vehiculo.patenteId
  });


  

  const handleChangeText = (name, value) => {
    setCar({ ...car, [name]: value });
  };

  const setUserCar = () => {
    const { owner, marca, modelo, año, patente } = car;
    dispatch(updateCar({...car, owner, marca, modelo, año, patente }))
    .then(() =>{
      getAllCars(dispatch,userInTheApp.user)
      setTimeout(() => props.navigation.navigate("autos"), 2000)
     });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input} key={car.patente}>

  <View>

      <Input
          label="Patente"
          value={car.patente}
          disabled
          placeholder="AB 123 CD"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("patente", value)}
          />
        <Input
          label="Marca"
          value={car.marca}
          placeholder="chevrolet"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("marca", value)}
          />
        <Input
          label="Modelo"
          value={car.modelo}
          placeholder="corsa"
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
          title="Volver"
          buttonStyle={styles.colores}
          onPress={() => {
            props.navigation.goBack()
          }}
        ></Button>
        <Button
          title="Editar Vehiculo"
          buttonStyle={styles.colores}
          onPress={() => {
            
            setUserCar()
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
