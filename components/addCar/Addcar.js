import React from 'react';
import {View,Alert,SafeAreaView,ActivityIndicator} from 'react-native';
import {Button,Input,Card,Image} from 'react-native-elements'

import {styles} from './addCarStyle'

const addcar = (props) => {
  return (
    <SafeAreaView style={styles.container}>
     
      <Card containerStyle={styles.input}>
          <Input
          label='Marca'
          placeholder='chevrolet'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Modelo'
          placeholder='corsa'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Color'
          placeholder='negro'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Año'
          placeholder='2021'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Patente'
          placeholder='AB 123 CD'
          inputStyle={styles.colorInput}
          />
        </Card>
        <View style={styles.fixToText}>
          <Button
            title='Agregar vehiculo'
            buttonStyle={styles.colores}
            onPress={() => {
              Alert.alert("Auto agregado correctamente");
              return setTimeout(() => props.navigation.navigate("autos"), 1000);
            }}
          >
            
          </Button>
        </View>
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
export default addcar;