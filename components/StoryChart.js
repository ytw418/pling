import React from "react";
import styled, { css } from "styled-components/native";
import ChartCard from "../components/card/ChartCard";
import { SwiperFlatList } from "react-native-swiper-flatlist";
const StoryChart = ({ stChart }) => {
  //console.log("인기순위", stChart[0]?.list);

  const division = (arr, ListNumber) => {
    //console.log("stChart[0]?.list", stChart[0]?.list);
    const length = arr.length;
    const divide =
      Math.floor(length / ListNumber) +
      (Math.floor(length % ListNumber) > 0 ? 1 : 0);
    const newArray = [];

    for (let i = 0; i <= divide; i++) {
      // arr 0부터 ListNumber 잘라 새 arr에 넣기
      newArray.push(arr.splice(0, ListNumber));
    }

    return newArray;
  };

  const list = division(stChart[0]?.list, 5);

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
