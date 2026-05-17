# RannaBot

An AI-powered Bangladeshi recipe generator. Enter your available ingredients, pick your preferences, and get a complete recipe with step-by-step instructions, nutrition info, and serving suggestions.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + shadcn/ui
- **Animation** — Framer Motion, GSAP
- **AI** — Groq API (`llama-3.3-70b-versatile`)

## Features

- Ingredient-based recipe generation
- Cuisine style selector (Bangladeshi regional + international)
- Dietary filter (Halal, Vegetarian, Vegan, etc.)
- Cook time and servings controls
- Equipment selector
- Nutrition estimate per serving
- Ingredient substitutions
- Chef tips and serving suggestions

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mdsamiulhaq03/rannabot.git
cd rannabot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/recipes/route.ts           # Groq API endpoint
│   ├── globals.css                    # Global styles + theme tokens
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── components/
│   ├── ui/
│   │   ├── chip-selector.tsx          # Reusable single-select chip
│   │   ├── cuisine-selector-chips.tsx # Cuisine chip selector
│   │   ├── grid-background.tsx        # Dot grid background
│   │   ├── select.tsx                 # shadcn Select
│   │   └── textarea.tsx               # shadcn Textarea
│   ├── Header.tsx
│   ├── InputForm.tsx
│   ├── IngredientGrid.tsx
│   ├── NutritionPanel.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeGrid.tsx
│   └── StepsList.tsx
├── hooks/
│   └── useRannaBot.ts                 # Fetch logic + state
└── lib/
    ├── prompt.ts                      # AI prompt builder
    ├── types.ts                       # TypeScript interfaces
    └── utils.ts                       # cn() utility
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Groq API key for LLM inference |

## API Rate Limits (Groq Free Tier)

| Limit | Value |
|---|---|
| Requests per minute | 30 |
| Requests per day | 14,400 |
| Tokens per minute | 131,072 |

## License

MIT
