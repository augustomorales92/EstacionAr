import React from 'react';
import { styles } from "./TimerStyle";
import { View, SafeAreaView } from "react-native";
import { Button, Card, Header, Text } from "react-native-elements";

const Timer = () => {
    return (
        <SafeAreaView>
            <Header
        placement="left"
        containerStyle={styles.headerStyle}
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "EstacionAr", style: { color: "#fff" }}}
      />
            <View>
            <Text h1>estas en el timer</Text>
            </View>
        </SafeAreaView>
    );
};

export default Timer;