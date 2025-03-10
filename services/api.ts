import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "9afefbb59e0e4c1d1c1ade94ecc46a18";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWZlZmJiNTllMGU0YzFkMWMxYWRlOTRlY2M0NmExOCIsIm5iZiI6MTczODk1ODU5Ni4yNzAwMDAyLCJzdWIiOiI2N2E2NjcwNGMxZTVlZDhiZmM4NWYyZTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ARLgL5yUuxfKxG5YUb-7QRv4NRTnh3fEHFpGvuLlhRI";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchCategoriesFromCache = async () => {
  // console.log("fetchCategoriesFromCache");
  const cachedCategories = await AsyncStorage.getItem("categoriesCache");
  if (cachedCategories) {
    return JSON.parse(cachedCategories);
  }
  return null;
};

const storeCategoriesInCache = async (data: any) => {
  await AsyncStorage.setItem("categoriesCache", JSON.stringify(data));
};

const fetchCategories = async () => {
  const cachedCategories = await fetchCategoriesFromCache();
  if (cachedCategories) {
    return cachedCategories;
  }

  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  // console.log("NOT fetchCategoriesFromCache");

  if (!response.ok) throw new Error("Failed to fetch categories");

  const categories = await response.json();
  storeCategoriesInCache(categories); // Store data in cache
  return categories;
};

const fetchMoviesByCategoryFromCache = async (categoryId: number) => {
  const cachedMovies = await AsyncStorage.getItem(`moviesCache-${categoryId}`);
  // console.log("fetchMoviesByCategoryFromCache");
  if (cachedMovies) {
    return JSON.parse(cachedMovies);
  }
  return null;
};
const fetchMoviesByCategory = async (categoryId: number, page: number = 1) => {
  // Fetch from cache based on categoryId and page
  const cachedMovies = await AsyncStorage.getItem(`moviesCache-${categoryId}-page-${page}`);
  
  if (cachedMovies) {
    return JSON.parse(cachedMovies);  // Return the cached data if available
  }

  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch movies for this category");

  const movies = await response.json();
  // Store the fetched page in cache
  storeMoviesInCache(categoryId, page, movies);
  return movies;
};

// Store the movies in cache by categoryId and page
const storeMoviesInCache = async (categoryId: number, page: number, data: any) => {
  await AsyncStorage.setItem(`moviesCache-${categoryId}-page-${page}`, JSON.stringify(data));
};


const fetchSingleMovie = async (movieId: number) => {
  const cachedMovie = await AsyncStorage.getItem(`movieCache-${movieId}`);
  if (cachedMovie) {
    // console.log("isCached");
    return JSON.parse(cachedMovie);
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch movie details");

  const movie = await response.json();
  await AsyncStorage.setItem(`movieCache-${movieId}`, JSON.stringify(movie));
  return movie;
};

const clearStorageCache = async () => {
  await AsyncStorage.clear();
}

export { fetchSingleMovie, fetchMoviesByCategory, fetchCategories, API_KEY,clearStorageCache };
