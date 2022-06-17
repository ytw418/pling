import React from "react";
import styled, { css } from "styled-components/native";
import WINDOW_WIDTH from "../../constants";
import { TouchableOpacity } from "react-native";
const HomeHeader = ({ navigation }) => {
  return (
    <Header>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FlingBox");
        }}
      >
        <PointBtn>충전</PointBtn>
      </TouchableOpacity>

      <Search
        onPress={() => {
          navigation.navigate("FlingBox");
        }}
      >
        검색
      </Search>
    </Header>
  );
};

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  top: 0;
  width: ${WINDOW_WIDTH}px;
  width: 100%;

  flex: 1;
  background: #00000000;
  padding: 40px 15px 40px 15px;
`;
const PointBtn = styled.Text`
  color: #fff;
  font-size: 20px;
`;
const Search = styled.Text`
  color: #fff;
  font-size: 20px;
`;
export default HomeHeader;
