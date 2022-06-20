import React from "react";
import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
const ChartCard = ({ poster, title, genres, ListNumber, updatedAt }) => {
  console.log("Date.now() - updatedAt =", (Date.now() - updatedAt) / 1000);

  return (
    <Card>
      <Image source={{ uri: poster }}></Image>
      <ListNumberBlock>
        <CardListNumber>{ListNumber}</CardListNumber>
        {(Date.now() - updatedAt) / 1000 < 86400 * 30 && <NewText>New</NewText>}
      </ListNumberBlock>
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
  height: 70px;
  margin: 8px 0px 8px 0px;
  width: ${Dimensions.get("window").width}px;
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
const ListNumberBlock = styled.View`
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
const CardListNumber = styled.Text`
  width: 60px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
const NewText = styled.Text`
  color: rgb(46, 239, 170);
  font-size: 13px;
`;
const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 5px;
`;
export default ChartCard;
