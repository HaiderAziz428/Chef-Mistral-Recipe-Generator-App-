"use client";

import React, { useEffect, useState, useRef } from "react";
import ClaudeRecipe from "./Components/ClaudeRecipe";
import IngredientsList from "./Components/IngredientsList";
import RecipeHistory from "./Components/RecipeHistory";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [recipeShown, setRecipeShown] = React.useState<boolean>(false);
  const [recipe, setRecipe] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showSaveTick, setShowSaveTick] = useState<boolean>(false);
  const [showLoadTick, setShowLoadTick] = useState<boolean>(false);
  const [recipeHistory, setRecipeHistory] = useState<
    { ingredients: string[]; recipe: string; timestamp: Date }[]
  >([]);
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Theme state
  const ingredientInputRef = useRef<HTMLInputElement>(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Auto-scroll to the recipe section whenever recipeShown becomes true
  useEffect(() => {
    if (recipeShown) {
      setTimeout(() => {
        const recipeSection = document.getElementById("recipe-section");
        if (recipeSection) {
          recipeSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [recipeShown]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault();
        if (ingredients.length >= 4 && !loading) {
          handleGetRecipe();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ingredients, loading]);

  // Save ingredients to localStorage
  function saveIngredients() {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
    setShowSaveTick(true);
    setTimeout(() => setShowSaveTick(false), 2000);
  }

  // Load ingredients from localStorage
  function loadIngredients() {
    const savedIngredients = localStorage.getItem("ingredients");
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
      setShowLoadTick(true);
      setTimeout(() => setShowLoadTick(false), 2000);
    } else {
      setShowLoadTick(true);
      setTimeout(() => setShowLoadTick(false), 2000);
    }
  }

  // Clear all ingredients
  function clearIngredients() {
    setIngredients([]);
  }

  function addIngredient(formData: FormData) {
    const newIngredient = formData.get("ingredient") as string;
    if (!newIngredient.trim()) return;

    setIngredients((prevIngredients) =>
      prevIngredients.includes(newIngredient)
        ? prevIngredients
        : [...prevIngredients, newIngredient]
    );
    if (ingredientInputRef.current) {
      ingredientInputRef.current.value = "";
    }
  }

  function deleteIngredient(index: number) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  }

  function editIngredient(index: number, newValue: string) {
    if (!newValue.trim()) {
      deleteIngredient(index);
      return;
    }

    if (ingredients.includes(newValue) && ingredients[index] !== newValue)
      return;

    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? newValue : ingredient
      )
    );
  }

  async function handleGetRecipe() {
    if (ingredients.length === 0) return;

    setLoading(true);
    setRecipeShown(false);
    setRecipe("");

    const randomPrompt =
      Math.random() < 0.5
        ? "Make sure this is a different recipe from before."
        : "Suggest something new and creative with these ingredients.";

    const generatedRecipe = await getRecipeFromMistral([
      ...ingredients,
      randomPrompt,
    ]);

    setRecipe(generatedRecipe);
    setRecipeShown(true);
    setLoading(false);

    setRecipeHistory((prev) => [
      ...prev,
      {
        ingredients: [...ingredients],
        recipe: generatedRecipe,
        timestamp: new Date(),
      },
    ]);
  }

  return (
    <main className="max-w-4xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          addIngredient(formData);
        }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-6 relative bg-[var(--color-bg-torn)] border-2 border-dashed border-[var(--color-doodle)] shadow-md"
      >
        <input
          ref={ingredientInputRef}
          type="text"
          placeholder="e.g. oregano ✍️"
          aria-label="Add ingredient"
          name="ingredient"
          className="w-full p-2 border-b-2 border-dotted border-[var(--color-doodle)] focus:outline-none bg-transparent font-handwritten text-[var(--color-text-secondary)] text-[1.5rem]"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const formData = new FormData(e.currentTarget.form!);
              addIngredient(formData);
            }
          }}
        />
        <button
          type="submit"
          className="w-full sm:w-auto py-2 px-6 rounded-lg bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten text-[1.5rem] hover:font-bold hover:bg-[var(--color-button-bg-hover)] transition-all"
        >
          Add Ingredient 📌
        </button>
      </form>

      {/* Compact Actions, Tips, and Theme Toggle Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4 p-4 relative bg-[var(--color-bg-torn)] border-2 border-dashed border-[var(--color-doodle)] shadow-md">
        {/* Actions (Save, Load, View History, Theme Toggle) */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={saveIngredients}
              className="px-4 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
            >
              Save 💾
            </button>
            {showSaveTick && (
              <span className="font-handwritten text-[var(--color-text-primary)] text-[1rem]">
                ✅
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadIngredients}
              className="px-4 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
            >
              Load 📂
            </button>
            {showLoadTick && (
              <span className="font-handwritten text-[var(--color-text-primary)] text-[1rem]">
                ✅
              </span>
            )}
          </div>
          <button
            onClick={() => {
              const historySection = document.getElementById("history-section");
              if (historySection) {
                historySection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-4 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
          >
            History 📜
          </button>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-4 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
          >
            {theme === "light" ? "Dark 🌙" : "Light ☀️"}
          </button>
        </div>

        {/* Tips (Sticky Note) */}
        <div className="sm:ml-auto p-3 bg-[#fffacd] border-2 border-dashed border-[var(--color-doodle)] shadow-md transform rotate-2 max-w-xs">
          <h3 className="text-md font-medium mb-2 underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle">
            Tips 📌
          </h3>
          <ul className="list-disc list-outside pl-4 space-y-1 text-[var(--color-text-secondary)] font-handwritten text-[1rem]">
            <li>
              Press <strong>Enter</strong> to add ingredient
            </li>
            <li>
              Press <strong>Ctrl+R</strong> for recipe (4+ items)
            </li>
          </ul>
        </div>
      </div>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          onGetRecipe={handleGetRecipe}
          loading={loading}
          onDelete={deleteIngredient}
          onEdit={editIngredient}
          onClear={clearIngredients}
        />
      )}

      {recipeShown && <ClaudeRecipe recipe={recipe} />}

      <RecipeHistory recipeHistory={recipeHistory} />
    </main>
  );
}
