import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertSlice";
import { usersSlice } from "./usersSlice";

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
  user: usersSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
