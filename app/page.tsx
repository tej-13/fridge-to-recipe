"use client";

import { useEffect, useMemo, useState } from "react";

type Recipe = {
  title: string;
  description: string;
  time: string;
  servings: number;
  difficulty: string;
  ingredients: {
name:string;
quantity:number;
unit:string;
}[];
  steps: string[];
  swaps: string[];
};

const loadingMessages = [
  "🥕 Washing vegetables...",
  "🍳 Heating the pan...",
  "🧑‍🍳 AI Chef is thinking...",
  "📖 Reading recipe books...",
  "✨ Preparing something delicious...",
];

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const [dark, setDark] = useState(false);

const [favorite, setFavorite] = useState(false);

const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

const [servings, setServings] = useState(1);

  const [loadingText, setLoadingText] = useState(
    loadingMessages[0]
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

useEffect(() => {

    const saved = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    setSavedRecipes(saved);

}, []);

  useEffect(() => {

    if (!loading) return;

    let i = 0;

    const interval = setInterval(() => {
      i++;

      setLoadingText(
        loadingMessages[i % loadingMessages.length]
      );
    }, 1800);

    return () => clearInterval(interval);
  }, [loading]);

  const progress = useMemo(() => {
    if (!recipe) return 0;

    if (recipe.steps.length === 0) return 0;

    return Math.round(
      (checkedSteps.length / recipe.steps.length) * 100
    );
  }, [checkedSteps, recipe]);

  const ingredientList = ingredients
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  async function generateRecipe() {
    try {
      setLoading(true);

setError("");

setRecipe(null);

setFavorite(false);

setCheckedSteps([]);

      const res = await fetch("/api/recipe", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ingredients,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setRecipe(data);

      setServings(data.servings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleStep(index: number) {
    if (checkedSteps.includes(index)) {
      setCheckedSteps(
        checkedSteps.filter((i) => i !== index)
      );
    } else {
      setCheckedSteps([...checkedSteps, index]);
    }
  }

  async function copyRecipe() {
    if (!recipe) return;

    let text = `${recipe.title}

${recipe.description}

Ingredients:
`;

    recipe.ingredients.forEach((i) => {
      text += `• ${i.quantity} ${i.unit} ${i.name}\n`;
    });

    text += "\nSteps:\n";

    recipe.steps.forEach((step, index) => {
      text += `${index + 1}. ${step}\n`;
    });

    await navigator.clipboard.writeText(text);

    alert("Recipe copied to clipboard 📋");
  }

  function saveFavorite() {

    if (!recipe) return;

    const favorites: Recipe[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    const alreadyExists = favorites.some(
        item => item.title === recipe.title
    );

    if (alreadyExists) {
        alert("Recipe already saved ❤️");
        return;
    }

    favorites.push(recipe);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    setSavedRecipes(favorites);

    setFavorite(true);

    alert("Recipe saved successfully ❤️");
}

function deleteRecipe(index: number) {

    const updated = savedRecipes.filter(
        (_, i) => i !== index
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
    );

    setSavedRecipes(updated);
}

function openRecipe(recipe: Recipe) {

    setRecipe(recipe);

setServings(recipe.servings);

setCheckedSteps([]);

setFavorite(true);

window.scrollTo({
    top: 0,
    behavior: "smooth"
});
}
  return (
    <main
      className={`min-h-screen transition-all duration-500 ${
        dark
          ? "bg-gradient-to-br from-black via-neutral-900 to-black text-white"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">

              🍳 Fridge to Recipe

            </h1>

            <p className="mt-2 text-gray-500 dark:text-gray-300">

              Turn your fridge into delicious meals using AI.

            </p>

          </div>

          <button
            onClick={() => setDark(!dark)}
            className="rounded-full px-5 py-3 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-lg hover:scale-105 transition"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

        {/* Hero */}

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-10 shadow-2xl">

          <h2 className="text-4xl font-bold">

            AI Powered Recipe Generator

          </h2>

          <p className="mt-3 opacity-90">

            Enter the ingredients available in your fridge and let
            Gemini AI prepare an amazing recipe in seconds.

          </p>

        </div>

        {/* Input */}

        <div className="mt-10 bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8">

          <label className="font-semibold text-lg text-gray-900 dark:text-white">

            Ingredients

          </label>

          <textarea
            value={ingredients}
            onChange={(e) =>
              setIngredients(e.target.value)
            }
            rows={5}
            placeholder="Rice, Tomato, Onion, Potato, Cheese..."
            className="mt-4 w-full rounded-xl border border-gray-300 dark:border-neutral-700 p-4 bg-white dark:bg-neutral-950 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-4 focus:ring-orange-400"
          />

          <div className="mt-5 flex flex-wrap gap-3">

            {ingredientList.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-medium"
              >
                🥬 {item}
              </span>
            ))}

          </div>

          <button
            onClick={generateRecipe}
            disabled={loading}
            className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold hover:scale-[1.02] transition shadow-xl disabled:opacity-60"
          >
            {loading ? loadingText : "✨ Generate Recipe"}
          </button>

          {error && (
            <div className="mt-6 rounded-xl bg-red-100 text-red-700 p-4">
              {error}
            </div>
          )}

        </div>        {/* Loading */}

        {loading && (
          <div className="mt-10 rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl p-10 animate-pulse">

            <div className="flex items-center gap-5">

              <div className="h-14 w-14 rounded-full border-[6px] border-orange-500 border-t-transparent animate-spin"></div>

              <div>

                <h3 className="text-2xl font-bold">
                  AI Chef is Cooking...
                </h3>

                <p className="text-gray-500 dark:text-gray-300 mt-2">
                  {loadingText}
                </p>

              </div>

            </div>

            <div className="mt-8 h-3 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">

              <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 animate-[pulse_2s_infinite] w-3/4"></div>

            </div>

          </div>
        )}

        {/* Recipe */}

        {recipe && (

          <div className="mt-12 space-y-8">

            <div className="rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden">

              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-4xl font-extrabold">
                      🍽 {recipe.title}
                    </h2>

                    <p className="mt-3 opacity-90 text-lg">
                      {recipe.description}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={copyRecipe}
                      className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition"
                    >
                      📋 Copy
                    </button>

                    <button
                      onClick={saveFavorite}
                      className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition"
                    >
                      {favorite ? "❤️ Saved" : "🤍 Favorite"}
                    </button>

                  </div>

                </div>

              </div>

              <div className="p-8">

                <div className="grid md:grid-cols-4 gap-5">

                  <div className="rounded-2xl bg-orange-100 dark:bg-orange-900 p-6 text-gray-900 dark:text-white">

                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Time
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      ⏱ {recipe.time}
                    </h3>

                  </div>

                  <div className="rounded-2xl bg-green-100 dark:bg-green-900 p-6 text-gray-900 dark:text-white">

                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Servings
                    </p>

                    <div className="flex items-center gap-3 mt-2">

                      <button
                        className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                        onClick={() =>
                          setServings(Math.max(1, servings - 1))
                        }
                      >
                        -
                      </button>

                      <div className="text-center">

<p className="font-bold text-2xl">

{servings}

</p>

<p className="text-xs text-gray-600 dark:text-gray-300">

People

</p>

</div>

                      <button
                        className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                        onClick={() =>
                          setServings(servings + 1)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <div className="rounded-2xl bg-blue-100 dark:bg-blue-900 p-6 text-gray-900 dark:text-white">

                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Difficulty
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      💪 {recipe.difficulty}
                    </h3>

                  </div>

                  <div className="rounded-2xl bg-purple-100 dark:bg-purple-900 p-6 text-gray-900 dark:text-white">

                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Progress
                    </p>

                    <div>

<h3 className="text-2xl font-bold">

{progress}%

</h3>

<p className="text-sm text-gray-600 dark:text-gray-300">

{checkedSteps.length} / {recipe.steps.length} Steps

</p>

</div>

                  </div>

                </div>

                <div className="mt-8 h-4 rounded-full bg-gray-200 dark:bg-neutral-700 overflow-hidden">

                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-green-500 via-lime-500 to-emerald-600 transition-all duration-700"
                  />

                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                  <div>

                    <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                      🥬 Ingredients
                    </h3>

                    <div className="space-y-3">

                      {recipe.ingredients.map((item, i) => (

                        <div
                          key={i}
                          className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 text-gray-900 dark:text-white hover:scale-[1.02] transition"
                        >
                          {((item.quantity / recipe.servings) * servings).toFixed(1)} {item.unit} {item.name}
                        </div>

                      ))}

                    </div>

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                      🔄 Smart Swaps
                    </h3>

                    <div className="space-y-3">

                      {recipe.swaps.map((swap, i) => (

                        <div
                          key={i}
                          className="rounded-xl bg-yellow-100 dark:bg-yellow-900 p-4 text-gray-900 dark:text-white"
                        >
                          💡 {swap}
                        </div>

                      ))}

                    </div>

                  </div>

                </div>                {/* Cooking Steps */}

                <div className="mt-12">

                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    👨‍🍳 Cooking Steps
                  </h3>

                  <div className="space-y-5">

                    {recipe.steps.map((step, index) => {

                      const completed =
                        checkedSteps.includes(index);

                      return (

                        <div
  key={index}
  onClick={() => toggleStep(index)}
  className={`cursor-pointer rounded-2xl border transition-all duration-300 p-5 flex items-start gap-5 hover:shadow-xl ${
    completed
      ? "bg-green-100 border-green-400 dark:bg-green-900"
      : "bg-gray-50 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700"
  }`}
>

  <div
    className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-white font-bold ${
      completed ? "bg-green-500" : "bg-orange-500"
    }`}
  >
    {completed ? "✓" : index + 1}
  </div>

  <div className="flex-1 min-w-0">

                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                              Step {index + 1}
                            </h4>

                            <p className="mt-2 text-gray-800 dark:text-gray-200 leading-7 break-words">
  {step}
</p>

                          </div>

                        </div>

                      );
                    })}

                  </div>

                </div>

                {/* Nutrition */}

                <div className="mt-14">

                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    🥗 Estimated Nutrition
                  </h3>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    <div className="rounded-2xl bg-red-100 dark:bg-red-900 p-6 text-center text-gray-900 dark:text-white">
                      <h4 className="font-semibold">
                        Calories
                      </h4>

                      <p className="text-3xl font-bold mt-2">
                        ~420
                      </p>

                    </div>

                    <div className="rounded-2xl bg-blue-100 dark:bg-blue-900 p-6 text-center text-gray-900 dark:text-white">
                      <h4 className="font-semibold">
                        Protein
                      </h4>

                      <p className="text-3xl font-bold mt-2">
                        18g
                      </p>

                    </div>

                    <div className="rounded-2xl bg-yellow-100 dark:bg-yellow-900 p-6 text-center text-gray-900 dark:text-white">

                      <h4 className="font-semibold">
                        Carbs
                      </h4>

                      <p className="text-3xl font-bold mt-2">
                        52g
                      </p>

                    </div>

                    <div className="rounded-2xl bg-green-100 dark:bg-green-900 p-6 text-center text-gray-900 dark:text-white">

                      <h4 className="font-semibold">
                        Fat
                      </h4>

                      <p className="text-3xl font-bold mt-2">
                        12g
                      </p>

                    </div>

                  </div>

                </div>

                {/* Completion */}

                {progress === 100 && (

                  <div className="mt-14 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-10 text-center shadow-2xl animate-pulse">

                    <h2 className="text-5xl">
                      🎉
                    </h2>

                    <h2 className="text-4xl font-bold mt-4">
                      Congratulations!
                    </h2>

                    <p className="mt-4 text-lg">
                      You have successfully completed the recipe.
                      Enjoy your delicious meal! 🍽️
                    </p>

                  </div>

                )}

                {/* Bottom Buttons */}

                <div className="mt-12 flex flex-wrap gap-5">

                  <button
                    onClick={generateRecipe}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:scale-105 transition"
                  >
                    🔄 Generate Again
                  </button>

                  <button
                    onClick={() => {
                      setRecipe(null);
                      setIngredients("");
                      setCheckedSteps([]);
                    }}
                    className="px-8 py-4 rounded-xl bg-gray-900 text-white hover:bg-black transition"
                  >
                    🗑 Clear
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}
{savedRecipes.length > 0 && (

<div className="mt-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8">

<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">

❤️ Saved Recipes

</h2>

<div className="space-y-5">

{savedRecipes.map((recipe, index) => (

<div
key={index}
className="rounded-xl border border-gray-300 dark:border-neutral-700 p-5 flex justify-between items-center"
>

<div>

<h3 className="font-bold text-xl text-gray-900 dark:text-white">

{recipe.title}

</h3>

<p className="text-gray-600 dark:text-gray-300">

{recipe.description}

</p>

</div>

<div className="flex gap-3">

<button
onClick={() => openRecipe(recipe)}
className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
>

👀 Open

</button>

<button
onClick={() => deleteRecipe(index)}
className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
>

🗑 Delete

</button>

</div>

</div>

))}

</div>

</div>

)}
        {/* Footer */}

        <footer className="mt-20 text-center pb-10 text-gray-500 dark:text-gray-400">

          <p className="text-lg">
            Built with ❤️ using Next.js + Gemini AI
          </p>

          <p className="mt-2 text-sm">
            Fridge → Recipe • AI Powered Cooking Assistant
          </p>

        </footer>

      </div>

    </main>

  );
}
