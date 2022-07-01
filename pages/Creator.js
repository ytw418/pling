import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../constants";
import { useApiState, useDispatch } from "../ContextAPI";
import axios from "axios";
import { isLoggedInVar } from "../store/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userData } from "../store/Login";
import { useReactiveVar } from "@apollo/client";

const Creator = () => {
	const user = useReactiveVar(userData);


	const logOut = async () => {
		try {
			await AsyncStorage.removeItem("@storage_Key");
			userData([]);
			isLoggedInVar(false);
			console.log(user);

			console.log("로그아웃");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<HomeHeader headerTitle={"creator"}>
			<View>
				<Title>creator</Title>
				<BtnView onPress={() => logOut()}>
					<Title>로그아웃</Title>
				</BtnView>
			</View>
		</HomeHeader>
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
const BtnView = styled.TouchableHighlight`
	height: 200px;
	width: 100px;
	background-color: aqua;
`;

export default Creator;
