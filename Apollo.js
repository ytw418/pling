import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
	ApolloLink,
	concat,
	HttpLink,
} from "@apollo/client";
import { getEnvVars } from "./environment";
import { createContext, useContext } from "react";
const { APIURL, APIKEY } = getEnvVars();
const AUTH_TOKEN = APIKEY;

const httpLink = new HttpLink({
	uri: APIURL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers

	operation.setContext({
		headers: {
			authorization: `Bearer ${AUTH_TOKEN}`,
		},
	});
	return forward(operation);
});
export const client = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	connectToDevTools: true,
	cache: new InMemoryCache(),
});

const ApolloContext = createContext(client);

// 커스텀 hook 과 에러처리 구문
export function useApolloClient() {
	const context = useContext(ApolloContext);
	if (!context) {
		throw new Error("Cannot find aProvider");
	}
	return context;
}
