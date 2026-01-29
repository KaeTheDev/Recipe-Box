export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Ingredient {
    item: string;
    quantity: number | string;
    unit: string;
    category: string;
    note?: string;
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    cuisine: string;
    difficulty: Difficulty;
    prepTime: number;
    cookTime: number;
    servings: number;
    images: string;
    tags: string[];
    ingredients: Ingredient[];
    instructions: string[];
    notes?: string;
    isFavorite: boolean;
    createdAt: string;
}

export interface RecipeProps {
    onSubmit: (data: Recipe) => void;
    initialData?: Partial<Recipe>;
}