import { NutritionEstimate } from "@/lib/types";

const NUTRITION_ITEMS = [
  { key: "calories", label: "Calories", unit: "kcal" },
  { key: "protein_g", label: "Protein", unit: "g" },
  { key: "carbs_g", label: "Carbs", unit: "g" },
  { key: "fat_g", label: "Fat", unit: "g" },
] as const;

export default function NutritionPanel({ nutrition }: { nutrition: NutritionEstimate }) {
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
        Nutrition
        <span style={{ color: "#3f3f46", fontSize: "0.65rem", marginLeft: "0.4rem", textTransform: "none", letterSpacing: "normal", fontWeight: 400 }}>
          (per serving)
        </span>
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.6rem",
        }}
        className="sm:grid-cols-4 grid-cols-2"
      >
        {NUTRITION_ITEMS.map((item) => (
          <div
            key={item.key}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "10px",
              padding: "0.75rem 0.6rem",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#e4e4e7", fontWeight: 700, fontSize: "1.15rem" }}>
              {nutrition[item.key]}
              <span style={{ fontSize: "0.65rem", fontWeight: 400, color: "#71717a", marginLeft: "1px" }}>
                {item.unit}
              </span>
            </div>
            <div style={{ color: "#52525b", fontSize: "0.7rem", marginTop: "0.2rem" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: "#3f3f46", fontSize: "0.65rem", marginTop: "0.5rem" }}>
        {nutrition.disclaimer}
      </p>
    </div>
  );
}
