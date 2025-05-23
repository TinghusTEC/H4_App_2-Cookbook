import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getRecipes } from "../../services/recipeService";
import type { IRecipe } from "../../interfaces/IRecipe";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function RecipeListScreen() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>All Recipes</Text>
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: item.id } })}
            >
              <Image source={require("../../assets/images/recipes/default.jpg")} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom || 32 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "#222" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    marginBottom: 8,
  },
  image: { width: 64, height: 64, borderRadius: 10, marginRight: 14, backgroundColor: "#eee" },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold", color: "#222" },
  desc: { color: "#666", fontSize: 15, marginTop: 2 },
});