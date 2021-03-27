import React from 'react';
import { Container,  Text, Form, Button,Item, Label,Input} from 'native-base';
import{StyleSheet,View,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';
import {styles} from './ParkingStyle'
const Parking = (props) => {
    return (
        <Container style ={styles.container}>
        <View style={styles.code}>
        <Form >
            <Item floatingLabel last rounded  style={styles.input}>
              <Label style={styles.labelstyle}>Ingresar codigo de cuadra</Label>
              <Input />
            </Item>
            </Form>
        </View>

        <View style={styles.fixToText}>
        <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("abrir camara")  
            /*    return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */  }}
          >
              <Icon name='camera' size={80} color="white"/>
              </Button>
              <Text style ={styles.camera}>escanear QR</Text>
        </View>
        <View style={styles.fixToText}>
        
       
              <Text style ={styles.colores}>Tiempo de estacionamiento</Text>
             
      </View>
      <View style={styles.fixToText}>
        <Text style={styles.colores}>0.5hs</Text>
        <Text style={styles.colores}>Libre</Text>
        </View>
        <View style={styles.fixToText}>
        
        <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("agregar 0,5hs")  
            /*    return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */  }}
          >
              <Icon name='clock' size={80} color="white"/>
              
              
              </Button>
              <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("libre")  
               /* return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */  }}
          >
              <Icon name='play' size={80} color="white"/>
              
              </Button>
      </View>
      </Container>
    );
};




export default Parking;