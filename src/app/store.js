import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./persistReducer";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
