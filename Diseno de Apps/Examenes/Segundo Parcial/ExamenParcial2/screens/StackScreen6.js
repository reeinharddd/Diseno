/** @format */

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const url = "https://jsonplaceholder.typicode.com/todos";

const StackScreen6 = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoading(false);
          setData(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const getContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.textSize}>Loading data...</Text>
          <ActivityIndicator
            color='red'
            size='large'
          />
        </View>
      );
    }
    if (error) {
      return <Text style={styles.textSize}>Error: {error}</Text>;
    }
    return (
      <FlatList
        data={data.filter((item) => item.completed === true)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>User ID: {item.userId}</Text>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>
              Completed: {item.completed.toString()}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatlistContainer}
      />
    );
  };

  return <View>{getContent()}</View>;
};

const styles = StyleSheet.create({
  textSize: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});

export default StackScreen6;
