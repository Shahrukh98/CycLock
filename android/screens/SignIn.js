import React, { useState, useContext } from "react";
import { AuthContext } from "../routes/AuthProvider";
import { View, Text, Button, TextInput } from "react-native";
import { styles } from "../styles//styles";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userData } = useContext(AuthContext);
  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
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
          title="Sign In !"
          onPress={() => {
            try {
              login(email, password);
            } catch (e) {
              console.log(e);
            }
          }}
        />
        <Button
          title="Not Registered? Sign Up!"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
    </LinearGradient>
  );
}
