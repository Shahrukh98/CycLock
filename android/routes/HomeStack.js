import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import qrScanning from "../screens/qrScanning";
import idEnter from "../screens/idEnter";
import Payment from "../screens/Payment";
import BlueTooth from "../screens/BlueTooth";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="qrScanning" component={qrScanning} />
      <Stack.Screen name="idEnter" component={idEnter} />
      <Stack.Screen name="Pay" component={Payment} />
      <Stack.Screen name="Tog" component={BlueTooth} />
    </Stack.Navigator>
  );
}
