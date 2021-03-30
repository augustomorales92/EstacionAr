import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import {userReducer} from "./reducer/userReducer"

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        userReducer,
    },
  });
  
  export default store;

