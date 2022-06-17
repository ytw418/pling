import React from "react";

import { Text, Dimensions, StyleSheet, View, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled, { css } from "styled-components/native";

import { LinearGradient } from "expo-linear-gradient";
const MainSlide = (slides) => (
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
      {slides &&
        slides.map((slides, i) => (
          <View style={styles} key={i}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 1, y: 0.5 }}
              colors={["rgba(0,0,0,1)", "transparent"]}
            >
              <Image
                style={styles.posterImage}
                source={{ uri: slides.poster }}
              ></Image>
              <Image
                style={styles.titleImage}
                source={{ uri: slides.titleImage }}
              ></Image>
            </LinearGradient>
            <View style={[styles.child]}>
              <Text style={styles.summary}>{slides.summary}</Text>
              <Text style={styles.genres}>{slides.genres.join(" · ")}</Text>
            </View>
          </View>
        ))}
    </SwiperFlatList>
  </View>
);

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  slide: { position: "relative" },
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
