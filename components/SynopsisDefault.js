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
            <CardMargin>
              <DefaultCard
                poster={item.poster}
                title={item.title}
                genres={item.genres}
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
