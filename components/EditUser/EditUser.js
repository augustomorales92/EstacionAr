import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Button, Input, Card, Image, Text } from "react-native-elements";
import firebase from "../../back/db/firebase";
import { styles } from "./EditUserStyle";

const EditUser = (props) => {
  const [userInfoNow, setUserInfoNow] = useState("");
  const { user } = useSelector((state) => state.userReducer);

  const [input, setInput] = useState({
    name: "",
    lastname: "",
  });

  const getUserInfoNow = (userId) => {
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .onSnapshot((querySnap) => {
        return setUserInfoNow(querySnap.data());
      });
  };

  const editUser = (userId) => {
    const { name, lastname, email } = input;
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .update({ name, lastname })
      .then(() => console.log("Edit user successful"))
      .catch(() => console.log("Error en user edit"));
    props.navigation.navigate("drawer");
    setInput({
      name: "",
      lastname: "",
    });
  };

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    getUserInfoNow(user);
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Card containerStyle={styles.input}>
          <Input
            label="Nombre"
            name="name"
            placeholder={userInfoNow.name}
            inputStyle={styles.colorInput}
            onChangeText={(value) => handleChangeText("name", value)}
            value={input.name}
          />
          <Input
            label="Apellido"
            name="lastname"
            placeholder={userInfoNow.lastname}
            inputStyle={styles.colorInput}
            onChangeText={(value) => handleChangeText("lastname", value)}
            value={input.lastname}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={userInfoNow.email}
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
              editUser(user);
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
    </KeyboardAwareScrollView>
  );
};

export default EditUser;
