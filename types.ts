export interface RootState {
  categories: {
    categories: { id: number; name: string }[]; // Define the shape of categories
  };
  movies: {
    movies: { id: number; title: string }[]; // Define the shape of movies
  };
}

export interface Category {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}
