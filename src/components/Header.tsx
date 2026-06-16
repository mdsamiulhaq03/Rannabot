"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(dividerRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, transformOrigin: "center", ease: "power2.out" }, "-=0.3")
      .fromTo(taglineRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
  }, []);

  return (
    <header ref={headerRef} className="text-center py-14 px-4 relative z-10">
      {/* Ambient glow behind title */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "340px",
          height: "120px",
          background: "radial-gradient(ellipse, rgba(224, 123, 48, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />

      {/* Main wordmark */}
      <h1
        ref={titleRef}
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "clamp(2.6rem, 8vw, 4.2rem)",
          color: "#f5efe8",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
          opacity: 0,
        }}
      >
        RannaBot
      </h1>

      {/* Spice dot divider */}
      <div
        ref={dividerRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "0.85rem",
          opacity: 0,
        }}
      >
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(224,123,48,0.4))" }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#E07B30", opacity: 0.6 }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#E07B30", opacity: 0.9 }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#E07B30", opacity: 0.6 }} />
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, rgba(224,123,48,0.4), transparent)" }} />
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          color: "#7a6a5a",
          letterSpacing: "0.28em",
          fontSize: "0.65rem",
          fontWeight: 500,
          textTransform: "uppercase",
          opacity: 0,
        }}
      >
        Your Smart Bangladeshi Kitchen Companion
      </p>
    </header>
  );
}
