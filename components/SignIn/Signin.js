import React from 'react';
import {View,Alert,SafeAreaView,ActivityIndicator} from 'react-native';
import {Button,Input,Card,Image} from 'react-native-elements'

import {styles} from './SignInStyle'
const signin = (props) => {
    
    return (
        <SafeAreaView style ={styles.container}>
        
        <Card containerStyle={styles.input}>
          <Input
          label='Nombre'
          placeholder='juan'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Apellido'
          placeholder='rodriguez'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Email'
          placeholder='juanrodriguez@adress.com'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Contraseña'
          placeholder='*********'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Repetir contraseña'
          placeholder='*********'
          inputStyle={styles.colorInput}
          />
        </Card>
          <View style={styles.fixToText}>
        
        <Button 
        title='Registrate'
        buttonStyle={styles.colores}
          onPress={() => {
             Alert.alert("Usuario creado")  
             return setTimeout(()=>props.navigation.popToTop(),1000) }}
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

export default signin;