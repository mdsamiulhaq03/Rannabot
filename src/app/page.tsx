"use client";

import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import RecipeGrid from "@/components/RecipeGrid";
import GridBackground from "@/components/ui/grid-background";
import { useRannaBot } from "@/hooks/useRannaBot";

export default function Home() {
  const { recipes, loading, error, generateRecipes } = useRannaBot();

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <GridBackground />
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 1.25rem 4rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Header />

        <InputForm
          onGenerate={generateRecipes}
          loading={loading}
          error={error}
        />

        {recipes.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <RecipeGrid recipes={recipes} />
          </div>
        )}
      </div>
    </main>
  );
}
