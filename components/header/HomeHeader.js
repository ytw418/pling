import React from "react";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = ({ children, animatedValue, headerTitle = "Pling" }) => {
	const navigation = useNavigation();

	const headerOpacity = animatedValue?.interpolate({
		inputRange: [100, 200],
		outputRange: [0, 1],
		extrapolate: "clamp",
	});

	return (
		<Container>
			{children}
			{animatedValue ? (
				<AniHeader style={{ opacity: headerOpacity }}>
					<Title>{headerTitle}</Title>
				</AniHeader>
			) : (
				<AniHeader style={{ opacity: 1 }}>
					<Title>{headerTitle}</Title>
				</AniHeader>
			)}

			<Header>
				<Cover
					onPress={() => {
						navigation.navigate("PlingPoint");
					}}
				>
					<Entypo
						name="app-store"
						style={{ opacity: 1 }}
						color={"#fff"}
						size={26}
					/>
				</Cover>
				<Cover
					onPress={() => {
						navigation.navigate("Search");
					}}
				>
					<MaterialCommunityIcons
						style={{ opacity: 1 }}
						name="magnify"
						color={"#fff"}
						size={26}
					/>
				</Cover>
			</Header>
		</Container>
	);
};

const Container = styled.View`
	background: #000;
	color: #000;
	flex: 1;
`;
const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	position: absolute;
	top: 0;
	width: 100%;
	flex: 1;
	/* background: ${(props) => `rgba(0, 0, 0, ${props.headerOpacity})`}; */
	padding: 40px 15px 40px 15px;
`;
const AniHeader = styled(Animated.View)`
	background: #000;
	position: absolute;
	top: 0;
	width: 100%;
	height: 80px;
	flex: 1;
	display: flex;
	padding-top: 30px;
	align-items: center;
`;

const Title = styled.Text`
	color: rgb(46, 239, 170);
	font-size: 30px;
	font-weight: bold;
`;

const Cover = styled.TouchableOpacity`
	opacity: 1 !important;
`;
export default HomeHeader;
