import React from "react";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../constants";

const Search = () => {
  return (
    <View>
      <Title>검색 스크린</Title>
    </View>
  );
};

const View = styled.View`
  background-color: #000;
  justify-content: center;
  align-items: center;
  height: ${WINDOW_HEIGHT - 50}px;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export default Search;
