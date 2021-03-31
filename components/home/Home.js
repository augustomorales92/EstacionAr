import React, {useEffect} from "react";
import { styles } from "./HomeStyle";
import { View ,SafeAreaView} from "react-native";
import { Button, Card, Text } from "react-native-elements";
import {useNavigation} from '@react-navigation/native'
import MapView , { Marker }from 'react-native-maps';


const Home = ({position}) => {
  const navigation = useNavigation()


  return (
    <SafeAreaView style={{backgroundColor:'black',height:'100%'}}>

      <View style={{ marginHorizontal: 15, marginVertical: 10}}>
        <Card containerStyle={styles.card}>
            <View style={{flexDirection: "row", justifyContent: "space-around", marginBottom:10}}>
          <Text h4>Saldo disponible:</Text>
          <Text h4>$500</Text>
            </View>
            <View style={{marginHorizontal:17, marginBottom:7}}>
          <Button
            block
            title="CARGAR SALDO"
            buttonStyle={styles.button}
            onPress={() => alert("boton cargar saldo presionado!")}
          ></Button>
            </View>
        </Card>
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <Card containerStyle={styles.card}>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <View>
          <Text h4>Su vehiculo </Text>
          <Card.Divider style={{color:'black'}}/>
          <Text>AAA 123 BB</Text>
          <Text>Corsita</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
          <Button
            title="ESTACIONAR"
            buttonStyle={styles.button}
            onPress={() => alert("boton estacionar presionado!")}
          >
          </Button>

            </View>
            </View>
        </Card>
      </View>
      <View style={{ marginHorizontal: 15 }}>

       <Card containerStyle={styles.card}>
         
      <MapView
      initialRegion={{
        latitude: -26.8248387,
        longitude: -65.2050432,
        longitudeDelta: 0.09,
        latitudeDelta: 0.05,
      }}  
      minZoomLevel={15}
      style={styles.map} />
  </Card>
    </View>
    </SafeAreaView>
  );
};





export default Home;
