import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || ingredients.trim() === "") {
      return NextResponse.json(
        { error: "Please enter some ingredients." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a professional chef.

Return ONLY valid JSON.

Never return markdown.

Never use \`\`\`.

Return exactly this JSON:

{
  "title":"Recipe Name",
  "description":"Short description",
  "time":"20 mins",
"servings":2,
"difficulty":"Easy",
"ingredients":[
{
"name":"Ingredient Name",
"quantity":1,
"unit":"cup"
},
{
"name":"Ingredient Name",
"quantity":2,
"unit":"pcs"
}
],
  "steps":[
      "step 1",
      "step 2"
  ],
  "swaps":[
      "Milk → Cream"
  ]
}

The quantity must always be numeric.

The unit must always be separate.

Never combine quantity and ingredient into one string.

Examples:

{
"name":"Egg",
"quantity":4,
"unit":"pcs"
}

{
"name":"Milk",
"quantity":0.5,
"unit":"cup"
}

{
"name":"Salt",
"quantity":1,
"unit":"tsp"
}

Create the best recipe using:

${ingredients}

ONLY RETURN JSON.
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    console.log("========== GEMINI ==========");
    console.log(text);
    console.log("============================");

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let recipe;

    try {
      recipe = JSON.parse(text);
    } catch (e) {
      console.log(text);

      return NextResponse.json(
        {
          error: "Gemini returned invalid JSON.",
          raw: text,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}