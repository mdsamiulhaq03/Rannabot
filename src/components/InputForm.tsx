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
  { value: "15 min", label: "15m" },
  { value: "20 min", label: "20m" },
  { value: "30 min", label: "30m" },
  { value: "45 min", label: "45m" },
  { value: "60 min", label: "1h" },
];

const SERVINGS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const LABEL_STYLE: React.CSSProperties = {
  color: "#7a6a5a",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 600,
  fontSize: "0.65rem",
  marginBottom: "0.55rem",
  display: "block",
};

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(240,200,150,0.03)",
  border: "1px solid rgba(240,200,150,0.08)",
  color: "#f5efe8",
  borderRadius: "0.6rem",
};

const FIELD_GAP = "1.6rem";

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
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.3 }
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
      setIngError("Please enter at least one ingredient.");
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
        background: "#0d0b09",
        border: "1px solid rgba(240,200,150,0.07)",
        borderRadius: "22px",
        padding: "2rem",
        position: "relative",
        zIndex: 10,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(224,123,48,0.03)",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(224,123,48,0.35), transparent)",
          borderRadius: "1px",
        }}
      />

      <form onSubmit={handleSubmit}>
        {/* Ingredients */}
        <div style={{ marginBottom: FIELD_GAP }}>
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
            className="focus:border-[rgba(224,123,48,0.3)] focus:ring-2 focus:ring-[rgba(224,123,48,0.1)] placeholder:text-[#4a3a2a] w-full"
          />
          <AnimatePresence>
            {ingError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "0.35rem" }}
              >
                {ingError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Cuisine chips */}
        <div style={{ marginBottom: FIELD_GAP }}>
          <label style={LABEL_STYLE}>Cuisine Style</label>
          <CuisineSelectorChips value={cuisine} onChange={setCuisine} />
        </div>

        {/* Dietary chips */}
        <div style={{ marginBottom: FIELD_GAP }}>
          <label style={LABEL_STYLE}>Dietary</label>
          <ChipSelector options={DIETARY_OPTIONS} value={dietary} onChange={setDietary} />
        </div>

        {/* Time + Servings — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: FIELD_GAP }}>
          <div>
            <label style={LABEL_STYLE}>Cook Time</label>
            <ChipSelector options={TIME_OPTIONS} value={timeLimit} onChange={setTimeLimit} />
          </div>
          <div>
            <label style={LABEL_STYLE}>Servings</label>
            <ChipSelector options={SERVINGS_OPTIONS} value={servings} onChange={setServings} />
          </div>
        </div>

        {/* Equipment toggles */}
        <div style={{ marginBottom: FIELD_GAP }}>
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
                    backgroundColor: active ? "rgba(224,123,48,0.12)" : "rgba(40, 32, 24, 0.6)",
                  }}
                  whileHover={{
                    backgroundColor: active ? "rgba(224,123,48,0.17)" : "rgba(40, 32, 24, 0.9)",
                  }}
                  whileTap={{
                    backgroundColor: active ? "rgba(224,123,48,0.08)" : "rgba(40, 32, 24, 1)",
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
                      ? "text-[#E07B30] ring-[rgba(224,123,48,0.25)]"
                      : "text-[#7a6a5a] ring-[rgba(240,200,150,0.07)]"}
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
                          <div className="w-4 h-4 rounded-full bg-[#E07B30] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#1a0900]" strokeWidth={2} />
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
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: "rgba(239,68,68,0.07)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                marginBottom: "1rem",
                color: "#fca5a5",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-spice"
          style={{
            width: "100%",
            padding: "0.95rem",
            borderRadius: "12px",
            border: "none",
            background: loading ? "rgba(240,200,150,0.05)" : undefined,
            color: loading ? "#7a6a5a" : undefined,
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            letterSpacing: "0.04em",
            boxShadow: loading ? "none" : "0 4px 20px rgba(224,123,48,0.25)",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles size={17} />
              <span>Generate Recipes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
