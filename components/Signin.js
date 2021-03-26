import React from 'react';
import { StyleSheet, Button,View,Alert,Image } from 'react-native';

import { Container, Content, Form, Item, Input, Label } from 'native-base';
const signin = (props) => {
    
    return (
        <Container style ={styles.container}>
        <Content>
          <Form style={styles.formStyle}>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Nombre</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Apellido</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Contraseña</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded style={styles.itemStyle}>
              <Label style={styles.labelstyle}>Repetir contraseña</Label>
              <Input />
            </Item>
          </Form>
          <View style={styles.fixToText}>
        
        <Button
          title="Registrate"
          onPress={() => {
             Alert.alert("Usuario creado")  
             return setTimeout(()=>props.navigation.popToTop(),1000) }}
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
        justifyContent: 'flex-end',
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
        marginTop: 30
    }
  });
  

export default signin;