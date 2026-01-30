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

  // DELETE: Remove a specific item
export function removeShoppingListItem(itemId: string): void {
    const items = getShoppingList();
    const updatedItems = items.filter((item) => item.id !== itemId);
    saveShoppingList(updatedItems);
  }

  // DELETE: Remove all items from a specific recipe
export function removeRecipeFromShoppingList(recipeId: string): void {
    const items = getShoppingList();
    const updatedItems = items.filter((item) => item.recipeId !== recipeId);
    saveShoppingList(updatedItems);
  }

// DELETE: Clear all checked items
export function clearCheckedItems(): void {
    const items = getShoppingList();
    const updatedItems = items.filter((item) => !item.checked);
    saveShoppingList(updatedItems);
  }

  // DELETE: Clear all items
export function clearAllItems(): void {
    localStorage.removeItem(STORAGE_KEY);
  }  

  // QUERY: Check if recipe is in shopping list
export function isRecipeInShoppingList(recipeId: string): boolean {
    const items = getShoppingList();
    return items.some((item) => item.recipeId === recipeId);
  }

  // QUERY: Get items grouped by category
export function getGroupedShoppingList(): GroupedItems {
    const items = getShoppingList();
    
    const grouped = items.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as GroupedItems);
  
    // Sort categories alphabetically
    return Object.keys(grouped)
      .sort()
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {} as GroupedItems);
  }