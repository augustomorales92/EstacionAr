import React from 'react';
import { Container, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import {View,Alert,Image } from 'react-native';
import {styles} from './LoginStyle'



const Login = (props) => {

     return (
       <Container style={styles.container}>
         <Content>
           <View style={styles.imagen}>
             <Image
               style={styles.stretch}
               source={{
                 uri: "https://i.postimg.cc/mrWQN3x1/logo-final-8.png",
               }}
             />
           </View>
           <Form>
             <Item floatingLabel last rounded style={styles.input}>
               <Label style={styles.labelstyle}>Email</Label>
               <Input />
             </Item>
             <Item floatingLabel last rounded style={styles.input}>
               <Label style={styles.labelstyle}>contraseña</Label>
               <Input />
             </Item>
           </Form>
           <View style={styles.fixToText}>
             <Button
               dark
               transparent
               onPress={() => Alert.alert("forgot password button pressed")}
             >
               <Text>¿Olvidaste tu contraseña?</Text>
             </Button>
             <Button
               rounded
               dark
               onPress={() => props.navigation.navigate("sin autos")}
             >
               <Text style={styles.colores}>Iniciar sesion</Text>
             </Button>
           </View>
           <View style={styles.signin}>
             <Button
               dark
               transparent
               onPress={() => props.navigation.navigate("Registrate")}
             >
               <Text style={styles.colores}>¿No tenes cuenta? Registrate!</Text>
             </Button>
           </View>
         </Content>
       </Container>
     );
};



export default Login;