"use client";

import { useState, useCallback } from "react";
import { Recipe, FormData } from "@/lib/types";

export function useRannaBot() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const generateRecipes = useCallback(async (form: FormData) => {
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (!data.recipes || !Array.isArray(data.recipes)) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setRecipes(data.recipes);
    } catch (err) {
      console.error("[useRannaBot]", err);
      setError("Unable to connect. Check your internet.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, loading, error, generateRecipes };
}
