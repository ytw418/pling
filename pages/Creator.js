import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../constants";

const Creator = () => {
	return (
		<HomeHeader headerTitle={"creator"}>
			<View>
				<Title>creator</Title>
			</View>
		</HomeHeader>
	);
};
const View = styled.View`
	background-color: #000;
	justify-content: center;
	align-items: center;
	height: ${WINDOW_HEIGHT - 50}px;
`;
const Title = styled.Text`
	color: #fff;
	font-size: 18px;
`;
// {typeof offset !== "number" && (
//   <HomeHeader animatedValue={offset}></HomeHeader>
// )}
export default Creator;
