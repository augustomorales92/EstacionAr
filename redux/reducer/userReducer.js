import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit";
//importamos Firebase
import firebase from "../../back/db/firebase";

const initialState = {
  user: {},
  allUsers: [],
  logUser:{},
};
export const getUserLogged = createAction("userLogged", () => {
  return   firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser) {
       console.log(loggedUser.uid);
       return loggedUser.uid
    }
  });
});

export const logUser = createAsyncThunk("logUser", (email, password) => {
  return firebase.auth.signInWithEmailAndPassword(email, password)
  .then((cred) => console.log('---->', cred))
  .catch(error => alert ('Logeo incorrecto', error.message))
});

export const userReducer = createReducer(initialState, {
  [getUserLogged]: (state, action) => {
    return state.user = action.payload;
  },
});
