import React from "react";
import { format } from "./format";
import { SafeAreaView, View, Text,TextInput } from "react-native";
import { styles } from "./clockStyle";



export default ({ time }) => {
  return (

      < SafeAreaView style={styles.container}>
                <View>
              <Text style={styles.clock}>
              {format(time)}
              </Text>
              </View>
      </ SafeAreaView>
  
 
)
}

