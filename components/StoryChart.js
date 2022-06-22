import React from "react";
import styled, { css } from "styled-components/native";
import ChartCard from "../components/card/ChartCard";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { PAGE_SIZE } from "../constants";
const StoryChart = ({ stChart }) => {
	// const arr = stChart[0]?.list;
	// const list = arr.map(
	//   (val, i) =>
	//     i % PAGE_SIZE === 0 && {
	//       page: i / PAGE_SIZE,r
	//       list: arr.slice(i, i + PAGE_SIZE),
	//     }
	// );

	const arr = stChart?.list;
	const list = arr
		.map(
			(_, i, origin) => i % PAGE_SIZE === 0 && origin.slice(i, i + PAGE_SIZE)
		)
		.filter((val) => val.length === PAGE_SIZE);

	return (
		<Container>
			<HeaderTitle>{stChart?.title}</HeaderTitle>
			{stChart !== null && (
				<SwiperFlatList>
					{list.map((data, i) => (
						<StChartSlide
							key={i}
							// horizontal
							data={data}
							renderItem={({ item, index }) => (
								<ChartCard
									ListNumber={(index + 1) * (i + 1)}
									poster={item?.poster}
									title={item?.synopsis?.title}
									genres={item?.synopsis?.genres}
									updatedAt={item?.updatedAt}
									id={item?.synopsis?.id ? item?.synopsis?.id : item?.id}
									active={item?.active ?? false}
								/>
							)}
						></StChartSlide>
					))}
				</SwiperFlatList>
			)}
		</Container>
	);
};

const Container = styled.View`
	background: #000;
	//margin: 10px;
	height: 500px;
	padding: 0px 10px 0px 10px;
`;
const HeaderTitle = styled.Text`
	font-size: 18px;
	color: #fff;
	margin-bottom: 15px;
`;
const StChartSlide = styled.FlatList``;

export default StoryChart;
