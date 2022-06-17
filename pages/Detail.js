import React from "react";
import styled, { css } from "styled-components/native";
import { useApiState, useDispatch } from "../ContextAPI";

const Detail = ({ navigation, route }) => {
  const { poster, title, genres, id, active } = route.params;
  const dispatch = useDispatch();
  const state = useApiState();

  //console.log("state", state.home.cate);
  return (
    <Container>
      <ScrollView>
        <Image source={{ uri: poster }}></Image>
        <Text>categoryTitle: {title}</Text>
        <Text>title: {genres}</Text>
        <Text>id: {id}</Text>
        <Button
          title={active ? "취소" : "좋아요"}
          active={active}
          color={active ? "red" : "gray"}
          onPress={async () => {
            await dispatch({
              type: "CARD_LIKE",
              id: id,
            });

            navigation.navigate("Home");
          }}
        ></Button>
      </ScrollView>
    </Container>
  );
};
//
const Container = styled.View`
  background: #000;
  padding: 30px;
`;

const Button = styled.Button`
  flex: 1;
  height: 110px;
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text`
  margin-bottom: 150px;
  color: #fff;
  font-size: 16px;
`;
const Image = styled.Image`
  height: 300px;
  width: 300px;
`;

export default Detail;
