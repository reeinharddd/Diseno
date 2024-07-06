/** @format */

// Home.js
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button, Card } from "@ui-kitten/components";
import { firebase } from "./firebaseConfig";

const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate("SignIn");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("SignIn");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card} disabled>
        {user ? (
          <Text category='h1'>Welcome, {user.email}</Text>
        ) : (
          <Text>Loading...</Text>
        )}
        <Button style={styles.button} onPress={handleSignOut}>
          Sign Out
        </Button>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 2,
    padding: 16,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 8,
  },
});

export default Home;
