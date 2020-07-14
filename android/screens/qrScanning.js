import React from "react";
import { Text, View, Button } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../styles/styles";

export default function qrScanning({ navigation }) {
  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <QRCodeScanner
        onRead={() => {
          this.OnSuccess;
          navigation.navigate("Payment");
        }}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Go to{" "}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <Button
            title="Trouble Scanning? Enter the ID instead !"
            style={styles.button}
            onPress={() => navigation.navigate("idEnter")}
          />
        }
      />
    </LinearGradient>
  );
}
