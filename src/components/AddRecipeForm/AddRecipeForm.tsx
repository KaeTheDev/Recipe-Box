import { Plus } from "lucide-react";
import { useState } from "react";
import type { Recipe, RecipeProps } from "../../types/Recipe";

export default function AddRecipeForm({ onSubmit, initialData }: RecipeProps) {
  const [form, setForm] = useState<Recipe>({
    id: initialData?.id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    cuisine: initialData?.cuisine || "All",
    difficulty: initialData?.difficulty || "Easy",
    prepTime: initialData?.prepTime || 0,
    cookTime: initialData?.cookTime || 0,
    servings: initialData?.servings || 1,
    image: initialData?.image || "",
    tags: initialData?.tags || [],
    ingredients: initialData?.ingredients || [],
    instructions: initialData?.instructions || [],
    notes: initialData?.notes || "",
    isFavorite: initialData?.isFavorite || false,
    isFeatured: initialData?.isFeatured || false,
    createdAt: initialData?.createdAt || new Date().toISOString(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Basic fields
    if (!form.name.trim()) newErrors.name = "Recipe name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";

    // Numeric validations
    if (form.prepTime < 0) newErrors.prepTime = "Prep time cannot be negative";
    if (form.cookTime < 0) newErrors.cookTime = "Cook time cannot be negative";
    if (form.servings <= 0) newErrors.servings = "Servings must be at least 1";

    // Tags
    if (form.tags.some(tag => tag === "")) newErrors.tags = "Tags cannot be empty";

    // Ingredients
    form.ingredients.forEach((ing, idx) => {
      if (!ing.item || !ing.item.trim()) newErrors[`ingredient-${idx}-item`] = "Ingredient name required";
      if (ing.quantity === "" || Number(ing.quantity) < 0) newErrors[`ingredient-${idx}-quantity`] = "Quantity must be >= 0";
      if (!ing.unit || !ing.unit.trim()) newErrors[`ingredient-${idx}-unit`] = "Unit required";
    });

    // Instructions
    form.instructions.forEach((step, idx) => {
      if (!step || !step.trim()) newErrors[`instruction-${idx}`] = "Step cannot be empty";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const recipeToSave: Recipe = {
      ...form,
      id: initialData ? form.id : crypto.randomUUID(),
    };

    onSubmit(recipeToSave);
  };

  // Field handlers remain unchanged
  const handleFieldChange = (field: keyof Recipe) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value: string | number | string[] = e.target.value;

    if (["prepTime", "cookTime", "servings"].includes(field)) {
      value = e.target.value === "" ? 0 : Number(e.target.value);
    }

    if (field === "tags") {
      value = e.target.value.split(",").map(tag => tag.trim());
    }

    setForm({ ...form, [field]: value });
  };

  const handleIngredientChange =
    (index: number, field: "item" | "quantity" | "unit") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = [...form.ingredients];
      if (field === "quantity") {
        updated[index].quantity = e.target.value === "" ? "" : Number(e.target.value);
      } else {
        updated[index][field] = e.target.value;
      }
      setForm({ ...form, ingredients: updated });
    };

  const handleInstructionChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = [...form.instructions];
      updated[index] = e.target.value;
      setForm({ ...form, instructions: updated });
    };

    return (
      <form onSubmit={handleSubmit}>
        <section className="flex justify-center bg-orange-50 py-10 px-4">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {initialData ? "Update Recipe" : "Add Recipe"}
            </h2>
  
            {/* Recipe Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Recipe Name</label>
              <input
                value={form.name}
                onChange={handleFieldChange("name")}
                type="text"
                placeholder="Classic Mac and Cheese"
                className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
  
            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={form.description}
                onChange={handleFieldChange("description")}
                placeholder="Short description..."
                className="border rounded p-2 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
  
            {/* Cuisine & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Cuisine</label>
                <select
                  value={form.cuisine}
                  onChange={handleFieldChange("cuisine")}
                  className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option>All</option>
                  <option>American</option>
                  <option>Italian</option>
                  <option>Italian American</option>
                  <option>Mexican</option>
                  <option>Asian</option>
                  <option>Thai</option>
                  <option>Japanese</option>
                  <option>French</option>
                  <option>Indian</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={form.difficulty}
                  onChange={handleFieldChange("difficulty")}
                  className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
  
            {/* Times & Servings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["prepTime", "cookTime", "servings"].map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    {field === "prepTime"
                      ? "Prep Time (min)"
                      : field === "cookTime"
                      ? "Cook Time (min)"
                      : "Servings"}
                  </label>
                  <input
                    type="number"
                    min={field === "servings" ? 1 : 0}
                    step={1}
                    value={form[field as keyof Recipe] as number}
                    onChange={handleFieldChange(field as keyof Recipe)}
                    className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
                </div>
              ))}
            </div>
  
            {/* Tags */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                placeholder="quick,family,vegetarian"
                value={form.tags.join(",")}
                onChange={handleFieldChange("tags")}
                className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.tags && <p className="text-red-500 text-xs">{errors.tags}</p>}
            </div>
  
            {/* Ingredients */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Ingredients</label>
              {form.ingredients.map((ing, i) => (
                <div key={i} className="grid grid-cols-4 gap-2">
                  <input
                    value={ing.item}
                    onChange={handleIngredientChange(i, "item")}
                    placeholder="Name"
                    className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    value={ing.quantity}
                    onChange={handleIngredientChange(i, "quantity")}
                    placeholder="Qty"
                    type="number"
                    min={0}
                    step={0.1}
                    className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    value={ing.unit}
                    onChange={handleIngredientChange(i, "unit")}
                    placeholder="Unit"
                    className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        ingredients: form.ingredients.filter((_, idx) => idx !== i),
                      })
                    }
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    ingredients: [
                      ...form.ingredients,
                      { item: "", quantity: "", unit: "", category: "" },
                    ],
                  })
                }
                className="flex items-center gap-2 text-orange-500 text-sm"
              >
                <Plus size={16} /> Add Ingredient
              </button>
            </div>
  
            {/* Instructions */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Instructions</label>
              {form.instructions.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={step}
                    onChange={handleInstructionChange(i)}
                    placeholder={`Step ${i + 1}`}
                    className="border rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        instructions: form.instructions.filter((_, idx) => idx !== i),
                      })
                    }
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setForm({ ...form, instructions: [...form.instructions, ""] })}
                className="flex items-center gap-2 text-orange-500 text-sm"
              >
                <Plus size={16} /> Add Step
              </button>
            </div>
  
            {/* Notes */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={handleFieldChange("notes")}
                className="border rounded p-2 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
  
            {/* Image */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Recipe Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={form.image}
                onChange={handleFieldChange("image")}
                className="border rounded p-2 text-sm"
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
  
            {/* Featured */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                id="isFeatured"
                className="h-4 w-4"
              />
              <label htmlFor="isFeatured" className="text-sm text-gray-700">
                Featured Recipe
              </label>
            </div>
  
            {/* Submit */}
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold rounded py-2 hover:bg-orange-600"
            >
              {initialData ? "Update Recipe" : "Add Recipe"}
            </button>
          </div>
        </section>
      </form>
    );
  }  