import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

//importamos Firebase
import firebase from "../../back/db/firebase";

export const setUserLogged = createAction("userLogged");

export const getUserLogged = (dispatch) => {
  firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser && loggedUser.emailVerified) {
      dispatch(setUserLogged(loggedUser.uid));
    }
  });
};

export const signOutUser = createAsyncThunk("signOut", () => {
  return firebase.auth
    .signOut()
    .then(() => {
      console.log("sali");
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

export const logUser = createAsyncThunk("logUser", ({ email, password }) => {
  return firebase.auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      if (cred.user.emailVerified) {
        return cred.user.uid;
      } else {
        throw new Error("Verifique su email");
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
});

export const setUserTime = createAsyncThunk(
  "setUserTime",
  ({ totalTime, user }) => {
    console.log(totalTime, user);
    return firebase.db
      .collection("users")
      .doc(user)
      .update({
        parkingTime: totalTime,
      })
      .then(() => {
        console.log("Document successfully updated!");
        return totalTime;
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
);
export const getUserTime = createAsyncThunk("getUserTime", (user) => {
  return firebase.db
    .collection("users")
    .doc(user)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data().parkingTime);
        let time = doc.data().parkingTime;
        return time;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
});


export const addNewParking = createAsyncThunk(
  "addNewParking",
  ({ user, patente, price, finalTime }) => {
    console.log('DENTRO DE DISPATCH', user, patente, price, finalTime)
    if(finalTime){
      return (
        firebase.db
          .collection("users")
          .doc(`${user}`)
          .update({
             parkingHistory: firebase.firebase.firestore.FieldValue.arrayUnion({user, patente, price, finalTime})
          })
          .then(() => {
            console.log("----PARKING HISTORY UPDATE----");
            return {user, patente, price, finalTime}
          })
          .catch((error) => alert("HISTORIAL NO UPDATEADO", error.message))
      );
    }
  }
);

export const getUserInfo = createAsyncThunk("getUserInfo", (userId) => {
  return firebase.db
  .collection('users')
  .doc(userId)
  .get()
  .then(querySnap =>querySnap.data())
  .catch(() => console.log('Error en recibir info de user'))
})

export const getParkingHistoryInfo = createAsyncThunk("getParkingHistoryInfo", (userId) => {
  return firebase.db
  .collection('users')
  .doc(`${userId}`)
  .get()
  .then(x => {
    console.log("DATAAAAA DEL HISTORY",x.data())
    const allParkings = x.data().parkingHistory
    return allParkings
  })
  .catch(() => console.log('Error en recibir historial de user'))
})