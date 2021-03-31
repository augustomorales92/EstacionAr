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

export const setUserLogged = createAction("userLogged");

export const getUserLogged = (dispatch) => {
  firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser) {
      dispatch(setUserLogged(loggedUser.uid));
    }
  });
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
        //   return props.navigation.navigate("autos");
      })
      .catch((error) => alert("AUTO NO AGREGADO", error.message));
  }
);
// export const getUserCars = createAsyncThunk("getUserCars", ({ user }) => {
//   return firebase.db
//     .collection("users")
//     .where("id", "==", `${user}`)
//     .get()
//     .then((querySnap) => {
//       querySnap.forEach((doc) => {
//         return doc.data().cars;
//       });
//     })
//     .catch((err) => console.log(err));
// });

export const carReducer = createReducer(initialState, {
  [addNewCar.fulfilled]: (state, action) => {
    return { ...state, cars: action.payload };
  },
  // [getUserCars.fulfilled]: (state, action) => {
  //   return { ...state, allUserCars: action.payload };
  // },

});
