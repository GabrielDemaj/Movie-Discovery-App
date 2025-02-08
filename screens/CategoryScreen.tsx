import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/moviesSlice";
import { fetchMoviesByCategory } from "../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

type Props = {};

const CategoryScreen = (props: Props) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { navigate } = useNavigation<any>();

  const { categoryId, categoryName } = route.params as {
    categoryId: number;
    categoryName: string;
  };

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);

  const {
    data: movieData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movies", categoryId],
    queryFn: () => fetchMoviesByCategory(categoryId),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (movieData) {
      dispatch(setMovies(movieData.results));
      setFilteredMovies(movieData.results);
    }
  }, [movieData, dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const filtered = movieData?.results.filter((movie: any) =>
        movie.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredMovies(filtered || []);
    } else {
      setFilteredMovies(movieData?.results || []);
    }
  }, [debouncedSearchQuery, movieData]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies by title"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => {
          const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

          return (
            <TouchableOpacity
              onPress={() => navigate("MovieDetails", { movieId: item.id })}
            >
              <ImageBackground
                source={{ uri: posterUrl }}
                style={styles.movieContainer}
                imageStyle={styles.movieBackgroundImage}
              >
                <Text style={styles.movieTitle}>{item.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: 20,
  },
  movieContainer: {
    height: 250,
    justifyContent: "flex-end",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  movieBackgroundImage: {
    resizeMode: "cover",
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default CategoryScreen;
