import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, useWindowDimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import type { ICookHistory } from "../interfaces/IRecipe";
import { recipeMockData } from "../store/mockData/recipeMockData";

type Props = {
  cookHistoryArray: ICookHistory[];
};

export const CookHistoryWidget: React.FC<Props> = ({ cookHistoryArray }) => {
  const { width, height } = useWindowDimensions();
  const [isLandscape, setIsLandscape] = useState(width > height);
  const router = useRouter();

  useEffect(() => {
    setIsLandscape(width > height);
  }, [width, height]);

  // Sort by date descending
  const sortedHistory = [...cookHistoryArray].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Helper to get recipe by id
  const getRecipe = (id: string) => recipeMockData.find(r => r.id === id);

  const renderItem = ({ item }: { item: ICookHistory }) => {
    const recipe = getRecipe(item.recipeId);
    if (!recipe) return null;

    const imageSource = { uri: recipe.imageUrl };

    if (!isLandscape) {
      // Compact view: image left, name and info right
      return (
        <TouchableOpacity
          style={styles.compactItem}
          onPress={() => router.push(`/${item.recipeId}`)}
        >
          <Image source={imageSource} style={styles.compactImage} />
          <View style={styles.compactTextContainer}>
            <Text style={styles.recipeName} numberOfLines={1}>{recipe.name}</Text>
            <Text style={styles.compactSub}>
              {item.rating} ⭐  •  {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    // Detailed view: image and all info
    return (
      <TouchableOpacity
        style={styles.itemLandscape}
        onPress={() => router.push(`/${item.recipeId}`)}
      >
        <Image source={imageSource} style={styles.detailedImage} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.extra}>Rating: {item.rating} ⭐</Text>
          <Text style={styles.extra}>Cooked: {new Date(item.date).toLocaleDateString()}</Text>
          <Text style={styles.extra}>Time: {item.totalCookTime} min</Text>
          <Text style={styles.extra}>Favorite: {item.isFavorite ? "Yes" : "No"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.widgetContainer}>
      <Text style={styles.title}>History</Text>
      {sortedHistory.length === 0 ? (
        <TouchableOpacity style={styles.placeholder} onPress={() => router.push("/recipes")}>
          <Text style={styles.placeholderText}>
            No cooked recipes. Click here to find recipes and start cooking
          </Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={sortedHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    maxHeight: 320,
    minHeight: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  list: {
    flexGrow: 0,
  },
  // Compact view
  compactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  compactImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  compactTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  recipeName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  compactSub: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  // Detailed view
  itemLandscape: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailedImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  extra: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  placeholder: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});