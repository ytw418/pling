import React, { useState } from "react";
import styled, { css } from "styled-components/native";
import { WINDOW_WIDTH } from "../../constants";
import BottomModal from "../modal/BottomModal";
import { TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
const StoriesCard = ({
	poster,
	text,
	description,
	audio,
	synopsisId,
	id,
	subtitle,
}) => {
	//console.log("Date.now() - updatedAt =", (Date.now() - updatedAt) / 1000);
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();
	console.log("subtitle", subtitle);

	return (
		<Container>
			<Card>
				<TouchableHighlight onPress={() => setModalVisible(!modalVisible)}>
					<Inner>
						<BottomModal
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							poster={poster}
							title={subtitle}
							text={text}
						></BottomModal>
						<Image source={{ uri: poster }}></Image>

						<CardInner>
							<RowBlock>
								<CardTitle>{subtitle}</CardTitle>
								<FreeText>{subtitle && "무료"}</FreeText>
							</RowBlock>
							<CardContent>{text}</CardContent>
						</CardInner>
					</Inner>
				</TouchableHighlight>

				<ModalBtn onPress={() => setModalVisible(!modalVisible)}>
					<Text>· · ·</Text>
				</ModalBtn>
			</Card>
			<Description>{description}</Description>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: column;
	padding: 0px 10px 0px 10px;

	margin: 8px 0px 8px 0px;
	width: ${WINDOW_WIDTH - 20}px;
	position: relative;
`;
const Inner = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-items: flex-start;
`;
const Card = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
	height: 70px;
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
	justify-items: center;
	align-items: flex-start;
	padding-left: 10px;
`;

const CardTitle = styled.Text`
	font-size: 12px;
	color: #fff;
`;
const CardContent = styled.Text`
	font-size: 10px;
	color: gray;
`;

const Description = styled.Text`
	font-size: 10px;
	color: gray;
`;
const FreeText = styled.Text`
	padding-left: 10px;
	color: rgb(46, 239, 170);
	font-size: 12px;
`;

const RowBlock = styled.View`
	flex-direction: row;
`;
const ColumnBlock = styled.View`
	flex-direction: column;
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
export default StoriesCard;
