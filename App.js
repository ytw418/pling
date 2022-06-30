import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./navigation/BottomTab";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import { Provider } from "./ContextAPI";
import StackNavigator from "./navigation/StackNavigator";
import MainBlock from "./navigation/MainBlock";
import { client } from "./Apollo";
import React, { useCallback, useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View } from "react-native";
import Login from "./pages/login/Login";
import Loading from "./components/loading/Loading";
import { isLoggedInVar } from "./store/Login";
import { userData } from "./store/Login";
import { useReactiveVar } from "@apollo/client";

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
	// request-graphql
	//console.log("client", client);
	// client.query(...) == fetch or axios

	const [appIsReady, setAppIsReady] = useState(false);
	const isLogin = useReactiveVar(isLoggedInVar);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@storage_Key");
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {}
	};
	useEffect(() => {
		const prepare = async () => {
			try {
				await SplashScreen.preventAutoHideAsync();
				//await new Promise((resolve) => setTimeout(resolve, 1000));
				await Font.loadAsync(Entypo.font);
				const getUser = await getData();
				console.log("getUser", getUser);
				if (getUser?.success) {
					userData(getUser);
					isLoggedInVar(true);
				}
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
				//SplashScreen.hideAsync();
			}
		};

		prepare();
	}, []);

	if (!appIsReady) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			{isLogin ? (
				<ApolloProvider client={client}>
					<Provider>
						<ThemeProvider theme={theme}>
							<NavigationContainer>
								<StatusBar style="light" translucent />
								<StackNavigator />
							</NavigationContainer>
						</ThemeProvider>
					</Provider>
				</ApolloProvider>
			) : (
				<Login />
			)}
		</View>
	);
}
