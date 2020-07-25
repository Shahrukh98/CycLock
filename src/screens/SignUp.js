import React, { useState, useContext } from "react";
import { AuthContext } from "../routes/AuthProvider";
import { View, Text, Button, TextInput } from "react-native";
import { styles } from "../styles//styles";
import LinearGradient from "react-native-linear-gradient";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName, register } = useContext(AuthContext);
  return (
    <LinearGradient colors={["#c53364", "#5b247a"]} style={styles.container}>
      <TextInput
        value={name}
        placeholder="Name"
        onChangeText={(userName) => setName(userName)}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.textinput}
      />
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        style={styles.textinput}
      />
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
        style={styles.textinput}
      />
      <View>
        <Button
          style={styles.button}
          title="Sign Up !"
          onPress={() => {
            setUserName(name);
            try {
              register(email, password);
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
