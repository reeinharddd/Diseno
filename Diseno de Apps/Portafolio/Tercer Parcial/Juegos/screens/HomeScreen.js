/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Axios from "axios";

export default function HomeScreen() {
  const [games, setGames] = useState([]);
  const url = "http://localhost:8080/https://www.freetogame.com/api/games";

  useEffect(() => {
    Axios.get(url)
      .then((response) => response.data)
      .then((json) => {
        console.log("json", json);
        setGames(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Title: {item.title}</Text>
      <Text style={styles.text}>Description: {item.short_description}</Text>
      <Text style={styles.text}>Genre: {item.genre}</Text>
      <Image style={styles.image} source={{ uri: item.thumbnail }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
