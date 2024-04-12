/** @format */

import react from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({}) {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.text}>Screen2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignContent: "center",
  },
  textTouch: {
    fontSize: 16,
    color: "white",
    alignItems: "center",
  },
  buttonOp: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: "20%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
