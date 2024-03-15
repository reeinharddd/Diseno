/** @format */

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bienvenido Usuario!</Text>
      <Text style={styles.descriptionText}>
        En la barra de navegación que se encuentra en la parte inferior
        encontrarás la información que necesitas.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default HomeScreen;
