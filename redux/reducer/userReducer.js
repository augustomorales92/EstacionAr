import { createReducer } from "@reduxjs/toolkit";

//importamos las Actions
import {
  logUser,
  signOutUser,
  setUserLogged,
  setUserTime,
  getUserTime,
  addNewParking,
  getUserInfo,
  getParkingHistoryInfo,
  setUserCredit,
} from "./userActions";

const initialState = {
  user: null,
  recovery:null,
  time: 0,
  credit: 0,
  zone: 0,
  parkingHistory: [],
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
  [addNewParking.fulfilled]: (state, action) => {
    if(action.payload !== undefined) return { ...state, parkingHistory: [...state.parkingHistory, action.payload] }
  },
  
  [getParkingHistoryInfo.fulfilled]: (state, action) => {
    return { ...state, allParkingHistory: action.payload }
  },

  // [getUserInfo.fulfilled]: (state, action) => {
  //   const {name, lastname, email} = action.payload;
  //   return {...state, name, lastname, email}
  // },

});
