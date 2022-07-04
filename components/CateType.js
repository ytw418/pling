import React from "react";
import { ListType } from "../constants";
import SynopsisDefault from "./SynopsisDefault";
import StoryChart from "./StoryChart";
import SyGrid from "./SyGrid";
import SyFull from "./SyFull";

const CateType = ({ item }) => {
	return (
		((item?.item?.typename === ListType.SYNOPSIS_DEFAULT ||
			item?.item?.typename === "Plinist_synop_default") && (
			<SynopsisDefault syDefault={item?.item}></SynopsisDefault>
		)) ||
		(item?.item?.typename === ListType.STORY_CHART && (
			<StoryChart stChart={item?.item}></StoryChart>
		)) ||
		item?.item?.typename === ListType.SYNOPSIS_GRID ||
		(item?.item?.typename === "Plinist_synop_grid" && (
			<SyGrid syGrid={item?.item}></SyGrid>
		)) ||
		item?.item?.typename === ListType.SYNOPSIS_FULL ||
		(item?.item?.typename === "Plinist_channel" && (
			<SyFull syFull={item?.item}></SyFull>
		))
	);
};

export default CateType;
