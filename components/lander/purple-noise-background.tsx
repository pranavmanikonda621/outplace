const landerPurpleNoiseLayer = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='800'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/></svg>",
)}")`;

/**
 * Spotlight + vignette + SVG grain; parent must be `relative overflow-hidden`.
 */
export function LanderPurpleNoiseBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_38%,oklch(0.58_0.19_292)_0%,oklch(0.28_0.12_286)_42%,oklch(0.14_0.06_280)_72%,oklch(0.08_0.04_270)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_20%,oklch(0.05_0.03_275)_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: landerPurpleNoiseLayer,
          backgroundSize: "300px 300px",
          opacity: 0.2,
        }}
      />
    </>
  );
}
