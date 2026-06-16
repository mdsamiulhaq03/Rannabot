"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        background: "#0d0b09",
        border: expanded
          ? "1px solid rgba(224,123,48,0.18)"
          : "1px solid rgba(240,200,150,0.07)",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: expanded
          ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(224,123,48,0.06)"
          : "0 2px 12px rgba(0,0,0,0.4)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Orange accent top bar */}
      <div
        style={{
          height: "2px",
          background: expanded
            ? "linear-gradient(90deg, #E07B30 0%, rgba(245,158,11,0.6) 40%, transparent 80%)"
            : "linear-gradient(90deg, rgba(224,123,48,0.2) 0%, transparent 60%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Header */}
      <div style={{ padding: "1.4rem 1.5rem 0" }}>
        {/* Badges row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem", alignItems: "center" }}>
          <span
            style={{
              background: "rgba(224,123,48,0.1)",
              border: "1px solid rgba(224,123,48,0.18)",
              color: "#E07B30",
              padding: "0.18rem 0.6rem",
              borderRadius: "20px",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {recipe.cuisine}
          </span>
          <span
            style={{
              background: "rgba(240,200,150,0.04)",
              border: "1px solid rgba(240,200,150,0.08)",
              color: "#7a6a5a",
              padding: "0.18rem 0.6rem",
              borderRadius: "20px",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "capitalize",
            }}
          >
            {recipe.difficulty}
          </span>
          {recipe.festival_note && (
            <span
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.18)",
                color: "#F59E0B",
                padding: "0.18rem 0.7rem",
                borderRadius: "20px",
                fontSize: "0.7rem",
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
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(1.15rem, 3.5vw, 1.5rem)",
            color: "#f5efe8",
            marginBottom: "0.45rem",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {recipe.name}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#7a6a5a",
            fontSize: "0.85rem",
            fontWeight: 400,
            lineHeight: 1.65,
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
            color: "#a89880",
            fontSize: "0.8rem",
            fontWeight: 500,
            paddingBottom: "0.9rem",
            borderBottom: "1px solid rgba(240,200,150,0.06)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Clock size={13} style={{ color: "#E07B30", opacity: 0.7 }} /> {recipe.total_time}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Users size={13} style={{ color: "#E07B30", opacity: 0.7 }} /> {recipe.servings} servings
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Flame size={13} style={{ color: "#E07B30", opacity: 0.7 }} /> {recipe.nutrition_estimate.calories} kcal
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
            color: expanded ? "#E07B30" : "#5a4a3a",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#E07B30";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = expanded ? "#E07B30" : "#5a4a3a";
          }}
        >
          {expanded ? (
            <><ChevronUp size={15} /> Hide Details</>
          ) : (
            <><ChevronDown size={15} /> Show Details</>
          )}
        </button>
      </div>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Tags */}
              {recipe.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "rgba(240,200,150,0.04)",
                        border: "1px solid rgba(240,200,150,0.07)",
                        color: "#5a4a3a",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "20px",
                        fontSize: "0.68rem",
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
                    borderLeft: "2px solid rgba(224,123,48,0.5)",
                    background: "rgba(224,123,48,0.05)",
                    borderRadius: "0 10px 10px 0",
                    padding: "0.8rem 1rem",
                    fontSize: "0.875rem",
                    color: "#a89880",
                    lineHeight: 1.65,
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#E07B30" }}>👨‍🍳 Chef Tips: </span>
                  {recipe.tips}
                </div>
              )}

              {/* Serving Suggestion */}
              {recipe.serving_suggestion && (
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#7a6a5a",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#a89880", fontStyle: "normal" }}>🍽️ Serving Suggestion: </span>
                  {recipe.serving_suggestion}
                </p>
              )}

              {/* Substitutions */}
              {recipe.substitutions.length > 0 && (
                <div>
                  <h4
                    style={{
                      color: "#7a6a5a",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      marginBottom: "0.65rem",
                    }}
                  >
                    Substitutions
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    {recipe.substitutions.map((sub, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "0.85rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ color: "#f5efe8", fontWeight: 600 }}>{sub.original}</span>
                        <UtensilsCrossed size={11} style={{ color: "#5a4a3a", flexShrink: 0 }} />
                        <span style={{ color: "#7a6a5a" }}>{sub.substitute}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
