import React, {useState} from 'react';
import { View, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button,  Input, Card, Image } from 'react-native-elements'

import { styles } from './SignUpStyle'
import firebase from '../../back/db/firebase'

const SignUp = (props) => {
  
  const [input, setInput] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  })


  const saveNewUser = () => {
    const {name, lastname, email, password} = input
    firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred)
        return firebase.db.collection('users').doc(cred.user.uid).set({
          id: cred.user.uid,
          name,
          lastname,
          email,
          cars: []
        })
        .then((cred) => {
          return Alert.alert("Usuario registrado exitosamente", cred);
        })
        .then(() => verifyEmail())
      })
      .catch(error => Alert.alert("Registro incorrecto", error.message));


      const verifyEmail = () => {
        const user = firebase.auth.currentUser;
        user    
          .sendEmailVerification()
          .then(() => 'Envío de correo exitoso')
          .catch(error => alert("Error con el envío de confirmación"))
      };
  };


  const handleChangeText = (name, value) => {
    setInput({...input, [name]: value})
  }

  return (

    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <Input
          label='Nombre'
          name='name'
          placeholder='juan'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('name', value)}
        />
        <Input
          label='Apellido'
          name='lastname'
          placeholder='rodriguez'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('lastname', value)}
        />  
        <Input
          label='Email'
          name='email'
          type='email'
          placeholder='juanrodriguez@adress.com'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('email', value)}
        />
        <Input
          label='Contraseña'
          name='password'
          secureTextEntry={true}
          placeholder='*********'
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('password', value)}
        />
        <Input
          label='Repetir contraseña'
          placeholder='*********'
          secureTextEntry={true}
          inputStyle={styles.colorInput}
          onChangeText={(value)=> handleChangeText('password2', value)}
        />
      </Card>
      <View style={styles.fixToText}>

        <Button
          title='Registrate'
          buttonStyle={styles.colores}
          onPress={() => {
            saveNewUser();
            return setTimeout(() => props.navigation.popToTop(), 100)
          }}
        >

        </Button>
      </View>
      <View style={styles.imagen}>
        <Image
          style={styles.stretch}
          source={{
            uri: 'https://i.postimg.cc/mrWQN3x1/logo-final-8.png',
          }}
        />
      </View>

    </SafeAreaView>
  );
};

export default SignUp;