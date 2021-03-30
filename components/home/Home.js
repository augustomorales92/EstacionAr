import React from "react";
import { styles } from "./HomeStyle";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import {useNavigation} from '@react-navigation/native'


const Home = () => {
  const navigation = useNavigation()

  return (
    <View>

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
      {/* <Card><MapView style={styles.map}/></Card> */}
    </View>
  );
};

export default Home;
