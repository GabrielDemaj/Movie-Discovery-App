const API_KEY = "9afefbb59e0e4c1d1c1ade94ecc46a18";
const ACCESS_TOKEN = "your_access_token"; // Replace this with your actual API Access Token
const BASE_URL = "https://api.themoviedb.org/3";

// Fetching movies with token
export const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`, // Include the access token here
      "Content-Type": "application/json", // Ensure the correct content type
    },
  });
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
};

// Fetching categories with token
export const fetchCategories = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, // Include the access token here
        "Content-Type": "application/json", // Ensure the correct content type
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};
