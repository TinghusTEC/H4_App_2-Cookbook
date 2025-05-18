import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipeCabonara: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Spaghetti Carbonara",
  description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
  difficulty: "Medium",
  globalRating: 4.7,
  yourRating: 5,
  tags: ["Italian", "Pasta", "Quick"],
  imageUrl: mockDataUtils.getImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Spaghetti", quantity: "400", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Pancetta", quantity: "150", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Eggs", quantity: "4", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Parmesan Cheese", quantity: "50", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Black Pepper", quantity: "1", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Salt", quantity: "1", unit: "tsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Boil water and cook spaghetti.",
        duration: 10,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Fry pancetta until crispy.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Beat eggs and mix with cheese.",
        duration: 2
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Combine everything and season.",
        duration: 3
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Pot" },
    { id: mockDataUtils.generateId(), name: "Pan" },
    { id: mockDataUtils.generateId(), name: "Bowl" }
  ],
  preparationTime: 10,
  cookingTime: 15,
  totalTime: 25,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};