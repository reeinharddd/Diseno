/** @format */

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native-web";

const url = "https://swapi.py4e.com/api/people";

export default function PokeStar() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);
  console.log(error);

  const getContent = () => {
    if (isLoading) {
      return (
        <View>
          <Text>Loading Data</Text>
          <ActivityIndicator
            size='large'
            color='green'
          />
        </View>
      );
    }
    if (error) {
      return <Text>Error</Text>;
    }
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Text>Name: {item.name}</Text>
              <Text>Height: {item.height}</Text>
              <Text>Weight: {item.mass}</Text>
              <Text>Created: {item.created} </Text>
              <Text>Edited: {item.edited} </Text>
            </View>
          )}
        />
      </View>
    );
  };

  return <View>{getContent()}</View>;
}
const styles = StyleSheet.create({
  textProps: {
    fontSize: 20,
    color: "red",
  },
  cardContainer: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Add elevation for shadow effect
    marginTop: 20,
  },
  image: {},
  errorStyle: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
