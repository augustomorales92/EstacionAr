import { createReducer } from "@reduxjs/toolkit";

//importamos las Actions
import {
  logUser,
  signOutUser,
  setUserLogged,
  setUserTime,
  getUserTime,
} from "./userActions";

const initialState = {
  user: null,
  recovery: null,
  time: 0,
};

export const userReducer = createReducer(initialState, {
  [logUser.fulfilled]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [signOutUser.fulfilled]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [setUserLogged]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [setUserTime.fulfilled]: (state, action) => {
    return { ...state, time: action.payload };
  },
  [getUserTime.fulfilled]: (state, action) => {
    return { ...state, time: action.payload };
  },
});
