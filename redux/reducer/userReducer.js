import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

//importamos Firebase
import firebase from "../../back/db/firebase";

const initialState = {
  user: null,
  recovery:null,
  // isAlreadyTaken: null,
};

export const setUserLogged = createAction("userLogged");

export const getUserLogged = (dispatch) => {
  firebase.auth.onAuthStateChanged((loggedUser) => {
    if (loggedUser && loggedUser.emailVerified ) {      
      dispatch(setUserLogged(loggedUser.uid))
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

// export const emailVerification = createAsyncThunk("emailVerification", (email) => {
//     var userRef = firebase.db.collection("users");
//     return userRef
//       .where("email", "==", `${email}`)
//       .get()
//       .then((querySnap) => {
//         querySnap.forEach((doc) => {
//           console.log("-----> USUARIO POR EMAIL: ", doc.data().email)
//           return doc.data().email;
//         });
//       })
//       .catch((err) => console.log(err));
// });


export const logUser = createAsyncThunk("logUser", ({ email, password }) => {
  return firebase.auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      if(cred.user.emailVerified)
      { return cred.user.uid }
      else{ throw new Error ('Verifique su email') }})
    .catch((error) => {throw new Error(error)});
});



export const userReducer = createReducer(initialState, {
  [logUser.fulfilled]: (state, action) => {
    return { ...state, user: action.payload };
  },
  // [emailVerification.fulfilled]: (state, action) => {
  //   return { ...state, isAlreadyTaken: action.payload };
  // },
  [signOutUser.fulfilled]: (state, action) => {
    return { ...state, user: action.payload };
  },
  [setUserLogged]: (state, action) => {
    return { ...state, user: action.payload };
  },
  
});
