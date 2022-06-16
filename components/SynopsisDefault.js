import React from "react";
import styled, { css } from "styled-components/native";
import DefaultCard from "./card/DefaultCard";

const SynopsisDefault = ({ syDefault }) => {
  return (
    <Container>
      <HeaderTitle>{syDefault?.title}</HeaderTitle>
      {syDefault && (
        <SynopsisSlide
          horizontal
          data={syDefault?.list}
          renderItem={({ item }) => (
            <DefaultCard
              poster={item.poster}
              title={item.title}
              genres={item.genres}
            />
          )}
        ></SynopsisSlide>
      )}
    </Container>
  );
};

const Container = styled.View`
  background: #000;
  margin: 10px;
  height: 300px;
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  color: #fff;
`;
const SynopsisSlide = styled.FlatList``;

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

export default SynopsisDefault;
