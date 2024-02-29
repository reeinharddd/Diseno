/** @format */

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

const url = "https://fakestoreapi.com/products";

useState;

export default function Products() {
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
        <View>
          <Text style={styles.textSize}>Loading Data</Text>
          <ActivityIndicator
            size='large'
            color='red'
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
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return <View>{getContent()}</View>;
}

const styles = StyleSheet.create({
  textSize: {
    fontSize: 20,
  },
});
