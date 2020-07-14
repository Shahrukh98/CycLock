import React, { useState, useContext } from "react";
import { AuthContext } from "../routes/AuthProvider";
import { View, Text, Button, TextInput } from "react-native";
import { styles } from "../styles//styles";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userName, setUserName, register } = useContext(AuthContext);
  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <TextInput
        value={name}
        placeholderText="Name"
        onChangeText={(userName) => setName(userName)}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.textinput}
      />
      <TextInput
        value={email}
        placeholderText="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        style={styles.textinput}
      />
      <TextInput
        value={password}
        placeholderText="Password"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
        style={styles.textinput}
      />
      <View>
        <Button
          style={styles.button}
          title="Sign Up !"
          onPress={() => {
            try {
              register(email, password);
              setUserName(name);
              console.log(usrName);
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <Button
          style={styles.button}
          title="Already Registered? Sign in!"
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
      </View>
    </LinearGradient>
  );
}
