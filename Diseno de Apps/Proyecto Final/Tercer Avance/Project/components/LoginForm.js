/** @format */

import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native"; // Importa Text de react-native
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError("Por favor ingresa un usuario y contraseña válidos");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Inicio de sesión exitoso");
        navigation.navigate("Home");
      } else {
        setError(data.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        title='Login'
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: "50%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginForm;
