"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flame } from "lucide-react";
import { Recipe } from "@/lib/types";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || recipes.length === 0) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-recipe-card]");
    gsap.fromTo(
      cards,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.15,
      }
    );
  }, [recipes]);

  if (recipes.length === 0) return null;

  return (
    <section ref={gridRef} style={{ position: "relative", zIndex: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <Flame size={15} style={{ color: "#E07B30" }} />
        <h2
          style={{
            color: "#a89880",
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Generated {recipes.length > 1 ? `${recipes.length} Recipes` : "Recipe"}
        </h2>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(90deg, rgba(224,123,48,0.2), transparent)",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {recipes.map((recipe, i) => (
          <div key={i} data-recipe-card="">
            <RecipeCard recipe={recipe} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
