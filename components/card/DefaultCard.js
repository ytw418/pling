import React from "react";
import styled, { css } from "styled-components/native";
import { DEFAULT_CARD_WIDTH } from "../../constants";
import { TouchableOpacity } from "react-native";
const DefaultCard = ({ poster, title, genres, id, navigation, active }) => {
  console.log("active", active);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", {
          poster: poster,
          title: title,
          genres: genres,
          id: id,
          active: active,
        });
      }}
    >
      <Card>
        <Image source={{ uri: poster }}></Image>
        <CardTitle active={active}>{title}</CardTitle>
        <CardContent>{genres.join(" · ")}</CardContent>
      </Card>
    </TouchableOpacity>
  );
};

const Card = styled.View`
  width: ${DEFAULT_CARD_WIDTH}px;
  margin: 8px 0px 8px 0px;
`;

const CardTitle = styled.Text`
  font-size: 14px;
  color: ${(props) => (props.active ? "red" : "#fff")};
`;
const CardContent = styled.Text`
  font-size: 13px;
  color: gray;
`;
const Image = styled.Image`
  width: ${DEFAULT_CARD_WIDTH}px;
  height: ${DEFAULT_CARD_WIDTH}px;
  border-radius: 15px;
`;
export default DefaultCard;
