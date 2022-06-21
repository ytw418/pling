import React from "react";
import styled, { css } from "styled-components/native";

const Block = styled.View`
	background: #000;
`;
const SafeAreaView = styled.SafeAreaView``;
function MainBlock({ children }) {
	return <Block>{children}</Block>;
}

export default MainBlock;
