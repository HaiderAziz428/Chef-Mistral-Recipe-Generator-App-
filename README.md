# Recipe Generator App 🍳

A whimsical, notebook-style recipe generator built with Next.js and TypeScript. This app allows users to input ingredients and generate creative recipes using an AI model (Mistral). With a handwritten aesthetic, it offers a nostalgic cooking experience reminiscent of flipping through a physical recipe book.

## Features ✨

- **Ingredient Input with Keyboard Shortcuts**:
  - Add ingredients by typing and pressing **Enter**.
  - Generate a recipe with **Ctrl+R** (or Cmd+R on Mac) when you have 4+ ingredients.
- **Compact and User-Friendly Layout**:
  - Save, load, view history, and toggle themes with a single, compact action bar.
  - Tips section styled like a sticky note to guide users on shortcuts.
- **Theme Toggle**:
  - Switch between a light theme (aged paper look) and a dark theme (chalkboard look) with a single click.
- **Animated Page Transitions**:
  - Recipes appear with a smooth page-turn animation, enhancing the notebook feel (powered by `framer-motion`).
- **Recipe Rating**:
  - Rate generated recipes on a 1-5 star scale, with ratings saved in `localStorage` for persistence.
- **Recipe History**:
  - View past recipes with their ingredients and timestamps, styled like notebook pages.
- **Nostalgic Aesthetic**:
  - Handwritten font (`Caveat`) and notebook-style design with torn paper backgrounds, spiral bindings, and theme-aware colors.
  - No hand-drawn doodles for a cleaner look.

## How to Use 📋

1. **Add Ingredients**:
   - Type an ingredient (e.g., "oregano") in the input field.
   - Press **Enter** or click "Add Ingredient 📌" to add it to your list.
   - Edit or delete ingredients as needed.
2. **Generate a Recipe**:
   - Once you have 4 or more ingredients, press **Ctrl+R** (or Cmd+R on Mac) or click "Get a Recipe 📖".
   - The app will generate a recipe using the Mistral AI model.
3. **Rate the Recipe**:
   - After generating a recipe, rate it by clicking the stars (1-5) below the recipe.
   - Your rating is saved and will persist if the same recipe is generated again.
4. **Save and Load Ingredients**:
   - Click "Save 💾" to save your current ingredient list to `localStorage`.
   - Click "Load 📂" to retrieve your saved ingredients.
5. **View Recipe History**:
   - Click "History 📜" to scroll to the recipe history section and view past recipes.
6. **Toggle Theme**:
   - Click "Dark 🌙" (or "Light ☀️") to switch between light and dark themes.
7. **Tips**:
   - Check the Tips 📌 section for keyboard shortcuts and guidance.

## How to Run Locally 🛠️

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (or yarn/pnpm)
- A code editor (e.g., VS Code)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/recipe-generator-app.git
   cd recipe-generator-app
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   - Create a `.env.local` file in the root directory.
   - Add your Mistral AI API key (required for recipe generation):
     ```env
     MISTRAL_API_KEY=your-api-key-here
     ```
   - You can obtain an API key from Hugging face there you find setting and go to access tokens and create new token and copy that token for the request Model is [Mistral AI](https://mistral.ai/).
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Build for Production
1. **Build the App**:
   ```bash
   npm run build
   ```
2. **Start the Production Server**:
   ```bash
   npm start
   ```

## Project Structure 📁

```
recipe-generator-app/
├── public/                  # Static assets (e.g., faint-stain.png)
├── src/
│   ├── Components/          # React components
│   │   ├── ClaudeRecipe.tsx # Recipe display with rating
│   │   ├── IngredientsList.tsx # Ingredient input and list
│   │   └── RecipeHistory.tsx # Recipe history display
│   ├── ai.ts                # Mistral AI integration for recipe generation
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles with theme variables
│   │   └── page.tsx         # Main page (renders Main.tsx)
│   └── Main.tsx             # Main component with app logic
├── .env.local               # Environment variables (not tracked)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Technologies Used 🛠️

- **Next.js**: React framework for server-side rendering and routing.
- **TypeScript**: For type-safe JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: For animated page transitions.
- **React Markdown**: To render recipe text with Markdown formatting.
- **Mistral AI**: API for generating recipes based on ingredients.
- **LocalStorage**: For persisting ingredient lists, ratings, and history.

## Future Enhancements 🚀

- **Feedback System**: Add a feedback textarea for users to provide comments on recipes, with the option to store feedback in a backend.
- **Backend Integration**: Store ratings, feedback, and recipe history in a database (e.g., Firebase, Supabase) to enable user accounts and data sharing.
- **Theme Persistence**: Save the user’s theme preference in `localStorage` to persist across sessions.
- **Custom Star Icons**: Replace Unicode stars with custom SVG icons for a more polished rating system.
- **Recipe Sharing**: Add a feature to share recipes via a link or social media.
- **Improved Accessibility**: Add ARIA labels and keyboard navigation for better accessibility.

## Contributing 🤝

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact 📬

For questions or feedback, feel free to open an issue or reach out to [haideraziz428@gmail.com](mailto:haideraziz428@gmail.com.com).

