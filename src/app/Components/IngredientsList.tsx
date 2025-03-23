"use client";

import React, { useState, useEffect, useRef } from "react";
import chefHat from "../doodles/chef_Hat.png";
interface IngredientsListProps {
  ingredients: string[];
  onGetRecipe: () => void;
  loading: boolean;
  onDelete: (index: number) => void;
  onEdit: (index: number, newValue: string) => void;
  onClear: () => void;
}

const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  onGetRecipe,
  loading,
  onDelete,
  onEdit,
  onClear,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [showClearTick, setShowClearTick] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleEdit = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const handleSave = (index: number) => {
    onEdit(index, editValue);
    setEditingIndex(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const handleClearPrompt = () => {
    setIsClearing(true);
  };

  const handleClearConfirm = () => {
    onClear();
    setIsClearing(false);
    setShowClearTick(true);
    setTimeout(() => setShowClearTick(false), 2000);
  };

  const handleClearCancel = () => {
    setIsClearing(false);
  };

  const ingredientsListItems = ingredients.map(
    (ingredient: string, index: number) => (
      <li
        key={`${ingredient}-${index}`}
        className="flex items-center justify-between gap-2 py-1"
      >
        {editingIndex === index ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 p-1 border-b-2 border-dotted border-[var(--color-doodle)] focus:outline-none bg-transparent font-handwritten text-[var(--color-text-secondary)] text-[1.5rem]"
              aria-label={`Edit ${ingredient}`}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSave(index)}
                className="px-2 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
              >
                Save ✍️
              </button>
              <button
                onClick={handleCancel}
                className="px-2 py-1 text-sm rounded bg-[var(--color-doodle)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-text-secondary)] transition-all"
              >
                Cancel ❌
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="flex-1 pl-1">{ingredient}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(index, ingredient)}
                className="px-2 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
              >
                Edit ✏️
              </button>
              <button
                onClick={() => onDelete(index)}
                className="px-2 py-1 text-sm rounded bg-[var(--color-doodle)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-text-secondary)] transition-all"
              >
                Delete 🗑️
              </button>
            </div>
          </>
        )}
      </li>
    )
  );

  return (
    <section className="p-6 mb-6 relative bg-[var(--color-bg-torn)] border-2 border-dashed border-[var(--color-doodle)] shadow-md">
      {/* Doodle: Chef Hat */}
      <img
        src={chefHat.src}
        alt="Chef Hat Doodle"
        className="absolute top-2 right-2 w-8 h-8  sepia"
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle">
          Ingredients I Have: 📝
        </h2>
        {showClearTick ? (
          <span className="font-handwritten text-[var(--color-text-primary)] text-[1.5rem]">
            ✅
          </span>
        ) : isClearing ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-handwritten text-[var(--color-text-secondary)]">
              Are you sure?
            </span>
            <button
              onClick={handleClearConfirm}
              className="px-2 py-1 text-sm rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-button-bg-hover)] transition-all"
            >
              Yes ✅
            </button>
            <button
              onClick={handleClearCancel}
              className="px-2 py-1 text-sm rounded bg-[var(--color-doodle)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-text-secondary)] transition-all"
            >
              No ❌
            </button>
          </div>
        ) : (
          <button
            onClick={handleClearPrompt}
            className="px-4 py-1 text-sm rounded bg-[var(--color-doodle)] text-[var(--color-button-text)] font-handwritten hover:bg-[var(--color-text-secondary)] transition-all"
          >
            Clear All 🗑️
          </button>
        )}
      </div>
      <ul className="list-disc list-outside pl-5 space-y-2 mb-6 text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]">
        {ingredientsListItems}
      </ul>
      <div className="p-4 bg-[var(--color-bg-torn)] border-2 border-[var(--color-doodle)] shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
        {ingredients.length < 4 ? (
          <p className="mb-4 italic text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]">
            At least 4 ingredients required 📋
          </p>
        ) : (
          <>
            <p className="mb-4 italic text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]">
              Ready to cook something yummy? 🍳
            </p>
            <button
              onClick={onGetRecipe}
              type="button"
              disabled={loading}
              className={`px-6 py-2 rounded-lg bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-handwritten text-[1.5rem] transition-all ${
                loading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:font-bold hover:bg-[var(--color-button-bg-hover)]"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div
                    className="w-6 h-6 border-4 border-t-[var(--color-button-text)] border-[var(--color-doodle)] rounded-full animate-spin"
                    aria-label="Loading"
                  />
                </div>
              ) : (
                "Get a Recipe 📖"
              )}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default IngredientsList;
