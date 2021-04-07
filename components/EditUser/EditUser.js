import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Input, Card, Image, Text } from "react-native-elements";
import { validatePassword } from "../../utils/validations";
import { getUserInfo } from "../../redux/reducer/userReducer";
import firebase from "../../back/db/firebase";
import {validateEmail} from '../../utils/validations'

import { styles } from "./EditUserStyle";

const EditUser = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user);
  const userInfo = useSelector((state) => state.userReducer.info);

  useEffect(() => {
    dispatch(getUserInfo(userId));
  }, []);

  const [input, setInput] = useState({
    name: "",
    lastname: "",
  });

  const editUser = () => {
    const {name, lastname, email} = input
    if (name === '' || lastname === '') return props.navigation.navigate("home")
    firebase.db
      .collection("users")
      .doc(userId)
      .update({ name, lastname })
      .then(() => console.log("Edit user successful"))
      .catch(() => console.log("Error en user edit"));
    setTimeout(() => props.navigation.navigate("home"), 100);
  };

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <Input
          label="Nombre"
          name="name"
          placeholder={userInfo ? userInfo.name : ""}
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("name", value)}
        />
        <Input
          label="Apellido"
          name="lastname"
          placeholder={userInfo ? userInfo.lastname : ""}
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("lastname", value)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={userInfo ? userInfo.email : ""}
          disabled={true}
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </Card>
      <View style={styles.fixToText}>
        <Button
          buttonStyle={styles.colores}
          title="Actualizar cambios"
          onPress={() => {
            if (window.confirm('Está seguro que desea realizar estos cambios?')) editUser();
          }}
        ></Button>
      </View>
      <View style={styles.signin}>
        <Button
          type="clear"
          title="¿Desea modificar su contraseña?"
          titleStyle={styles.clearButton}
          onPress={() => {
            props.navigation.navigate("datos login");
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

export default EditUser;
