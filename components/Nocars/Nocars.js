import React from 'react';
import {View,Alert,SafeAreaView,Text} from 'react-native';
import {Button,Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/EvilIcons';
import {styles} from './NocarsStyle'
const Nocars = (props) => {
    return (
        <SafeAreaView style ={styles.container}>
        <View>
          <Card containerStyle={styles.card2Style} >
            
                <Text style ={styles.texto}>NO HAY VEHICULOS REGISTRADOS EN SU CUENTA</Text>
                 
          </Card>
        </View>
        <View style={styles.fixToText}>
        
       
              <Text style ={styles.colores}>Registrar nuevo vehiculo</Text>
             
      </View>
        
        <View style={styles.fixToText}>
        
        <Button 
        buttonStyle={styles.button}
        icon={
          <Icon name='plus' size={80} color="white"/>
        }
          onPress={() => {
             Alert.alert("agregar auto")  
               return setTimeout(()=>props.navigation.navigate('agregar un auto'),1000)   }}
          >
              
              
              </Button> 
      </View>
      </SafeAreaView>
    );
};

export default Nocars;