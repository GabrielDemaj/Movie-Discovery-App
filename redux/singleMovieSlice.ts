import { createSlice } from "@reduxjs/toolkit";

const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState: null,
  reducers: {
    setSingleMovie: (state, action) => action.payload,
  },
});

export const { setSingleMovie } = singleMovieSlice.actions;
export default singleMovieSlice.reducer;
