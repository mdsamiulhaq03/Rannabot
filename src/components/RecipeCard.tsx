"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Clock, Users, Flame, ChevronDown, ChevronUp, UtensilsCrossed } from "lucide-react";
import { Recipe } from "@/lib/types";
import IngredientGrid from "./IngredientGrid";
import StepsList from "./StepsList";
import NutritionPanel from "./NutritionPanel";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -3,
      boxShadow: "0 8px 32px rgba(255,255,255,0.06)",
      duration: 0.25,
      ease: "power2.out",
    });
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 1px 8px rgba(0,0,0,0.5)",
      duration: 0.25,
      ease: "power2.out",
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0,0,0,0.5)",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Header */}
      <div style={{ padding: "1.5rem 1.5rem 0" }}>
        {/* Badges row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
          <span
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#a1a1aa",
              padding: "0.2rem 0.65rem",
              borderRadius: "20px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {recipe.cuisine}
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#71717a",
              padding: "0.2rem 0.65rem",
              borderRadius: "20px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "capitalize",
            }}
          >
            {recipe.difficulty}
          </span>
          {recipe.festival_note && (
            <span
              style={{
                background: "rgba(255,144,102,0.1)",
                border: "1px solid rgba(255,144,102,0.2)",
                color: "#ff9066",
                padding: "0.2rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.72rem",
                fontWeight: 600,
              }}
            >
              🎉 {recipe.festival_note}
            </span>
          )}
        </div>

        {/* Recipe Name */}
        <h3
          style={{
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
            color: "#ffffff",
            marginBottom: "0.5rem",
            lineHeight: 1.25,
          }}
        >
          {recipe.name}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#71717a",
            fontSize: "0.88rem",
            fontWeight: 400,
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          {recipe.description}
        </p>

        {/* Meta bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            color: "#a1a1aa",
            fontSize: "0.83rem",
            fontWeight: 500,
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Clock size={14} /> {recipe.total_time}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Users size={14} /> {recipe.servings} servings
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Flame size={14} /> {recipe.nutrition_estimate.calories} kcal
          </span>
        </div>

        {/* Expand / Collapse */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: "100%",
            padding: "0.6rem 0",
            background: "none",
            border: "none",
            color: "#52525b",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#a1a1aa"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#52525b"; }}
        >
          {expanded ? (
            <><ChevronUp size={16} /> Hide Details</>
          ) : (
            <><ChevronDown size={16} /> Show Details</>
          )}
        </button>
      </div>

      {/* Collapsible body */}
      {expanded && (
        <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#52525b",
                    padding: "0.18rem 0.55rem",
                    borderRadius: "20px",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="section-divider" />

          <IngredientGrid ingredients={recipe.ingredients} />

          <div className="section-divider" />

          <StepsList steps={recipe.steps} />

          <div className="section-divider" />

          <NutritionPanel nutrition={recipe.nutrition_estimate} />

          <div className="section-divider" />

          {/* Chef Tip */}
          {recipe.tips && (
            <div
              style={{
                borderLeft: "2px solid rgba(255,144,102,0.4)",
                background: "rgba(255,144,102,0.04)",
                borderRadius: "0 8px 8px 0",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                color: "#a1a1aa",
                lineHeight: 1.6,
              }}
            >
              <span style={{ fontWeight: 600, color: "#ff9066" }}>👨‍🍳 Chef Tips: </span>
              {recipe.tips}
            </div>
          )}

          {/* Serving Suggestion */}
          {recipe.serving_suggestion && (
            <p
              style={{
                fontStyle: "italic",
                color: "#71717a",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              <span style={{ fontWeight: 600, color: "#a1a1aa", fontStyle: "normal" }}>🍽️ Serving Suggestion: </span>
              {recipe.serving_suggestion}
            </p>
          )}

          {/* Substitutions */}
          {recipe.substitutions.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#71717a",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  marginBottom: "0.6rem",
                }}
              >
                Substitutions
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {recipe.substitutions.map((sub, i) => (
                  <div key={i} style={{ fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ color: "#e4e4e7", fontWeight: 600 }}>
                      {sub.original}
                    </span>
                    <UtensilsCrossed size={12} style={{ color: "#52525b", flexShrink: 0 }} />
                    <span style={{ color: "#71717a" }}>
                      {sub.substitute}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
