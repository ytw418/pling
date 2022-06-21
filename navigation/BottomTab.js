import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../pages/Home";
import Creator from "../pages/Creator";
import FlingBox from "../pages/FlingBox";
import MyDrawer from "../pages/MyDrawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function BottomTab() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			backBehavior="history"
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#000",
					border: "none",
					color: "#ececec",
				},
				tabBarActiveTintColor: "#fff",
				headerShown: false,
				headerBackTitleVisible: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: "Home",
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Creator"
				component={Creator}
				options={{
					tabBarLabel: "Creator",
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="magnify" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="FlingBox"
				component={FlingBox}
				options={{
					tabBarLabel: "FlingBox",
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="play-box-multiple-outline"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="MyDrawer"
				component={MyDrawer}
				options={{
					tabBarLabel: "MyDrawer",
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default BottomTab;
