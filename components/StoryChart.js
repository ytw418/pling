import React from "react";
import styled, { css } from "styled-components/native";
import ChartCard from "../components/card/ChartCard";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { PAGE_SIZE } from "../constants";
const StoryChart = ({ stChart }) => {
  //console.log("인기순위", stChart[0]?.list);

  // const arr = stChart[0]?.list;
  // const list = arr.map(
  //   (val, i) =>
  //     i % PAGE_SIZE === 0 && {
  //       page: i / PAGE_SIZE,
  //       list: arr.slice(i, i + PAGE_SIZE),
  //     }
  // );
  // console.log("list : ", list);
  const arr = stChart[0]?.list;
  const list = arr
    .map(
      (_, i, origin) => i % PAGE_SIZE === 0 && origin.slice(i, i + PAGE_SIZE)
    )
    .filter((val) => val.length === PAGE_SIZE);
  console.log("list : ", list);

  return (
    <Container>
      <HeaderTitle>{stChart[0]?.title}</HeaderTitle>
      {stChart !== null && (
        <SwiperFlatList>
          {list.map((data, i) => (
            <StChartSlide
              key={i}
              // horizontal
              data={data}
              renderItem={({ item, index }) => (
                <ChartCard
                  ListNumber={index}
                  poster={item?.poster}
                  title={item?.synopsis?.title}
                  genres={item?.synopsis?.genres}
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
  margin: 10px;
  height: 500px;
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
`;
const StChartSlide = styled.FlatList``;

export default StoryChart;
