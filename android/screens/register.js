import React from "react";
import { View, Button, Text } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import * as firebase from "firebase";

export default class login extends React.Component({ navigation }) {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  }

  onSignUpPress() {
    this.state({ error: "", loading: true });
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.state({ error: "", loading: false });
        navigation.navigate("Payment");
      })
      .catch(() => {
        this.state({ error: "Registration Failed", loading: false });
      });
  }

  renderButton() {
    if (this.state.loading) {
      return <Text>Loading</Text>;
    }
    return (
      <View>
        <Button title="Sign Up" onPress={this.onSignUpPress.bind(this)} />
      </View>
    );
  }

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={(email) => this.state({ email })} />
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(password) => this.state({ password })} />
        {this.renderButton()}
      </View>
    );
  }
}
