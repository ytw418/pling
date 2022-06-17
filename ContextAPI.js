import React, { useState, useReducer, createContext, useContext } from "react";

const initials = {
  home: {
    slides: null,
    cate: null,
  },
  asd: "asd",
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
    case "CREATE_USER":
      return {
        ...state,
        User: { [action.user.Profile.Uid]: action.user },
      };
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
