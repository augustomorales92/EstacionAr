import React from 'react';
import { Container, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import {View,Alert,Image } from 'react-native';
import {styles} from './addCarStyle'

const addcar = (props) => {
  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <Text style={styles.texto}>Registre su vehiculo</Text>
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
            rounded
            dark
            onPress={() => {
              Alert.alert("Auto agregado correctamente");
              return setTimeout(() => props.navigation.navigate("autos"), 1000);
            }}
          >
            <Text style={styles.colores}>Agregar vehiculo</Text>
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
      </Content>
    </Container>
  );
};
export default addcar;