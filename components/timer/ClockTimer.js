import React from "react";
import { View, SafeAreaView } from "react-native";
import { format } from "./Format";
import { Text } from "react-native-elements";

const ClockTimer = ({ time = 0 }) => (
  <SafeAreaView>
    <View style={{flexDirection: "row", justifyContent: "center"}}>
      <Text h1>{format(time)}</Text>
    </View>
  </SafeAreaView>
);

export default ClockTimer;
