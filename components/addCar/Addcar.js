import React, { useState } from "react";
import { View, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";

import { styles } from "./addCarStyle";

//IMPORTAMOS FIREBASE
import firebase from "../../back/db/firebase";

const addcar = (props) => {
  const [car, setCar] = useState({
    marca: "",
    modelo: "",
    año: 0,
    patente: "",
  });
  const [user, setUser] = useState({});

  const usersRef = firebase.db.collection("users");

  firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser) {
      setUser(loggedUser);
    }
  });

  const handleChangeText = (name, value) => {
    console.log(car);
    setCar({ ...car, [name]: value });
  };

  const setUserCar = () => {
    const { marca, modelo, año, patente } = car;
    usersRef
      .doc(user.uid)
      .update({
        cars: firebase.firebase.firestore.FieldValue.arrayUnion({
          marca,
          modelo,
          año,
          patente,
        }),
      })
      .then(() => {
        Alert.alert("Auto agregado correctamente");
        return props.navigation.navigate("autos");
      })
      .catch((error) => alert("AUTO NO AGREGADO", error.message));
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
