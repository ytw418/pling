import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../../constants";

const Loader = ({ title, slideHeight }) => {
	return (
		<View slideHeight={slideHeight}>
			<Title>{title}</Title>
		</View>
	);

	// Loader.propTypes = {
	// 	title: PropTypes.string.isRequired,
	// };
};

const View = styled.View`
	background-color: #000;
	justify-content: center;
	align-items: center;
	height: ${(props) =>
		props.slideHeight ? props.slideHeight : WINDOW_HEIGHT - 50}px;
`;
const Title = styled.Text`
	color: #fff;
	font-size: 18px;
`;

export default Loader;
