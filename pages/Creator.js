import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../constants";
import { useApiState, useDispatch } from "../ContextAPI";
import axios from "axios";
import { isLoggedInVar } from "../store/Login";
// AsyncStorage

import { useQuery, gql, useReactiveVar, useApolloClient } from "@apollo/client";
import { AsyncStorage } from "react-native";

const fetchSlideItems = gql`
	query fetchSlideItems($tabNo: Int!) {
		fetchSlideItems(tabNo: $tabNo) {
			__typename
			... on Poll {
				id
				title
				titleUrl
				description
				text
				poster
				note
				reward
			}
			... on Category {
				id
				title
				titleUrl
				description
				text
				poster
				note
			}
			... on Synopsis {
				id
				title
				titleUrl
				description
				text
				poster
				note
				srcId
				isOrigin
				author {
					id
					name
					thumbnail
				}
			}
			... on Plinist {
				id
				title
				titleUrl
				description
				text
				poster
				note
				channelName
				youtube
				user {
					id
					name
					thumbnail
				}
			}
			... on Product {
				id
				title
				titleUrl
				description
				text
				poster
				note
			}
			... on Event {
				id
				title
				titleUrl
				description
				text
				poster
				note
				url
				promo
				model
				targetId
				color
			}
		}
	}
`;

const Creator = () => {
	const client = useApolloClient();
	const dispatch = useDispatch();
	const state = useApiState();

	const isLogin = useReactiveVar(isLoggedInVar);

	console.log("isLoggedInVar", isLogin ? "참" : "거짓");

	const { loading, error, data } = useQuery(fetchSlideItems, {
		variables: {
			// id: +props.id

			tabNo: 1, // props.id
		},
		// onCompleted: (cache, data) => {
		// 	console.log(data);
		// 	// 좋아상태 !isLiked
		// 	cache.modify({
		// 		id: `Story:1236`, // Synopsis:435 cache key 메모리 주소
		// 		data: {
		// 			isLiked: (prev) => !prev,
		// 		},
		// 	});

		// 	cache.clear();
		// },
	});
	console.log("data", data);

	return (
		<HomeHeader headerTitle={"creator"}>
			<View>
				<Title>creator</Title>
				{(loading && <Title>로당중</Title>) ||
					(error && <Title>에러</Title>) ||
					(data && <Title>{}</Title>)}
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
// {typeof offset !== "number" && (
//   <HomeHeader animatedValue={offset}></HomeHeader>
// )}
export default Creator;
