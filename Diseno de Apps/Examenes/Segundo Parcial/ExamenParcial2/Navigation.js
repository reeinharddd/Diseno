import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import StackScreen1 from "./screens/StackScreen1";
import StackScreen2 from "./screens/StackScreen2";
import StackScreen3 from "./screens/StackScreen3";
import StackScreen4 from "./screens/StackScreen4";
import StackScreen5 from "./screens/StackScreen5";
import StackScreen6 from "./screens/StackScreen6";
import StackScreen7 from "./screens/StackScreen7";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return(
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name="pendientes(Solo ID's)" component={StackScreen1} />
      <Tab.Screen name="pendientes (ID's y Titles)" component={StackScreen2} />
      <Tab.Screen name="pendientes sin resolver(ID y Title)" component={StackScreen3} />
      <Tab.Screen name="pendientes resueltos(ID y Title)" component={StackScreen4} />
      <Tab.Screen name="pendientes (ID's y userId)" component={StackScreen5} />
      <Tab.Screen name="pendientes resueltos(ID y UserID)" component={StackScreen6} />
      <Tab.Screen name="pendientes sin resolver(ID y UserID)" component={StackScreen7} />
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