import React from "react";
import { ListType } from "../constants";
import SynopsisDefault from "./SynopsisDefault";
import StoryChart from "./StoryChart";
import SyGrid from "./SyGrid";
import SyFull from "./SyFull";

const CateType = ({ item }) => {
	return (
		(item.item && item?.item?.typename === ListType.SYNOPSIS_DEFAULT && (
			<SynopsisDefault syDefault={item?.item}></SynopsisDefault>
		)) ||
		(item?.item?.typename === ListType.STORY_CHART && (
			<StoryChart stChart={item?.item}></StoryChart>
		)) ||
		(item?.item?.typename === ListType.SYNOPSIS_GRID && (
			<SyGrid syGrid={item?.item}></SyGrid>
		)) ||
		(item?.item?.typename === ListType.SYNOPSIS_FULL && (
			<SyFull syFull={item?.item}></SyFull>
		))
	);
};

export default CateType;
