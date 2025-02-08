import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/screens/HomeScreen";
import CategoryScreen from "@/screens/CategoryScreen";
import MovieDetailsScreen from "@/screens/MovieDetailsScreen";
import Navigation from "./navigation";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: number; categoryName: string };
  MovieDetails: { movieId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </NavigationContainer>
  );
}
