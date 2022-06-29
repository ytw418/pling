import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./navigation/BottomTab";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import { Provider } from "./ContextAPI";
import StackNavigator from "./navigation/StackNavigator";
import MainBlock from "./navigation/MainBlock";
import { client } from "./Apollo";
import React, { useContext } from "react";
import { ApolloProvider } from "@apollo/client";

export default function App() {
	// request-graphql
	//console.log("client", client);
	// client.query(...) == fetch or axios

	return (
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
	);
}
