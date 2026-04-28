"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, landerViewport, staggerContainer, staggerItem } from "@/components/lander/motion-presets";

const stats = [
  { value: "10,000+", label: "Candidates matched by AI", hint: "Across your full database" },
  { value: "3×", label: "Faster time-to-fill", hint: "Vs. manual sourcing baseline" },
  { value: "80%", label: "Less repetitive work", hint: "Screening & scheduling automated" },
  { value: "24/7", label: "Voice & interview agents", hint: "Always-on qualification" },
];

export function LanderStats() {
  const reduce = useReducedMotion();

  return (
    <section id="stats" className="scroll-mt-20 border-b border-border/60 bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mb-10 max-w-2xl mx-auto text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
            Impact
          </p>
          <h2 className="mt-2 font-primary text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Built for agencies that measure{" "}
            <span className="font-tertiary text-primary not-italic">placements</span>, not busywork.
          </h2>
        </motion.div>
   

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={reduce ? undefined : staggerContainer}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={reduce ? undefined : staggerItem}
              className="relative border-l-2 border-primary/35 pl-5"
            >
              <p className="font-primary text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground font-secondary">{s.label}</p>
              <p className="mt-1 text-[13px] text-muted-foreground font-secondary">{s.hint}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
