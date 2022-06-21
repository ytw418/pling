import React from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import HomeHeader from "../components/header/HomeHeader";
const Creator = () => {
	return (
		<HomeHeader animatedValue={offset}>
			<Text>creator</Text>
		</HomeHeader>
	);
};

// {typeof offset !== "number" && (
//   <HomeHeader animatedValue={offset}></HomeHeader>
// )}
export default Creator;
