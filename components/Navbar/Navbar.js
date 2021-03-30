import React from "react";
import { SafeAreaView,View } from "react-native";
import { Header } from "react-native-elements";

export default  () => {
  return (
    <SafeAreaView>
      <View>
        <Header
          placement="left"
          containerStyle={{ backgroundColor: "#F9B233" }}
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "EstacionAr", style: { color: "#fff" } }}
        />
      </View>
    </SafeAreaView>
  );
};