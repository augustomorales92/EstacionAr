import React from 'react';
import { styles } from "./ParkingHistoryStyles";
import { View, SafeAreaView, Modal, Pressable } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const ParkingHistory = () => {
    let { parkingHistory } = useSelector((state) => state.userReducer);
    console.log("===========================================================", parkingHistory)

    // traer del back todo el historial y mapearlo 

    return (
        <SafeAreaView>
            <View>
                <View style={styles.view}>
                    <Text h4>HISTORIAL</Text>
                </View>
                {/* aca iria el map */} 
                <Card containerStyle={styles.card}>
                    <Text h6>7/4/21  16:20:20</Text>
                    <Text h4>datos del auto</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text h5>15:00:00</Text>
                        <Text h5>$1500</Text>
                    </View>
                </Card>
            </View>
        </SafeAreaView>
    );
};

export default ParkingHistory;