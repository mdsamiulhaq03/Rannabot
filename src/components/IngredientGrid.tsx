import { Ingredient } from "@/lib/types";

export default function IngredientGrid({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div>
      <h4
        style={{
          color: "#7a6a5a",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: "0.65rem",
          fontWeight: 600,
          marginBottom: "0.85rem",
        }}
      >
        Ingredients
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
          gap: "0.45rem",
        }}
      >
        {ingredients.map((ing, i) => (
          <div
            key={i}
            style={{
              background: "rgba(240,200,150,0.03)",
              border: "1px solid rgba(240,200,150,0.07)",
              borderRadius: "10px",
              padding: "0.55rem 0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.1rem",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(224,123,48,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,200,150,0.07)";
            }}
          >
            <span style={{ color: "#e8e0d5", fontSize: "0.82rem", fontWeight: 600 }}>
              {ing.item}
            </span>
            <span style={{ color: "#7a6a5a", fontSize: "0.75rem" }}>
              {ing.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
