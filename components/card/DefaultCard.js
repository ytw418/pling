import React from "react";
import styled, { css } from "styled-components/native";

const DefaultCard = ({ poster, title, genres }) => {
  return (
    <Card>
      <Image source={{ uri: poster }}></Image>
      <CardTitle>{title}</CardTitle>
      <CardContent>{genres.join(" · ")}</CardContent>
    </Card>
  );
};

const Card = styled.View`
  width: 180px;
  height: 180px;

  margin: 8px 10px 8px 0px;
`;

const CardTitle = styled.Text`
  font-size: 14px;
  color: #fff;
`;
const CardContent = styled.Text`
  font-size: 13px;
  color: gray;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
export default DefaultCard;
