"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Mic,
  Receipt,
  Sparkles,
} from "lucide-react";
import { fadeUp, landerViewport, staggerContainer, staggerItem } from "@/components/lander/motion-presets";
import { cn } from "@/lib/utils";

const phases = [
  {
    step: "01",
    tagline: "Map what you already have.",
    name: "Discover",
    detail:
      "Ingest and search the full candidate graph with NLP and semantic filters.",
    chips: ["Bulk import", "Semantic search", "Shortlists"],
    accent: "coral" as const,
    emphasized: false,
  },
  {
    step: "02",
    tagline: "Structured signal at scale.",
    name: "Qualify",
    detail:
      "Voice agents and AI interviews produce scored, structured signal.",
    chips: ["AI voice", "Tech screen", "Integrity checks"],
    accent: "sage" as const,
    emphasized: true,
  },
  {
    step: "03",
    tagline: "Close the loop.",
    name: "Deliver",
    detail:
      "Optimized resumes, client-ready packets, invoices, and timesheets.",
    chips: ["Resume fit", "Invoicing", "Timesheets"],
    accent: "sand" as const,
    emphasized: false,
  },
] as const;

type Accent = (typeof phases)[number]["accent"];

function accentChipClass(accent: Accent): string {
  if (accent === "coral") return "border-orange-500/25 bg-orange-500/10 text-orange-950 dark:text-orange-100";
  if (accent === "sage") return "border-emerald-500/25 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100";
  return "border-amber-500/25 bg-amber-500/12 text-amber-950 dark:text-amber-100";
}

/** Staggered file → tag rows, inspired by ingestion UIs */
function DiscoverSnippet({ reduce }: { reduce: boolean }) {
  const rows = [
    {
      file: "candidates_bulk_Q1_2026.csv",
      tag: "12.4k rows · NLP indexed",
    },
    {
      file: "reqs_software_engineer.json",
      tag: "semantic query · facets on",
    },
    {
      file: "shortlist_swe_nyc_prior.xlsx",
      tag: "prior context · 6 lists merged",
    },
  ];

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-3.5 ring-1 ring-border/40">
      <div className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
        <FileSpreadsheet className="size-3 opacity-70" aria-hidden />
        Import &amp; graph
      </div>
      <ul className="space-y-2.5">
        {rows.map((row, i) => (
          <motion.li
            key={row.file}
            initial={reduce ? false : { opacity: 0, x: -8 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-12px" }}
            transition={{ delay: 0.08 * i, duration: 0.35 }}
            className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-card/90 px-2.5 py-1.5 shadow-sm ring-1 ring-border/40">
              <span className="truncate font-mono text-[9px] text-foreground/90">{row.file}</span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:w-[148px]">
              <motion.span
                aria-hidden
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.1, duration: 0.3 }}
              >
                <ArrowRight className="size-3.5 text-muted-foreground/70 hidden sm:block" />
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 4 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + i * 0.1, duration: 0.32 }}
                className={cn(
                  "inline-flex w-full rounded-md border px-2 py-1 text-center text-[9px] font-medium font-secondary sm:text-left",
                  accentChipClass("coral"),
                )}
              >
                {row.tag}
              </motion.span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** Split panes: live screen + scored handoff */
function QualifySnippet({ reduce }: { reduce: boolean }) {
  const transcript = [
    { who: "Agent", text: "Thanks for picking up — quick fit check for the Staff Eng role." },
    { who: "Candidate", text: "Sure, I’m free for six minutes." },
    { who: "Agent", text: "Noted. Walk me through your last API scale-out…" },
  ];

  return (
    <div className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-to-br from-card to-muted/50 p-3 ring-1 ring-border/45"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
            <Mic className="size-3 text-primary" aria-hidden />
            Live screen
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8px] font-semibold text-emerald-700 dark:text-emerald-300">
            Recording
          </span>
        </div>
        <div className="space-y-2">
          {transcript.map((line, i) => (
            <motion.p
              key={i}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.35 }}
              className={cn(
                "rounded-lg px-2 py-1.5 text-[9px] leading-snug font-secondary",
                line.who === "Agent"
                  ? "ml-0 mr-4 bg-muted/80 text-foreground"
                  : "ml-4 bg-primary/10 text-foreground ring-1 ring-primary/15",
              )}
            >
              <span className="block text-[8px] font-semibold uppercase tracking-wide text-muted-foreground">
                {line.who}
              </span>
              {line.text}
            </motion.p>
          ))}
        </div>
        <motion.div
          aria-hidden
          className="mt-2.5 flex h-6 items-end justify-between gap-0.5 px-1"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-primary/35"
              animate={
                reduce
                  ? false
                  : {
                      height: [6, 14 + (i % 5) * 3, 8, 16, 7],
                    }
              }
              transition={{
                duration: 1.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.04,
                ease: "easeInOut",
              }}
              style={{ height: reduce ? 8 + (i % 4) : 10 }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="flex flex-col rounded-2xl bg-gradient-to-b from-muted/70 to-muted/40 p-3 ring-1 ring-border/40"
      >
        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
          Structured signal
        </span>
        <div className="mt-2 space-y-2">
          {["Tech depth", "Culture fit", "Integrity"].map((label, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex items-center justify-between rounded-lg bg-card/95 px-2 py-1.5 text-[10px] shadow-sm ring-1 ring-border/35 font-secondary"
            >
              <span>{label}</span>
              <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={reduce ? false : { scale: 0.92, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, type: "spring", stiffness: 320, damping: 22 }}
          className="mt-auto pt-3 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-3 py-1 text-[11px] font-semibold text-emerald-900 dark:text-emerald-100 font-secondary">
            <Sparkles className="size-3.5" aria-hidden />
            Fit score · 94
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Client packet / billing closure mock */
function DeliverSnippet({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-muted/55 to-muted/25 p-3.5 ring-1 ring-border/45">
      <div className="relative rounded-xl bg-card px-3 pb-10 pt-3 shadow-sm ring-1 ring-border/40">
        <div className="flex items-start justify-between gap-2 border-b border-border/50 pb-2">
          <div>
            <p className="font-mono text-[9px] text-muted-foreground">PLACEMENT-PKT-0426</p>
            <p className="mt-0.5 text-[11px] font-semibold text-foreground font-secondary">Acme Corp · Senior PM</p>
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, rotate: -8, scale: 0.85 }}
            whileInView={reduce ? undefined : { opacity: 1, rotate: -3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 18 }}
            className="rounded-md border-2 border-dashed border-orange-400/70 bg-orange-500/10 px-2 py-1 font-primary text-[10px] font-semibold italic text-orange-900 dark:text-orange-100"
          >
            Client-ready
          </motion.div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {[
            "Resume aligned to JD v3",
            "Screen notes + integrity pass",
            "Rate & SOW snapshot",
          ].map((line, i) => (
            <motion.li
              key={line}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center gap-2 text-[10px] text-muted-foreground font-secondary"
            >
              <span className="size-1 rounded-full bg-primary/50" aria-hidden />
              {line}
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap gap-1.5"
        >
          {[
            { icon: FileSpreadsheet, label: "PDF packet" },
            { icon: Receipt, label: "Invoice draft" },
            { icon: Sparkles, label: "Timesheet hook" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/50 px-2 py-0.5 text-[8px] font-medium text-foreground font-secondary"
            >
              <Icon className="size-2.5 text-muted-foreground" aria-hidden />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PhaseSnippet({
  index,
  reduce,
}: {
  index: number;
  reduce: boolean;
}) {
  if (index === 0) return <DiscoverSnippet reduce={reduce} />;
  if (index === 1) return <QualifySnippet reduce={reduce} />;
  return <DeliverSnippet reduce={reduce} />;
}

export function LanderFormTypes() {
  const reduce = useReducedMotion();

  return (
    <section id="pipeline" className="scroll-mt-20 border-b border-border/50 bg-gradient-to-b from-muted/30 via-background to-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
            Workflow
          </p>
          <h2 className="mt-2 font-primary text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Three phases.{" "}
            <span className="font-tertiary text-primary not-italic">Zero shelfware.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] text-muted-foreground font-secondary">
            Map how Outplace meets a req—from first search to placement and billing—without retraining your team on six
            tools.
          </p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={reduce ? undefined : staggerContainer}
        >
          {phases.map((phase, i) => (
            <motion.li
              key={phase.step}
              variants={reduce ? undefined : staggerItem}
              className={cn(
                "flex flex-col rounded-3xl border bg-card p-5 text-left shadow-sm sm:p-6",
                phase.emphasized
                  ? "border-primary/35 bg-gradient-to-b from-primary/[0.05] to-card shadow-md lg:col-span-4 lg:row-span-1"
                  : "border-border/80 lg:col-span-4",
              )}
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[11px] font-bold tabular-nums text-muted-foreground">{phase.step}</span>
                <span
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[10px] font-medium font-secondary",
                    accentChipClass(phase.accent),
                  )}
                >
                  {phase.tagline}
                </span>
              </div>
              <h3 className="mt-3 font-primary text-lg font-semibold text-foreground">{phase.name}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground font-secondary">{phase.detail}</p>

              <PhaseSnippet index={i} reduce={!!reduce} />

              <ul className="mt-4 flex flex-wrap gap-2 border-t border-border/50 pt-4">
                {phase.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-border/70 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-foreground font-secondary"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
