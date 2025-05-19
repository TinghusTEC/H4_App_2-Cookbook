export interface IRecipe {
    id: string;
    name: string;
    description: string;
    difficulty: string;
    globalRating: number;
    yourRating: number;
    tags: string[];
    imageUrl: string;
    ingredients: IIngredient[];
    steps: IRecipeStep[];
    kitchenware: IKitchenware[];
    workingTime: number; // in minutes
    cookingTime: number; // in minutes
    totalTime: number; // in minutes
    cookHistoryIds: string[];
}

export interface ICookHistory {
    id: string;
    userId: string;
    recipeId: string;
    date: Date;
    rating: number;
    comments: string;
    workingTime: number; // in minutes
    isFavorite: boolean;
    isCooked: boolean;
    totalCookTime: number; // in minutes
}

export interface IRecipeStep {
    id: string;
    type: ICookingStep | IStepTimer;
}

export interface ICookingStep {
    id: string;
    text: string;
    duration: number;
}

export interface IStepTimer {
    id: string;
    text: string;
    duration: number;
    startTime: number;
}

export interface IIngredient {
    id: string;
    name: string;
    quantity: string;
    unit: string;
}

export interface IKitchenware {
    id: string;
    name: string;
}