import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipeChickenTikkaMasala: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Chicken Tikka Masala",
  description: "Indian curry with marinated chicken in a creamy tomato sauce.",
  difficulty: "Medium",
  globalRating: 4.6,
  yourRating: 4,
  tags: ["Indian", "Curry", "Chicken"],
  imageUrl: mockDataUtils.getImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Chicken Breast", quantity: "500", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Yogurt", quantity: "100", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Tomato Puree", quantity: "200", unit: "ml" },
    { id: mockDataUtils.generateId(), name: "Onion", quantity: "1", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Garlic", quantity: "2", unit: "cloves" },
    { id: mockDataUtils.generateId(), name: "Garam Masala", quantity: "2", unit: "tsp" },
    { id: mockDataUtils.generateId(), name: "Cream", quantity: "100", unit: "ml" },
    { id: mockDataUtils.generateId(), name: "Salt", quantity: "1", unit: "tsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Marinate chicken in yogurt and spices.",
        duration: 30
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Cook onions and garlic until golden.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add chicken and cook thoroughly.",
        duration: 10
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add tomato puree and simmer.",
        duration: 15,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Stir in cream and finish seasoning.",
        duration: 5
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Pan" },
    { id: mockDataUtils.generateId(), name: "Bowl" },
    { id: mockDataUtils.generateId(), name: "Spoon" }
  ],
  preparationTime: 20,
  cookingTime: 35,
  totalTime: 55,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};