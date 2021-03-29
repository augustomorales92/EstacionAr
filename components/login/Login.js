import React, {useState} from 'react';
import {View,Alert,SafeAreaView,ActivityIndicator} from 'react-native';
import {Button,Input,Card,Image} from 'react-native-elements'
import {styles} from './LoginStyle'

import firebase from '../../back/db/firebase'


const Login = (props) => {

  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [user, setUser] = useState({});

  firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser) {
        setUser(loggedUser);
    }
  
    console.log('USER', user)
    console.log('USER ID', user.uid)
    
  });

  
  const loginUser = () => {
    const {email, password} = input
    firebase.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('Usuario logeado')
      props.navigation.navigate("sin autos")
    })
    .catch(error => alert ('Logeo incorrecto', error.message))
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
          />
          <Input
          label='Contraseña'
          placeholder='password'
          type='password'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('password', value)}
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
               onPress={() => props.navigation.navigate("Registrate")}
             >
               
             </Button>
           </View>
           </SafeAreaView>
     );
};



export default Login;