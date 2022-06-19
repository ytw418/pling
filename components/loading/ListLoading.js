import React from "react";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../../constants";

const ListLoading = () => {
  return (
    <View>
      <Title>리스트 로딩중</Title>
    </View>
  );
};

const View = styled.View`
  background-color: #000;
  justify-content: center;
  align-items: center;
  height: ${WINDOW_HEIGHT / 2}px;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export default ListLoading;
