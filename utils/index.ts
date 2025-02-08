import AsyncStorage from "@react-native-async-storage/async-storage";

const checkCache = async (id: any) => {
  try {
    const cachedMovie = await AsyncStorage.getItem(`movieCache-${id}`);
    if (cachedMovie) {
      console.log("Cached Movie: ", JSON.parse(cachedMovie));
    } else {
      console.log("No cached data for this movie.");
    }

    const cachedCategories = await AsyncStorage.getItem("categoriesCache");
    if (cachedCategories) {
      console.log("Cached Categories: ", JSON.parse(cachedCategories));
    } else {
      console.log("No cached categories data.");
    }
  } catch (error) {
    console.error("Error checking cache:", error);
  }
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { getRandomColor, checkCache };
