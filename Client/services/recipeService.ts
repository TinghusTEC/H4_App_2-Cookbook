import AsyncStorage from "@react-native-async-storage/async-storage";
import { recipeMockData } from "../store/mockData/recipeMockData";
import type { IRecipe } from "../interfaces/IRecipe";

const STORAGE_KEY = "recipes";

// Try to fetch from API (not implemented)
async function fetchRecipesFromApi(): Promise<IRecipe[] | null> {
  // TODO: Replace with real API
  return null;
}

// Save recipes to local storage
async function saveRecipesToLocal(recipes: IRecipe[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// Load recipes from local storage
async function loadRecipesFromLocal(): Promise<IRecipe[] | null> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Main function to get recipes (API > Local > Mock)
export async function getRecipes(): Promise<IRecipe[]> {
  // 1. Try API
  const apiData = await fetchRecipesFromApi();
  if (apiData && apiData.length > 0) {
    await saveRecipesToLocal(apiData);
    return apiData;
  }

  // 2. Try local storage
  const localData = await loadRecipesFromLocal();
  if (localData && localData.length > 0) {
    return localData;
  }

  // 3. Fallback to mock, but persist it for future use
  await saveRecipesToLocal(recipeMockData);
  return recipeMockData;
}

export async function getRecipeById(id: string): Promise<IRecipe | undefined> {
  const recipes = await getRecipes();
  return recipes.find(r => r.id === id);
}

// TODO: Implement addRecipe, updateRecipe, deleteRecipe