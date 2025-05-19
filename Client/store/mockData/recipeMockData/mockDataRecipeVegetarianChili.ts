import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipeVegetarianChili: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Vegetarian Chili",
  description: "Hearty chili with beans, tomatoes, corn, and bell peppers.",
  difficulty: "Easy",
  globalRating: 4.5,
  yourRating: 4,
  tags: ["Vegetarian", "Chili", "Healthy"],
  imageUrl: mockDataUtils.getRecipeImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Kidney Beans", quantity: "400", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Black Beans", quantity: "400", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Corn", quantity: "200", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Bell Pepper", quantity: "2", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Onion", quantity: "1", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Garlic", quantity: "2", unit: "cloves" },
    { id: mockDataUtils.generateId(), name: "Chopped Tomatoes", quantity: "400", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Chili Powder", quantity: "2", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Cumin", quantity: "1", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Salt", quantity: "1", unit: "tsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Chop onions, garlic, and bell peppers.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Sauté onions and garlic until soft.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add bell peppers and cook for a few minutes.",
        duration: 3
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add beans, corn, tomatoes, and spices. Simmer.",
        duration: 20,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Season to taste and serve.",
        duration: 2
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Pot" },
    { id: mockDataUtils.generateId(), name: "Knife" },
    { id: mockDataUtils.generateId(), name: "Spoon" }
  ],
  workingTime: 10,
  cookingTime: 30,
  totalTime: 40,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};