import React, {useState, useEffect} from "react";
import { styles } from "./ParkingHistoryStyles";
import { View, ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import firebase from "../../back/db/firebase";

const ParkingHistory = () => {
  const [allParkingHistory, setAllParkingHistory] = useState([]);
  let { user } = useSelector((state) => state.userReducer);

  const getParkingHistory = (userId) => {
    firebase.db
      .collection("users")
      .doc(`${userId}`)
      .onSnapshot((querySnap) => {
         return setAllParkingHistory(querySnap.data().parkingHistory)
      });
  };

  useEffect(() => {
    getParkingHistory(user)
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View>
        <View style={styles.view}>
          <Text h4 style={{ fontWeight: "bold" }}>
            HISTORIAL
          </Text>
        </View>
        {allParkingHistory
          .slice(allParkingHistory.length - 10, allParkingHistory.length)
          .map((history) => (
            <Card containerStyle={styles.card} key={history.finalTime}>
              <Text h6>7/4/21 16:20:20</Text>
              <Text h4>{history.patente}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text h5>{history.finalTime}</Text>
                <Text h5>${history.price}</Text>
              </View>
            </Card>
          ))}
      </View>
    </ScrollView>
  );
};

export default ParkingHistory;
