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
const MainSlide = (slides, navigation) => {
	//	const navigation = useNavigation();

	// if(true) {
	// 	///
	// }

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
										id: slides?.id,
									});
								}}
							>
								<Image
									style={styles.titleUrl}
									source={{ uri: slides?.titleUrl }}
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
							<Text style={styles.description}>
								{slides?.title ?? "not found"}
							</Text>
							<Text style={styles.text}>{slides?.text ?? "not found"}</Text>
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
	description: {
		fontSize: 13,
		textAlign: "left",
		color: "#fff",
		paddingLeft: 10,
		paddingTop: 10,
	},
	text: {
		fontSize: 13,
		textAlign: "left",
		color: "rgb(46, 239, 170) ",
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 35,
	},
	posterImage: { width: width, height: 400, zIndex: -1 },
	titleUrl: { width: width, height: 400, position: "absolute" },
});
export default MainSlide;
