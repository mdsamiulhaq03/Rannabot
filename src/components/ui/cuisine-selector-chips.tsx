"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

const CUISINES = [
  "Bangladeshi",
  "Dhaka-Style",
  "Chittagong",
  "Sylheti",
  "Rajshahi",
  "Khulna",
  "Mughal",
  "Indian",
  "Middle Eastern",
  "Chinese",
  "Thai",
  "Italian",
  "Any",
]

interface CuisineSelectorChipsProps {
  value: string
  onChange: (cuisine: string) => void
}

export default function CuisineSelectorChips({ value, onChange }: CuisineSelectorChipsProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-2 overflow-visible"
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
    >
      {CUISINES.map((cuisine) => {
        const isSelected = value === cuisine
        return (
          <motion.button
            key={cuisine}
            type="button"
            onClick={() => onChange(cuisine)}
            layout
            initial={false}
            animate={{
              backgroundColor: isSelected ? "rgba(224,123,48,0.12)" : "rgba(40, 32, 24, 0.6)",
            }}
            whileHover={{
              backgroundColor: isSelected ? "rgba(224,123,48,0.17)" : "rgba(40, 32, 24, 0.9)",
            }}
            whileTap={{
              backgroundColor: isSelected ? "rgba(224,123,48,0.08)" : "rgba(40, 32, 24, 1)",
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
              ${isSelected
                ? "text-[#E07B30] ring-[rgba(224,123,48,0.25)]"
                : "text-[#7a6a5a] ring-[rgba(240,200,150,0.07)]"}
            `}
          >
            <motion.div
              className="relative flex items-center"
              animate={{
                paddingRight: isSelected ? "1.5rem" : "0",
              }}
              transition={{
                ease: [0.175, 0.885, 0.32, 1.275],
                duration: 0.3,
              }}
            >
              <span>{cuisine}</span>
              <AnimatePresence>
                {isSelected && (
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
        )
      })}
    </motion.div>
  )
}
