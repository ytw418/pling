import React from "react";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const HomeHeader = ({ navigation }) => {
  return (
    <Header>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PlingPoint");
        }}
      >
        <Entypo name="app-store" color={"#fff"} size={26} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <MaterialCommunityIcons name="magnify" color={"#fff"} size={26} />
      </TouchableOpacity>
    </Header>
  );
};

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100%;
  flex: 1;
  background: #00000000;
  padding: 40px 15px 40px 15px;
`;

export default HomeHeader;
