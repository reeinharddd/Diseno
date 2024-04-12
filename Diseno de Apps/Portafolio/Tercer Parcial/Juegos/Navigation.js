/** @format */

import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";
import Screen5 from "./screens/Screen5";

const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen name='HomeScreen' component={HomeScreen} />
      <stack.Screen name='Screen2' component={Screen2} />
    </stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={MyStack} headersShown={false} />
      <Tab.Screen name='Screen2' component={MyStack} headersShown={false} />
      <Tab.Screen name='Screen3' component={MyStack} headersShown={false} />
      <Tab.Screen name='Screen4' component={MyStack} headersShown={false} />
      <Tab.Screen name='Screen5' component={MyStack} headersShown={false} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
