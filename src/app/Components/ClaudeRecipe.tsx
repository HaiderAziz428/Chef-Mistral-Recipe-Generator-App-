"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

interface ClaudeRecipeProps {
  recipe: string;
}

const ClaudeRecipe: React.FC<ClaudeRecipeProps> = ({ recipe }) => {
  const [rating, setRating] = useState<number>(0);

  // Load rating from localStorage when the component mounts
  useEffect(() => {
    const storedRating = localStorage.getItem(`recipe-rating-${recipe}`);
    if (storedRating) {
      setRating(parseInt(storedRating, 10));
    }
  }, [recipe]);

  // Save rating to localStorage whenever it changes
  useEffect(() => {
    if (rating > 0) {
      localStorage.setItem(`recipe-rating-${recipe}`, rating.toString());
    }
  }, [rating, recipe]);

  return (
    <motion.section
      id="recipe-section"
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 underline decoration-wavy font-handwritten text-[var(--color-text-primary)] underline-doodle">
        Chef Mistral’s Recipe Idea: 📖
      </h2>
      <motion.article
        className="p-6 relative bg-[var(--color-bg-torn)] border-2 border-dashed border-[var(--color-doodle)] shadow-md bg-cover bg-center"
        style={{
          backgroundImage: `url('/faint-stain.png')`,
        }}
        aria-live="polite"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute left-0 top-0 h-full w-4 flex flex-col justify-around bg-[var(--color-spiral)]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-white border-2 border-dashed border-[var(--color-spiral-ring)]"
            />
          ))}
        </div>
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
          {recipe}
        </ReactMarkdown>

        {/* Rating Section */}
        <div className="mt-4 p-4 border-t-2 border-dashed border-[var(--color-doodle)]">
          <p className="font-handwritten text-[var(--color-text-secondary)] text-[1.5rem]">
            Rate this recipe:
          </p>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default ClaudeRecipe;
