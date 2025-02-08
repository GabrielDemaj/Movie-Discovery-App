import { RootState } from "@/redux/store";
import { getRandomColor } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  Easing,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

const MovieGridScreen = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const { navigate } = useNavigation<any>();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const randomColor = getRandomColor();

    const animation =
      index === categories.length - 1
        ? BounceInDown.duration(700).easing(Easing.ease)
        : index % 2 === 0
        ? BounceInLeft.duration(700).easing(Easing.ease)
        : BounceInRight.duration(700).easing(Easing.ease);

    return (
      <Animated.View entering={animation} style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.itemContainer, { backgroundColor: randomColor }]}
          onPress={() =>
            navigate("Category", {
              categoryId: item.id,
              categoryName: item.name,
            })
          }
        >
          <Text style={styles.movieTitle}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
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
