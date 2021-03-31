import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { Button, Card, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./UsersCarsStyle";
import { useSelector, useDispatch } from "react-redux";
import {getUserCars} from "../../redux/reducer/carReducer"
//importamos Firebase
import firebase from "../../back/db/firebase";

const Userscars = (props) => {
  // const dispatch = useDispatch()
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
          const {marca, año, patente, modelo} = doc.data().cars
          cars.push(doc.data().cars)
          setAllUserCars(cars)
        });
      })
      .catch((err) => console.log(err));
    // dispatch(getUserCars(userInTheApp))
  }, []);

  console.log('-----ALLUSERCARS--->', allUserCars);

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.input}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.texto}>AB 123 CD {"\n"} Corsita </Text>
          <View style={styles.buttonPositions}>
            <CheckBox
              title="Seleccionar"
              checkedColor="white"
              checked={true}
              containerStyle={styles.cardButton}
              textStyle={styles.colorText}
            />

            <CheckBox
              title="Editar"
              uncheckedIcon="edit"
              uncheckedColor="white"
              containerStyle={styles.cardButton}
              textStyle={styles.colorText}
            />
          </View>
        </View>
      </Card>)
      

      <View style={styles.fixToText}>
        <Button
          title="Estacionar"
          buttonStyle={styles.button}
          icon={<Icon name="car" color="white" style={{ marginRight: 10 }} />}
          onPress={() => {
            /* Alert.alert("Auto estacionado")  */
            return setTimeout(
              () => props.navigation.navigate("estacionar"),
              1000
            );
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default Userscars;
