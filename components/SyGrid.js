import React from "react";
import styled, { css } from "styled-components/native";
import DefaultCard from "./card/DefaultCard";

const SyGrid = (syGrid) => {
	console.log("s그리드드드드드드드드드ㅡㅡ드드", syGrid.syGrid.title);
	return (
		<Container>
			<HeaderTitle>{syGrid.syGrid.title}</HeaderTitle>
			<GridInner>
				{syGrid?.syGrid?.unionList &&
					syGrid?.syGrid?.unionList?.map((item, i) => (
						<DefaultCard
							key={i}
							poster={item?.poster}
							title={item?.title}
							text={item?.text}
							id={item?.id}
							active={item?.active ?? false}
							updatedAt={item?.updatedAt}
						></DefaultCard>
					))}
			</GridInner>
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

const GridInner = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const Text = styled.Text`
	color: #fff;
`;

export default SyGrid;
