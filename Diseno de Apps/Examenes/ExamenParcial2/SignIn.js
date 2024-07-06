/** @format */

// SignIn.js
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Input, Button, Text, Card } from "@ui-kitten/components";
import { firebase } from "./firebaseConfig";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card} disabled>
        <Text category='h1' style={styles.header}>
          Sign In
        </Text>
        <Input
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <Input
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text status='danger'>{error}</Text> : null}
        <Button style={styles.button} onPress={handleSignIn}>
          Sign In
        </Button>
        <Button
          appearance='ghost'
          onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Button>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    margin: 2,
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
});

export default SignIn;
