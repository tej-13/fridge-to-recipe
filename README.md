# 🍳 Fridge to Recipe

Fridge to Recipe is an AI-powered web application that generates delicious recipes using the ingredients you already have at home. Simply enter the ingredients available in your fridge, and the application uses Google's Gemini AI to create a complete recipe including ingredients, cooking instructions, preparation time, servings, difficulty level, nutrition estimates, and smart ingredient substitutions.

---

## 🎥 Demo Video

📹 **Watch the project demo here:**

https://drive.google.com/file/d/1laDE2ySgSuf2HylAQ8mR9EJ2DqnWyO88/view?usp=sharing

---

## 🚀 Features

- 🥕 Generate recipes from available ingredients
- 🤖 AI-powered recipe generation using Google Gemini 2.5 Flash
- ❤️ Save favorite recipes locally
- 📋 Copy recipes to clipboard
- 🌙 Light/Dark mode
- 📊 Cooking progress tracker
- 👨‍🍳 Interactive cooking checklist
- 🍽️ Adjustable serving size
- 💡 Smart ingredient substitutions
- 🥗 Estimated nutrition information
- 📱 Responsive UI

---

## 🛠️ Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Google Gemini 2.5 Flash API

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/tej-13/fridge-to-recipe.git
```

### Navigate into the project

```bash
cd fridge-to-recipe
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a file named `.env.local`

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Start the development server

```bash
npm run dev
```

Open:

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
- Servings
- Ingredients list
- Step-by-step cooking instructions
- Nutrition estimates
- Ingredient substitutions

4. Additional features:

- Save recipes locally
- Copy recipes
- Track cooking progress
- Adjust serving size

---

## 🤖 AI Integration

This application uses **Google Gemini 2.5 Flash API** to generate structured recipe information.

The AI generates:

- Recipe title
- Description
- Ingredients
- Cooking instructions
- Ingredient substitutions
- Estimated nutrition

Prompt engineering is used to ensure the AI returns a structured JSON response that can be rendered directly in the application.

> **Note:** AI-generated recipes may occasionally contain inaccurate quantities or cooking instructions. Please review recipes before preparing food.

---

## ⚠️ Limitations

- Requires an internet connection.
- Requires a valid Gemini API key.
- Nutrition values are estimated.
- AI responses may vary for the same ingredients.
- Saved recipes are stored in the browser's Local Storage.
- No user authentication or cloud synchronization.

---

## ⏱️ Time Spent

| Task | Time |
|------|------:|
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

## 📌 Repository

GitHub Repository:

https://github.com/tej-13/fridge-to-recipe

---

## 👨‍💻 Author

**Tejas D Ponarkar**

Computer Science Graduate

GitHub Profile:

https://github.com/tej-13

---

⭐ If you found this project useful, consider giving it a star!
