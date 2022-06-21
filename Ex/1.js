const onHeader = (y) => {
	Animated.timing(offset, {
		toValue: y,
		useNativeDriver: true, //make it as false
	}).start();
	console.log("handleAnimation실행");
};
const removeHeader = (y) => {
	Animated.timing(offset, {
		toValue: 0,
		useNativeDriver: true, //make it as false
	}).start();
	console.log("handleAnimation제거");
};

// const boxInterpolation = animation.interpolate({
//   inputRange: [0, 1],
//   outputRange: ["rgb(90,210,244)", "rgb(224,82,99)"],
// });

const onScroll = (e) => {
	const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;
	contentOffset.y > 50 && onHeader(contentOffset.y);
	contentOffset.y === 0 && removeHeader(contentOffset.y);
	console.log("toValue", offset);
};
