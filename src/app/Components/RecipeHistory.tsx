"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface RecipeHistoryProps {
  recipeHistory: { ingredients: string[]; recipe: string; timestamp: Date }[];
}

const RecipeHistory: React.FC<RecipeHistoryProps> = ({ recipeHistory }) => {
  if (recipeHistory.length === 0) {
    return (
      <section id="history-section" className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle">
          Recipe History 📜
        </h2>
        <p className="p-6 relative bg-[var(--color-bg-torn)] border-2 border-dashed border-[var(--color-doodle)] shadow-md font-handwritten text-[var(--color-text-secondary)] text-[1.5rem]">
          No recipes in history yet. Generate a recipe to start! 🍳
        </p>
      </section>
    );
  }

  return (
    <section id="history-section" className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle">
        Recipe History 📜
      </h2>
      <div className="space-y-6">
        {recipeHistory.map((entry, index) => (
          <article
            key={index}
            className="p-6 relative bg-[var(--color-bg-torn)] border-2 border-dashed border-[var(--color-doodle)] shadow-md bg-cover bg-center"
            style={{
              backgroundImage: `url('/faint-stain.png')`,
            }}
          >
            <div className="absolute left-0 top-0 h-full w-4 flex flex-col justify-around bg-[var(--color-spiral)]">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-white border-2 border-dashed border-[var(--color-spiral-ring)]"
                />
              ))}
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-3 underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle">
              Recipe from {entry.timestamp.toLocaleString()}
            </h3>
            <p className="mb-4 italic text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]">
              Ingredients Used: {entry.ingredients.join(", ")}
            </p>
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-xl md:text-2xl font-semibold mt-0 mb-4 border-b border-dashed border-[var(--color-doodle)] italic font-handwritten text-[var(--color-text-primary)]"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg md:text-xl font-medium mt-6 mb-3 underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-outside pl-8 space-y-1 text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ul
                    className="list-decimal list-outside pl-8 space-y-2 text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                p: ({ node, ...props }) => (
                  <p
                    className="leading-relaxed mb-4 italic text-[var(--color-text-secondary)] font-handwritten text-[1.5rem]"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-semibold text-[var(--color-text-primary)] font-handwritten"
                    {...props}
                  />
                ),
                em: ({ node, ...props }) => (
                  <em
                    className="text-[var(--color-text-accent)] font-handwritten"
                    {...props}
                  />
                ),
              }}
            >
              {entry.recipe}
            </ReactMarkdown>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecipeHistory;
