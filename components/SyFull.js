import React from "react";
import styled, { css } from "styled-components/native";
import FullCard from "./card/FullCard";

const SyFull = (syFull) => {
	//	console.log("s그리드드드드드드드드드ㅡㅡ드드", syFull.syFull.unionList);
	return (
		<Container>
			<HeaderTitle>{syFull.syFull.title}</HeaderTitle>
			<GridInner
				horizontal
				data={syFull?.syFull?.unionList}
				renderItem={({ item }) => <FullCard poster={item.poster}></FullCard>}
			></GridInner>
		</Container>
	);
};

const Container = styled.View`
	margin-bottom: 30px;
	display: flex;
	padding: 0px 10px 0px 10px;
`;
const HeaderTitle = styled.Text`
	font-size: 18px;
	color: #fff;
`;

const GridInner = styled.FlatList`
	display: flex;
	flex-direction: row;
`;

const Text = styled.Text`
	color: #fff;
`;

export default SyFull;
