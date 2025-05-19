import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipeChocolateLavaCake: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Chocolate Lava Cake",
  description: "Decadent dessert with a gooey chocolate center.",
  difficulty: "Medium",
  globalRating: 4.9,
  yourRating: 5,
  tags: ["Dessert", "Chocolate", "Cake"],
  imageUrl: mockDataUtils.getRecipeImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Dark Chocolate", quantity: "100", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Butter", quantity: "100", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Eggs", quantity: "2", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Egg Yolks", quantity: "2", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Sugar", quantity: "50", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Flour", quantity: "40", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Butter (for greasing)", quantity: "1", unit: "tbsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Preheat oven to 220°C (428°F) and grease ramekins.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Melt chocolate and butter together.",
        duration: 3
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Whisk eggs, yolks, and sugar until thick.",
        duration: 3
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Fold chocolate mixture and flour into eggs.",
        duration: 2
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Pour batter into ramekins and bake.",
        duration: 10,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Let cool briefly, then serve warm.",
        duration: 2
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Ramekins" },
    { id: mockDataUtils.generateId(), name: "Oven" },
    { id: mockDataUtils.generateId(), name: "Mixing Bowl" },
    { id: mockDataUtils.generateId(), name: "Whisk" },
    { id: mockDataUtils.generateId(), name: "Spatula" }
  ],
  preparationTime: 10,
  cookingTime: 10,
  totalTime: 20,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};