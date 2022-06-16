import React from "react";
import styled, { css } from "styled-components/native";
import DefaultCard from "./card/DefaultCard";
import { Alert } from "react-native";

const SyGrid = (syGrid) => {
  console.log("s그리드드드드드드드드드ㅡㅡ드드", syGrid.syGrid.title);
  return (
    <Container>
      <HeaderTitle>{syGrid.syGrid.title}</HeaderTitle>
      <GridInner>
      {syGrid?.syGrid &&
        syGrid?.syGrid?.list?.map((item,i) => (
          <DefaultCard
          key={i}
            poster={item.poster}
            title={item.title}
            genres={item.genres}
          ></DefaultCard>
        ))}
        </GridInner>
    </Container>
  );
};

const Container = styled.View`
margin-bottom: 30px;
display: flex;


`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  color: #fff;
`;

const GridInner = styled.View`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;

`

const Text = styled.Text`
  color: #fff;
`;

export default SyGrid;
