import React from "react";

import {
	Text,
	Dimensions,
	StyleSheet,
	View,
	Image,
	TouchableHighlight,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const img404 = require("../images/404img.png");
const MainSlide = (slides) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<SwiperFlatList
				showPagination
				paginationStyle={{ left: 10, zIndex: 10 }}
				paginationStyleItem={{
					backgroundColor: "rgb(119, 119, 119)",
					width: 11,
					height: 4,
					borderRadius: 10,
					marginLeft: 0,
					marginRight: 5,
				}}
				paginationStyleItemActive={{ backgroundColor: "rgb(46, 239, 170)" }}
			>
				{slides.map((slides, i) => (
					<View style={styles.slide} key={i}>
						<LinearGradient
							start={{ x: 1, y: 1 }}
							end={{ x: 1, y: 0.5 }}
							colors={["rgba(0,0,0,1)", "transparent"]}
						>
							<TouchableHighlight
								onPress={() => {
									navigation.navigate("Detail", {
										poster: slides?.poster,
										title: slides?.title,
										genres: slides?.genres,
										id: slides?.id,
										active: slides?.active,
									});
								}}
							>
								<Image
									style={styles.titleImage}
									source={{ uri: slides?.titleImage }}
									accessibilityHint="이미지로딩실패"
								></Image>
							</TouchableHighlight>

							<Image
								style={styles.posterImage}
								source={slides?.poster ? { uri: slides?.poster } : img404}
								accessibilityHint="이미지로딩실패"
							></Image>
						</LinearGradient>
						<View style={[styles.child]}>
							<Text style={styles.summary}>
								{slides?.summary ?? "not found"}
							</Text>
							<Text style={styles.genres}>
								{slides?.genres?.join(" · ") ?? "not found"}
							</Text>
						</View>
					</View>
				))}
			</SwiperFlatList>
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
	summary: {
		fontSize: 13,
		textAlign: "left",
		color: "#fff",
		paddingLeft: 10,
		paddingTop: 10,
	},
	genres: {
		fontSize: 13,
		textAlign: "left",
		color: "rgb(46, 239, 170) ",
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 35,
	},
	posterImage: { width: width, height: 400, zIndex: -1 },
	titleImage: { width: width, height: 400, position: "absolute" },
});
export default MainSlide;
