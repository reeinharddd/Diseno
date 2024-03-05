/** @format */

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native-web";

const url = "https://swapi.dev/api/people";

export default function PokeStar() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(
        (result) => {
          setData(result);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      );
  }, []);

  console.log(data);
  console.log(error);

  return (
    <View>
      <Text style={styles.textProps}>Loading data</Text>
      <ActivityIndicator
        size='large'
        color='#0000ff'
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textProps: {
    fontSize: 20,
    color: "red",
  },
});
