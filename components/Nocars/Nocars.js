import React from 'react';
import { Container,  Text, Body, Button,Card, CardItem} from 'native-base';
import{View,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';
import {styles} from './NocarsStyle'
const Nocars = (props) => {
    return (
        <Container style ={styles.container}>
        <View>
          <Card style={styles.card2Style} >
            <CardItem thumbnail style={styles.cardStyle}>
              <Body >
                <Text style ={styles.texto}>NO HAY VEHICULOS REGISTRADOS EN SU CUENTA</Text>
                 </Body>
             </CardItem>
          </Card>
        </View>
        <View style={styles.fixToText}>
        
       
              <Text style ={styles.colores}>Registrar nuevo vehiculo</Text>
             
      </View>
        
        <View style={styles.fixToText}>
        
        <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("agregar auto")  
               return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)   }}
          >
              <Icon name='plus' size={80} color="white"/>
              
              </Button>
      </View>
      </Container>
    );
};

export default Nocars;