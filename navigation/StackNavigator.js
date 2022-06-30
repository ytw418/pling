import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Creator from "../pages/Creator";
import PlingBox from "../pages/PlingBox";
import MyDrawer from "../pages/MyDrawer";
import Detail from "../pages/Detail";
import PlingPoint from "../pages/PlingPoint";
import MainScreen from "../navigation/MainScreen";
import Search from "../pages/Search";
import Login from "../pages/login/Login";

const Stack = createStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#000",
					height: 50,
				},
				headerTitleAlign: "left",
				headerTintColor: "#fff",
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
			<Stack.Screen name="PlingBox" component={PlingBox} />
			<Stack.Screen name="MyDrawer" component={MyDrawer} />
			<Stack.Screen name="Detail" component={Detail} />
			<Stack.Screen name="PlingPoint" component={PlingPoint} />
			<Stack.Screen name="Search" component={Search} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
