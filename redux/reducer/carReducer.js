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
    return {...state, allUserCars: state.allUserCars.filter(car => car.patente!=action.payload)}
    
  },
  [updateCar.fulfilled]: (state, action) => {
    console.log(action.payload)
    //return { ...state, allUserCars: [...state.allUserCars, action.payload] };
  },
 
  
});
