export interface Ingredient {
  item: string;
  amount: string;
}

export interface Step {
  step: number;
  instruction: string;
  duration: string;
  equipment: string;
}

export interface NutritionEstimate {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  disclaimer: string;
}

export interface Substitution {
  original: string;
  substitute: string;
}

export interface Recipe {
  name: string;
  cuisine: string;
  description: string;
  festival_note: string;
  ingredients: Ingredient[];
  steps: Step[];
  total_time: string;
  difficulty: "easy" | "medium" | "hard";
  servings: number;
  nutrition_estimate: NutritionEstimate;
  tips: string;
  serving_suggestion: string;
  substitutions: Substitution[];
  tags: string[];
}

export interface FormData {
  ingredients: string;
  dietary: string;
  cuisine: string;
  time_limit: string;
  servings: string;
  equipment: string[];
}
