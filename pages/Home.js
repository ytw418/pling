import React, { useEffect, useCallback, useState, useRef } from "react";
import styled, { css } from "styled-components/native";
import axios from "axios";
import { showTabV2TabNo1 } from "../constants";
import { tabNoType } from "../constants";
import { SlideTabNo } from "../constants";
import MainSlide from "../components/MainSlide";
import HomeHeader from "../components/header/HomeHeader";
import { Animated } from "react-native";
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
import { showTabV2TabNo1LastPage } from "../store/Cate";

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
			tabNo: SlideTabNo.TAB_NO_1,
		},
		// fetchPolicy: "cache-first", // 첫 번째 실행에 사용
		//fetchPolicy: "no-cache",
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
			//	type: tabNoType.TAB_NO_1,
			tabNo: showTabV2TabNo1,
			page: PAGE_REF.current,
		},
		onCompleted: () => console.log("showTabV2 호출완료"),
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
							showTabV2TabNo1LastPage(true);
							client.resetStore();
						}}
						//onEndReachedThreshold={0}
						onEndReached={() => {
							if (showTabV2TabNo1LastPage()) {
								PAGE_REF.current += 1;
								fetchMore({
									showTabV2,
									variables: {
										//	type: tabNoType.TAB_NO_1,
										tabNo: showTabV2TabNo1,
										page: PAGE_REF.current,
									},
								}).catch((e) => console.log(e));

								console.log(" PAGE_REF.current", PAGE_REF.current);
							} else
								console.log(
									" showTabV2TabNo1LastPage 추가 호출 없음: ",
									showTabV2TabNo1LastPage()
								);
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
								<CateType item={item}></CateType>
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
