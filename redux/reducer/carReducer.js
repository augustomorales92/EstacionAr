import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

//importamos Firebase
import firebase from "../../back/db/firebase";

const initialState = {
  cars: [],
  allUserCars: [],
};

export const addNewCar = createAsyncThunk(
  "addNewCar",
  ({ owner, marca, modelo, año, patente }) => {
    return firebase.db
      .collection("users")
      .doc(owner)
      .update({
        cars: firebase.firebase.firestore.FieldValue.arrayUnion({
          marca,
          modelo,
          año,
          patente,
        }),
      })
      .then(() => {
        return console.log("----AUTO CREADO----");
      })
      .catch((error) => alert("AUTO NO AGREGADO", error.message));
  }
);

export const getUserCars = createAction("getUserCars");

export const getAllCars = (dispatch, user) => {
  firebase.db
    .collection("users")
    .where("id", "==", `${user}`)
    .get()
    .then((querySnap) => {
      querySnap.forEach((doc) => {
        dispatch(getUserCars(doc.data().cars))
      });
    })
    .catch((err) => console.log(err));
};

export const carReducer = createReducer(initialState, {
  [addNewCar.fulfilled]: (state, action) => {
    return { ...state, cars: action.payload };
  },
  [getUserCars]: (state, action) => {
    return { ...state, allUserCars: action.payload };
  },


});
