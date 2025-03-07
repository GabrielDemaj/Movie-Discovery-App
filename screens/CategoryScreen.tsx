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
  RefreshControl,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/moviesSlice";
import { fetchMoviesByCategory } from "../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDebounce } from "@/hooks/useDebounce";

const CategoryScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { navigate } = useNavigation<any>();
  const queryClient = useQueryClient(); // This is used to interact with the query cache

  const { categoryId } = route.params as { categoryId: number };

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", categoryId],
    queryFn: ({ pageParam = 1 }) =>
      fetchMoviesByCategory(categoryId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.pages.flatMap((page) => page.results) || [];

  useEffect(() => {
    if (movies.length > 0) {
      dispatch(setMovies(movies));
    }
  }, [movies, dispatch]);
  console.log("darta", data);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Invalidate and reset the query to refetch from the first page
    queryClient.invalidateQueries({
      queryKey: ["movies", categoryId],
    });
    await refetch(); // Fetch the first page of movies
    setRefreshing(false);
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (isError) return <Text>Error: {(error as Error).message}</Text>;

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigate("MovieDetails", { movieId: item.id })}
      style={{ paddingHorizontal: 20 }}
    >
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieContainer}
        imageStyle={styles.movieBackgroundImage}
      >
        <Text style={styles.movieTitle}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies by title"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
