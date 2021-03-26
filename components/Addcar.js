import React from 'react';
import { StyleSheet, Button,View,Alert,Image ,Text} from 'react-native';

import { Container, Content, Form, Item, Input, Label } from 'native-base';

const addcar = (props) => {
    return (
        <Container style ={styles.container}>
        <Content>
            <View>
            <Text style={styles.texto}>
                Registre su vehiculo
            </Text>
            </View>
          <Form style={styles.formStyle}>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Marca</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Modelo</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Color</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Año</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Patente</Label>
              <Input />
            </Item>
          </Form>
          <View style={styles.fixToText}>
        
        <Button
          title="Agregar vehiculo"
          onPress={() => {
             Alert.alert("Auto agregado correctamente")  
              return setTimeout(()=>props.navigation.navigate('autos'),1000)  }}
          color='white' 
          />
      </View>
      <View style={styles.imagen}>
            <Image
        style={styles.stretch}
        source={{
          uri: 'https://i.postimg.cc/mrWQN3x1/logo-final-8.png',
        }}
        />
        </View>
        </Content>
      </Container>
    );

    
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      height: '100%',
      
     
    },
    
      stretch: {
        width: 200,
        height: 180,
        resizeMode: 'stretch',
        
      },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginRight:20
      },
      imagen:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%'
      },
      labelstyle:{
        color:'white'
    },
    formStyle:{
        margin:20
    },
    itemStyle:{
        marginTop: 20
    },
    texto:{
        fontSize: 30,
        fontWeight: "bold",
        color:'white',
        flex:1,
        marginTop:20,
        height:'100%',
        textAlign:'center'

    }
  });
  

export default addcar;