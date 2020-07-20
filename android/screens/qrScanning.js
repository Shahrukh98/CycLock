import React, { useContext } from "react";
import { AuthContext } from "../routes/AuthProvider";
import { Text, View, Button } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../styles/styles";

export default function qrScanning({ navigation }) {
  const { scanned, setScanned } = useContext(AuthContext);

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <QRCodeScanner
        onRead={(read) => {
          setScanned(read.data);
          console.log(scanned);
          navigation.navigate("btScreen");
        }}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Scan QR Code of Bluetooth Module
          </Text>
        }
        bottomContent={
          <Button
            title="Trouble Scanning? Connect manually !"
            style={styles.button}
            onPress={() => navigation.navigate("btScreen")}
          />
        }
      />
    </LinearGradient>
  );
}
