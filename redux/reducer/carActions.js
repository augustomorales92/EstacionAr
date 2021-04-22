import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { getDate } from "../../utils/date";

//importamos Firebase
import firebase from "../../back/db/firebase";

export const addNewCar = createAsyncThunk(
  "addNewCar",
  ({ user, marca, modelo, año, patente }) => {
    console.log("la infooooo --->", user, marca, modelo, año, patente);
    return firebase.db
      .collection("users")
      .doc(user)
      .collection("CARS")
      .doc(patente)
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
          patente,
        };
      })
      .catch((error) => alert("AUTO NO AGREGADO", error.message));
  }
);
export const updateCar = createAsyncThunk(
  "updateCar",
  ({ owner, marca, modelo, año, patente }) => {
    return firebase.db
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
        console.log("----AUTO UPDATEADO----");
        return {
          marca,
          modelo,
          año,
          patente,
        };
      })
      .catch((error) => alert("AUTO NO UPDATEADO", error.message));
  }
);

export const getUserCars = createAction("getUserCars");

export const getAllCars = (dispatch, user) => {
  return new Promise((resolve, reject) =>
    firebase.db
      .collection("users")
      .doc(`${user}`)
      .collection("CARS")
      .get()
      .then((querySnap) => {
        const userCars = [];
        querySnap.forEach((doc) => {
          userCars.push(doc.data());
          return userCars;
        });
        dispatch(getUserCars(userCars));
        resolve(userCars);
      })
      .catch((err) => {
        console.log(err);
        reject();
      })
  );
};

export const deleteCar = createAction("deleteCar");

export const deleteOneCar = (user, patente, dispatch) => {
  return firebase.db
    .collection("users")
    .doc(`${user}`)
    .collection("CARS")
    .doc(`${patente}`)
    .delete()
    .then(() => {
      console.log("se borro el documento");
      dispatch(deleteCar(patente));
    })
    .catch((err) => console.log(err));
};

export const selectedCar = createAction("selectCar");

export const logOutUser = createAction("logOutUser");

export const addParkingDocument = createAsyncThunk(
  "addParkingCollection",
  ({ user, time, zone, mode, patente, modelo, marca }) => {
    mode === "fraccionado" ? (time = time / 6000) : time;
    const date = getDate();
    console.log(
      "la infooooo llegando --->",
      user,
      time,
      zone,
      patente,
      date,
      mode,
      patente,
      modelo,
      marca
    );
    return firebase.db
      .collection("parkings")
      .doc(patente)
      .set({
        user,
        time,
        zone,
        mode,
        patente,
        modelo,
        marca,
        date,
      })
      .then(() => {
        console.log("----PARKING ACTIVO----");
      })
      .catch((error) => alert("PARKING NO AGREGADO", error.message));
  }
);

export const deleteParkingDocument = (patente) => {
  return firebase.db
    .collection("parkings")
    .doc(`${patente}`)
    .delete()
    .then(() => {
      console.log("se borro el documento parking");
    })
    .catch((err) => console.log(err));
};

export const addZoneDocument = createAsyncThunk(
  "addZoneDocument",
  ({ user, time, zone, mode, patente, modelo, marca }) => {
    console.log("AGREGANDO DOCUMENTO ZONA");
    mode === "fraccionado" ? (time = time / 6000) : time;
    const date = getDate();
    console.log(
      "la infooooo llegando --->",
      user,
      time,
      zone,
      patente,
      date,
      mode,
      patente,
      modelo,
      marca
    );
    return firebase.db
      .collection("zones")
      .doc(zone)  
      .update({
        history: firebase.firebase.firestore.FieldValue.arrayUnion({
          user,
          time,
          zone,
          mode,
          patente,
          modelo,
          marca,
          date,
        }),
      })
      .then(() => {
        console.log("----ZONE ACTIVADA----");
      })
      .catch((error) => alert("ZONA NO AGREGADA", error.message));
  }
);
