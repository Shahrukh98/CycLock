import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Switch,
  ToastAndroid,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { styles } from "../styles/styles";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../routes/AuthProvider";
import BluetoothSerial from "react-native-bluetooth-serial";
import firestore from "@react-native-firebase/firestore";

var _ = require("lodash");

export default function btScreen({ navigation }) {
  const [discovering, setDiscovering] = useState(false);
  const [devices, setDevices] = useState([]);
  const [unpairedDevices, setUnpairedDevices] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [toggla, setToggla] = useState(false);

  const {
    user,
    btStatus,
    isPending,
    setBluetooth,
    setUserData,
    scanned,
    setScanned,
    setUserBalance,
    userData,
  } = useContext(AuthContext);

  async function dataRead() {
    try {
      const UserRetrieve = await firestore()
        .collection("Users")
        .doc(user.uid)
        .get();
      setUserBalance(UserRetrieve._data.balance);
      console.log(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async function connect(device) {
    setConnecting(true);
    const devId = await BluetoothSerial.connect(device.id);
    if (devId !== null) {
      console.log(`Connected to device ${device.name}`);
      ToastAndroid.show(
        `Connected to device ${device.name}`,
        ToastAndroid.SHORT
      );
      setConnecting(false);
      setConnected(true);
    } else {
      console.log("Connection failed due to error.");
      setConnecting(false);
    }
  }

  function _renderItem(item) {
    return (
      <Button
        disabled={!btStatus}
        title={item.item.name ? item.item.name : item.item.id}
        onPress={() => connect(item.item)}
      />
    );
  }

  function toggleBluetooth() {
    if (btStatus === true) {
      setBluetooth(false);
    } else {
      setBluetooth(true);
    }
  }

  function checkBT() {
    if (!btStatus) {
      setBluetooth(true);
    }
  }

  async function discoverAvailableDevices() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    setDevices([]);
    setUnpairedDevices([]);
    if (discovering) {
      return false;
    } else {
      setDiscovering(true);
      const uniqueDevices = await BluetoothSerial.discoverUnpairedDevices();
      const oldDevices = await BluetoothSerial.list();
      const newDevices = _.uniqBy(uniqueDevices, "id");
      setUnpairedDevices(newDevices);
      setDevices(oldDevices);
      setDiscovering(false);
    }
  }

  function toggleSwitch() {
    BluetoothSerial.write("d")
      .then((res) => {
        console.log(res);
        console.log("Successfully wrote to device");
        setToggla(!toggla);
      })
      .catch((err) => console.log(err.message));
  }

  async function BToffScan() {
    await checkBT();
    discoverAvailableDevices();
  }

  async function QRScan() {
    await discoverAvailableDevices();
    navigation.navigate("qrScanning");
  }

  useEffect(() => {
    dataRead();
    if (scanned === null) {
      console.log("nothing scanned");
    } else {
      console.log("Hellow");
      devices.forEach((element) => {
        if (element.name === scanned) {
          console.log("Paired Found!");
        }
      });
      unpairedDevices.forEach((element) => {
        if (element.name === scanned) {
          console.log("Unpaired Found!");
        }
      });
    }
  }, []);

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.containor}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>
        <View style={styles.toolbarButton}>
          <Switch
            disabled={discovering}
            value={btStatus}
            onValueChange={() => toggleBluetooth()}
          />
        </View>
      </View>

      <Text style={styles.welcome}>
        {userData._data.name}, your balance is {userData._data.balance}
      </Text>
      <Button
        disabled={discovering || !btStatus}
        onPress={() => {
          BToffScan();
        }}
        title={discovering ? "Scanning" : "Scan"}
        color="#841584"
      />

      <Button
        disabled={!btStatus || discovering}
        title={btStatus ? "Connect with QR Code" : "Turn On BlueTooth"}
        onPress={() => {
          BToffScan();
        }}
        onPress={() => {
          QRScan();
        }}
      />

      <Text style={styles.toolbarTitle}>Paired Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={(item) => _renderItem(item)}
      />
      <Text style={styles.toolbarTitle}>Unpaired Devices</Text>
      <FlatList
        data={unpairedDevices}
        keyExtractor={(item) => item.id}
        renderItem={(item) => _renderItem(item)}
      />

      <TouchableOpacity
        style={styles.newbutton}
        disabled={!btStatus || !connected}
        onPress={() => {
          if (btStatus && connected) {
            toggleSwitch();
          } else {
            console.log("BT Off or Device not connected!");
          }
        }}
      >
        <Text
          style={{
            fontSize: 50,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase",
          }}
        >
          {toggla ? "Stop Ride" : "Start Ride"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
