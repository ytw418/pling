import React from "react";
import styled, { css } from "styled-components/native";

const ChartCard = ({ poster, title, genres, ListNumber }) => {
  return (
    <Card>
      <Image source={{ uri: poster }}></Image>
      <CardListNumber>{`${ListNumber}`}</CardListNumber>
      <CardInner>
        <CardTitle>{title}</CardTitle>
        <CardContent>{genres.join(" · ")}</CardContent>
      </CardInner>
    </Card>
  );
};

const Card = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
  margin: 8px 8px 8px 0px;
`;

const CardInner = styled.View`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.Text`
  font-size: 14px;
  color: #fff;
`;
const CardContent = styled.Text`
  font-size: 13px;
  color: gray;
`;
const CardListNumber = styled.Text`
  width: 60px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 5px;
`;
export default ChartCard;
