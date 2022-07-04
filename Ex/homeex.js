import React, { useEffect, useCallback, useState, useRef } from "react";
import styled, { css } from "styled-components/native";
import axios from "axios";
import { showTabV2TabNo1 } from "../constants";

import MainSlide from "../components/MainSlide";
import HomeHeader from "../components/header/HomeHeader";
import { Animated } from "react-native";
import { ListType } from "../constants";
import Loader from "../components/loading/Loader";
import { useNavigation } from "@react-navigation/native";
import { fetchSlideItems } from "../store/Slide";
import { showTabV2 } from "../store/Cate";
import { useQuery } from "@apollo/client";
import Loading from "../components/loading/Loading";
import CateType from "../components/CateType";
import SynopsisDefault from "../components/SynopsisDefault";
import StoryChart from "../components/StoryChart";
import SyGrid from "../components/SyGrid";
import SyFull from "../components/SyFull";
import { useApolloClient } from "../Apollo";

const Home = () => {
	const offset = new Animated.Value(0);
	const navigation = useNavigation();
	const PAGE_REF = useRef(0);
	const [update, setUpdate] = useState(true);
	const client = useApolloClient();

	const {
		loading: sLoading,
		error: sError,
		data: sData,
		refetch: sRefetch,
	} = useQuery(fetchSlideItems, {
		variables: {
			tabNo: showTabV2TabNo1,
		},
		// fetchPolicy: "cache-first", // 첫 번째 실행에 사용
		fetchPolicy: "no-cache",
		// nextFetchPolicy: "cache-first", //
	});

	const {
		loading: cLoading,
		error: cError,
		data: cData,
		fetchMore,
		refetch: cRefetch,
	} = useQuery(showTabV2, {
		variables: {
			//type: "tabNo1",
			tabNo: showTabV2TabNo1,
			page: PAGE_REF.current,
		},
		//onCompleted: () => console.log("onComplete"),

		//fetchPolicy: "network-only", // 첫 번째 실행에 사용
		//fetchPolicy: "network-first",
		//nextFetchPolicy: "cache-first", // 후속 실행에 사용
		//fetchPolicy: "cache-and-network",
	});
	//console.log("cData", cData);
	//console.log("sData", sData);

	if (sLoading !== false) {
		return <Loading></Loading>;
	}
	// if (cLoading !== false) {
	// 	return <Loading></Loading>;
	// }

	return (
		<SafeAreaView>
			{typeof offset !== "number" && (
				<HomeHeader animatedValue={offset}>
					<FlatListContainer
						scrollEventThrottle={16}
						onRefresh={() => {
							PAGE_REF.current = 0;
							sRefetch(), cRefetch();
							client.resetStore();

						}}
						//onEndReachedThreshold={0}
						onEndReached={() => {
							PAGE_REF.current += 1;
							fetchMore({
								showTabV2,
								variables: {
								//	type: "tabNo1",
									tabNo: showTabV2TabNo1,
									page: PAGE_REF.current,
								},

								// updateQuery: (prev, { fetchMoreResult }) => {
								// 	// console.log("fetchMoreResult", fetchMoreResult.showTabV2);
								// 	// console.log("prev", prev.showTabV2);

								// 	if (!fetchMoreResult) return prev;
								// 	const val = Object.assign({}, cData, {
								// 		showTabV2: cData.showTabV2.concat(
								// 			fetchMoreResult.showTabV2
								// 		),
								// 	});
								// 	console.log("val", val);
								// 	return val;
								// },
							}).catch((e) => console.log(e));

							console.log(" PAGE_REF.current", PAGE_REF.current);
							console.log("cData", cData);
						}}
						refreshing={false}
						keyExtractor={(item, index) => item + index}
						// initialNumToRender={2} //초기 랜더링 아이탬 갯수
						// maxToRenderPerBatch={1} // 스크롤시 최대 랜더링 될 아이탬 갯수
						// removeClippedSubviews={false}
						// windowSize={2}'

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
						data={cData?.showTabV2 && cData?.showTabV2}
						renderItem={(item) =>
							item.item === 1 ? (
								<Loader title="리스트 로딩중..." slideHeight={200} />
							) : (
								(item.item &&
									item?.item?.typename === ListType.SYNOPSIS_DEFAULT && (
										<SynopsisDefault syDefault={item?.item}></SynopsisDefault>
									)) ||
								(item?.item?.typename === ListType.STORY_CHART && (
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
//...item?.item,
// ...(item.item.titleUrl && {
// 	titleImage: item.item.titleUrl,
// }),

const SafeAreaView = styled.SafeAreaView`
	background-color: #000;
	color: red;
	flex: 1;
`;
const FlatListContainer = styled.FlatList``;

export default Home;
