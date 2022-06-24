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
	cache: new InMemoryCache(),
});
