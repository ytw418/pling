import React, { useState } from "react";
import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { WINDOW_WIDTH } from "../../constants";
import BottomModal from "../modal/BottomModal";
import { TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ChartCard = ({
	poster,
	title,
	genres,
	ListNumber,
	updatedAt,
	id,
	active,
}) => {
	//console.log("Date.now() - updatedAt =", (Date.now() - updatedAt) / 1000);
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();
	// console.log("id", id);
	// console.log("active", active);

	return (
		<Card>
			<TouchableHighlight
				onPress={() => {
					navigation.navigate("Detail", {
						poster: poster,
						title: title,
						genres: genres,
						id: id,
						active: active,
					});
				}}
			>
				<Inner>
					<BottomModal
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						poster={poster}
						title={title}
						genres={genres}
					></BottomModal>
					<Image source={{ uri: poster }}></Image>
					<ListNumberBlock>
						<CardListNumber>{ListNumber}</CardListNumber>
						{(Date.now() - updatedAt) / 1000 < 86400 * 30 && (
							<NewText>New</NewText>
						)}
					</ListNumberBlock>
					<CardInner>
						<CardTitle active={active}>{title}</CardTitle>
						<CardContent>{genres.join(" · ")}</CardContent>
					</CardInner>
				</Inner>
			</TouchableHighlight>

			<ModalBtn onPress={() => setModalVisible(!modalVisible)}>
				<Text>· · ·</Text>
			</ModalBtn>
		</Card>
	);
};

const Inner = styled.View`
	display: flex;
	flex-direction: row;
`;
const Card = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 70px;
	margin: 8px 0px 8px 0px;
	width: ${WINDOW_WIDTH - 20}px;
	position: relative;
`;

const ModalBtn = styled.Pressable`
	position: absolute;
	right: 0px;
`;
const Text = styled.Text`
	color: #fff;
`;

const CardInner = styled.View`
	display: flex;
	flex-direction: column;
`;

const CardTitle = styled.Text`
	font-size: 14px;
	color: ${(props) => (props.active ? "red" : "#fff")};
`;
const CardContent = styled.Text`
	font-size: 13px;
	color: gray;
`;
const ListNumberBlock = styled.View`
	flex-direction: column;
	justify-items: center;
	align-items: center;
`;
const CardListNumber = styled.Text`
	width: 60px;
	font-size: 20px;
	font-weight: bold;
	color: #fff;
	text-align: center;
`;
const NewText = styled.Text`
	color: rgb(46, 239, 170);
	font-size: 13px;
`;
const Image = styled.Image`
	width: 70px;
	height: 70px;
	border-radius: 5px;
`;
export default ChartCard;
