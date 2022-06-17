import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Creator from "../pages/Creator";
import FlingBox from "../pages/FlingBox";
import MyDrawer from "../pages/MyDrawer";
import Detail from "../pages/Detail";
import A from "../pages/A";
import MainScreen from "../navigation/MainScreen";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          height: 110,
        },
        headerTitleAlign: "left",
        headerTintColor: "#000",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="MainScreen"
        options={{
          headerShown: false,
        }}
        component={MainScreen}
      />
      <Stack.Screen name="Creator" component={Creator} />
      <Stack.Screen name="FlingBox" component={FlingBox} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="A" component={A} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
