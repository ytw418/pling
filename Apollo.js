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
import { showTabV2TabNo1 } from "./constants";
import { tabNoType } from "./constants";
import { showTabV2TabNo1LastPage } from "./store/Cate";
import { showTabV2TabNo2LastPage } from "./store/Cate";
import { showTabV2TabNo3LastPage } from "./store/Cate";

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

// export const client = new ApolloClient({
// 	link: concat(authMiddleware, httpLink),
// 	connectToDevTools: true,
// 	cache: new InMemoryCache({
// 		typePolicies: {
// 			Query: {
// 				fields: {
// 					showTabV2: {
// 						keyArgs: false,
// 						merge(existing = [], incoming) {
// 							return [...existing, ...incoming];
// 						},
// 					},
// 				},
// 			},
// 		},
// 	}),
// });

export const client = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	connectToDevTools: true,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					showTabV2: {
						keyArgs: ["tabNo"],

						merge(existing = [], incoming,options) {
							if (incoming.length === 0) {
								options.args.tabNo === 1  && showTabV2TabNo1LastPage(false)
								options.args.tabNo === 2  && showTabV2TabNo1LastPage(false)
								options.args.tabNo === 3  && showTabV2TabNo3LastPage(false)
								console.log("TAB_NO_1신규 데이터 없음 ");
							//	return [...existing, {stop : true}];
							}
							console.log("TAB_NO_1카테고리 리스트 추가 ");
					
							
							return [...existing, ...incoming];
						},
					},
					// showTabV2: {
					// 	keyArgs: [tabNoType.TAB_NO_2],
					// 	merge(existing = [], incoming) {
					// 		if (incoming.length === 0) {
					// 			showTabV2TabNo1LastPage(false)
					// 			console.log("TAB_NO_2신규 데이터 없음 ");
							
					// 		}
					// 		console.log("TAB_NO_2카테고리 리스트 추가 ");
					// 		return [...existing, ...incoming];
					// 	},
					// },
					

					

					


					// showTabV2: {
					// 	keyArgs: ["tabNo2"],
					// 	merge(existing = [], incoming) {
					// 		if (!Array.isArray(incoming)) {
					// 			// todo...
					// 			return [...existing];
					// 		}
					// 		return [...existing, ...incoming];
					// 	},
					// },
					// showTabV2: {
					// 	keyArgs: ["tabNo3"],
					// 	merge(existing = [], incoming) {
					// 		if (!Array.isArray(incoming)) {
					// 			// todo...
					// 			return [...existing];
					// 		}
					// 		return [...existing, ...incoming];
					// 	},
					// },
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
