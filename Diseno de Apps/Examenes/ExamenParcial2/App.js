/** @format */

// App.js
import React from "react";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";

const Stack = createStackNavigator();

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SignIn'>
          <Stack.Screen
            name='SignIn'
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SignUp'
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Home'
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
