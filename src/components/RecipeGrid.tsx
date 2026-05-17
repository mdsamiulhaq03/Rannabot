"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChefHat } from "lucide-react";
import { Recipe } from "@/lib/types";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || recipes.length === 0) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-recipe-card]");
    gsap.fromTo(
      cards,
      { y: 40, scale: 0.97, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.18,
      }
    );
  }, [recipes]);

  if (recipes.length === 0) return null;

  return (
    <section ref={gridRef} style={{ position: "relative", zIndex: 10 }}>
      <h2
        style={{
          color: "#ffffff",
          fontSize: "1.1rem",
          fontWeight: 600,
          marginBottom: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        <ChefHat size={18} style={{ color: "#a1a1aa" }} />
        <span>Generated Recipe</span>
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {recipes.map((recipe, i) => (
          <div key={i} data-recipe-card="">
            <RecipeCard recipe={recipe} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
