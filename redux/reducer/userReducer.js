import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

//importamos Firebase
import firebase from "../../back/db/firebase";

const initialState = {
  user: {},
  allUsers: [],
};

export const setUserLogged = createAction('userLogged') 

export const getUserLogged = (dispatch) => {
  firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser) {
      dispatch(setUserLogged({email: loggedUser.email ,uid: loggedUser.uid}))
      console.log(loggedUser.uid);
    }
  });
}


export const logUser = createAsyncThunk("logUser", ({ email, password }) => {
  return firebase.auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => ({ email: cred.user.email, uid: cred.user.uid }))
    .catch((error) => alert("Logeo incorrecto", error.message));
});

export const userReducer = createReducer(initialState, {
  [logUser.fulfilled]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [setUserLogged]: (state, action) => {
    return { ...state, user: action.payload };
  },
});
