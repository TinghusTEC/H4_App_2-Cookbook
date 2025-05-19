import AsyncStorage from "@react-native-async-storage/async-storage";
import { recipeMockData } from "../store/mockData/recipeMockData";
import type { IRecipe } from "../interfaces/IRecipe";

const STORAGE_KEY = "recipes";

async function fetchRecipesFromApi(): Promise<IRecipe[] | null> {
  // TODO: Replace with real API
  return null;
}

async function saveRecipesToLocal(recipes: IRecipe[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

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
  const apiData = await fetchRecipesFromApi();
  if (apiData && apiData.length > 0) {
    await saveRecipesToLocal(apiData);
    return apiData;
  }

  const localData = await loadRecipesFromLocal();
  if (localData && localData.length > 0) {
    return localData;
  }

  // 3. Fallback to mock
  return recipeMockData;
}

export async function getRecipeById(id: string): Promise<IRecipe | undefined> {
  const recipes = await getRecipes();
  return recipes.find(r => r.id === id);
}

// TODO: Implement addRecipe, updateRecipe, deleteRecipe