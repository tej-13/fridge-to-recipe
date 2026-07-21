# 🍳 Fridge to Recipe

Fridge to Recipe is an AI-powered web application that generates recipes using the ingredients you already have at home. Simply enter the ingredients available in your fridge, and the application leverages Google's Gemini AI to create a complete recipe with preparation details, ingredients, cooking instructions, estimated nutrition, and smart ingredient substitutions.

---

## 🚀 Features

- 🥕 Generate recipes from available ingredients
- 🤖 AI-powered recipe generation using Google Gemini
- ❤️ Save favorite recipes locally
- 📋 Copy recipes to clipboard
- 🌙 Light/Dark mode support
- 📊 Cooking progress tracker
- 👨‍🍳 Interactive cooking checklist
- 🍽️ Adjustable serving size
- 💡 Smart ingredient substitutions
- 🥗 Estimated nutrition information

---

## 🛠️ Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Google Gemini 2.5 Flash API

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/tej-13/fridge-to-recipe.git
```

### 2. Navigate to the project

```bash
cd fridge-to-recipe
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create an environment file

Create a file named `.env.local`

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📖 Usage

1. Enter ingredients separated by commas.

Example:

```
Rice, Tomato, Onion, Garlic
```

2. Click **Generate Recipe**.

3. The AI generates:

- Recipe title
- Description
- Preparation time
- Cooking time
- Difficulty level
- Number of servings
- Ingredients list
- Step-by-step cooking instructions
- Ingredient substitutions
- Estimated nutrition

4. Optionally:

- Save recipes
- Copy recipes
- Track cooking progress
- Adjust serving size

---

## 🤖 AI Usage

This project uses **Google Gemini 2.5 Flash** through the Gemini API to generate structured recipe data.

The AI generates:

- Recipe title
- Description
- Ingredients
- Cooking instructions
- Ingredient substitutions
- Nutrition estimates

Prompt engineering ensures the AI returns structured JSON that can be rendered directly by the application.

> **Note:** AI-generated recipes may occasionally contain inaccurate ingredient quantities or cooking instructions. Always review recipes before preparing food.

---

## ⚠️ Limitations

- Requires an internet connection.
- Requires a valid Gemini API key.
- Nutrition values are estimated.
- AI responses may vary for identical inputs.
- Saved recipes are stored only in the browser's Local Storage.
- No user authentication or cloud synchronization.

---

## ⏱️ Time Spent

| Task | Time |
|----------------------------|---------:|
| Project Setup | 20 minutes |
| UI Design & Styling | 2 hours |
| Gemini API Integration | 1 hour 30 minutes |
| Recipe Rendering | 1 hour |
| Save & Copy Features | 30 minutes |
| Dark Mode Implementation | 20 minutes |
| Progress Tracker | 40 minutes |
| Testing & Bug Fixes | 1 hour |
| Documentation | 10 minutes |

**Total Time:** Approximately **8 hours**

---

## 📂 Project Structure

```
app/
├── api/
│   └── recipe/
│       └── route.ts
├── globals.css
├── layout.tsx
└── page.tsx

public/

.env.local
package.json
README.md
```

---

## 🔮 Future Improvements

- User authentication
- Recipe history
- AI-generated recipe images
- Dynamic nutrition calculation
- Shopping list generation
- Voice-guided cooking
- Multi-language support
- Cloud synchronization

---

## 👨‍💻 Author

**Tejas D Ponarkar**

Computer Science Graduate

---

⭐ If you found this project useful, consider giving it a star!