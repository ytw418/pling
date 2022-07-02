import React from "react";
import styled from "styled-components/native";
import HomeHeader from "../components/header/HomeHeader";
import { WINDOW_HEIGHT } from "../constants";
import { useQuery } from "@apollo/client";
import { fetchSlideItems } from "../store/Slide";
const PlingBox = () => {
	const {
		loading: sLoading,
		error: sError,
		data: sData,
		refetch: sRefetch,
	} = useQuery(fetchSlideItems, {
		variables: {
			tabNo: 1,
		},
		fetchPolicy: "network-only",
	});

	console.log("sData", sData);

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
