import React from "react";
import { format } from "./format";
import { styles } from "./clockStyle";
import { SafeAreaView, Text } from "react-native";

export default ({ time }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.clock}>{format(time)}</Text>
      </View>
    </SafeAreaView>
  );
};
