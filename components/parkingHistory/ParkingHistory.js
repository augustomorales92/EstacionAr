import React from 'react';
import { styles } from "./ParkingHistoryStyles";
import { View, SafeAreaView, Modal, Pressable,ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getParkingHistoryInfo } from "../../redux/reducer/userActions"


const ParkingHistory = () => {
    let { allParkingHistory } = useSelector((state) => state.userReducer);
    let { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()

    
    console.log("===========================================================", allParkingHistory)

    React.useEffect(()=>{
        dispatch(getParkingHistoryInfo(user))
        // console.log("==USER==", user)
    },[])

    return (
        <ScrollView style={{backgroundColor:'black'}}>
            <View>
                <View style={styles.view}>
                    <Text h4 style={{fontWeight:'bold'}}>HISTORIAL</Text>
                </View>
                {allParkingHistory.slice(allParkingHistory.length - 10, allParkingHistory.length).map(history=>(
                    <Card containerStyle={styles.card} key={history.finalTime}>
                    <Text h6>7/4/21  16:20:20</Text>
                    <Text h4>{history.patente}</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
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