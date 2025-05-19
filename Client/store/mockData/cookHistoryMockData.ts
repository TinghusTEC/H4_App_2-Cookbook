import { ICookHistory } from "../../interfaces/IRecipe";
import { recipeMockData } from "./recipeMockData";
import { mockDataUtils } from "../../utils/mockDataUtils";

export const cookHistoryMockData: ICookHistory[] = Array.from({ length: 15 }).map((_, i) => {
  const recipe = recipeMockData[i % recipeMockData.length];
  const totalCookTime = mockDataUtils.getRandomTimeNear(recipe.totalTime, 0.1);
  const workingTime = mockDataUtils.getRandomTimeNear(recipe.preparationTime + recipe.cookingTime, 0.1);

  return {
    id: mockDataUtils.generateId(),
    userId: mockDataUtils.getRandomUserId(),
    recipeId: recipe.id,
    date: mockDataUtils.getRandomDateWithinDays(60),
    rating: mockDataUtils.getRandomRating(),
    comments: mockDataUtils.getRandomComment(),
    workingTime,
    isFavorite: mockDataUtils.getRandomWeightedBool(1, 4),
    isCooked: true,
    totalCookTime
  };
});