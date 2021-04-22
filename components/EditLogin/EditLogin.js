import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Input, Card, Image, Text } from "react-native-elements";
import { validatePassword } from "../../utils/validations";
import { getUserInfo } from "../../redux/reducer/userActions";
import firebase from "../../back/db/firebase";

import { styles } from "./EditLoginStyle";
import { clockRunning } from "react-native-reanimated";

const EditLogin = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user);
  const userInfo = useSelector((state) => state.userReducer.info);
  const user = firebase.firebase.auth().currentUser;

  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [isOkPassword, setIsOkPassword] = useState(false);
  const [isOkPassword2, setIsOkPassword2] = useState(false);

  let everythingIsOk = false;

  useEffect(() => {
    dispatch(getUserInfo(userId));
  }, []);

  const [input, setInput] = useState({
    password: "",
    password2: "",
  });

  const editUser = () => {
    const { password } = input;
    user
      .updatePassword(password)
      .then(() => {
        console.log("Updateo de password correcto");
        // setTimeout(() =>props.navigation.goBack();
        // , 2000);
      })
      .catch((err) => console.log("Error en updateo de password", err));
    setInput({
      password: "",
      password2: "",
    });
  };

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
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
      isOkPassword && isOkPassword2 && input.password == input.password2);
  };

  return (
    <SafeAreaView style={styles.container}>
        <Card containerStyle={styles.input}>
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
        <View style={styles.fixToText}>
          <Button
            disabled={!isOkFunction()}
            buttonStyle={styles.colores}
            title="Guardar cambios"
            onPress={() => {
              editUser();
              props.navigation.goBack();
            }}
          ></Button>
        </View>
        {/* <View style={styles.fixToText}>
        <Button
          buttonStyle={styles.colores}
          title="Go back"
          onPress={() => {
            props.navigation.goBack();
          }}
        ></Button>
      </View> */}
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

export default EditLogin;
