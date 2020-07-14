import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "../styles/styles";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646ee" />
    </View>
  );
}
