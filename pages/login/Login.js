import React, { useState, useEffect } from "react";
import useInputs from "../../hooks/useInputs";
import styled from "styled-components/native";
import { GraphQLClient, gql } from "graphql-request";
import { getEnvVars } from "../../environment";
import { isLoggedInVar } from "../../store/Login";
import { userData } from "../../store/Login";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
	// const [{ snsId, password }, onChange, reset] = useInputs({
	// 	email: " ",
	// 	password: " ",
	// });

	// const loginApp = gql`
	// 	mutation loginApp {
	// 		loginApp(snsId:  "snsId":"local:1614506197409") {
	// 			token
	// 			user {
	// 				snsId
	// 			}
	// 			success
	// 			error
	// 		}
	// 	}
	// `;
	// const [mutateFunction, { data, loading, error }] = useMutation(loginApp);

	// console.log("data", data);
	// console.log("loading", loading);
	// console.log("error", error);

	// const [{ snsId, password }, onChange, reset] = useInputs({
	// 	email: " ",
	// 	password: " ",
	// });

	// const loginApp = gql`
	// 	mutation loginApp {
	// 		loginApp(snsId:  "snsId":"local:1614506197409") {
	// 			token
	// 			user {
	// 				snsId
	// 			}
	// 			success
	// 			error
	// 		}
	// 	}
	// `;
	// const [mutateFunction, { data, loading, error }] = useMutation(loginApp);

	// console.log("data", data);
	// console.log("loading", loading);
	// console.log("error", error);
	const { APIURL, APIKEY } = getEnvVars();
	const endpoint = APIURL;

	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {
			authorization: APIKEY,
		},
	});
	const loginApp = gql`
		mutation loginApp($snsId: String!) {
			loginApp(snsId: $snsId) {
				token
				user {
					snsId
				}
				success
				error
			}
		}
	`;
	const variables = {
		snsId: "local:1614506197409",
	};

	const setStorageKey = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem("@storage_Key", jsonValue);
		} catch (e) {}
	};

	const login = async () => {
		try {
			const data = await graphQLClient.request(loginApp, variables);
			console.log("data: ", data?.loginApp);

			setStorageKey(data?.loginApp);
			isLoggedInVar(true);
			console.log("isLoggedInVar", isLoggedInVar());

			userData(data?.loginApp);
		} catch (e) {
			console.log(e);
		}
	};
	const logOut = async () => {
		try {
			await AsyncStorage.removeItem("@storage_Key");
			userData(null);
			isLoggedInVar(false);
			console.log("isLoggedInVar", isLoggedInVar());
			console.log("로그아웃");
		} catch (e) {
			console.log(e);
		}
	};

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@storage_Key");

			return jsonValue != null
				? console.log(" JSON.parse(jsonValue)", JSON.parse(jsonValue))
				: console.log("스토리지 null");
		} catch (e) {
			// error reading value
		}
	};

	return (
		<Container>
			<LoginBtn onPress={() => login()} title={"로그인버튼"}></LoginBtn>
			<LoginBtn onPress={() => logOut()} title={"로그아웃 버튼"}></LoginBtn>
			<LoginBtn
				onPress={() => getData()}
				title={"스토리지 확인 버튼"}
			></LoginBtn>
			{/* <Text>{{}}</Text>
			<Text>{{}}</Text>
			<Text>{{}}</Text> */}
		</Container>
	);
};

const Container = styled.View`
	height: 500px;
`;
const LoginBtn = styled.Button``;

const Text = styled.Text`
	color: #000;
	font-size: 20px;
	text-align: center;
`;

export default Login;
