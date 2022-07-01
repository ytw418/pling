import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import { useApiState, useDispatch } from "../ContextAPI";
import { useMutation, gql, useQuery } from "@apollo/client";
//import { client } from "../Apollo";
import { useApolloClient } from "../Apollo";
import { showSynopsisDetail } from "../store/SynopsisDetail";
import HomeHeader from "../components/header/HomeHeader";
import { Animated } from "react-native";
import ListHeader from "../components/detailPage/ListHeader";
import { fetchStories } from "../store/fetchStories";
import Loading from "../components/loading/Loading";
import StoriesCard from "../components/card/StoriesCard";

const offset = new Animated.Value(0);

const Detail = ({ navigation, route }) => {
	const [on, setOn] = useState(true);

	useEffect(() => setOn((prev) => !prev), []);

	const { id } = route.params;

	const {
		loading: fsLoading,
		error: fsError,
		data: fsData,
		refetch: fsRefetch,
	} = useQuery(fetchStories, {
		variables: {
			synopsisId: Number(id),
		},
	});

	const {
		loading: sdLoading,
		error: sdError,
		data: sdData,
		refetch: sdRefetch,
	} = useQuery(showSynopsisDetail, {
		variables: {
			id: id,
		},
	});

	if (fsLoading !== false) {
		return <Loading></Loading>;
	}
	if (sdLoading !== false) {
		return <Loading></Loading>;
	}

	return (
		<SafeAreaView>
			{typeof offset !== "number" && (
				<HomeHeader animatedValue={offset}>
					{on ? (
						<Loading />
					) : (
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
							ListHeaderComponent={
								<ListHeader sdData={sdData.showSynopsisDetail}></ListHeader>
							}
							data={fsLoading === false && fsData?.fetchStories}
							renderItem={(item, index) =>
								fsLoading === false &&
								(console.log("item", item),
								(
									<StoriesCard
										poster={item?.item?.poster}
										text={item?.item?.displayGenre}
										description={item?.item?.description}
										audio={item?.item?.audio?.unit}
										synopsisId={item?.item?.synopsisId}
										id={item?.item?.id}
										subtitle={item?.item?.subtitle}
									/>
								))
							}
						/>
					)}
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
	height: 300px;
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

const Ex = styled.Text`
	color: #fff;
	font-size: 16px;
`;

const Image = styled.Image`
	height: 300px;
	width: 300px;
`;

export default Detail;
