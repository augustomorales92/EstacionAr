import React from 'react';
import {View,Alert,SafeAreaView,ActivityIndicator} from 'react-native';
import {Button,Input,Card,Image} from 'react-native-elements'
import {styles} from './LoginStyle'
import {useNavigation} from '@react-navigation/native'


const Login = () => {

  const navigation = useNavigation()
     
return (
      <SafeAreaView style={styles.container}>
           <View style={styles.imagen}>
             <Image
               style={styles.stretch}
               source={{uri: "https://i.postimg.cc/mrWQN3x1/logo-final-8.png",}}
               PlaceholderContent={<ActivityIndicator />}
             />
           </View>
           
               <Card containerStyle={styles.input}>
          <Input
          label='Email'
          placeholder='email@adress.com'
          inputStyle={styles.colorInput}
          />
          <Input
          label='Contraseña'
          placeholder='password'
          secureTextEntry={true}
          inputStyle={styles.colorInput}
          />
        </Card>
           
           <View style={styles.fixToText}>
             <Button
               title='¿Olvidaste tu contraseña?'
               type='clear'
               titleStyle={styles.clearButton}
               onPress={() => Alert.alert("forgot password button pressed")}
             >
               
             </Button>
             <Button
             buttonStyle={styles.colores}
               title='Iniciar sesion'
               onPress={() => navigation.navigate("drawer")}
             >
               
             </Button>
           </View>
           <View style={styles.signin}>
             <Button
             type='clear'
              title='¿No tenes cuenta? Registrate!'
              titleStyle={styles.clearButton}
               onPress={() => navigation.navigate("Registrate")}
             >
               
             </Button>
           </View>
           </SafeAreaView>
     );
};



export default Login;