import { RootState } from "@/redux/store";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MovieGridScreen = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const renderItem = ({ item }: { item: any }) => {
    const randomColor = getRandomColor();

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.itemContainer, { backgroundColor: randomColor }]}
      >
        <Text style={styles.movieTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
  },
  movieTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default MovieGridScreen;
