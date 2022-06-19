import React from "react";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../../constants";
const HomeEr = () => {
  return (
    <View>
      <Title>홈화면 데이터 로딩 실패</Title>
    </View>
  );
};

const View = styled.View`
  background-color: #000;
  justify-content: center;
  align-items: center;
  height: ${WINDOW_HEIGHT}px;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export default HomeEr;
