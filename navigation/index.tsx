import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CategoryScreen from "../screens/CategoryScreen";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: number; categoryName: string };
  MovieDetails: { movieId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={(params) => {
          return {
            title: params.route.params.categoryName,
          };
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}
