/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";
import Aprobadas from "./Aprobadas";
import Pendientes from "./Pendientes";
import Desaprobadas from "./Desaprobadas";
import CerrarSesion from "./Cerrarsesion";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          const { firstName } = JSON.parse(userData);
          setUsername(firstName);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={(props) => (
        <CustomDrawerContent {...props} username={username} />
      )}>
      <Drawer.Screen
        name='Home'
        component={() => <HomeContent username={username} />}
      />
      <Drawer.Screen name='Aprobadas' component={Aprobadas} />
      <Drawer.Screen name='Pendientes' component={Pendientes} />
      <Drawer.Screen name='Desaprobadas' component={Desaprobadas} />
      <Drawer.Screen name='Cerrar Sesión' component={CerrarSesion} />
    </Drawer.Navigator>
  );
};

const HomeContent = ({ username }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.welcomeText, { color: colors.text }]}>
        ¡Bienvenido, {username}!
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => handleBoxPress("Aprobadas")}>
        <Text style={styles.buttonText}>Solicitudes Aprobadas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => handleBoxPress("Pendientes")}>
        <Text style={styles.buttonText}>Solicitudes Pendientes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => handleBoxPress("Desaprobadas")}>
        <Text style={styles.buttonText}>Solicitudes Desaprobadas</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = ({ navigation, username }) => {
  const { colors } = useTheme();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          const { profilePic } = JSON.parse(userData);
          setProfilePic(profilePic);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("sessionToken");
      await AsyncStorage.removeItem("user");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: colors.surface }}>
      <View style={styles.drawerHeader}>
        <Avatar.Image
          size={64}
          source={<FontAwesome name='user' size={64} color='black' />}
        />
        <Text style={[styles.drawerHeaderText, { color: colors.text }]}>
          {username}
        </Text>
      </View>
      <DrawerItem
        label='Home'
        onPress={() => navigation.navigate("Home")}
        inactiveTintColor={colors.text}
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label='Solicitudes Aprobadas'
        onPress={() => navigation.navigate("Aprobadas")}
        inactiveTintColor={colors.text}
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label='Solicitudes Pendientes'
        onPress={() => navigation.navigate("Pendientes")}
        inactiveTintColor={colors.text}
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label='Solicitudes Desaprobadas'
        onPress={() => navigation.navigate("Desaprobadas")}
        inactiveTintColor={colors.text}
        activeTintColor={colors.primary}
      />
      <View style={styles.divider}></View>
      <DrawerItem
        label='Cerrar Sesión'
        onPress={handleLogout}
        inactiveTintColor={colors.text}
        activeTintColor={colors.primary}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginVertical: 10,
    width: "60%",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  drawerHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  drawerHeaderText: {
    fontSize: 18,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});

export default HomeScreen;
