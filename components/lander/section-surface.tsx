"use client";

import { cn } from "@/lib/utils";

export type LanderSurface = "dot" | "grid" | "plain";

interface LanderSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  surface?: LanderSurface;
}

export function LanderSection({
  id,
  className,
  children,
  surface = "dot",
}: LanderSectionProps) {
  const surfaceStyle: React.CSSProperties | undefined =
    surface === "dot"
      ? {
          backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }
      : surface === "grid"
        ? {
            backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--border) 45%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--border) 45%, transparent) 1px, transparent 1px)
          `,
            backgroundSize: "36px 36px",
          }
        : undefined;

  return (
    <section
      id={id}
      className={cn("relative scroll-mt-20", className)}
      style={surfaceStyle}
    >
      {children}
    </section>
  );
}
