import React from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import HomeHeader from "../components/header/HomeHeader";
const Creator = () => {
  return (
    <>
      {typeof offset !== "number" && (
        <HomeHeader animatedValue={offset}></HomeHeader>
      )}
      <Text>creator</Text>
    </>
  );
};

export default Creator;
