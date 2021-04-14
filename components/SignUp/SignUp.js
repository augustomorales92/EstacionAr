import React, { useState } from "react";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Button, Input, Card, Image } from "react-native-elements";
import { validateEmail, validatePassword } from "../../utils/validations";
import { styles } from "./SignUpStyle";
import firebase from "../../back/db/firebase";

const SignUp = (props) => {
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [isOkEmail, setIsOkEmail] = useState(false);
  const [isOkPassword, setIsOkPassword] = useState(false);
  const [isOkPassword2, setIsOkPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  let everythingIsOk = false;

  const saveNewUser = () => {
    const { name, lastname, email, password } = input;
    firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return firebase.db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            id: cred.user.uid,
            name,
            lastname,
            email,
            credit: 0,
            parkingTime: 0,
            parkingHistory: [],
          })
          .then((cred) => {
             Alert.alert("Usuario registrado exitosamente", cred,[{text:'ok',onPress:()=>{props.navigation.popToTop()}}],{cancelable:false});
            

          })
          .then(() => verifyEmail());
      })
      .catch((error) => Alert.alert("Registro incorrecto", error.message));

    const verifyEmail = () => {
      const user = firebase.auth.currentUser;
      user
        .sendEmailVerification()
        .then(() => "Envío de correo exitoso")
        .catch((error) => alert("Error con el envío de confirmación"));
    };
    setInput({
      name: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
    })
  };

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const onBlurValidateEmail = (e) => {
    if (validateEmail(e) !== false) {
      setIsOkEmail(true);
      // dispatch(emailVerification(e))
    } else {
      setErrorEmail("ingresa un email valido");
    }
  };

  const onBlurValidatePassword = (e) => {
    if (validatePassword(e) !== false) {
      setIsOkPassword(true);
      setPassword(e);
    } else {
      setErrorPassword("ingresa una contraseña de mas de 6 caracteres");
    }
  };

  const onBlurValidatePassword2 = (e) => {
    if (validatePassword(e) !== false) {
      setIsOkPassword2(true);
      setrepeatPassword(e);
    } else {
      setErrorPassword2("ingresa una contraseña de mas de 6 caracteres");
    }
  };

  const isOkFunction = () => {
    return (everythingIsOk =
      isOkEmail && isOkPassword && isOkPassword2 && password == repeatPassword);
  };

  return (
    // QUITADO Y CAMBIADO POR KeyboardAwareScrollView
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    //   keyboardVerticalOffset={80}
    // >
    <KeyboardAwareScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.inner}>
          {/* <View style={styles.imagen}>
            <Image
              style={styles.stretch}
              source={{
                uri: "https://i.postimg.cc/mrWQN3x1/logo-final-8.png",
              }}
            />
          </View> */}
          <Card containerStyle={styles.input}>
            <Input
              label="Nombre"
              name="name"
              placeholder="juan"
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("name", value)}
            />
            <Input
              label="Apellido"
              name="lastname"
              placeholder="rodriguez"
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("lastname", value)}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="juanrodriguez@adress.com"
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("email", value)}
              onBlur={(e) => {
                onBlurValidateEmail(e.nativeEvent.text);
              }}
              errorMessage={!isOkEmail && errorEmail}
            />
            <Input
              label="Contraseña"
              name="password"
              secureTextEntry={true}
              placeholder="*********"
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("password", value)}
              onBlur={(e) => {
                onBlurValidatePassword(e.nativeEvent.text);
              }}
              errorMessage={!isOkPassword && errorPassword}
            />
            <Input
              label="Repetir contraseña"
              placeholder="*********"
              secureTextEntry={true}
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("password2", value)}
              onBlur={(e) => {
                onBlurValidatePassword2(e.nativeEvent.text);
              }}
              errorMessage={
                (!isOkPassword2 && errorPassword2) ||
                (password != repeatPassword && "las contraseñas no coinciden")
              }
            />
          </Card>
          <View>
            <Button
              disabled={!isOkFunction()}
              buttonStyle={styles.colores}
              title="registrarse"
              onPress={() => {
                saveNewUser();
                return setTimeout(() => props.navigation.popToTop(), 100);
              }}
            ></Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
