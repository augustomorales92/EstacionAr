import React, { useState, createRef } from "react";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import {
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Text,
  Pressable,
} from "react-native";
import { Button, Input, Card, Image } from "react-native-elements";
import { styles } from "./LoginStyle";
import { useNavigation } from "@react-navigation/native";
import { validateEmail, validatePassword } from "../../utils/validations";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SocialIcon } from "react-native-elements";

//importamos dispatch
import { useDispatch } from "react-redux";
//importamos la funcion para guardar el newUser
import { logUser } from "../../redux/reducer/userActions";
//importamos firebase
import firebase from "../../back/db/firebase";
import Firebase from "firebase";

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
 
  const iosClient = "493615545753-sekkfffcer2bra7f8mvddstbls2vhukf.apps.googleusercontent.com"
  const androidClient = '493615545753-c10rjmiqcfmn9r494gslponltbn68tse.apps.googleusercontent.com'
  const fbAppId = '281154416752453'
 
  const loginUser = () => {
    const { email, password } = input;
    dispatch(logUser({ email, password }))
      .then((error) => {
        if (error) {
          setMessage(error.error.message.split(":")[1]);
          setMistake(!mistake);
          Alert.alert('Email o contrase??a incorrectos. Vuelva a intentarlo')
        } else {
          navigation.navigate("drawer");
        }
      })
      .catch((error) => console.log("catch ----->", error));
      setInput({
        email: "",
        password: "",
      })
  };

  const loginGoogle = async () => {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({
        //return an object with result token and user
        iosClientId: iosClient,
        androidClientId: androidClient,
      });
      if (result.type === "success") {
        const credential = Firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );


       //me logueo con esos datos
       firebase.auth
       .signInWithCredential(credential)
        .then((res)=>{
        
          firebase.db
          .collection('users')
          .doc(`${res.user.uid}`)
          .get()
          .then((document)=>{if(!document.exists){
            return  firebase.db
          .collection("users")
          .doc(`${res.user.uid}`)
          .set({
             name:res.additionalUserInfo.profile.given_name,
             lastName:res.additionalUserInfo.profile.family_name,
             email:res.additionalUserInfo.profile.email,
             credit:0,
             id:res.user.uid,
             parkingHistory:[]

          })
          .then(() => {
            console.log("---USER UPDATE----");
            
          })
            }})
          
         
        })
       .catch((error) => {
         console.log(error);
       }); 


     
       
      } else {
        //CANCEL
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  // const loginFacebook = async () => {
  //   Facebook.initializeAsync({ appId: fbAppId });
  //   const {
  //     type,
  //     token,
  //     expirationDate,
  //     permissions,
  //     declinedPermissions,
  //   } = await Facebook.logInWithReadPermissionsAsync({
  //     permission: ["public_profile"],
  //   });
  //   if (type == "success") {
  //     const credential = Firebase.auth.FacebookAuthProvider.credential(token);

  //     firebase.auth.signInWithCredential(credential).catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // };

  const onBlurValidateEmail = (email) => {
    if (validateEmail(email)) {
      setIsOkEmail(true);
      setErrorEmail("");
    } else {
      setErrorEmail("ingresa un email v??lido");
      setIsOkEmail(false);
    }
  };

  const onBlurValidatePassword = (password) => {
    if (validatePassword(password)) {
      setIsOkPassword(true);
      setErrorPassword("");
    } else {
      setErrorPassword("ingresa una contrase??a de m??s de 6 caracteres");
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
        return setMessage("correo no registrado");
      });
  };

  return (
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
          placeholder="email@address.com"
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("email", value)}
          onBlur={() => onBlurValidateEmail(input.email)}
          value={input.email}
          errorStyle={{ fontSize: 15 }}
          errorMessage={!isOkEmail && errorEmail}
        />
        <Input
          ref={pass}
          label="Contrase??a"
          placeholder="password"
          secureTextEntry={true}
          inputStyle={styles.colorInput}
          onChangeText={(value) => handleChangeText("password", value)}
          errorStyle={{ fontSize: 15 }}
          onBlur={() => onBlurValidatePassword(input.password)}
          value={input.password}
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
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingresa tu Email</Text>
            <Input
              label="Email"
              placeholder="EstacionAr@estacionar.com"
              errorMessage={message}
              inputStyle={styles.colorInput}
              onChangeText={(value) => handleChangeText("recoveryEmail", value)}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => emailRecovery()}
                >
                  <Text style={styles.textStyle}>Resetear Contrase??a</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose, { marginTop: 10 }]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Volver</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/*--------------------------MODAl--------------------*/}

      <View style={styles.fixToText}>
        <Button
          title="??Olvidaste tu contrase??a?"
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
          title="??No tenes cuenta? Reg??strate!"
          titleStyle={styles.clearButton}
          onPress={() => navigation.navigate("Registrate")}
        ></Button>
      </View>
      <View style={{ marginTop: 10, marginLeft: "15%", marginRight: "15%" }}>
        {/*  <Button
            buttonStyle={{marginBottom:10, backgroundColor:'#3b5998'}}
          title="Continuar con Facebook"
          icon={<Icon name='facebook' size={30} color='white' style={{marginRight:'5%'}}/>}
          onPress={() => {
            loginFacebook();
            // Alert.alert("forgot password button pressed") 
          }}
        ></Button> */}
        {/*       <SocialIcon
  title='Continuar con Google'
  button
  type='google'
  light
  
  onPress={()=>{loginGoogle()}}
/> */}

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
            loginGoogle();
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
