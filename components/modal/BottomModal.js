import React, { useState } from "react";
import { Alert, Modal, Pressable } from "react-native";
import styled, { css } from "styled-components/native";

const BottomModal = ({
	modalVisible,
	setModalVisible,
	poster,
	title,
	genres,
}) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
				setModalVisible(!modalVisible);
			}}
		>
			<BottomView>
				<ModalView>
					<Image source={{ uri: poster }}></Image>
					<Text>{title}</Text>
					<Text>{genres}</Text>
					<Pressable onPress={() => setModalVisible(!modalVisible)}>
						<CloseBtn>
							<Text>닫기</Text>
						</CloseBtn>
					</Pressable>
				</ModalView>
			</BottomView>
		</Modal>
	);
};

const BottomView = styled.View`
	flex: 1;
	background: rgba(0, 0, 0, 0.5);
	justify-content: flex-end;
`;
const ModalView = styled.View`
	height: 300px;
	background: #171717;
	width: 100%;
	padding: 0px;
	z-index: 1;
	padding: 20px;
	position: relative;
	justify-content: center;
	align-items: center;
`;
const CloseBtn = styled.View`
	background: #4f4f4f;
	height: 40px;
	width: 350px;

	border-radius: 10px;
	justify-content: center;
	align-items: center;
	bottom: 0px;
`;
const Text = styled.Text`
	color: #fff;
	font-size: 18px;
`;
const Image = styled.Image`
	width: 100px;
	height: 100px;
	border-radius: 5px;
`;

export default BottomModal;
