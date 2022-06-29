import React, { useEffect, useCallback, useState, useRef } from "react";
import styled, { css } from "styled-components/native";
import axios from "axios";
import SynopsisDefault from "../components/SynopsisDefault";
import StoryChart from "../components/StoryChart";
import { getEnvVars } from "../environment";
import SyGrid from "../components/SyGrid";
import SyFull from "../components/SyFull";
import MainSlide from "../components/MainSlide";
import { useApiState, useDispatch } from "../ContextAPI";
import HomeHeader from "../components/header/HomeHeader";
import { Animated } from "react-native";
import { ListType } from "../constants";
import Loader from "../components/loading/Loader";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SectionList } from "react-native-web";
import { fetchSlideItems } from "../store/Slide";
import { showTabV2 } from "../store/Cate";

import { useQuery, gql, useReactiveVar, useApolloClient } from "@apollo/client";
const Home = ({ route }) => {
	const [appIsReady, setAppIsReady] = useState(false);
	const dispatch = useDispatch();
	const state = useApiState();
	const { APIURL, APIKEY } = getEnvVars();
	const AUTH_TOKEN = APIKEY;
	const offset = new Animated.Value(0);
	const navigation = useNavigation();

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
			// if (cateResult) {
			// 	console.log("slidesResult.status", cateResult.status);
			// 	await dispatch({
			// 		type: "HOME_LODGING_CAT",
			// 		slides: slidesResult?.data?.data,
			// 	});
			// }
			if (cateResult) {
				console.log("cateResult.status", cateResult.status);
				dispatch({
					type: "HOME_LODGING_CATE",
					cate: cateResult?.data?.data,
				});
			}
			await axios.get("test-slides").then((slidesResult) =>
				dispatch({
					type: "HOME_LODGING_SLIDES",
					slides: slidesResult?.data?.data,
				})
			);
		} catch (error) {
			console.log("error :>> ", error);
		}
		console.log("api호출");
	};

	const {
		loading: sLoading,
		error: sError,
		data: sData,
		refetch: sRefetch,
	} = useQuery(fetchSlideItems, {
		variables: {
			// id: +props.id
			tabNo: 1, // props.id
		},
	});

	const {
		loading: cLoading,
		error: cError,
		data: cData,
		refetch: cRefetch,
	} = useQuery(showTabV2, {
		variables: {
			tabNo: 1,
			page: 0,
		},
	});

	//console.log("cData?.showTabV2?.unionList", cData?.showTabV2);

	// 로그인 API 성공콜백에서 상태 변경 시
	// fn(() => {
	// 	setAppIsReady(!appIsReady);
	// 	setAppIsReady((prev) => !prev);
	// SectionList((prev) => (prev ? [...prev, newObj] : {}));
	// });

	// const { data, error } = useQuery(GQL_API, {
	//   ...params,
	// });
	// const onLayoutRootView = useCallback(async () => {
	// 	if (appIsReady) {
	// 		// This tells the splash screen to hide immediately! If we call this after
	// 		// `setAppIsReady`, then we may see a blank screen while the app is
	// 		// loading its initial state and rendering its first pixels. So instead,
	// 		// we hide the splash screen once we know the root view has already
	// 		// performed layout.
	// 		await SplashScreen.hideAsync();
	// 	}
	// }, [appIsReady]);

	// useEffect(() => {
	// 	const prepare = async () => {
	// 		try {
	// 			// Keep the splash screen visible while we fetch resources
	// 			await SplashScreen.preventAutoHideAsync();
	// 			// Pre-load fonts, make any API calls you need to do here
	// 			//		await Font.loadAsync(Entypo.font);
	// 			//await getMainApi();
	// 			// Artificially delay for two seconds to simulate a slow loading
	// 			// experience. Please remove this if you copy and paste the code!
	// 			//	await new Promise((resolve) => setTimeout(resolve, 2000));
	// 		} catch (e) {
	// 			console.warn(e);
	// 		} finally {
	// 			// Tell the application to render
	// 			setAppIsReady(true);
	// 			//	SplashScreen.hideAsync();
	// 		}
	// 	};

	// 	prepare();
	// }, []);

	// if (!appIsReady) {
	// 	return null;
	// }

	//	onLayout={onLayoutRootView}

	return (
		<SafeAreaView>
			{typeof offset !== "number" && (
				<HomeHeader animatedValue={offset}>
					<FlatListContainer
						scrollEventThrottle={16}
						onRefresh={() => {
							sRefetch(), cRefetch();
						}}
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
						// windowSize={2}'

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
							sData?.fetchSlideItems
								? MainSlide(sData?.fetchSlideItems, navigation)
								: Loader({ title: "슬라이드 로딩중...", slideHeight: 500 })
						}
						data={cData?.showTabV2 ? cData?.showTabV2 : [1]}
						renderItem={(item) =>
							item.item === 1 ? (
								<Loader title="리스트 로딩중..." slideHeight={200} />
							) : (
								(item.item &&
									item?.item?.typename === ListType.SYNOPSIS_DEFAULT && (
										<SynopsisDefault
											syDefault={
												item?.item
												//...item?.item,
												// ...(item.item.titleUrl && {
												// 	titleImage: item.item.titleUrl,
												// }),
											}
										></SynopsisDefault>
									)) ||
								(item?.item?.typename === "Story_chart" && (
									<StoryChart stChart={item?.item}></StoryChart>
								)) ||
								(item?.item?.typename === ListType.SYNOPSIS_GRID && (
									<SyGrid syGrid={item?.item}></SyGrid>
								)) ||
								(item?.item?.typename === ListType.SYNOPSIS_FULL && (
									<SyFull syFull={item?.item}></SyFull>
								))
							)
						}
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

export default Home;
