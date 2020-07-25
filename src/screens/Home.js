import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../routes/AuthProvider";
import { styles } from "../styles/styles";
import Loading from "./Loading";
import firestore from "@react-native-firebase/firestore";
export default function Home({ navigation }) {
  const {
    user,
    userData,
    userName,
    setUserName,
    userBalance,
    btStatus,
    isPending,
    setBluetooth,
    setScanned,
    setUserBalance,
    setUserData,
    logout,
  } = useContext(AuthContext);

  async function dataRead() {
    try {
      const userRetrieve = await firestore()
        .collection("Users")
        .doc(user.uid)
        .get();
      if (userRetrieve._data === undefined) {
        await firestore()
          .collection("Users")
          .doc(user.uid)
          .set({ name: userName, balance: 50 });
        const ReUserRetrieve = await firestore()
          .collection("Users")
          .doc(user.uid)
          .get();
        setUserData(ReUserRetrieve);

        setUserBalance(ReUserRetrieve._data.balance);
        setUserName(ReUserRetrieve._data.name);
      } else {
        setUserData(userRetrieve);
        setUserBalance(userRetrieve._data.balance);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function dataWrite() {
    try {
      const userRetrieve = await firestore()
        .collection("Users")
        .doc(user.uid)
        .get();
      console.log(userRetrieve._data.balance);
      if (userRetrieve._data.balance > 49) {
        await firestore()
          .collection("Users")
          .doc(user.uid)
          .update({ balance: userRetrieve._data.balance - 50 });
        navigation.navigate("btScreen");
      } else {
        console.log("Not enough balance!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    dataRead();
  }, []);

  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      {userData ? (
        <View>
          <Text style={styles.welcome}>Welcome {userData._data.name}</Text>
          <Text style={styles.welcome}>
            Your current balance is {userData._data.balance}
          </Text>

          <TouchableOpacity
            style={styles.newbutton}
            onPress={() => {
              dataWrite();
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: "#fff",
                fontWeight: "bold",
                alignSelf: "center",
                textTransform: "uppercase",
              }}
            >
              Pay and Go !
            </Text>
          </TouchableOpacity>

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
