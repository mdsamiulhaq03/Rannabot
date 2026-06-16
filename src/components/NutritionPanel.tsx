import { NutritionEstimate } from "@/lib/types";

const NUTRITION_ITEMS = [
  { key: "calories", label: "Calories", unit: "kcal", dailyVal: 2000, color: "#E07B30" },
  { key: "protein_g", label: "Protein", unit: "g", dailyVal: 50, color: "#F59E0B" },
  { key: "carbs_g", label: "Carbs", unit: "g", dailyVal: 300, color: "#D97706" },
  { key: "fat_g", label: "Fat", unit: "g", dailyVal: 65, color: "#B45309" },
] as const;

export default function NutritionPanel({ nutrition }: { nutrition: NutritionEstimate }) {
  return (
    <div>
      <h4
        style={{
          color: "#7a6a5a",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: "0.65rem",
          fontWeight: 600,
          marginBottom: "0.9rem",
        }}
      >
        Nutrition
        <span
          style={{
            color: "#4a3a2a",
            fontSize: "0.62rem",
            marginLeft: "0.4rem",
            textTransform: "none",
            letterSpacing: "normal",
            fontWeight: 400,
          }}
        >
          per serving
        </span>
      </h4>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {NUTRITION_ITEMS.map((item) => {
          const value = nutrition[item.key] as number;
          const pct = Math.min(100, Math.round((value / item.dailyVal) * 100));
          return (
            <div key={item.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.3rem",
                }}
              >
                <span style={{ color: "#a89880", fontSize: "0.78rem", fontWeight: 500 }}>
                  {item.label}
                </span>
                <span style={{ color: "#f5efe8", fontSize: "0.85rem", fontWeight: 700 }}>
                  {value}
                  <span style={{ color: "#5a4a3a", fontSize: "0.65rem", fontWeight: 400, marginLeft: "2px" }}>
                    {item.unit}
                  </span>
                </span>
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: "3px",
                  background: "rgba(240,200,150,0.06)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${item.color}99, ${item.color})`,
                    borderRadius: "2px",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ color: "#3a2a1a", fontSize: "0.62rem", marginTop: "0.65rem" }}>
        {nutrition.disclaimer}
      </p>
    </div>
  );
}
