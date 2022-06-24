import React from "react";
import styled, { css } from "styled-components/native";
import { DEFAULT_CARD_WIDTH } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const DefaultCard = ({ poster, title, genres, id, active, updatedAt }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
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
			<Card>
				<Image source={{ uri: poster }}></Image>
				<TitleBlock>
					<CardTitle active={active}>{title}</CardTitle>
					{(Date.now() - updatedAt) / 1000 < 86400 * 30 && (
						<NewText>New</NewText>
					)}
				</TitleBlock>

				<CardContent>{genres.join(" · ")}</CardContent>
			</Card>
		</TouchableOpacity>
	);
};

const Card = styled.View`
	width: ${DEFAULT_CARD_WIDTH}px;
	margin: 8px 0px 8px 0px;
`;
const TitleBlock = styled.View`
	flex-direction: row;
`;
const CardTitle = styled.Text`
	font-size: 14px;
	padding-right: 5px;
	color: ${(props) => (props.active ? "red" : "#fff")};
`;
const CardContent = styled.Text`
	font-size: 13px;
	color: gray;
`;
const Image = styled.Image`
	width: ${DEFAULT_CARD_WIDTH}px;
	height: ${DEFAULT_CARD_WIDTH}px;
	border-radius: 15px;
	margin-bottom: 10px;
`;
const NewText = styled.Text`
	color: rgb(46, 239, 170);
	font-size: 13px;
`;
export default DefaultCard;
