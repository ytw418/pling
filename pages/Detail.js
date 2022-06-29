import React from "react";
import styled, { css } from "styled-components/native";
import { useApiState, useDispatch } from "../ContextAPI";
import { useMutation, gql, useQuery } from "@apollo/client";
//import { client } from "../Apollo";
import { useApolloClient } from "../Apollo";
import { showSynopsisDetail } from "../store/SynopsisDetail";
import HomeHeader from "../components/header/HomeHeader";
import { Animated } from "react-native";
import ListHeader from "../components/detailPage/ListHeader";
const offset = new Animated.Value(0);

const Detail = ({ navigation, route }) => {
	const { poster, title, genres, id, srcId, isLiked } = route.params;
	const client = useApolloClient();
	const CREATE_LIKE_MUTATION = gql`
		mutation toggleLikeStory {
			toggleLikeStory(storyId:${srcId})
		}
	`;
	console.log("id", id);

	const {
		loading: sdLoading,
		error: sdError,
		data: sdData,
		refetch: sdRefetch,
	} = useQuery(showSynopsisDetail, {
		variables: {
			id: id, // props.id
		},
	});

	console.log("sdData", sdData);
	console.log("sdError", sdError);

	return (
		<SafeAreaView>
			{typeof offset !== "number" && (
				<HomeHeader animatedValue={offset}>
					<FlatListContainer
						scrollEventThrottle={16}
						onRefresh={() => {
							sdRefetch();
						}}
						refreshing={false}
						keyExtractor={(item, index) => item + index}
						onEndReached={() => console.log("offset", offset)}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: {
											y: offset,
										},
									},
								},
							],
							{ useNativeDriver: false }
						)}
						ListHeaderComponent={ListHeader(
							sdData?.showSynopsisDetail,
							navigation
						)}
						data={[0]}
						renderItem={(item) => <Text>aa</Text>}
					/>
				</HomeHeader>
			)}
		</SafeAreaView>
	);
};

const SafeAreaView = styled.SafeAreaView`
	background-color: #000;
	color: red;
`;
const FlatListContainer = styled.FlatList``;

const Container = styled.View`
	background: #000;
	padding: 30px;
`;

const Button = styled.Button`
	flex: 1;
	height: 110px;
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text`
	margin-bottom: 150px;
	color: #fff;
	font-size: 16px;
`;
const Image = styled.Image`
	height: 300px;
	width: 300px;
`;

export default Detail;
