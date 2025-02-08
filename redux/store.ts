import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
