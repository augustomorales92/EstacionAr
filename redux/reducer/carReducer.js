import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

//importamos Firebase
import firebase from "../../back/db/firebase";

const initialState = {
  allUserCars: [],
};

export const addNewCar = createAsyncThunk(
  "addNewCar",
  ({ owner, marca, modelo, año, patente }) => {
    return (
      firebase.db
        .collection("users")
        .doc(`${owner}`)
        .collection("CARS")
        .doc(`${patente}`)
        .set({
          marca,
          modelo,
          año,
          patente,
        })
        .then(() => {
          console.log("----AUTO CREADO----");
          return {
            marca,
            modelo,
            año,
            patente
          }
          
        })
        .catch((error) => alert("AUTO NO AGREGADO", error.message))
    );
  }
);


export const getUserCars = createAction("getUserCars");

export const getAllCars = (dispatch, user) => {
  firebase.db
    .collection("users")
    .doc(`${user}`)
    .collection('CARS')
    .get()
    .then((querySnap) => {
      const userCars=[]
      querySnap.forEach((doc) => {
        userCars.push(doc.data())
        return userCars
        });
      dispatch(getUserCars(userCars))
    })
    .catch((err) => console.log(err));
};

export const deleteCar = createAction("deleteCar");

export const deleteOneCar = (user,patente,dispatch) => {
 firebase.db
  .collection("users")
  .doc(`${user}`)
   .collection('CARS')
  .doc(`${patente}`) 
  .delete()
    .then(() => {
      console.log('se borro el documento')
      dispatch(deleteCar(patente))
    })
    .catch((err) => console.log(err));
}


export const updateCar = createAsyncThunk(
  "updateCar",
  ({ owner, marca, modelo, año, patente }) => {
    return (
      firebase.db
        .collection("users")
        .doc(`${owner}`)
        .collection("CARS")
        .doc(`${patente}`)
        .update({
          marca,
          modelo,
          año,
          patente,
        })
        .then(() => {
          console.log("----AUTO ACTUALIZADO----");
          return {
            marca,
            modelo,
            año,
            patente
          }
          
        })
        .catch((error) => alert("AUTO NO AGREGADO", error.message))
    );
  }
);





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
