import React, { useEffect, useState } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { PAGE_SIZE } from "../constants";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled, { css } from "styled-components/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import SynopsisDefault from "../components/SynopsisDefault";
import StoryChart from "../components/StoryChart";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [cate, setCate] = useState([]);
  const [syDefault, setSyDefault] = useState([]);
  const [stChart, setStChart] = useState([]);
  const [syGrid, setSyGrid] = useState([]);
  const [syFull, setSyFull] = useState([]);

  // const {constants} = constants();
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlVTRVIiLCJpYXQiOjE2NTUwOTgyNjgsImV4cCI6MTY1NjMwNzg2OH0.eCh9VGnV9_iGQFrdzotCtBr-z3hYFeIQ0By9Zzlf2Pc";

  const getMainApi = async () => {
    try {
      axios.defaults.baseURL = "https://api.plingcast.co.kr/api/v1/";
      axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
      const [slidesResult, cateResult] = await Promise.all([
        axios.get("test-slides"),
        axios.get("test-categories"),
      ]);

      if (slidesResult) {
        console.log("slidesResult.status", slidesResult.status);
        setSlides(slidesResult?.data?.data ?? []);
      }

      if (cateResult) {
        console.log("cateResult.status", cateResult.status);
        setCate(cateResult?.data?.data ?? []);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getMainApi();

    return () => {
      getMainApi();
    };
  }, []);

  useEffect(() => {
    setSyDefault(
      cate.filter((val) => {
        return val.listType === "SYNOPSIS_DEFAULT";
      })
    );
    setStChart(
      cate.filter((val) => {
        return val.listType === "STORY_CHART";
      })
    );
    setSyGrid(
      cate.filter((val) => {
        return val.listType === "SYNOPSIS_GRID";
      })
    );
    setSyFull(
      cate.filter((val) => {
        return val.listType === "SYNOPSIS_FULL";
      })
    );
    console.log("stChart", stChart);
  }, [cate]);

  const mainSlide = () => (
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
            <TouchableOpacity style={styles} key={i}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0.5 }}
                colors={["rgba(0,0,0,1)", "transparent"]}
              >
                <Image
                  style={styles.posterImage}
                  source={{ uri: slides.poster }}
                ></Image>
              </LinearGradient>
              <View style={[styles.child]}>
                <Text style={styles.summary}>{slides.summary}</Text>
                <Text style={styles.genres}>{slides.genres.join(" · ")}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </SwiperFlatList>
    </View>
  );

  return (
    slides !== [] && (
      <SafeAreaView>
        <FlatListContainer
          ListHeaderComponent={mainSlide}
          data={[0]}
          renderItem={() => (
            <>
              <SynopsisDefault syDefault={syDefault}></SynopsisDefault>
              {stChart.length !== 0 && (
                <StoryChart stChart={stChart}></StoryChart>
              )}
            </>
          )}
          //keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  );
};
const SafeAreaView = styled.SafeAreaView`
  background-color: #000;
`;
const FlatListContainer = styled.FlatList``;
// const PosterImage = styled.Image`
//   width: 100%;
//   height: 400px;
//   background: linear-gradient(red, black);
// `;
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  slide: { position: "relative" },
  container: { flex: 1, backgroundColor: "#000" },
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

export default Home;
