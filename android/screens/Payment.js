import React, { useContext } from "react";
import { AuthContext } from "../routes/AuthProvider";
import { Text, View, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "../styles/styles";

export default function Payment({ navigation }) {
  const { UserData } = useContext(AuthContext);

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <Button
        title="Pay"
        style={styles.button}
        onPress={() => {
          firestore()
            .collection("Users")
            .doc(user.uid)
            .update({
              balance: balance - 10,
            })
            .then(() => {
              console.log("User has ", 50, " in their account!");
              navigation.navigate("BlueTooth");
            });
        }}
      />
    </LinearGradient>
  );
}
