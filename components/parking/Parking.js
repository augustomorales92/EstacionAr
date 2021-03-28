import React, {useState} from "react";
import { Container,  Text, Form, Button,Item, Label,Input, Left, Body, Right,Card, CardItem} from 'native-base';
import{View,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';
import {styles} from './ParkingStyle'
import Clock from '../clock/clock'


const Parking = (props) => {

let [time, setTime] = useState(0);
const timer = ()=>{
  !time?
  setTime(3000)
  :
  setTime(time+3000)
}
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
      <Card style={styles.card2Style} >
            <CardItem thumbnail style={styles.cardStyle2}>
              <Left>
              <Text style ={styles.colores}>
                0.5hs
                </Text>
              </Left>
              
              <Right>
              <Button rounded dark
        style={styles.button}
        onPress={timer}>
              <Icon name='clock' size={80} color="white"/>
              
              
              </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={styles.card2Style} >
            <CardItem thumbnail style={styles.cardStyle2}>
              <Left>
              <Text style ={styles.colores}>
                Libre
                </Text>
              </Left>
              
              <Right>
              <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("libre")  
               /* return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)  */  }}
          >
              <Icon name='play' size={80} color="white"/>
              
              </Button>
              </Right>
            </CardItem>
          </Card>

      {/* <View style={styles.fixToText}>
        <Text style={styles.colores}>0.5hs</Text>
        <Text style={styles.colores}>Libre</Text>
        </View>
        <View style={styles.fixToText}>
        
        <Button rounded dark
        style={styles.button}
        onPress={timer}>
              <Icon name='clock' size={80} color="white"/>
              
              
              </Button>
              <Button rounded dark
        style={styles.button}
          onPress={() => {
             Alert.alert("libre")  
                return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)    }}
          >
              <Icon name='play' size={80} color="white"/>
              
              </Button>
      </View> */}
          <Card style={styles.card2Style} transparent>
            <CardItem thumbnail style={styles.cardStyle}>
              <Left>
              <Text style ={styles.clock}>
                <Clock time={time}/> 
                </Text>
              </Left>
              
              <Right>
                <Button dark rounded onPress={() => {setTime(0)}}>
                  <Text style ={styles.colores}>Reset</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

     
      <View style={styles.lastButton}>
              <Button rounded dark
          onPress={() => {setTime(0)}}
          >
              <Text style ={styles.colores}>Ir a estacionar</Text>
              </Button>
      </View> 
      </Container>
    );
};




export default Parking;