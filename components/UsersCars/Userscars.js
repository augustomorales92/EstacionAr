import React from 'react';
import {View,SafeAreaView,Text} from 'react-native';
import {Button,Card,CheckBox} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './UsersCarsStyle'
const Userscars = (props) => {
    return (
        <SafeAreaView style ={styles.container}>
        
          <Card containerStyle={styles.input} >
            <Card.Title style={styles.titulo}>SU VEHICULO</Card.Title>
            <Card.Divider/>
            <View style={{flexDirection:'row'}}>
            
            <Text style ={styles.texto}>AB 123 CD {"\n"} Corsita</Text>
              <View style={styles.buttonPositions}>
              <CheckBox
                title='Seleccionar'
                checkedColor='white'
                checked={true}
                containerStyle={styles.cardButton}
                textStyle={styles.colorText}
              />
             
              <CheckBox
                title='Editar'
                uncheckedIcon='edit'
                uncheckedColor='white'
                containerStyle={styles.cardButton}
                textStyle={styles.colorText}
              />
                </View>
                </View>
            </Card>
        
        <View style={styles.fixToText}>
        
        <Button 
        title='Estacionar'
        buttonStyle={styles.button}
        icon={
          <Icon name='car' color='white' style={{marginRight:10}}/>
        }
          onPress={() => {
             /* Alert.alert("Auto estacionado")  */ 
               return setTimeout(()=>props.navigation.navigate('estacionar'),1000)   }}
          >
              
              </Button>
      </View>
      </SafeAreaView>
    );
};



export default Userscars;