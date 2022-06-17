import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import axios from "axios";
import SynopsisDefault from "../components/SynopsisDefault";
import StoryChart from "../components/StoryChart";
import getEnvVars from "../environment";
import SyGrid from "../components/SyGrid";
import SyFull from "../components/SyFull";
import MainSlide from "../components/MainSlide";

const Home = () => {
  const { APIURL, APIKEY } = getEnvVars();
  const [slides, setSlides] = useState([]);
  const [cate, setCate] = useState([]);
  const AUTH_TOKEN = APIKEY;

  const getMainApi = async () => {
    try {
      axios.defaults.baseURL = APIURL;
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

  return (
    slides !== [] && (
      <SafeAreaView>
        <FlatListContainer
          ListHeaderComponent={MainSlide(slides)}
          data={cate}
          renderItem={(item) =>
            (item.item?.listType === "SYNOPSIS_DEFAULT" && (
              <SynopsisDefault syDefault={item?.item}></SynopsisDefault>
            )) ||
            (item.item?.listType === "STORY_CHART" && (
              <StoryChart stChart={item?.item}></StoryChart>
            )) ||
            (item.item?.listType === "SYNOPSIS_GRID" && (
              <SyGrid syGrid={item?.item}></SyGrid>
            )) ||
            (item.item?.listType === "SYNOPSIS_FULL" && (
              <SyFull syFull={item?.item}></SyFull>
            ))
          }
        />
      </SafeAreaView>
    )
  );
};
const SafeAreaView = styled.SafeAreaView`
  background-color: #000;
`;
const FlatListContainer = styled.FlatList``;

export default Home;
