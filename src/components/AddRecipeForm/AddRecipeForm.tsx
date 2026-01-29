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
  

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const recipeToSave: Recipe = {
      ...form,
      id: initialData ? form.id : crypto.randomUUID(),
    };

    onSubmit(recipeToSave);

    if (!initialData) {
      setForm({
        id: "",
        name: "",
        description: "",
        cuisine: "All",
        difficulty: "Easy",
        prepTime: 0,
        cookTime: 0,
        servings: 1,
        image: "",
        tags: [],
        ingredients: [],
        instructions: [],
        notes: "",
        isFavorite: false,
        createdAt: new Date().toISOString(),
      });
    }
  }

  const handleFieldChange =
    (field: keyof Recipe) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      // value can be string (text), number (numeric fields), or string[] (tags)
      let value: string | number | string[] = e.target.value;

      // Convert numeric fields to number
      if (
        field === "prepTime" ||
        field === "cookTime" ||
        field === "servings"
      ) {
        value = e.target.value === "" ? 0 : Number(e.target.value);
      }

      // Convert tags input to string array
      if (field === "tags") {
        value = e.target.value.split(",").map((tag) => tag.trim());
      }

      // Update state
      setForm({ ...form, [field]: value });
    };

  const handleIngredientChange =
    (index: number, field: "item" | "quantity" | "unit") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = [...form.ingredients];

      if (field === "quantity") {
        updated[index].quantity =
          e.target.value === "" ? "" : Number(e.target.value);
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
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Basic Information
            </h2>
          </div>

          {/* Recipe Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Recipe Name
            </label>
            <input
              value={form.name}
              onChange={handleFieldChange("name")}
              type="text"
              placeholder="Classic Mac and Cheese"
              className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleFieldChange("description")}
              placeholder="Short description of the recipe..."
              className="border rounded p-2 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Cuisine & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Cuisine
              </label>
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
              <label className="text-sm font-medium text-gray-700">
                Difficulty
              </label>
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

          {/* Times */}
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
                  value={form[field as keyof Recipe] as number}
                  onChange={handleFieldChange(field as keyof Recipe)}
                  className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              placeholder="quick, family, vegetarian"
              value={form.tags.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ingredients
            </label>

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
                      ingredients: form.ingredients.filter(
                        (_, idx) => idx !== i
                      ),
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
            <label className="text-sm font-medium text-gray-700">
              Instructions
            </label>

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
                      instructions: form.instructions.filter(
                        (_, idx) => idx !== i
                      ),
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
                setForm({ ...form, instructions: [...form.instructions, ""] })
              }
              className="flex items-center gap-2 text-orange-500 text-sm"
            >
              <Plus size={16} /> Add Step
            </button>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              value={form.notes}
              onChange={handleFieldChange("notes")}
              className="border rounded p-2 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Recipe Image URL
            </label>

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
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>

           {/* Featured Checkbox */}
           <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({ ...form, isFeatured: e.target.checked })
              }
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
            Add Recipe
          </button>
        </div>
      </section>
    </form>
  );
}
