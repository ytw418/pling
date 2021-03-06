import React, { useState, useReducer, createContext, useContext } from "react";
import produce from "immer";

const initials = {
	home: {
		slide: false,
		slides: false,

		cate: false,
	},
};

function Reducer(state, action) {
	switch (action.type) {
		case "HOME_LODGING_SLIDES":
			return {
				...state,
				home: { ...state.home, slides: action.slides },
			};
		case "HOME_LODGING_CATE":
			return {
				...state,
				home: { ...state.home, cate: action.cate },
			};

		case "CARD_LIKE":
			return produce(state, (draft) => {
				draft.home.cate.map((item) => {
					const targetObj = item.list.find((obj) => obj.id === action.id);
					//	console.log("draft.home.cate", targetObj);
					if (targetObj) targetObj.active = !targetObj.active; // isLiked

					if (!targetObj) {
						const synopsisObj = item?.list?.find(
							(obj) => obj?.synopsis?.id === action.id
						);
						console.log("item?.list?.synopsis", synopsisObj);
						if (synopsisObj) synopsisObj.active = !synopsisObj.active; // isLiked
					}
				});
			});

		// return {
		//   ...state,home.cate:{}
		//  home: { ...state.home, cate: {...state.home.cate} },

		// };
		case "textSend":
			return { ...state, text: action.text };

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}
const StateContext = createContext();
const DispatchContext = createContext();

export function Provider({ children }) {
	const [state, dispatch] = useReducer(Reducer, initials);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

// 커스텀 hook 과 에러처리 구문
export function useApiState() {
	const context = useContext(StateContext);
	if (!context) {
		throw new Error("Cannot find Provider");
	}
	return context;
}

export function useDispatch() {
	const context = useContext(DispatchContext);
	if (!context) {
		throw new Error("Cannot find Provider");
	}
	return context;
}
