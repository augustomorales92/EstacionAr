import React, {useState, useEffect} from 'react';
import {View,Alert,SafeAreaView,ActivityIndicator, Modal, StyleSheet, Text, Pressable} from 'react-native';
import {Button,Input,Card,Image} from 'react-native-elements'
import {styles} from './LoginStyle'
import {useNavigation} from '@react-navigation/native'

//importo useSelector y dispatch
import {useDispatch, useSelector } from 'react-redux'
//importamos la funcion para guardar el newUser
import {logUser} from "../../redux/reducer/userReducer"
//importamos firebase
import firebase from "../../back/db/firebase"
import { set } from 'react-native-reanimated';




const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [mistake,setMistake] = useState(false)
  const [message,setMessage] = useState('')
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [resetPassword, setResetPassword] = useState({recoveryEmail:''})

  console.log('el error es mensaje este',message.split(':')[1])

  console.log(mistake)
  const loginUser = () => {
 
    const {email, password} = input
    dispatch(logUser({email, password}))
    .then((error)=>{
    if(error){
      setMessage(error.error.message.split(':')[1])
      setMistake(!mistake)
    }
      
    else{navigation.navigate("drawer")}})
    .catch(error => console.log('catch ----->',error))
    
  }
  const handleChangeText = (name, value) => {
    setInput({...input, [name]: value})
    setResetPassword({...resetPassword,[name]:value})
    setMistake(false)
  }
  
  const emailRecovery = () => {
    const recoveryEmail = resetPassword.recoveryEmail
    firebase.auth.sendPasswordResetEmail(recoveryEmail)
    .then(()=> {
      console.log('envio exitoso')
      setResetPassword({recoveryEmail:''})
      return setModalVisible(!modalVisible) })
    .catch(function(error) {
      console.log('errorrrrrr del ctach',error)
    });
  }


     return (
      <SafeAreaView style={styles.container}>
           <View style={styles.imagen}>
             <Image
               style={styles.stretch}
               source={{uri: "https://i.postimg.cc/mrWQN3x1/logo-final-8.png",}}
               PlaceholderContent={<ActivityIndicator />}
             />
           </View>
           
               <Card containerStyle={styles.input}>
          <Input
          label='Email'
          placeholder='email@adress.com'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('email', value)}
          
          />
          <Input
          label='Contraseña'
          placeholder='password'
          secureTextEntry={true}
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('password', value)}
          errorMessage={mistake && message}
          errorStyle={{fontSize:15}}
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingresa tu Email</Text>
            <Input
          label='Email'
          placeholder='EstacionAr@estacionar.com'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('recoveryEmail', value)}
          />
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => emailRecovery()}
            >
              <Text style={styles.textStyle}>Resetear Contraseña</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose,{marginTop:10}]}
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
               title='¿Olvidaste tu contraseña?'
               type='clear'
               titleStyle={styles.clearButton}
               onPress={() => {
                setModalVisible(!modalVisible)
               /*  Alert.alert("forgot password button pressed") */}}
             >
               
             </Button>
            
             <Button
             buttonStyle={styles.colores}
               title='Iniciar sesion'
               onPress={() => {
                loginUser();
              }}
             >
               
             </Button>
            
           </View>
           <View style={styles.signin}>
             <Button
             
             type='clear'
              title='¿No tenes cuenta? Registrate!'
              titleStyle={styles.clearButton}
               onPress={() => navigation.navigate("Registrate")}
             >
               
             </Button>
           </View>
           </SafeAreaView>
     );
};



export default Login;