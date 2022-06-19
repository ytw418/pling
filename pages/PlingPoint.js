import React from "react";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../constants";

const PlingPoint = () => {
  return (
    <View>
      <Title>플링포인트 충전 스크린</Title>
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
export default PlingPoint;
