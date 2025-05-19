import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ICookHistory } from "../interfaces/IRecipe";
import { cookHistoryMockData } from "../store/mockData/cookHistoryMockData";

const STORAGE_KEY = "cookHistory";

export async function saveCookHistory(history: Partial<ICookHistory>) {
  try {
    // await api.saveCookHistory(history);
    throw new Error("API not implemented");
  } catch {
    const existing = await getCookHistory();
    const newHistory = {
      ...history,
      id: Math.random().toString(36).slice(2),
      isCooked: true,
    };
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newHistory, ...existing])
    );
  }
}

export async function getCookHistory(): Promise<ICookHistory[]> {
  try {
    // const apiData = await api.getCookHistory();
    // if (apiData) return apiData;
    throw new Error("API not implemented");
  } catch {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    let parsed: ICookHistory[] = [];
    if (data) {
      try {
        parsed = JSON.parse(data);
      } catch {
        // ignore
      }
    }
    // If parsed is not an array or is empty, seed with mock data
    if (!Array.isArray(parsed) || parsed.length === 0) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cookHistoryMockData));
      return cookHistoryMockData;
    }
    return parsed;
  }
}