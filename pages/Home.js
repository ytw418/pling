import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components/native";
import axios from "axios";
import SynopsisDefault from "../components/SynopsisDefault";
import StoryChart from "../components/StoryChart";
import getEnvVars from "../environment";
import SyGrid from "../components/SyGrid";
import SyFull from "../components/SyFull";
import MainSlide from "../components/MainSlide";
import { useApiState, useDispatch } from "../ContextAPI";
import HomeHeader from "../components/header/HomeHeader";
import ListLoading from "../components/loading/ListLoading";
import SlideLoading from "../components/loading/SlideLoading";
import Loading from "../components/loading/Loading";
import { Animated } from "react-native";
import { ListType } from "../constants";
import Loader from "../components/loading/Loader";

const Home = ({ navigation, route }) => {
	const { APIURL, APIKEY } = getEnvVars();
	const dispatch = useDispatch();
	const state = useApiState();
	const AUTH_TOKEN = APIKEY;

	const offset = new Animated.Value(0);

	const getMainApi = async () => {
		try {
			axios.defaults.baseURL = APIURL;
			axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
			axios.defaults.headers.post["Content-Type"] = "application/json";
			axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
			const [slidesResult, cateResult] = await Promise.all([
				axios.get("test-slides"),
				axios.get("test-categories"),
			]);

			if (slidesResult) {
				console.log("slidesResult.status", slidesResult.status);
				dispatch({
					type: "HOME_LODGING_SLIDES",
					slides: slidesResult?.data?.data,
				});
			}

			if (cateResult) {
				console.log("cateResult.status", cateResult.status);
				dispatch({
					type: "HOME_LODGING_CATE",
					cate: cateResult?.data?.data,
				});
			}
		} catch (error) {
			console.log("error :>> ", error);
		}
		console.log("api호출");
	};

	useEffect(() => {
		getMainApi();
		return () => {
			getMainApi();
		};
	}, []);

	// const { data, error } = useQuery(GQL_API, {
	//   ...params,
	// });

	return state.home ? (
		<SafeAreaView>
			{typeof offset !== "number" && (
				<HomeHeader animatedValue={offset}>
					<FlatListContainer
						scrollEventThrottle={16}
						onRefresh={getMainApi}
						refreshing={false}
						// getItemLayout={(data, index) => ({
						//   length: 300,
						//   offset: 300 * index,
						//   index,
						// })}
						keyExtractor={(item, index) => item + index}
						// initialNumToRender={2} //초기 랜더링 아이탬 갯수
						// maxToRenderPerBatch={1} // 스크롤시 최대 랜더링 될 아이탬 갯수
						// removeClippedSubviews={false}
						// windowSize={2}
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
							state?.home?.slides
								? MainSlide(state?.home?.slides)
								: SlideLoading()
						}
						data={state?.home?.cate ? state?.home?.cate : [1]}
						renderItem={(item) =>
							item.item === 1 ? (
								// <ListLoading/>
								<Loader text="로딩중.." color={"#000"} />
							) : (
								(item?.item?.listType === ListType.SYNOPSIS_DEFAULT && (
									<SynopsisDefault
										navigation={navigation}
										syDefault={item?.item}
									></SynopsisDefault>
								)) ||
								(item?.item?.listType === "STORY_CHART" && (
									<StoryChart stChart={item?.item}></StoryChart>
								)) ||
								(item?.item?.listType === "SYNOPSIS_GRID" && (
									<SyGrid syGrid={item?.item}></SyGrid>
								)) ||
								(item?.item?.listType === "SYNOPSIS_FULL" && (
									<SyFull syFull={item?.item}></SyFull>
								))
							)
						}
					/>
				</HomeHeader>
			)}
		</SafeAreaView>
	) : (
		<Loading></Loading>
	);
};
const SafeAreaView = styled.SafeAreaView`
	background-color: #000;
	color: red;
`;
const FlatListContainer = styled.FlatList``;

export default Home;
