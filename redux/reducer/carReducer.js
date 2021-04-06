import { createReducer } from "@reduxjs/toolkit";
import {addNewCar, getUserCars, deleteCar} from "./carActions"

const initialState = {
  allUserCars: [],
};
export const carReducer = createReducer(initialState, {
  [addNewCar.fulfilled]: (state, action) => {
    return { ...state, allUserCars: [...state.allUserCars, action.payload] };
  },
  [getUserCars]: (state, action) => {
    return { ...state, allUserCars: action.payload };
  },
  [deleteCar]: (state, action) => {
    console.log("payload ------------------->", action.payload);
    console.log("state ------------------->", {
      ...state,
      allUserCars: state.allUserCars.filter((h) => h),
    });
  },
});
