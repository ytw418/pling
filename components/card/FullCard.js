import React from "react";
import styled, { css } from "styled-components/native";
import { FULL_CARD_WIDTH } from "../../constants";
const FullCard = ({ poster }) => {
  return (
    <Card>
      <Image source={{ uri: poster }}></Image>
    </Card>
  );
};

const Card = styled.View`
  width: ${FULL_CARD_WIDTH}px;
  margin: 8px 10px 8px 0px;
`;

const Image = styled.Image`
  width: ${FULL_CARD_WIDTH}px;
  height: 400px;
  border-radius: 15px;
`;

// story {
//   subtitle
//   synopsisId
//   synopsis {
//     id
//     title
//     ...synopsis
//   }
// }

export default FullCard;
