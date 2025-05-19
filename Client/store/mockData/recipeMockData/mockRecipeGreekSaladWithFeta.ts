import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep } from "../../../interfaces/IRecipe";

export const mockRecipeGreekSaladWithFeta: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Greek Salad with Feta",
  description: "Fresh salad with tomatoes, cucumber, olives, red onion, and feta cheese.",
  difficulty: "Easy",
  globalRating: 4.4,
  yourRating: 4,
  tags: ["Greek", "Salad", "Vegetarian", "Healthy"],
  imageUrl: mockDataUtils.getRecipeImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Tomatoes", quantity: "3", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Cucumber", quantity: "1", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Red Onion", quantity: "1", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Kalamata Olives", quantity: "100", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Feta Cheese", quantity: "150", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Olive Oil", quantity: "2", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Oregano", quantity: "1", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Salt", quantity: "0.5", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Pepper", quantity: "0.5", unit: "tsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Chop tomatoes, cucumber, and red onion.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Combine vegetables with olives in a bowl.",
        duration: 2
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Crumble feta cheese over the salad.",
        duration: 1
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Drizzle with olive oil, sprinkle oregano, salt, and pepper.",
        duration: 1
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Knife" },
    { id: mockDataUtils.generateId(), name: "Bowl" },
    { id: mockDataUtils.generateId(), name: "Spoon" }
  ],
  workingTime: 10,
  cookingTime: 0,
  totalTime: 10,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};