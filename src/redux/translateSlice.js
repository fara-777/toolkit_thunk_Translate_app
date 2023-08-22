import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, getAnswer } from "./action";

// Initial state for the translate slice
const initialState = {
  languages: [],
  answer: "",
  isLoading: true,
  isError: [],
};

// Create a Redux slice for translation-related state management
const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    // Reducer logic for when fetching languages is pending
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    // Reducer logic for when fetching languages is successful
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },
    // Reducer logic for when fetching languages is rejected
    [getLanguages.rejected]: (state, action) => {
      state.isError = "An error occurred while importing languages";
    },

    // Reducer logic for when fetching translation answer is pending
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    // Reducer logic for when fetching translation answer is successful
    [getAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.answer = action.payload; // Set translated answer
    },
    // Reducer logic for when fetching translation answer is rejected
    [getAnswer.rejected]: (state) => {
      state.isLoading = false;
      state.isError = "During the translation, an error occurred.";
    },
  },
  reducers: {
    // Reducer logic to clear the translated answer
    clearAnswer: (state) => {
      state.answer = "";
    },
  },
});

// Export the action creators
export const { clearAnswer } = translateSlice.actions;

// Export the reducer function for the slice
export default translateSlice.reducer;
