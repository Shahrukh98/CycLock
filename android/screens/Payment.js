import React, { useContext } from "react";
import { AuthContext } from "../routes/AuthProvider";
import { Text, View, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../styles/styles";
import firestore from "@react-native-firebase/firestore";

export default function Payment({ navigation }) {
  const { userName, userBalance, setUserBalance } = useContext(AuthContext);

  async function updateBal() {
    await firestore()
      .collection("Users")
      .doc(user.uid)
      .update({
        balance: userBalance - 10,
      });
    setUserBalance(userbalance - 10);
  }

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <Text style={styles.welcome}>Welcome {userName}</Text>
      <Text style={styles.welcome}>Your current balance is {userBalance}</Text>
      <Button
        title="Pay"
        style={styles.button}
        onPress={() => {
          updateBal();
          console.log("User has ", userBalance, " in their account!");
          navigation.navigate("BlueTooth");
        }}
      />
    </LinearGradient>
  );
}
