import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoviesState, Movie } from "../types";

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setMovies, setLoading } = moviesSlice.actions;
export default moviesSlice.reducer;
