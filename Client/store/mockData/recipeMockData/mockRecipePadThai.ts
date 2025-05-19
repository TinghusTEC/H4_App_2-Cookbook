import { mockDataUtils } from "@/utils/mockDataUtils";
import { IRecipe, ICookingStep, IStepTimer } from "../../../interfaces/IRecipe";

export const mockRecipePadThai: IRecipe = {
  id: mockDataUtils.generateId(),
  name: "Pad Thai",
  description: "Thai stir-fried rice noodles with shrimp, tofu, peanuts, and bean sprouts.",
  difficulty: "Medium",
  globalRating: 4.7,
  yourRating: 5,
  tags: ["Thai", "Noodles", "Shrimp", "Tofu"],
  imageUrl: mockDataUtils.getRecipeImageUrl(),
  ingredients: [
    { id: mockDataUtils.generateId(), name: "Rice Noodles", quantity: "200", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Shrimp", quantity: "150", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Tofu", quantity: "100", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Eggs", quantity: "2", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Bean Sprouts", quantity: "100", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Peanuts", quantity: "30", unit: "g" },
    { id: mockDataUtils.generateId(), name: "Spring Onion", quantity: "2", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Pad Thai Sauce", quantity: "4", unit: "tbsp" },
    { id: mockDataUtils.generateId(), name: "Lime", quantity: "1", unit: "pcs" },
    { id: mockDataUtils.generateId(), name: "Oil", quantity: "2", unit: "tbsp" }
  ],
  steps: [
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Soak rice noodles in warm water.",
        duration: 10,
        startTime: 0
      } as IStepTimer
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Stir-fry tofu and shrimp in oil.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add eggs and scramble.",
        duration: 2
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add noodles and Pad Thai sauce, stir-fry together.",
        duration: 5
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Add bean sprouts and spring onions, cook briefly.",
        duration: 2
      } as ICookingStep
    },
    {
      id: mockDataUtils.generateId(),
      type: {
        id: mockDataUtils.generateId(),
        text: "Serve with peanuts and lime wedges.",
        duration: 1
      } as ICookingStep
    }
  ],
  kitchenware: [
    { id: mockDataUtils.generateId(), name: "Wok" },
    { id: mockDataUtils.generateId(), name: "Knife" },
    { id: mockDataUtils.generateId(), name: "Bowl" },
    { id: mockDataUtils.generateId(), name: "Spoon" }
  ],
  workingTime: 10,
  cookingTime: 15,
  totalTime: 25,
  cookHistoryIds: [mockDataUtils.generateId(), mockDataUtils.generateId()]
};