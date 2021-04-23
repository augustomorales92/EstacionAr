import React, { useState, useEffect } from "react";
import { styles } from "./ParkingHistoryStyles";
import { View, ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { getParkingHistoryInfo } from "../../redux/reducer/userActions";

import firebase from "../../back/db/firebase";

const ParkingHistory = () => {
  const [allParkingHistory, setAllParkingHistory] = useState([]);
  const [boolean, setBoolean] = useState(false);
  let { user } = useSelector((state) => state.userReducer);

  const getParkingHistory = (userId) => {
    return firebase.db
      .collection("users")
      .doc(`${userId}`)
      .onSnapshot((querySnap) => {
        return setAllParkingHistory(querySnap.data().parkingHistory);
      });
  };
  useEffect(() => {
      console.log('entre en este useeffect');
    getParkingHistoryInfo(user);
  }, []);


  useEffect(() => {
    getParkingHistory(user);
  }, []);



  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View>

        {allParkingHistory
          .slice(allParkingHistory.length - 10, allParkingHistory.length)
          .reverse()
          .map((history) => (
            <Card containerStyle={styles.card} key={history.date}>
              <Text h6>{history.date}</Text>
              <Text h4>{history.patente.toUpperCase()}</Text>
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
