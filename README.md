# 🍳 Fridge to Recipe

Fridge to Recipe is an AI-powered web application that generates recipes based on ingredients available in your fridge. Simply enter the ingredients you have, and the application uses Google's Gemini AI to generate a complete recipe with ingredients, cooking steps, preparation time, servings, difficulty level, and suggested ingredient swaps.

---

## 🚀 Features

- 🥕 Generate recipes from available ingredients
- 🤖 AI-powered recipe generation using Google Gemini
- ❤️ Save favorite recipes locally
- 📋 Copy recipes to clipboard
- 🌙 Light/Dark mode
- 📊 Cooking progress tracker
- 👨‍🍳 Interactive cooking checklist
- 🍽️ Adjustable serving size
- 💡 Smart ingredient substitutions
- 🥗 Estimated nutrition section

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
git clone https://github.com/your-username/fridge-to-recipe.git
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
Eggs, Onion, Tomato, Green Chilli
```

2. Click **Generate Recipe**.

3. The AI generates:

- Recipe title
- Description
- Preparation time
- Difficulty
- Servings
- Ingredients
- Cooking steps
- Ingredient swaps

4. Optionally:

- Save the recipe
- Copy the recipe
- Track cooking progress
- Adjust serving size

---

## 🤖 AI Usage Note

This project uses **Google Gemini 2.5 Flash** through the Gemini API.

The AI is responsible for generating:

- Recipe title
- Description
- Ingredients
- Cooking instructions
- Smart ingredient substitutions

Prompt engineering was used to ensure the response is returned in a structured JSON format suitable for rendering in the application.

AI-generated content may occasionally produce inaccurate quantities or cooking instructions, so recipes should be reviewed before preparation.

---

## ⚠️ Limitations

- Requires an active internet connection.
- Requires a valid Gemini API key.
- Nutritional values are estimated and not calculated dynamically.
- AI responses may vary for the same input.
- Saved recipes are stored only in the browser's Local Storage.
- No user authentication or cloud synchronization.

---

## ⏱️ Time Spent

| Task | Time |
|------|------:|
| Project Setup | 30 minutes |
| UI Design | 3 hours |
| Gemini API Integration | 2 hours |
| Recipe Rendering | 2 hours |
| Save & Copy Features | 1 hour |
| Dark Mode | 30 minutes |
| Progress Tracker | 1 hour |
| Testing & Bug Fixes | 2 hours |
| Documentation | 30 minutes |

**Total Time:** Approximately **12 hours**

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
- Image generation for recipes
- Dynamic nutrition calculation
- Shopping list generation
- Voice-guided cooking
- Multi-language support

---

## 👨‍💻 Author

**Tejas D Ponarkar**

Artificial Intelligence & Machine Learning Student

---

⭐ If you found this project useful, consider giving it a star.