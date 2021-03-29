import React from "react";
import { format } from "./format";
<<<<<<< HEAD
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "./clockStyle";

export default ({ time }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.clock}>{format(time)}</Text>
      </View>
    </SafeAreaView>
  );
};
=======
import { SafeAreaView, View, Text } from 'react-native';
import { styles } from './clockStyle'



export default ({ time }) => {
        return (
                <SafeAreaView style={styles.container}>
                        <View>
                                <Text style={styles.clock}>
                                        {format(time)}
                                </Text>
                        </View>
                </SafeAreaView>


        )
}
>>>>>>> 8e2b113f653154af670cefc6a618ad432f90fd30
