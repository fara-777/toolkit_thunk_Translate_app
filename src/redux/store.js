import { configureStore } from "@reduxjs/toolkit";
import translateReducer from "./translateSlice";

// Configure and create the Redux store
export default configureStore({
  reducer: translateReducer,
});
