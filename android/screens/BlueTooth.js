import React from "react";
import { Text, View, Button, Switch } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../styles/styles";
import { ToggleButton } from "react-native-paper";

export default function Bluetooth() {
  const [blue, setBlue] = useState(false);

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <Text style={styles.buttonText}>{blue ? "ON" : "OFF"}</Text>
      <ToggleButton
        icon="bluetooth"
        value="bluetooth"
        size={50}
        onPress={setBlue(!blue)}
      />
    </LinearGradient>
  );
}
