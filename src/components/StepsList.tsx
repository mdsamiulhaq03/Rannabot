import { Step } from "@/lib/types";
import { Timer } from "lucide-react";

export default function StepsList({ steps }: { steps: Step[] }) {
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
        Instructions
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {steps.map((step, idx) => (
          <div key={`${step.step}-${idx}`} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
            {/* Step number badge */}
            <div
              style={{
                minWidth: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "rgba(224,123,48,0.12)",
                border: "1px solid rgba(224,123,48,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E07B30",
                fontWeight: 700,
                fontSize: "0.72rem",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              {step.step}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "#e8e0d5",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  marginBottom: "0.3rem",
                }}
              >
                {step.instruction}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {step.duration && (
                  <span
                    style={{
                      color: "#7a6a5a",
                      fontSize: "0.72rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(224,123,48,0.06)",
                      border: "1px solid rgba(224,123,48,0.12)",
                      borderRadius: "20px",
                      padding: "0.1rem 0.5rem",
                    }}
                  >
                    <Timer size={11} style={{ color: "#E07B30", opacity: 0.6 }} />
                    {step.duration}
                  </span>
                )}
                {step.equipment && (
                  <span style={{ color: "#5a4a3a", fontSize: "0.72rem" }}>
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
