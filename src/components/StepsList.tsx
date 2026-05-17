import { Step } from "@/lib/types";
import { Timer } from "lucide-react";

export default function StepsList({ steps }: { steps: Step[] }) {
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
        Instructions
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {steps.map((step, idx) => (
          <div key={`${step.step}-${idx}`} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#a1a1aa",
                fontWeight: 700,
                fontSize: "0.75rem",
                flexShrink: 0,
              }}
            >
              {step.step}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#e4e4e7", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.3rem" }}>
                {step.instruction}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {step.duration && (
                  <span style={{ color: "#52525b", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Timer size={12} />
                    {step.duration}
                  </span>
                )}
                {step.equipment && (
                  <span style={{ color: "#3f3f46", fontSize: "0.75rem" }}>
                    {step.equipment}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
