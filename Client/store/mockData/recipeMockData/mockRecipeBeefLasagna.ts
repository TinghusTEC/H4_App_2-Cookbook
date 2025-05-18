import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipeBeefLasagna: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Classic Beef Lasagna",
  description: "Italian layered pasta with beef ragu, béchamel, and cheese.",
  difficulty: "Hard",
  globalRating: 4.8,
  yourRating: 5,
  tags: ["Italian", "Pasta", "Beef"],
  imageUrl: mockDataUtils.getImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Lasagna Sheets", quantity: "12", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Ground Beef", quantity: "500", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Onion", quantity: "1", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Garlic", quantity: "2", unit: "cloves" },
    { id: mockDataUtils.generateId(), name: "Tomato Sauce", quantity: "400", unit: "ml" },
    { id: mockDataUtils.generateId(), name: "Béchamel Sauce", quantity: "500", unit: "ml" },
    { id: mockDataUtils.generateId(), name: "Mozzarella Cheese", quantity: "200", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Parmesan Cheese", quantity: "50", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Olive Oil", quantity: "2", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Salt", quantity: "1", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Pepper", quantity: "1", unit: "tsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Chop onion and garlic.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Sauté onion and garlic in olive oil.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add ground beef and cook until browned.",
        duration: 8
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add tomato sauce, salt, and pepper. Simmer.",
        duration: 20,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Layer meat sauce, béchamel, and lasagna sheets in a baking dish.",
        duration: 7
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Top with mozzarella and parmesan. Bake.",
        duration: 30,
        startTime: 0
      } as IStepTimer
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Pan" },
    { id: mockDataUtils.generateId(), name: "Baking Dish" },
    { id: mockDataUtils.generateId(), name: "Oven" },
    { id: mockDataUtils.generateId(), name: "Knife" }
  ],
  preparationTime: 20,
  cookingTime: 60,
  totalTime: 80,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};