export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 grain-overlay">
      {/* Warm top radial — spice lamp glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(200, 110, 30, 0.18) 0%, rgba(150, 70, 10, 0.06) 45%, transparent 70%)",
        }}
      />
      {/* Subtle bottom warm echo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 35% at 50% 105%, rgba(180, 90, 20, 0.07) 0%, transparent 65%)",
        }}
      />
      {/* Leftward ambient drift */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 60% at -5% 50%, rgba(160, 80, 20, 0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
