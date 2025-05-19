import { mockUsers } from "@/store/mockData/mockUserData";

const comments = [
  "Turned out great!",
  "Family loved it.",
  "Will make again.",
  "A bit too salty.",
  "Perfect for dinner.",
  "Easy and tasty.",
  "Needed more spice.",
  "Cooked to perfection.",
  "Delicious and quick.",
  "A new favorite!",
  "Could use more sauce.",
  "So good!",
  "Kids enjoyed it.",
  "Restaurant quality.",
  "Yummy!"
];


export const mockDataUtils = {
    generateId: () => {
        return Math.random().toString(36).substring(2, 15);
    },
    getRecipeImageUrl: (recipeId: string | null) => {
        if (!recipeId) {
            return "/assets/images/recipes/default.jpg";
        }
        const imagePath = `/assets/images/recipes/${recipeId}.jpg`;   
        return imagePath;
    },
    getRandomDateWithinDays: (days: number) => {
        const now = new Date();
        const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
    },
    getRandomTimeNear: (base: number, percent: number = 0.1) => {
        const min = Math.floor(base * (1 - percent));
        const max = Math.ceil(base * (1 + percent));
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomComment: () => {
        return comments[Math.floor(Math.random() * comments.length)];
    },
    getRandomWeightedBool: (trueWeight: number, falseWeight: number) => {
        const totalWeight = trueWeight + falseWeight;
        const randomNum = Math.random() * totalWeight;
        return randomNum < trueWeight;
    },
    getRandomRating: () => {
        return Math.floor(Math.random() * 5) + 1;
    },
    getRandomUserId: () => {
        const randomIndex = Math.floor(Math.random() * mockUsers.length);
        return mockUsers[randomIndex].id;
    },
}