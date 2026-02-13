import type { Recipe } from "../types/Recipe";
import { seedRecipes } from "../data/seedData";

const STORAGE_KEY = "recipes";

// Save Recipes
export function saveRecipes(recipes: Recipe[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// DEV UTILITY: Resets all recipes in localStorage back to the original seed data.
// Useful during development or demos when local changes (favorites, edits, deletes)
// need to be cleared and the app restored to its initial state.
export function resetRecipes(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedRecipes));
}

// READ: Get all recipes 
export function getRecipes(): Recipe[] {
  // Retrieve from localStorage
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) {
    return JSON.parse(data);
  } else {
    // First run: populate with seed data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedRecipes));
    return seedRecipes;
  }
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

// Toggle favorite
export function toggleFavorite(id: string): void {
  const recipes = getRecipes();
  saveRecipes(
    recipes.map(r =>
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    )
  );
}

// Get only favorites
export function getFavorites(): Recipe[] {
  // Go through all recipes
  // Filter for favorites
  return getRecipes().filter(r => r.isFavorite);
}

// Get single recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return getRecipes().find(r => r.id === id);
}