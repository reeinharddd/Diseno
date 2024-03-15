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

const StackScreen1 = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setData(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  const renderLoading = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.text}>Loading data...</Text>
      <ActivityIndicator
        color='red'
        size='large'
      />
    </View>
  );

  const renderError = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.text}>Error: {error}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>ID: {item.id}</Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return renderLoading();
    }
    if (error) {
      return renderError();
    }
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatlistContainer}
      />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginVertical: 10,
  },
});

export default StackScreen1;
