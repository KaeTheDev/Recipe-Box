import type { Recipe } from "../types/Recipe";

const STORAGE_KEY = "recipes";

// READ: Get all recipes 
export function getRecipes(): Recipe[] {
    // retrieves a string from localStorage
    const data = localStorage.getItem(STORAGE_KEY);
    // if data exists, convert JSON string into an array of Recipe objects
    // otherwise, return an empty array
    return data ? JSON.parse(data) : [];
}

// CREATE: Add a new recipe
export function addRecipe(recipe: Recipe): void {
    const recipes = getRecipes();
    // Add the new recipe to the array
    recipes.push(recipe);
    // Saves updated array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// UPDATE: Edit a recipe
export function editRecipe(updatedRecipe: Recipe): void {
    const recipes = getRecipes();  
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
  }

// DELETE: Delete a recipe
export function deleteRecipe(recipeId: string): void {
    const recipes = getRecipes();
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
}