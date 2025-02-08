// import MovieGridScreen from "@/components/MovieGrid";
// import { RootState } from "@/redux/store";
// import { useQuery } from "@tanstack/react-query";
// import React, { useEffect } from "react";
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { setCategories } from "../redux/categoriesSlice";
// import { fetchCategories } from "../services/api";

// const HomeScreen = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );

//   const {
//     data: categoryData,
//     isLoading: categoryLoading,
//     isError: categoryError,
//     error: categoryQueryError,
//   } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     if (categoryData) {
//       dispatch(setCategories(categoryData?.genres));
//     }
//   }, [categoryData, dispatch]);

//   if (categoryLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (categoryError) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>
//           Error loading categories: {categoryQueryError?.message}
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Movie Categories</Text>
//       <MovieGridScreen />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 22,
//     paddingVertical: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//   },
// });

// export default HomeScreen;

import MovieGridScreen from "@/components/MovieGrid";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/categoriesSlice";
import { fetchCategories } from "../services/api";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
    error: categoryQueryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (categoryData) {
      dispatch(setCategories(categoryData?.genres));
    }
  }, [categoryData, dispatch]);

  if (categoryLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (categoryError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading categories: {categoryQueryError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Categories</Text>
      <MovieGridScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    paddingVertical: 20,
  },
  loaderContainer: {
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
});

export default HomeScreen;
