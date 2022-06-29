import React, { useState } from "react";
import {
	Text,
	Dimensions,
	StyleSheet,
	View,
	Image,
	TouchableHighlight,
} from "react-native";
import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { WINDOW_WIDTH } from "../../constants";

const ListHeader = (sdData, navigation) => {
	const [line, setLine] = useState(3);
	const [isActivated, setIsActivated] = useState(false);
	const handleLine = () => {
		isActivated ? setLine(2) : setLine(Number.MAX_SAFE_INTEGER);
		setIsActivated((prev) => !prev);
	};
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
					source={{ uri: sdData?.poster }}
				></Image>
			</LinearGradient>
			<Main>
				<AbsolView>
					<Title>{sdData?.title}</Title>
					<RowBlock>
						<CText>{sdData?.text}</CText>
						<RowBlockSub>
							<Touch onPress={{}}>
								<TouchIcon>공유</TouchIcon>
							</Touch>
							<Touch>
								<TouchIcon>댓글</TouchIcon>
							</Touch>
							<TouchIcon>{sdData?.commentsCount}</TouchIcon>
							<Touch>
								<TouchIcon>좋아요</TouchIcon>
							</Touch>
							<TouchIcon>{sdData?.srcLikeCount}</TouchIcon>
						</RowBlockSub>
					</RowBlock>
				</AbsolView>

				<Genre>sexual</Genre>
				<RowBlockSub>
					<WriterOrActor>작가: {sdData?.writers}</WriterOrActor>
					<WriterOrActor>출연: {sdData?.actors.join(" ")}</WriterOrActor>
				</RowBlockSub>
				<Text
					style={styles.description}
					numberOfLines={line}
					ellipsizeMode="tail"
				>
					{sdData?.description ?? "not found"}
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
`;

const RowBlockSub = styled.View`
	flex-direction: row;
`;

const Touch = styled.TouchableHighlight`
	padding: 0;
	margin: 0;
`;
const TouchIcon = styled.Text`
	color: #fff;
	font-size: 13px;
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
	color: #fff;
	font-size: 19px;
`;

export default ListHeader;
