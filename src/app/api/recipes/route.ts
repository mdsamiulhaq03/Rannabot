import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildPrompt } from "@/lib/prompt";
import { FormData } from "@/lib/types";

const ALLOWED_DIETARY = new Set(["", "Halal", "Vegetarian", "Vegan"]);
const ALLOWED_CUISINES = new Set([
  "Bangladeshi", "Dhaka-Style", "Chittagong", "Sylheti", "Rajshahi",
  "Khulna", "Mughal", "Indian", "Middle Eastern", "Chinese", "Thai", "Italian", "Any",
]);
const ALLOWED_TIME = new Set(["15 min", "20 min", "30 min", "45 min", "60 min"]);
const ALLOWED_SERVINGS = new Set(["1", "2", "3", "4", "5"]);
const ALLOWED_EQUIPMENT = new Set([
  "Stovetop", "Oven", "Microwave", "Air Fryer",
  "Pressure Cooker", "Rice Cooker", "Grill", "Blender",
]);

function validateBody(body: FormData): string | null {
  if (!body.ingredients || body.ingredients.trim() === "") return "Ingredients are required.";
  if (body.ingredients.length > 1000) return "Ingredients must be under 1000 characters.";
  if (!ALLOWED_DIETARY.has(body.dietary ?? "")) return "Invalid dietary option.";
  if (!ALLOWED_CUISINES.has(body.cuisine ?? "")) return "Invalid cuisine option.";
  if (!ALLOWED_TIME.has(body.time_limit ?? "")) return "Invalid time limit option.";
  if (!ALLOWED_SERVINGS.has(body.servings ?? "")) return "Invalid servings option.";
  if (
    !Array.isArray(body.equipment) ||
    body.equipment.some((e) => !ALLOWED_EQUIPMENT.has(e))
  ) return "Invalid equipment selection.";
  return null;
}

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Server misconfiguration: API key missing." },
      { status: 500 }
    );
  }

  try {
    const body: FormData = await req.json();

    const validationError = validateBody(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: buildPrompt(body) }],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(text);

    if (parsed.error) {
      return NextResponse.json({ error: parsed.error }, { status: 422 });
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    console.error("[/api/recipes]", err instanceof Error ? err.message : String(err));
    const message =
      err instanceof SyntaxError
        ? "Invalid response format. Please try again."
        : "Failed to generate recipes.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
