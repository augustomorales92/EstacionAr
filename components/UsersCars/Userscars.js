import React from 'react';
import { Container,  Text, Left, Body, Right, Button,Card, CardItem,Icon } from 'native-base';
import{View,Alert} from 'react-native'
import {styles} from './UsersCarsStyle'
const Userscars = (props) => {
    return (
        <Container style ={styles.container}>
        <View>
          <Card /* style={styles.cardStyle} */ style={styles.card2Style} >
            <CardItem thumbnail style={styles.cardStyle}>
              <Left>
              <Text style ={styles.colores}>AB 123 CD </Text>
              </Left>
              <Body >
                <Text style ={styles.colores}>Chevrolet</Text>
                <Text note numberOfLines={1} style ={styles.colores}>Corsita</Text>
              </Body>
              <Right>
                <Button dark rounded >
                  <Text style ={styles.colores}>Editar</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </View>
        <View style={styles.fixToText}>
        
        <Button rounded dark
          onPress={() => {
             /* Alert.alert("Auto estacionado")  */ 
               return setTimeout(()=>props.navigation.navigate('estacionar'),1000)   }}
          >
              <Icon name='car' />
              <Text style ={styles.colores}>Estacionar</Text>
              </Button>
      </View>
      </Container>
    );
};



export default Userscars;