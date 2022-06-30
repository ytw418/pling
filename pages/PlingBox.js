import React from "react";
import styled from "styled-components/native";
import HomeHeader from "../components/header/HomeHeader";
import { WINDOW_HEIGHT } from "../constants";
const PlingBox = () => {
	return (
		<HomeHeader headerTitle={"PlingBox"}>
			<View>
				<Title>PlingBox</Title>
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
export default PlingBox;
