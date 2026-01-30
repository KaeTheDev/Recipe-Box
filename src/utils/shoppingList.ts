import type { Recipe } from "../types/Recipe";
import type { ShoppingListItem, GroupedItems, ShoppingListStats } from "../types/ShoppingList";

const STORAGE_KEY = "shoppingList";

// READ: Get all shopping list items
export function getShoppingList(): ShoppingListItem[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// SAVE: Save shopping list items
function saveShoppingList(items: ShoppingListItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// CREATE: Add recipe ingredients to shopping list
export function addRecipeToShoppingList(recipe: Recipe): void {
    const items = getShoppingList();
    
    const newItems: ShoppingListItem[] = recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      id: `${recipe.id}-${ingredient.item}-${Date.now()}-${Math.random()}`,
      recipeId: recipe.id,
      recipeName: recipe.name,
      checked: false,
      addedAt: new Date().toISOString(),
    }));
  
    saveShoppingList([...items, ...newItems]);
  }

  // UPDATE: Toggle item checked status
export function toggleShoppingListItem(itemId: string): void {
    const items = getShoppingList();
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    saveShoppingList(updatedItems);
  }