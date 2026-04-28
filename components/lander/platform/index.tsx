"use client";

import type { ReactNode } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ClipboardList,
  FileText,
  LayoutGrid,
  Mic,
  Receipt,
  Search,
} from "lucide-react";
import { fadeUp, landerViewport, staggerContainer, staggerItem } from "@/components/lander/motion-presets";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

function AccentUnderline({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "violet" | "sky" | "orange";
}) {
  const cls =
    variant === "violet"
      ? "decoration-violet-500/85"
      : variant === "sky"
        ? "decoration-sky-600/85"
        : "decoration-orange-500/85";
  return (
    <span className={cn("underline decoration-wavy underline-offset-[5px]", cls)}>{children}</span>
  );
}

// Animated Kanban search/card movement demo
function AtsAnimated() {
  // Animate cards entering and moving to next col
  const cols = [
    { label: "New", tint: "bg-sky-500/12 ring-sky-500/25" },
    { label: "Screen", tint: "bg-violet-500/12 ring-violet-500/25" },
    { label: "Offer", tint: "bg-emerald-500/12 ring-emerald-500/25" },
  ];
  // Card data
  const allCards = [
    { name: "PM · NYC", colIdx: 0 },
    { name: "AE · Remote", colIdx: 0 },
    { name: "Eng · SF", colIdx: 1 },
    { name: "Designer", colIdx: 2 },
  ];
  // Stage progression: simulate "PM · NYC" being dragged Screen->Offer->back New
  const progression: [number, number][] = [
    [0, 1], [1, 2], [2, 0]
  ];
  // Card index to animate (PM · NYC only for demo)
  const progressedCardIdx = 0;
  // Animation state: which col is that card in right now
  const [colPos, setColPos] = React.useState(allCards[progressedCardIdx].colIdx);
  // Animate every 1.6s
  useEffect(() => {
    let progressIdx = 0;
    const interval = setInterval(() => {
      setColPos((cur) => {
        progressIdx = (progressIdx + 1) % progression.length;
        return progression[progressIdx][1];
      });
    }, 1700);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  // Build col arrays
  const cardsInCols = cols.map((_, colIdx) =>
    allCards.filter((_, idx) =>
      (idx === progressedCardIdx ? colPos === colIdx : allCards[idx].colIdx === colIdx)
    )
  );
  return (
    <div className="mt-8 rounded-2xl bg-muted/50 p-3 ring-1 ring-border/45">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="mb-3 flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-sm ring-1 ring-border/40"
      >
        <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="truncate text-[11px] text-muted-foreground font-secondary">
          Semantic search candidates…
        </span>
      </motion.div>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c, colIdx) => (
          <motion.div
            key={c.label}
            layout
            className={cn("rounded-xl p-2 ring-1 min-h-[84px]", c.tint)}
            transition={{ type: "spring", bounce: 0.5, duration: 0.55 }}
          >
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground font-secondary">
              {c.label}
            </p>
            <div className="space-y-1.5">
              {cardsInCols[colIdx].map((card) => (
                <motion.div
                  key={card.name}
                  layout
                  initial={{ scale: 0.85, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg bg-card px-2 py-1.5 text-[10px] font-medium shadow-sm ring-1 ring-border/35 font-secondary"
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 26,
                  }}
                >
                  {card.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 flex items-center justify-center gap-1 text-[9px] text-muted-foreground font-secondary"
      >
        <LayoutGrid className="size-3" aria-hidden />
        List · Kanban · Bulk import
      </motion.div>
    </div>
  );
}

// Animated matching cards appearing in sequence
function MatchingAnimated() {
  const matches = [
    { n: "Jamie Ortiz", role: "Staff Engineer", score: "98", tone: "bg-primary/12 text-primary ring-primary/20" },
    { n: "Sam Avery", role: "Frontend Lead", score: "94", tone: "bg-muted ring-border/50" },
    { n: "Riley Ng", role: "Full-stack", score: "91", tone: "bg-muted ring-border/50" },
  ];
  // Stagger candidates in view on scroll
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return (
    <div
      ref={ref}
      className="relative mt-8 rounded-2xl bg-muted/50 p-3 ring-1 ring-border/45"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.12 }}
        className="mb-3 rounded-xl bg-card px-3 py-2.5 shadow-sm ring-1 ring-border/40"
      >
        <p className="text-[10px] font-semibold text-primary font-secondary">
          &ldquo;Senior React in Denver under $180k&rdquo;
        </p>
      </motion.div>
      <div className="space-y-2">
        {matches.map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.27 + i * 0.16, type: "spring", damping: 22, stiffness: 170 }}
            className="flex items-center gap-2 rounded-xl bg-card/95 px-2.5 py-2 shadow-sm ring-1 ring-border/35"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold font-secondary">
              {r.n
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-foreground font-secondary">
                {r.n}
              </p>
              <p className="truncate text-[10px] text-muted-foreground font-secondary">
                {r.role}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ring-1 font-secondary",
                r.tone
              )}
            >
              {r.score}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Animated chat style with voice bubble popping in
function VoiceOutreachAnimated() {
  const messages = [
    {
      type: "ai",
      text: "Ready when you are—tell me about your notice period and salary expectations.",
    },
    {
      type: "user",
      text: "Four weeks notice; targeting base in the mid‑140s.",
    },
    {
      type: "structured",
      text: (
        <>
          <span className="font-semibold">Structured handoff:</span> availability, comp band, role fit ✓
        </>
      ),
    },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.18, once: true });
  return (
    <div
      ref={ref}
      className="mt-8 rounded-2xl bg-muted/55 p-4 ring-1 ring-border/40"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15 }}
        className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-foreground font-secondary"
      >
        <Mic className="size-3.5 text-muted-foreground" aria-hidden />
        Voice screening · notes → ATS
      </motion.div>
      <div className="space-y-3">
        {messages.map((msg, i) =>
          msg.type === "ai" ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.29 + i * 0.19, type: "spring", stiffness: 110 }}
              className="rounded-xl bg-card px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground shadow-sm ring-1 ring-border/45 font-secondary"
            >
              {msg.text}
            </motion.div>
          ) : msg.type === "user" ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.37 + i * 0.19, type: "spring", stiffness: 110 }}
              className="ml-auto max-w-[92%] rounded-2xl bg-zinc-800 px-3 py-2.5 text-[11px] leading-relaxed text-zinc-50 font-secondary"
            >
              {msg.text}
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.1, type: "spring" }}
              className="flex items-start gap-2 rounded-lg border border-dashed border-primary/25 bg-primary/5 px-2.5 py-2 text-[10px] text-foreground font-secondary"
            >
              <ClipboardList className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              <span>{msg.text}</span>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

// Animated interview: pulse avatar, prompt, then "recording" comes in
function InterviewAnimated() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <div
      ref={ref}
      className="mt-8 overflow-hidden rounded-2xl bg-muted/50 ring-1 ring-border/45"
    >
      <div className="flex flex-col gap-0 sm:flex-row">
        <div className="relative aspect-[4/3] w-full shrink-0 bg-gradient-to-br from-muted to-muted/30 sm:aspect-auto sm:w-[46%] sm:min-h-[180px]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.12, duration: 0.42, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative size-20 overflow-hidden rounded-full bg-gradient-to-b from-zinc-200 to-zinc-400 ring-4 ring-card dark:from-zinc-600 dark:to-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-primary/60"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-medium text-white font-secondary"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" aria-hidden />
            Session
          </motion.div>
        </div>
        <div className="min-w-0 flex-1 border-t border-border/40 bg-card/80 p-3 sm:border-l sm:border-t-0">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
            Voice · Screen · Integrity checks
          </p>
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.38, type: "spring" }}
              className="rounded-xl bg-muted/70 px-2.5 py-2 text-[10px] leading-relaxed font-secondary"
            >
              <span className="font-semibold text-primary">Prompt</span>
              <p className="mt-0.5 text-muted-foreground">
                Design a rollout plan with rollback criteria.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.65, type: "spring" }}
              className="rounded-xl bg-primary/8 px-2.5 py-2 text-[10px] leading-relaxed font-secondary"
            >
              <span className="font-semibold text-foreground">Recording</span>
              <p className="mt-0.5 text-muted-foreground">
                Scores sync to candidate record.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated resume optimizer: JD and resume results tick in
function ResumeOptimizerAnimated() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.12, once: true });
  const resumeBullets = [
    "✓ Mapped achievements to JD keywords",
    "✓ Quantified revenue & uptime impact",
    "Shipped monetization platform · $12M ARR",
  ];
  return (
    <div ref={ref} className="mt-8 grid gap-2 sm:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15 }}
        className="rounded-2xl bg-muted/55 p-3 ring-1 ring-border/40"
      >
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground font-secondary">
          Job description
        </p>
        <p className="text-[10px] leading-relaxed text-muted-foreground font-secondary">
          Own roadmap for billing APIs; partner with Sales &amp; Finance…
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 22 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.24 }}
        className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border/45"
      >
        <div className="mb-2 flex items-center gap-1.5">
          <FileText className="size-3.5 text-primary" aria-hidden />
          <span className="text-[10px] font-semibold text-foreground font-secondary">Client-ready resume</span>
        </div>
        <ul className="space-y-1.5 text-[10px] leading-snug text-muted-foreground font-secondary">
          {resumeBullets.map((txt, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.29 + i * 0.13, type: "spring" }}
              className={cn(
                "px-2 py-1",
                i < 2 ? "rounded-md bg-emerald-500/10 text-emerald-900 dark:text-emerald-100" : ""
              )}
            >
              {txt}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// Animated table: rows appearing & amount pulsing for "Paid"
function InvoicingAnimated() {
  const rows = [
    { id: "INV-2041", who: "Acme · placement fee", amt: "$42,500", st: "Paid" },
    { id: "INV-2042", who: "Globex · hourly pool", amt: "$18,200", st: "Due 12/04" },
    { id: "TS-881", who: "Consultant hours · Nov", amt: "124 hrs", st: "Approved" },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  return (
    <div ref={ref} className="mt-8 rounded-2xl bg-muted/50 p-3 ring-1 ring-border/45">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.14 }}
        className="mb-3 flex items-center justify-between gap-2"
      >
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground font-secondary">
          <Receipt className="size-3.5 text-muted-foreground" aria-hidden />
          Billing &amp; timesheets
        </span>
        <span className="rounded-full bg-card px-2 py-0.5 text-[9px] font-medium ring-1 ring-border/40 font-secondary">
          Fixed · hourly · vendors
        </span>
      </motion.div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.23 + i * 0.18, type: "spring" }}
            className="flex items-center gap-2 rounded-xl bg-card px-2.5 py-2 text-[10px] shadow-sm ring-1 ring-border/35 font-secondary"
          >
            <span className="shrink-0 font-mono text-[9px] text-muted-foreground">{r.id}</span>
            <span className="min-w-0 flex-1 truncate text-foreground">{r.who}</span>
            {r.st === "Paid" ? (
              <motion.span
                animate={{
                  scale: [1, 1.14, 1],
                  color: ["#15803d", "#059669", "#15803d"],
                }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  repeatDelay: 1.1,
                }}
                className="shrink-0 font-semibold tabular-nums text-emerald-700 dark:text-emerald-200"
              >
                {r.amt}
              </motion.span>
            ) : (
              <span className="shrink-0 font-semibold tabular-nums">{r.amt}</span>
            )}
            <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">{r.st}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Feature stack using animated visuals
const FEATURE_LAYERS: readonly {
  key: string;
  title: ReactNode;
  body: string;
  visual: ReactNode;
}[] = [
  {
    key: "ats",
    title: (
      <>
        AI-native <AccentUnderline variant="violet">ATS</AccentUnderline>
      </>
    ),
    body:
      "Your candidate system of record—semantic search, list and kanban, bulk import—indexed for everything downstream.",
    visual: <AtsAnimated />,
  },
  {
    key: "match",
    title: (
      <>
        Natural language <AccentUnderline variant="sky">matching</AccentUnderline>
      </>
    ),
    body:
      "Ask in plain English; Outplace ranks thousands of profiles by fit so shortlists land in seconds.",
    visual: <MatchingAnimated />,
  },
  {
    key: "voice",
    title: (
      <>
        AI <AccentUnderline variant="orange">voice outreach</AccentUnderline>
      </>
    ),
    body:
      "Voice agents place screening calls, capture availability and fit, and hand off structured notes to recruiters.",
    visual: <VoiceOutreachAnimated />,
  },
  {
    key: "screen",
    title: (
      <>
        AI <AccentUnderline variant="sky">interviews</AccentUnderline>
      </>
    ),
    body:
      "Role-specific sessions with voice, screen share, and integrity checks—scores flow straight to the record.",
    visual: <InterviewAnimated />,
  },
  {
    key: "resume",
    title: (
      <>
        <AccentUnderline variant="violet">Resume optimizer</AccentUnderline>
      </>
    ),
    body:
      "Match any resume to any JD; ship a client-ready version without another late-night rewrite.",
    visual: <ResumeOptimizerAnimated />,
  },
  {
    key: "bill",
    title: (
      <>
        <AccentUnderline variant="orange">Invoicing</AccentUnderline> &amp; timesheets
      </>
    ),
    body:
      "Consultants, vendors, fixed fee or hourly—billing and timesheets close the loop on every placement.",
    visual: <InvoicingAnimated />,
  },
];

export function LanderPlatform() {
  return (
    <section id="platform" className="scroll-mt-20 border-b border-border/50 bg-muted/35 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground font-secondary">
            Platform overview
          </p>
          <h2 className="font-primary text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Placement automation, end-to-end.{" "}
            <span className="font-tertiary text-primary not-italic">
              Six seamless layers.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground font-secondary">
            Outplace unifies every workflow—resume, scheduling, outreach, interview, and billing—into one cohesive system.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {FEATURE_LAYERS.map((layer) => (
            <motion.article
              key={layer.key}
              variants={staggerItem}
              className={cn(
                "relative flex flex-col rounded-[28px] bg-card p-8 sm:p-10",
                "shadow-none ring-1 ring-border/35",
              )}
            >
              <h3 className="text-left font-primary text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                {layer.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground font-secondary sm:text-[15px]">
                {layer.body}
              </p>
              <div className="mt-auto">{layer.visual}</div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
