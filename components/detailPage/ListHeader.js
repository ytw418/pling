import React, { useState } from "react";
import {
	Text,
	Alert,
	Dimensions,
	StyleSheet,
	View,
	Image,
	TouchableHighlight,
} from "react-native";
import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { WINDOW_WIDTH } from "../../constants";
import { useApolloClient } from "../../Apollo";
import { useMutation, gql } from "@apollo/client";
import Loading from "../loading/Loading";

const ListHeader = ({ sdData }) => {
	const [line, setLine] = useState(3);
	const [isActivated, setIsActivated] = useState(false);
	const client = useApolloClient();
	const {
		actors,
		authorId,
		commentsCount,
		description,
		hasAudio,
		id,
		latestPayment,
		note,
		poster,
		previewUrl,
		srcIsLiked,
		srcLikeCount,
		summary,
		srcId,
		text,
		title,
		updatedAt,
		viewCount,
		writers,
		__typename,
		SynopsisComment,
	} = sdData;
	console.log("srcId", srcId);
	console.log("srcIsLiked", srcIsLiked);
	console.log("srcLikeCount", srcLikeCount);
	console.log("SynopsisComment", SynopsisComment);

	const handleLine = () => {
		isActivated ? setLine(2) : setLine(Number.MAX_SAFE_INTEGER);
		setIsActivated((prev) => !prev);
	};
	const alert = () =>
		Alert.alert("팝업", poster, [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "OK", onPress: () => console.log("OK Pressed") },
		]);

	const CREATE_LIKE_MUTATION = gql`
		mutation toggleLikeStory {
			toggleLikeStory(storyId: ${srcId})
		}
	`;

	const [isLike, { data, loading, error, reset }] = useMutation(
		CREATE_LIKE_MUTATION,
		{
			update: (cache, data) => {
				console.log(data?.data?.toggleLikeStory);
				if (data?.data?.toggleLikeStory) {
					console.log("캐쉬쓰기 시작");

					client.writeFragment({
						id: `Synopsis:${id}`,
						fragment: gql`
							fragment updateLike on Synopsis {
								srcIsLiked
								srcLikeCount
							}
						`,
						data: {
							srcIsLiked: !srcIsLiked,
							srcLikeCount: srcIsLiked ? srcLikeCount - 1 : srcLikeCount + 1,
						},
					});
				}
			},
		}
	);

	// console.log("data", data);
	// console.log("error", error);

	return (
		<View style={styles.slide}>
			<LinearGradient
				start={{ x: 1, y: 1 }}
				end={{ x: 1, y: 0.5 }}
				colors={["rgba(0,0,0,1)", "transparent"]}
			>
				<Image
					style={styles.posterImage}
					accessibilityHint="이미지로딩실패"
					source={{ uri: poster }}
				></Image>
			</LinearGradient>
			<Main>
				<AbsolView>
					<Title>{title}</Title>
					<RowBlock>
						<CText>{text}</CText>
						<RowBlockSub>
							<Touch onPress={() => alert()}>
								<TouchIcon>공유</TouchIcon>
							</Touch>
							<Touch onPress={() => alert()}>
								<TouchIcon>댓글</TouchIcon>
							</Touch>
							<TouchIcon>{commentsCount}</TouchIcon>
							<Touch onPress={isLike}>
								<TouchIcon>{srcIsLiked ? "취소" : "좋아요"}</TouchIcon>
							</Touch>
							<TouchIcon>{srcLikeCount}</TouchIcon>
						</RowBlockSub>
					</RowBlock>
				</AbsolView>

				<Genre>sexual</Genre>
				<RowBlockSub>
					<WriterOrActor>작가: {writers}</WriterOrActor>
					<WriterOrActor>출연: {actors?.join(" ")}</WriterOrActor>
				</RowBlockSub>
				<Text
					style={styles.description}
					numberOfLines={line}
					ellipsizeMode="tail"
				>
					{description ?? "not found"}
				</Text>
				<Touch onPress={() => handleLine()}>
					<GrayText>더보기</GrayText>
				</Touch>
				<RowBlock>
					<SubPlayerView>
						<SubPlayer>미리듣기</SubPlayer>
					</SubPlayerView>
					<PlayerView>
						<Player>재생</Player>
					</PlayerView>
				</RowBlock>
				<WhiteText>회차</WhiteText>
			</Main>
		</View>
	);
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	slide: {
		position: "relative",
	},
	container: { flex: 1, backgroundColor: "#000", width: width },
	child: { width },
	description: {
		fontSize: 13,
		textAlign: "left",
		color: "#fff",
		paddingTop: 10,
	},
	text: {
		fontSize: 13,
		textAlign: "left",
		color: "rgb(46, 239, 170) ",
		paddingTop: 10,
		paddingBottom: 35,
	},
	posterImage: { width: width, height: 400, zIndex: -1 },
	titleUrl: { width: width, height: 400, position: "absolute" },
});

const AbsolView = styled.View`
	position: absolute;
	top: -50px;
	flex-direction: column;
	flex: 1;
	padding: 0px 10px 0px 10px;
	width: ${WINDOW_WIDTH}px;
`;

const Title = styled.Text`
	font-size: 20px;
	color: #fff;
`;
const CText = styled.Text`
	font-size: 13px;
	color: rgb(46, 239, 170);
`;
const RowBlock = styled.View`
	flex-direction: row;
	display: flex;
	justify-content: space-between;
	flex: 1;
	padding-top: 10px;
	padding-bottom: 10px;
`;

const RowBlockSub = styled.View`
	flex-direction: row;
`;

const Touch = styled.TouchableHighlight`
	padding: 0;
	margin: 0;

	width: 40px;
	margin-left: 10px;
`;
const TouchIcon = styled.Text`
	color: #fff;
	font-size: 13px;
	text-align: center;
`;
const WriterOrActor = styled.Text`
	color: gray;
	font-size: 10px;
	margin-right: 5px;
`;
const Genre = styled.Text`
	color: gray;
	font-size: 11px;
`;
const Main = styled.View`
	padding: 0px 10px 0px 10px;
	width: ${WINDOW_WIDTH}px;
	position: relative;
`;
const GrayText = styled.Text`
	color: gray;
	font-size: 12px;
`;
const PlayerView = styled.View`
	height: 30px;
	border-radius: 10px;
	background-color: gray;
	align-items: center;
	justify-content: center;
	width: ${WINDOW_WIDTH * 0.65}px;
`;
const Player = styled.Text`
	color: #fff;
	font-size: 15px;
`;
const SubPlayerView = styled.View`
	height: 30px;
	border-radius: 10px;
	background-color: gray;
	align-items: center;
	justify-content: center;
	width: ${WINDOW_WIDTH * 0.25}px;
`;
const SubPlayer = styled.Text`
	color: #fff;
	font-size: 15px;
`;
const WhiteText = styled.Text`
	padding-top: 30px;
	color: #fff;
	font-size: 19px;
`;

export default ListHeader;
