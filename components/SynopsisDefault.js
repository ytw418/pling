import React from "react";
import styled, { css } from "styled-components/native";
import DefaultCard from "./card/DefaultCard";

const SynopsisDefault = ({ syDefault }) => {

//console.log("syDefault", syDefault);

	return (
		<Container>
			<HeaderTitle>{syDefault?.title ?? " "}</HeaderTitle>
			{syDefault && (
				<SynopsisSlide
					horizontal
					data={syDefault?.unionList}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item, key }) => (
						<CardMargin>
							<DefaultCard
								id={item?.id}
								srcId={item?.srcId}
								isLiked={item?.srcIsLiked}
								poster={item?.poster}
								title={item?.title}
								text={item?.text}
								active={item?.active ?? false}
								updatedAt={item?.updatedAt}
							/>
						</CardMargin>
					)}
				></SynopsisSlide>
			)}
		</Container>
	);
};

const Container = styled.View`
	background: #000;
	height: 300px;
	padding: 0px 10px 0px 10px;
`;
const HeaderTitle = styled.Text`
	font-size: 18px;
	color: #fff;
`;
const SynopsisSlide = styled.FlatList``;
const CardMargin = styled.View`
	margin-right: 10px;
`;

export default SynopsisDefault;
