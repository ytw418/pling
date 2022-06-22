import React, { useState } from "react";
import styled from "styled-components/native";
import HomeHeader from "../components/header/HomeHeader";
import { WINDOW_HEIGHT } from "../constants";

import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
const MyDrawer = () => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<HomeHeader headerTitle={"MyDrawer"}>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Hello World!</Text>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>Hide Modal</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
				<Pressable
					style={[styles.button, styles.buttonOpen]}
					onPress={() => setModalVisible(true)}
				>
					<Text style={styles.textStyle}>Show Modal</Text>
				</Pressable>
			</View>
			{/* <View>
				<Title>MyDrawer</Title>
			</View> */}
		</HomeHeader>
	);
};

// const View = styled.View`
// 	background-color: #000;
// 	justify-content: center;
// 	align-items: center;
// 	height: ${WINDOW_HEIGHT - 50}px;
// `;
const Title = styled.Text`
	color: #fff;
	font-size: 18px;
`;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		backgroundColor: "#000",
		position: "absolute",
		top: 200,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
export default MyDrawer;
