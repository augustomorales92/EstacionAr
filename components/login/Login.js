import React, { useState, createRef } from "react";
import {
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Text,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";
import { styles } from "./LoginStyle";
import { useNavigation } from "@react-navigation/native";
import { validateEmail, validatePassword } from "../../utils/validations";
import Icon from "react-native-vector-icons/FontAwesome5";
//importamos dispatch
import { useDispatch } from "react-redux";
//importamos la funcion para guardar el newUser
import { logUser } from "../../redux/reducer/userActions";
//importamos firebase
import firebase from "../../back/db/firebase";

const Login = () => {
  const pass = createRef();
  const mails = createRef();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [mistake, setMistake] = useState(false);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [resetPassword, setResetPassword] = useState({ recoveryEmail: "" });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isOkEmail, setIsOkEmail] = useState(false);
  const [isOkPassword, setIsOkPassword] = useState(false);
  let isOk = false;

  const loginUser = () => {
    const { email, password } = input;
    dispatch(logUser({ email, password }))
      .then((error) => {
        if (error) {
          setMessage(error.error.message.split(":")[1]);
          setMistake(!mistake);
        } else {
          navigation.navigate("drawer");
        }
      })
      .catch((error) => console.log("catch ----->", error));
  };

  const onBlurValidateEmail = (e) => {
    if (validateEmail(e) !== false) {
      setIsOkEmail(true);
      setErrorEmail("");
    } else {
      setErrorEmail("ingresa un email valido");
      setIsOkEmail(false);
    }
  };

  const onBlurValidatePassword = (e) => {
    if (validatePassword(e) !== false) {
      setIsOkPassword(true);
      setErrorPassword("");
    } else {
      setErrorPassword("ingresa una contraseña de mas de 6 caracteres");
      setIsOkPassword(false);
    }
  };

  const isOkFunction = () => {
    if (isOkEmail && isOkPassword) {
      return (isOk = !isOk);
    }
  };

  const handleChangeText = (name, value) => {
    setInput({ ...input, [name]: value });
    setResetPassword({ ...resetPassword, [name]: value });
    setMistake(false);
    setMessage("");
  };

  const emailRecovery = () => {
    const recoveryEmail = resetPassword.recoveryEmail;
    firebase.auth
      .sendPasswordResetEmail(recoveryEmail)
      .then(() => {
        setResetPassword({ recoveryEmail: "" });
        return setModalVisible(!modalVisible);
      })
      .catch(function (error) {
        return setMessage("no es un correo");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <SafeAreaView style={styles.container}>
          <View style={styles.imagen}>
            <Image
              style={styles.stretch}
              source={{ uri: "https://i.postimg.cc/mrWQN3x1/logo-final-8.png" }}
              PlaceholderContent={<ActivityIndicator />}
              />
          </View>

          <Card containerStyle={styles.input}>
            <Input
              ref={mails}
              label="Email"
              placeholder="email@adress.com"
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("email", value)}
              onBlur={(e) => {
                onBlurValidateEmail(e.nativeEvent.text);
              }}
              errorMessage={!isOkEmail && errorEmail}
            />
            <Input
              ref={pass}
              label="Contraseña"
              placeholder="password"
              secureTextEntry={true}
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("password", value)}
              errorStyle={{ fontSize: 15 }}
              onBlur={(e) => {
                onBlurValidatePassword(e.nativeEvent.text);
              }}
              errorMessage={
                (!isOkPassword && errorPassword) || (mistake && message)
              }
              />
          </Card>
          {/*--------------------------MODAl--------------------*/}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Ingresa tu Email</Text>
                  <Input
                    label="Email"
                    placeholder="EstacionAr@estacionar.com"
                    errorMessage={message}
                    inputStyle={styles.colorInput}
                    onChangeText={(value) =>
                      handleChangeText("recoveryEmail", value)
                    }
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => emailRecovery()}
                      >
                        <Text style={styles.textStyle}>
                          Resetear Contraseña
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.button,
                          styles.buttonClose,
                          { marginTop: 10 },
                        ]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Volver</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          {/*--------------------------MODAl--------------------*/}

          <View style={styles.fixToText}>
            <Button
              title="¿Olvidaste tu contraseña?"
              type="clear"
              titleStyle={styles.clearButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                /*  Alert.alert("forgot password button pressed") */
              }}
            ></Button>

            <Button
              disabled={!isOkFunction()}
              buttonStyle={styles.colores}
              title="Iniciar sesion"
              onPress={() => {
                loginUser();
              }}
            ></Button>
          </View>
          <View style={styles.signin}>
            <Button
              type="clear"
              title="¿No tenes cuenta? Registrate!"
              titleStyle={styles.clearButton}
              onPress={() => navigation.navigate("Registrate")}
            ></Button>
          </View>
          <View
            style={{ marginTop: 10, marginLeft: "15%", marginRight: "15%" }}
          >
            <Button
              buttonStyle={{ marginBottom: 10, backgroundColor: "#3b5998" }}
              title="Continuar con Facebook"
              icon={
                <Icon
                  name="facebook"
                  size={30}
                  color="white"
                  style={{ marginRight: "5%" }}
                />
              }
              onPress={() => {
                setModalVisible(!modalVisible);
                /*  Alert.alert("forgot password button pressed") */
              }}
            ></Button>

            <Button
              icon={
                <Icon
                  name="google"
                  size={30}
                  color="black"
                  style={{ marginRight: "5%" }}
                />
              }
              buttonStyle={{ backgroundColor: "white" }}
              titleStyle={styles.clearButton}
              title="Continuar con Google"
              onPress={() => {
                loginUser();
              }}
            ></Button>
          </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;
