"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import CuisineSelectorChips from "@/components/ui/cuisine-selector-chips";
import ChipSelector from "@/components/ui/chip-selector";
import { FormData } from "@/lib/types";

interface InputFormProps {
  onGenerate: (form: FormData) => void;
  loading: boolean;
  error: string;
}

const EQUIPMENT_OPTIONS = [
  { value: "Stovetop", label: "Stovetop" },
  { value: "Oven", label: "Oven" },
  { value: "Microwave", label: "Microwave" },
  { value: "Air Fryer", label: "Air Fryer" },
  { value: "Pressure Cooker", label: "Pressure Cooker" },
  { value: "Rice Cooker", label: "Rice Cooker" },
  { value: "Grill", label: "Grill" },
  { value: "Blender", label: "Blender" },
];

const DIETARY_OPTIONS = [
  { value: "none", label: "None" },
  { value: "Halal", label: "Halal" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Vegan", label: "Vegan" },

];

const TIME_OPTIONS = [
  { value: "15 min", label: "15 min" },
  { value: "20 min", label: "20 min" },
  { value: "30 min", label: "30 min" },
  { value: "45 min", label: "45 min" },
  { value: "60 min", label: "60 min" },
];

const SERVINGS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const LABEL_STYLE: React.CSSProperties = {
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 600,
  fontSize: "0.68rem",
  marginBottom: "0.5rem",
  display: "block",
};

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fafafa",
  borderRadius: "0.6rem",
};

export default function InputForm({ onGenerate, loading, error }: InputFormProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ingredients, setIngredients] = useState("");
  const [ingError, setIngError] = useState("");
  const [dietary, setDietary] = useState("none");
  const [cuisine, setCuisine] = useState("Bangladeshi");
  const [timeLimit, setTimeLimit] = useState("30 min");
  const [servings, setServings] = useState("4");
  const [equipment, setEquipment] = useState<string[]>(["Stovetop", "Pressure Cooker"]);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.25 }
    );
  }, []);

  function toggleEquipment(val: string) {
    setEquipment((prev) =>
      prev.includes(val) ? prev.filter((e) => e !== val) : [...prev, val]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ingredients.trim()) {
      setIngError("Please enter ingredients.");
      return;
    }
    setIngError("");
    onGenerate({
      ingredients,
      dietary: dietary === "none" ? "" : dietary,
      cuisine,
      time_limit: timeLimit,
      servings,
      equipment,
    });
  }

  return (
    <div
      ref={cardRef}
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "2rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Ingredients */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={LABEL_STYLE}>Ingredients</label>
          <Textarea
            value={ingredients}
            onChange={(e) => {
              setIngredients(e.target.value);
              if (e.target.value.trim()) setIngError("");
            }}
            placeholder="e.g. chicken, garlic, tomatoes, spinach..."
            rows={3}
            style={{ ...INPUT_STYLE, resize: "none" }}
            className="focus:border-white/20 focus:ring-2 focus:ring-white/10 placeholder:text-zinc-600 w-full"
          />
          {ingError && (
            <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.35rem" }}>
              {ingError}
            </p>
          )}
        </div>

        {/* Cuisine chips */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={LABEL_STYLE}>Cuisine Style</label>
          <CuisineSelectorChips value={cuisine} onChange={setCuisine} />
        </div>

        {/* Dietary chips */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={LABEL_STYLE}>Dietary</label>
          <ChipSelector options={DIETARY_OPTIONS} value={dietary} onChange={setDietary} />
        </div>

        {/* Time chips */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={LABEL_STYLE}>Time</label>
          <ChipSelector options={TIME_OPTIONS} value={timeLimit} onChange={setTimeLimit} />
        </div>

        {/* Servings chips */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={LABEL_STYLE}>Servings</label>
          <ChipSelector options={SERVINGS_OPTIONS} value={servings} onChange={setServings} />
        </div>

        {/* Equipment toggles — multi-select chip style */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={LABEL_STYLE}>Equipment</label>
          <motion.div
            className="flex flex-wrap gap-2 overflow-visible"
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
          >
            {EQUIPMENT_OPTIONS.map((opt) => {
              const active = equipment.includes(opt.value);
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleEquipment(opt.value)}
                  layout
                  initial={false}
                  animate={{
                    backgroundColor: active ? "#1c1412" : "rgba(39, 39, 42, 0.5)",
                  }}
                  whileHover={{
                    backgroundColor: active ? "#231714" : "rgba(39, 39, 42, 0.8)",
                  }}
                  whileTap={{
                    backgroundColor: active ? "#150f0c" : "rgba(39, 39, 42, 0.9)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                    backgroundColor: { duration: 0.1 },
                  }}
                  className={`
                    inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                    whitespace-nowrap overflow-hidden ring-1 ring-inset cursor-pointer
                    ${active
                      ? "text-[#ff9066] ring-[hsla(0,0%,100%,0.12)]"
                      : "text-zinc-400 ring-[hsla(0,0%,100%,0.06)]"}
                  `}
                >
                  <motion.div
                    className="relative flex items-center"
                    animate={{ paddingRight: active ? "1.5rem" : "0" }}
                    transition={{ ease: [0.175, 0.885, 0.32, 1.275], duration: 0.3 }}
                  >
                    <span>{opt.label}</span>
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                          className="absolute right-0"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#ff9066] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#1c1412]" strokeWidth={1.5} />
                          </div>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* API Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              color: "#fca5a5",
              fontSize: "0.88rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-shimmer"
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: loading ? "rgba(255,255,255,0.04)" : "#ffffff",
            color: loading ? "#71717a" : "#000000",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            letterSpacing: "0.03em",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: loading ? "none" : "0 2px 16px rgba(255,255,255,0.08)",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(255,255,255,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = loading ? "none" : "0 2px 16px rgba(255,255,255,0.08)";
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate Recipes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
