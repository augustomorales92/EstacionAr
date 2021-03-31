import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./UsersCarsStyle";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/reducer/carReducer";

const Userscars = (props) => {
  const dispatch = useDispatch()
  const userInTheApp = useSelector((state) => state.userReducer);
  const {allUserCars} = useSelector((state) => state.carReducer);
  
  useEffect(() => {
    getAllCars(dispatch, userInTheApp.user)
  }, []);
  return (
    <ScrollView style={styles.container}>
      {allUserCars?.map((car) => (
        <Card containerStyle={styles.input} key={car.patente}>
          <Card.Title style={styles.titulo}>{car.modelo}</Card.Title>
          <Card.Divider />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.texto}>
              {car.patente} {"\n"} {car.marca}
            </Text>
            <View>
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
        </Card>
      ))}

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
    </ScrollView>
  );
};

export default Userscars;
