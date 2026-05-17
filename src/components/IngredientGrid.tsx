import { Ingredient } from "@/lib/types";

export default function IngredientGrid({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div>
      <h4
        style={{
          color: "#71717a",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: "0.68rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
        }}
      >
        Ingredients
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {ingredients.map((ing, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              padding: "0.5rem 0.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "#e4e4e7", fontSize: "0.85rem" }}>
              {ing.item}
            </span>
            <span style={{ color: "#a1a1aa", fontWeight: 600, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
              {ing.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
