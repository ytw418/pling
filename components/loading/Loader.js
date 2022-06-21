import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../../constants";

const Loader = ({ text, color = "#fafafa" }) => {
  return (
    <View>
      <Title color={color}>{text}</Title>
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
  color: ${(props) => (props.color ? props.color : "#FFF")};
  font-size: 18px;
`;

Loader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loader;
