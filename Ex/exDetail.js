import React from "react";
import styled, { css } from "styled-components/native";
import { useApiState, useDispatch } from "../ContextAPI";
import { useMutation, gql } from "@apollo/client";
//import { client } from "../Apollo";
import { useApolloClient } from "../Apollo";

const Detail = ({ navigation, route }) => {
	const { poster, title, genres, id, srcId, isLiked } = route.params;
	const client = useApolloClient();
	//const storyId = storyId:${id};
	const CREATE_LIKE_MUTATION = gql`
		mutation toggleLikeStory {
			toggleLikeStory(storyId:${srcId})
		}
	`;
	console.log("id", id);
	console.log("srcId", srcId);

	const toggleLike = () => {};

	const [isLike, { data, loading, error, reset }] = useMutation(
		CREATE_LIKE_MUTATION,
		{
			update: (cache, data) => {
				console.log("캐쉬업데이트 시작");
				client.writeFragment({
					id: `Synopsis:${id}`,
					fragment: gql`
						fragment updateLike on Synopsis {
							srcIsLiked
						}
					`,
					data: {
						srcIsLiked: !loadLike.srcIsLiked,
					},
				});
				//	console.log("cache", cache);
				// cache.modify({
				// 	id: `Synopsis:${id}`,
				// 	fields: {
				// 		//	isLiked: (prev) => !prev,
				// 		srcIsLiked(prev) {
				// 			return !prev;
				// 		},
				// 	},
				// });
				console.log("isLiked", isLiked);
			},
		}
	);

	// //fetchPolicy: "",
	// //refetchQueries 쿼리데이터 다시 가져오기
	// update: (cache, data) => {
	// 	if (data?.toggleLikeStory) {
	// 		// 좋아요 상태로
	// 		console.log("data", data);
	// 	}
	// 	// id=  `Story:${storyId}`
	// 	// isLiked: (prev) => !prev
	// 	// cache.modify({
	// 	// 	fields: {
	// 	// 		// todos(existingTodos = []) {
	// 	// 		// 	const newTodoRef = cache.writeFragment({
	// 	// 		// 		data: addTodo,
	// 	// 		// 		fragment: gql`
	// 	// 		// 			fragment NewTodo on Todo {
	// 	// 		// 				id
	// 	// 		// 				type
	// 	// 		// 			}
	// 	// 		// 		`,
	// 	// 		// 	});
	// 	// 		// 	return [...existingTodos, newTodoRef];
	// 	// 		// },
	// 	// 	},
	// 	// });
	// },

	const loadLike = client.readFragment({
		id: `Synopsis:${id}`,
		fragment: gql`
			fragment loadLike on Synopsis {
				srcId
				srcIsLiked
			}
		`,
	});

	// const updateLike = () =>
	// 	client.writeFragment({
	// 		id: `Story:${id}`,
	// 		fragment: gql`
	// 			fragment updateLike on Story {
	// 				isLiked
	// 			}
	// 		`,
	// 		data: {
	// 			isLiked: !loadLike,
	// 		},
	// 	});

	console.log("랜더링 시작 ");

	//console.log("state", state.home.cate);
	return (
		<Container forceInset={{ top: "always" }}>
			<ScrollView>
				<Image source={{ uri: poster }}></Image>
				<Text>categoryTitle: {title}</Text>
				<Text>title: {`${loadLike.srcIsLiked}`}</Text>
				<Text>id: {id}</Text>
				<Button
					title={loadLike.srcIsLiked ? "취소" : "좋아요"}
					color={loadLike.srcIsLiked ? "red" : "gray"}
					onPress={isLike}
				></Button>
				<Button
					title={loadLike.srcIsLiked ? "취소" : "좋아요"}
					color={loadLike.srcIsLiked ? "red" : "gray"}
					onPress={isLike}
				></Button>
				<Button
					title={"콘솔버튼"}
					color={loadLike.srcIsLiked ? "red" : "gray"}
				></Button>
			</ScrollView>
		</Container>
	);
};
//
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
