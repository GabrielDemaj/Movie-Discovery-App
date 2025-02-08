import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { setCategories } from "../redux/categoriesSlice";
import { setMovies } from "../redux/moviesSlice";
import { fetchCategories, fetchMovies } from "../services/api";
import { RootState } from "@/redux/store";
import MovieGridScreen from "@/components/MovieGrid";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const movies = useSelector((state: RootState) => state.movies.movies);

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
    error: categoryQueryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: movieData,
    isLoading: movieLoading,
    isError: movieError,
    error: movieQueryError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (categoryData) {
      dispatch(setCategories(categoryData?.genres));
    }
    // if (movieData) {
    //   dispatch(setMovies(movieData.results));
    // }
  }, [categoryData, movieData, dispatch]);

  if (categoryLoading || movieLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <MovieGridScreen />
    </View>
  );
};

export default HomeScreen;
