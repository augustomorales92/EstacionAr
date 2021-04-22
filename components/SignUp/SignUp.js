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
    password2: ""
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [isOkEmail, setIsOkEmail] = useState(false);

  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [isOkPassword, setIsOkPassword] = useState(false);
  const [isOkPassword2, setIsOkPassword2] = useState(false);

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
            isAdmin: false
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

  const onBlurValidateEmail = (email) => {
    if (validateEmail(email)) {
      setIsOkEmail(true);
      setErrorEmail("");
    } else {
      setErrorEmail("ingresa un email válido");
      setIsOkEmail(false);
    }
  };

  const onBlurValidatePassword = (password) => {
    if (validatePassword(password)) {
      setIsOkPassword(true);
      setErrorPassword("");
    } else {
      setErrorPassword("ingresa una contraseña de mas de 6 caracteres");
      setIsOkPassword(false);
    }
  };

  const onBlurValidatePassword2 = (password) => {
    if (validatePassword(password)) {
      setIsOkPassword2(true);
    } else {
      setErrorPassword2("ingresa una contraseña de mas de 6 caracteres");
    }
  };

  const isOkFunction = () => {
    return (everythingIsOk =
      isOkEmail && isOkPassword && isOkPassword2 && input.password === input.password2);
  };

  return (
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
              onBlur={() => onBlurValidateEmail(input.email)}
              errorStyle={{ fontSize: 15 }}
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
              onBlurValidatePassword(input.password);
            }}
            errorStyle={{ fontSize: 15 }}
            errorMessage={!isOkPassword && errorPassword}
            value={input.password}
          />
          <Input
            label="Repetir contraseña"
            placeholder="*********"
            secureTextEntry={true}
            inputStyle={styles.colorInput}
            onChangeText={(value) => handleChangeText("password2", value)}
            onBlur={(e) => {
              onBlurValidatePassword2(input.password2);
            }}
            errorStyle={{ fontSize: 15 }}
            errorMessage={
              (!isOkPassword2 && errorPassword2) ||
              (input.password != input.password2 && "las contraseñas no coinciden")
            }
            value={input.password2}
          />
          </Card>
          <View>
            <Button
              disabled={!isOkFunction()}
              buttonStyle={styles.colores}
              title="registrarse"
              onPress={() => {
                saveNewUser();
               // return setTimeout(() => props.navigation.popToTop(), 100);
              }}
            ></Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
