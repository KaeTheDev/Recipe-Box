import { useEffect, useState } from "react";
import type { Recipe } from "../types/Recipe";
import {
  getRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
  toggleFavorite,
  resetRecipes,
} from "../utils/recipes";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Initial load
  useEffect(() => {
    setRecipes(getRecipes());
  }, []);

  const refresh = () => setRecipes(getRecipes());

  return {
    recipes,

    add: (recipe: Recipe) => {
      addRecipe(recipe);
      refresh();
    },

    edit: (recipe: Recipe) => {
      editRecipe(recipe);
      refresh();
    },

    remove: (id: string) => {
      deleteRecipe(id);
      refresh();
    },

    toggleFavorite: (id: string) => {
      toggleFavorite(id);
      refresh();
    },

    reset: () => {
      resetRecipes();
      refresh();
    },
  };
}