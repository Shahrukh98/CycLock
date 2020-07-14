import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../routes/AuthProvider";
import { styles } from "../styles/styles";
import Loading from "./Loading";
import firestore from "@react-native-firebase/firestore";
export default function Home({ navigation }) {
  const { user, userData, userName, setUserData, logout } = useContext(
    AuthContext
  );

  async function dataRead() {
    try {
      const x = await firestore().collection("Users").doc(user.uid).get();
      setData(x);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    dataRead();
    if (data === null) {
      firestore()
        .collection("Users")
        .doc(user.uid)
        .set({ name: userName, balance: 50 });
    } else {
      setUserData(data);
    }
    console.log(userName);
  }, []);

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      {userData ? (
        <View>
          <Text style={styles.text}>Welcome user {userName}</Text>
          <Text style={styles.text}>
            Your current balance is {userData.balance}
          </Text>
          <Button
            title="Scan the QR Code !"
            style={styles.button}
            onPress={() => {
              navigation.navigate("qrScanning");
            }}
          />
          <Button
            title="Manually Enter Device ID !"
            style={styles.button}
            onPress={() => {
              navigation.navigate("idEnter");
            }}
          />
          <Button title="Logout" onPress={() => logout()} />
        </View>
      ) : (
        <Loading />
      )}
    </LinearGradient>
  );
}

// import React, { useContext } from "react";
// import { View, Text } from "react-native";
// import FormButton from "../components/FormButton";
// import { AuthContext } from "../navigation/AuthProvider";
// import { styles } from "../styles/styles";
// import { Button } from "react-native-paper";
// export default function Home() {
//   const { user, logout } = useContext(AuthContext);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome user {user.uid}</Text>
//       <Button buttonTitle="Logout" onPress={() => logout()} />
//     </View>
//   );
// }
