import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import { styles } from "../styles/styles";
import LinearGradient from "react-native-linear-gradient";

export default function idEnter({ navigation }) {
  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <View style={styles.regform}>
        <Text style={styles.header}>Device ID</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Device ID"
          underlineColorAndroid={"transparent"}
        />
        <Button
          title="Submit ID"
          style={styles.button}
          onPress={() => navigation.navigate("Payment")}
        />
        <Button
          title="Dont remember ID? Scan QR Code!"
          style={styles.button}
          onPress={() => navigation.navigate("qrScanning")}
        />
      </View>
    </LinearGradient>
  );
}
