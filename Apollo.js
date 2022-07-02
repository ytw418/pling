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
import { userData } from "./store/Login";
const { APIURL } = getEnvVars();

const httpLink = new HttpLink({
	uri: APIURL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	const AUTH_TOKEN = userData().token;
	operation.setContext({
		headers: {
			...(AUTH_TOKEN && { authorization: `Bearer ${AUTH_TOKEN}` }),
		},
	});
	return forward(operation);
});

export const client = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	connectToDevTools: true,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					showTabV2: {
						keyArgs: false,
						merge(existing = [], incoming) {
							return [...existing, ...incoming];
						},
					},
				},
			},
		},
	}),
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
