import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import firebase from '../../back/db/firebase'
import {View,SafeAreaView,Text,ScrollView} from 'react-native';
import {Button,Card,CheckBox} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './UsersCarsStyle'
import { set } from 'react-native-reanimated';


const Userscars = (props) => {
  const userInTheApp = useSelector((state) => state.userReducer);
  const [allUserCars, setAllUserCars] = useState([]);
  useEffect(() => {
    firebase.db
      .collection("users")
      .where("id", "==", `${userInTheApp.user}`)
      .get()
      .then((querySnap) => {
        querySnap.forEach((doc) => {
          let cars = [];
          const { marca, año, patente, modelo } = doc.data().cars;
          cars.push(doc.data().cars);
          setAllUserCars(cars);
        });
      })
      .catch((err) => console.log(err));
    // dispatch(getUserCars(userInTheApp))
  }, []);

  console.log("-----ALLUSERCARS--->", allUserCars[0]);



    return (
        <ScrollView style ={styles.container}>
        {allUserCars[0]?.map(car=> 
          <Card containerStyle={styles.input} key={car.patente}>
            <Card.Title style={styles.titulo}>{car.modelo}</Card.Title>
            <Card.Divider/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            
            <Text style ={styles.texto}>{car.patente} {"\n"} {car.marca}</Text>
              <View >
              <CheckBox
                title='Seleccionar'
                checkedColor='white'
                checked={true}
                onPress={()=> {
                  props.navigation.navigate('drawer',{ 
                    patenteId : car.patente,
                    marcaId: car.marca,
                    modeloId:car.modelo
                  })
                  
                }}
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
          )}
        
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
      </ScrollView>
    );
};



export default Userscars;