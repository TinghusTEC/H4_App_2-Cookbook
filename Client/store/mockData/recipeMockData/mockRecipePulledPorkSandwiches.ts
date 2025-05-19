import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipePulledPorkSandwiches: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Pulled Pork Sandwiches",
  description: "Slow-cooked pork shoulder served in buns with coleslaw.",
  difficulty: "Medium",
  globalRating: 4.9,
  yourRating: 5,
  tags: ["American", "Pork", "Sandwich"],
  imageUrl: mockDataUtils.getRecipeImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Pork Shoulder", quantity: "1", unit: "kg" },
    { id: mockDataUtils.generateId(), name: "BBQ Sauce", quantity: "200", unit: "ml" },
    { id: mockDataUtils.generateId(), name: "Burger Buns", quantity: "6", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Coleslaw Mix", quantity: "300", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Mayonnaise", quantity: "100", unit: "ml" },
    { id: mockDataUtils.generateId(), name: "Salt", quantity: "1", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Pepper", quantity: "1", unit: "tsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Season pork shoulder with salt and pepper.",
        duration: 3
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Slow cook pork shoulder until tender.",
        duration: 360,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Shred pork and mix with BBQ sauce.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Mix coleslaw with mayonnaise.",
        duration: 3
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Assemble pork and coleslaw in buns.",
        duration: 2
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Slow Cooker" },
    { id: mockDataUtils.generateId(), name: "Bowl" },
    { id: mockDataUtils.generateId(), name: "Fork" },
    { id: mockDataUtils.generateId(), name: "Knife" }
  ],
  preparationTime: 15,
  cookingTime: 360,
  totalTime: 375,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};