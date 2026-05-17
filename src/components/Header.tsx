"use client";

import { useEffect, useRef } from "react";
import { ChefHat } from "lucide-react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <header ref={headerRef} className="text-center py-12 px-4 relative z-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <ChefHat
          size={44}
          style={{ color: "#ffffff" }}
        />
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          RannaBot
        </h1>
      </div>

      <p
        style={{
          color: "#71717a",
          letterSpacing: "0.3em",
          fontSize: "0.68rem",
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        Your Smart Kitchen Companion
      </p>
    </header>
  );
}
