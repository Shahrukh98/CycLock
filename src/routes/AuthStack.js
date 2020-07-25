import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
