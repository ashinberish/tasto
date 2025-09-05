export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  timer?: {
    minutes: number;
    seconds: number;
    label: string;
  };
  ingredientsNeeded: string[]; // IDs of ingredients needed for this step
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  difficulty: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  tags: string[];
  category: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  notes?: string;
}