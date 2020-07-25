import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import qrScanning from "../screens/qrScanning";
import Payment from "../screens/Payment";
import btScreen from "../screens/btScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="btScreen" component={btScreen} />
      <Stack.Screen name="qrScanning" component={qrScanning} />
    </Stack.Navigator>
  );
}
