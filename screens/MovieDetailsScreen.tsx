import { setSingleMovie } from "@/redux/singleMovieSlice";
import { clearStorageCache, fetchSingleMovie } from "@/services/api";
import { checkCache } from "@/utils";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

const MovieDetailsScreen = () => {
  const route = useRoute<any>();
  const { movieId } = route.params;
  const dispatch = useDispatch();

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const handleCheckCache = () => {
    checkCache(movie.id);
  };
  // clearStorageCache()
  const getMovieDetails = useCallback(async () => {
    try {
      const fetchedMovie = await fetchSingleMovie(movieId);
      setMovie(fetchedMovie);
      dispatch(setSingleMovie(fetchedMovie));
      setLoading(false);
    } catch (err) {
      setError("Failed to load movie details");
      setLoading(false);
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMovieDetails();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* this is to check if the movie is cached */}
      {/* <Button title="Check Cache" onPress={handleCheckCache} color="red" /> */}
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
        }}
        style={styles.backdropImage}
      />
      <Text style={styles.title}>{movie?.title}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        }}
        style={styles.image}
      />
      <Text style={styles.overview}>{movie?.overview}</Text>
      <Text style={styles.releaseDate}>
        Release Date: {movie?.release_date}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  backdropImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 8,

    zIndex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  overview: {
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  releaseDate: {
    fontSize: 14,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default MovieDetailsScreen;
