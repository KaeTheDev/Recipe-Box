import type { Ingredient } from "./Recipe";

export interface ShoppingListItem extends Ingredient {
    id: string;
    recipeId: string;
    recipeName: string;
    checked: boolean;
    addedAt: string;
}

export interface GroupedItems {
    [category: string]: ShoppingListItem[];
}

export interface ShoppingListStats {
    total: number;
    checked: number;
    unchecked: number;
    percentComplete: number;
}