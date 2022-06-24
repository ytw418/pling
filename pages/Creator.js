import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled from "styled-components/native";
import { WINDOW_HEIGHT } from "../constants";
import { useApiState, useDispatch } from "../ContextAPI";
import axios from "axios";
import { isLoggedInVar } from "../Apollo";
// AsyncStorage

import { useQuery, gql, useReactiveVar, useApolloClient } from "@apollo/client";
import { AsyncStorage } from "react-native";

const getShowSynopsisDetail = gql`
	query showSynopsisDetail($id: ID!) {
		showSynopsisDetail(id: $id) {
			id
			title
			text
			commentsCount
			srcLikeCount
			srcRating
			stories {
				id
				subtitle
				audioUrl
				rent
				perm
				displayGenre
				description
				synopsis {
					id
					title
				}
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

	const { loading, error, data } = useQuery(getShowSynopsisDetail, {
		variables: {
			// id: +props.id
			id: 435, // props.id
		},
		onCompleted: (cache, data) => {
			console.log(data);
			// 좋아상태 !isLiked
			cache.modify({
				id: `Story:1236`, // Synopsis:435 cache key 메모리 주소
				data: {
					isLiked: (prev) => !prev,
				},
			});

			cache.clear();
		},
	});

	return (
		<HomeHeader headerTitle={"creator"}>
			<View>
				<Title>creator</Title>
				{(loading && <Title>로당중</Title>) ||
					(error && <Title>에러</Title>) ||
					(data && <Title>{data.showSynopsisDetail.id}</Title>)}
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
