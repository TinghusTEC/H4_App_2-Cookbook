import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipeSalmonTeriyakiBowl: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Salmon Teriyaki Bowl",
  description: "Japanese-inspired bowl with grilled salmon, rice, and teriyaki sauce.",
  difficulty: "Medium",
  globalRating: 4.7,
  yourRating: 5,
  tags: ["Japanese", "Fish", "Rice", "Healthy"],
  imageUrl: mockDataUtils.getRecipeImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Salmon Fillet", quantity: "2", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Rice", quantity: "200", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Soy Sauce", quantity: "3", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Mirin", quantity: "2", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Sugar", quantity: "1", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Ginger", quantity: "1", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Sesame Seeds", quantity: "1", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Spring Onion", quantity: "2", unit: "pcs" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Cook rice according to package instructions.",
        duration: 15,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Mix soy sauce, mirin, sugar, and ginger to make teriyaki sauce.",
        duration: 3
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Grill salmon fillets and glaze with teriyaki sauce.",
        duration: 10,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Slice spring onions.",
        duration: 2
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Assemble rice, salmon, and toppings in a bowl.",
        duration: 3
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Pot" },
    { id: mockDataUtils.generateId(), name: "Grill Pan" },
    { id: mockDataUtils.generateId(), name: "Bowl" },
    { id: mockDataUtils.generateId(), name: "Knife" }
  ],
  workingTime: 10,
  cookingTime: 25,
  totalTime: 35,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};