import React, {useState, useEffect} from 'react';
import {View,Alert,SafeAreaView,ActivityIndicator} from 'react-native';
import {Button,Input,Card,Image,Text} from 'react-native-elements'
import {styles} from './LoginStyle'
import {useNavigation} from '@react-navigation/native'
import { validateEmail, validatePassword } from "../../utils/validations"

//importo useSelector y dispatch
import {useDispatch, useSelector } from 'react-redux'
//importamos la funcion para guardar el newUser
import {logUser} from "../../redux/reducer/userReducer"
//importamos firebase
import firebase from "../../back/db/firebase"




const Login = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isOkEmail, setIsOkEmail] = useState(false)
  const [isOkPassword, setIsOkPassword] = useState(false)
  let isOk = false

  const loginUser = () => {
    const {email, password} = input
    dispatch(logUser({email, password}))
    .then(()=>setTimeout(()=> navigation.navigate("drawer"),2000))
  }

  const onBlurValidateEmail = (e)=>{
    if (validateEmail(e) !== false) {
      setIsOkEmail(true)
   } else {
      setErrorEmail("ingresa un email valido")
   }
  }

  const onBlurValidatePassword = (e)=>{
    if (validatePassword(e) !== false) {
       setIsOkPassword(true)
    } else {
      setErrorPassword("ingresa una contraseña de mas de 6 caracteres")
    }
  }

  const isOkFunction = () => {
    if(isOkEmail && isOkPassword){
      return isOk = true
    }
  }

  const handleChangeText = (name, value) => {
    setInput({...input, [name]: value})
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
          onBlur={(e)=>{onBlurValidateEmail(e.nativeEvent.text)}}
          errorMessage={!isOkEmail && errorEmail}
          />
          <Input
          label='Contraseña'
          placeholder='password'
          secureTextEntry={true}
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('password', value)}
          onBlur={(e)=>{onBlurValidatePassword(e.nativeEvent.text)}}
          errorMessage={!isOkPassword && errorPassword}
          />
        </Card>
        
        
           <View style={styles.fixToText}>
             <Button
               title='¿Olvidaste tu contraseña?'
               type='clear'
               titleStyle={styles.clearButton}
               onPress={() => Alert.alert("forgot password button pressed")}
             >
             </Button>

             
              <Button
              disabled={!isOkFunction()}
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