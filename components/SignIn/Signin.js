import React from 'react';
import { Container, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import {View,Alert,Image } from 'react-native';
import {styles} from './SignInStyle'
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
        
        <Button dark rounded
          onPress={() => {
             Alert.alert("Usuario creado")  
             return setTimeout(()=>props.navigation.popToTop(),1000) }}
             >
                 <Text style ={styles.colores}>
                     Registrate
                 </Text>
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
        </Content>
      </Container>
    );
};

export default signin;