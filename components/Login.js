import React from 'react';
import { StyleSheet, Button,View,Alert,Image } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';




const Login = (props) => {

     return (
        <Container style ={styles.container}>

        <Content >
            <View style={styles.imagen}>
            <Image
        style={styles.stretch}
        source={{
          uri: 'https://i.postimg.cc/mrWQN3x1/logo-final-8.png',
        }}
        />
        </View>
          <Form >
            <Item floatingLabel last rounded  >
              <Label style={styles.labelstyle}>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last rounded>
              <Label style={styles.labelstyle}>contraseña</Label>
              <Input />
            </Item>
          </Form>
          <View style={styles.fixToText}>
          <Button
          title="¿Olvidaste tu contraseña?"
          onPress={() => Alert.alert('forgot password button pressed')}
          color='white'
          />
        
        <Button
          title="Iniciar Sesion"
          onPress={() => props.navigation.navigate('agregar un auto')}
          color='white'
          />
          
      </View>
      <View style={styles.signin}>
        
        <Button
          title="¿No tenes cuenta? Registrate!"
          color='white'
          onPress={() =>  props.navigation.navigate('Registrate') }
          />
      </View>
      <View>

    
    </View>
        </Content>
       </Container>
       
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange'
     
    },
    
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight:20
      },
      signin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
      },
      stretch: {
        width: 300,
        height: 270,
        resizeMode: 'stretch',
        
      },
      imagen:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%'
      },
      labelstyle:{
          color:'white'
      }
  });
  


export default Login;