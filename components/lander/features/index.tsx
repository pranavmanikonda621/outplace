"use client";

import { useState } from 'react';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  fadeUp,
  landerViewport,
} from '@/components/lander/motion-presets';
import { FEATURE_LAYERS } from '@/components/lander/platform';
import { cn } from '@/lib/utils';

const layers = [
  {
    title: "AI-native ATS",
    body: "Your candidate system of record—semantic search, lists, kanban, and clean migration paths from your existing ATS.",
    label: "ATS",
  },
  {
    title: "Natural language matching",
    body: "Describe the open req in plain English; Outplace ranks your candidate database by skills, location, availability, and placement fit in seconds.",
    label: "MATCH",
  },
  {
    title: "AI voice outreach",
    body: "Voice agents place screening calls to top ranked candidates, capture availability and fit, and hand off structured notes and summaries to your team.",
    label: "VOICE",
  },
  {
    title: "AI interviews",
    body: "Role-specific voice interviews with integrity checks and dynamic follow-up questions; evidence-based scoring and summaries go straight to the candidate record.",
    label: "SCREEN",
  },
  {
    title: "Resume optimizer",
    body: "Match any resume to any JD; ship a client-ready version without another late-night rewrite.",
    label: "RESUME",
  },
  {
    title: "Invoicing & timesheets",
    body: "Consultants, vendors, fixed fee or hourly—billing and timesheets close the loop on every placement.",
    label: "BILL",
  },
] as const;

const LAYER_COUNT = layers.length;

/** Per-layer iso footprint: different width, skew, depth, thickness — not one repeated slab. */
const LAYER_GEOM = [
  { w: 228, skew: 20, depth: 22, thick: 11 },
  { w: 200, skew: 17, depth: 25, thick: 11 },
  { w: 162, skew: 13, depth: 30, thick: 13 },
  { w: 220, skew: 19, depth: 24, thick: 11 },
  { w: 182, skew: 14, depth: 28, thick: 12 },
  { w: 152, skew: 11, depth: 32, thick: 10 },
] as const;

/** Extra vertical gap between plates so the stack reads less cramped. */
const BASE_Y: readonly number[] = [100, 184, 268, 352, 436, 520];

function platePaths(layerIndex: number): {
  top: string;
  front: string;
  cx: number;
  baseY: number;
  skew: number;
  depth: number;
  right: number;
} {
  const g = LAYER_GEOM[layerIndex];
  const cx = 214;
  const baseY = BASE_Y[layerIndex];
  const left = cx - g.w / 2;
  const right = cx + g.w / 2;
  const { skew, depth, thick } = g;
  const top = `M ${left} ${baseY} L ${right} ${baseY} L ${right + skew} ${baseY + depth} L ${left + skew} ${baseY + depth} Z`;
  const front = `M ${left + skew} ${baseY + depth} L ${right + skew} ${baseY + depth} L ${right + skew} ${baseY + depth + thick} L ${left + skew} ${baseY + depth + thick} Z`;
  return { top, front, cx, baseY, skew, depth, right };
}

/** Soft plate tint behind glyphs — low contrast so strokes stay the hero (theme tokens only). */
const VIGNETTE_PANEL: readonly string[] = [
  "transparent",
  "color-mix(in srgb, var(--accent) 22%, transparent)",
  "color-mix(in srgb, var(--muted) 28%, transparent)",
  "color-mix(in srgb, var(--card) 40%, var(--accent) 12%)",
  "color-mix(in srgb, var(--muted) 20%, transparent)",
  "color-mix(in srgb, var(--secondary) 14%, transparent)",
];

const VIGNETTE_SCALE = 0.56;

/** Minimal layer glyphs: small footprint, hairline strokes, rounded — reads calm on the iso plates. */
function LayerVignette({
  layerIndex,
  cx,
  baseY,
  skew,
  depth,
  isActive,
}: {
  layerIndex: number;
  cx: number;
  baseY: number;
  skew: number;
  depth: number;
  isActive: boolean;
}) {
  const ox = cx + skew * 0.52;
  const oy = baseY + depth * 0.42;
  const ink = "var(--foreground)";
  const hi = "var(--primary)";
  const whisper = "color-mix(in srgb, var(--muted-foreground) 88%, var(--foreground))";
  const dim = isActive ? 1 : 0.48;
  const panelFill = VIGNETTE_PANEL[layerIndex];
  const hair = 0.95;
  const soft = 0.78;

  return (
    <g opacity={dim} transform={`translate(${ox}, ${oy}) scale(${VIGNETTE_SCALE})`}>
      {layerIndex === 0 && (
        <g>
          <rect
            x={-36}
            y={-14}
            width={72}
            height={28}
            rx={4}
            fill="color-mix(in srgb, var(--primary-foreground) 10%, transparent)"
            stroke="var(--primary-foreground)"
            strokeWidth={hair}
            strokeOpacity={0.55}
          />
          <circle cx={-24} cy={-2} r={2.25} fill="var(--primary-foreground)" fillOpacity={0.92} />
          <path d="M-18 -2 H20" stroke="var(--primary-foreground)" strokeWidth={1.05} strokeLinecap="round" />
          <path
            d="M-18 6 H12"
            stroke="var(--primary-foreground)"
            strokeWidth={soft}
            strokeOpacity={0.4}
            strokeLinecap="round"
          />
        </g>
      )}
      {layerIndex === 1 && (
        <g>
          <rect x={-40} y={-16} width={80} height={32} rx={6} fill={panelFill} stroke="none" />
          <circle cx={-14} cy={0} r={9} fill="none" stroke={hi} strokeWidth={hair} />
          <path d="M-6 6 L4 16" stroke={hi} strokeWidth={hair} strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={14 + i * 9}
              y={4 - i * 2}
              width={5}
              height={14 + i * 2}
              rx={1.5}
              fill="color-mix(in srgb, var(--primary) 22%, transparent)"
              stroke={hi}
              strokeWidth={0.72}
              strokeOpacity={0.85}
            />
          ))}
        </g>
      )}
      {layerIndex === 2 && (
        <g>
          <rect x={-38} y={-17} width={76} height={34} rx={7} fill={panelFill} stroke="none" />
          <rect
            x={-26}
            y={-12}
            width={52}
            height={24}
            rx={5}
            fill="none"
            stroke={hi}
            strokeWidth={hair}
            strokeOpacity={0.9}
          />
          <path
            d="M-18 0 C-8 -6 8 -6 18 0 S32 6 22 6"
            fill="none"
            stroke={hi}
            strokeWidth={1.15}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {layerIndex === 3 && (
        <g>
          <rect x={-42} y={-15} width={84} height={30} rx={5} fill={panelFill} stroke="none" />
          <rect
            x={-36}
            y={-11}
            width={72}
            height={22}
            rx={3}
            fill="color-mix(in srgb, var(--card) 55%, transparent)"
            stroke={hi}
            strokeWidth={hair}
            strokeOpacity={0.85}
          />
          <circle cx={0} cy={-14} r={2} fill={hi} fillOpacity={0.85} />
          <path d="M-28 -2 H28 M-28 4 H20" stroke={whisper} strokeWidth={soft} strokeLinecap="round" />
          <path
            d="M-24 14 C-8 8 8 8 24 14"
            fill="none"
            stroke={hi}
            strokeWidth={0.9}
            strokeOpacity={0.65}
            strokeLinecap="round"
          />
        </g>
      )}
      {layerIndex === 4 && (
        <g>
          <rect x={-40} y={-16} width={80} height={32} rx={5} fill={panelFill} stroke="none" />
          <rect
            x={-34}
            y={-12}
            width={22}
            height={24}
            rx={2.5}
            fill="color-mix(in srgb, var(--muted) 35%, transparent)"
            stroke={ink}
            strokeWidth={0.75}
            strokeOpacity={0.35}
          />
          <rect x={-8} y={-12} width={36} height={24} rx={2.5} fill="none" stroke={hi} strokeWidth={hair} />
          <path d="M-2 -4 H24 M-2 4 H18" stroke={whisper} strokeWidth={soft} strokeLinecap="round" />
        </g>
      )}
      {layerIndex === 5 && (
        <g>
          <rect x={-40} y={-15} width={80} height={30} rx={5} fill={panelFill} stroke="none" />
          <rect x={-34} y={-10} width={68} height={20} rx={2.5} fill="none" stroke={hi} strokeWidth={hair} />
          <path d="M-28 -2 H24 M-28 4 H16" stroke={whisper} strokeWidth={soft} strokeLinecap="round" />
          <path d="M-28 10 H18" stroke={hi} strokeWidth={1.1} strokeLinecap="round" />
          <text x={22} y={12.5} fill={hi} fillOpacity={0.9} style={{ fontSize: "9px", fontWeight: 600 }}>
            $
          </text>
        </g>
      )}
    </g>
  );
}

function FeatureIsoStack({
  activeLayerIndex,
  reduceMotion,
}: {
  activeLayerIndex: number;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative flex min-h-[460px] items-center justify-center py-8 md:min-h-[600px] md:py-10">
      <motion.div
        className="relative w-full max-w-[min(100%,460px)] sm:max-w-[500px]"
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 500 590"
          className="h-auto min-h-[320px] w-full overflow-visible md:min-h-[420px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <filter id="outplace-layer-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="outplace-plate-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--card)" />
              <stop offset="100%" stopColor="var(--muted)" />
            </linearGradient>
            <linearGradient id="outplace-plate-active" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--primary) 70%, white)" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
            <radialGradient id="outplace-floor-glow" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--primary) 28%, transparent)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <ellipse cx="232" cy="568" rx="172" ry="20" fill="url(#outplace-floor-glow)" opacity={0.9} />

          {Array.from({ length: LAYER_COUNT }, (_, fromBottom) => {
            const layerIndex = LAYER_COUNT - 1 - fromBottom;
            const { top, front, cx, baseY, skew, depth, right } = platePaths(layerIndex);
            const isActive = activeLayerIndex === layerIndex;
            const isAtsCap = layerIndex === 0;
            const topFill = isAtsCap
              ? "var(--primary)"
              : isActive
                ? "url(#outplace-plate-active)"
                : "url(#outplace-plate-light)";
            const topStroke = isActive ? "var(--primary)" : "var(--border)";
            const labelX = right + skew + 10;
            const labelY = baseY + depth * 0.52;

            return (
              <motion.g
                key={fromBottom}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: fromBottom * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                animate={reduceMotion ? undefined : { y: isActive ? -5 : 0 }}
              >
                <motion.path
                  d={front}
                  fill="color-mix(in srgb, var(--secondary) 22%, var(--border))"
                  fillOpacity={isActive ? 0.5 : 0.28}
                />
                <motion.path
                  d={top}
                  fill={topFill}
                  stroke={topStroke}
                  strokeWidth={isActive ? 2.2 : 1}
                  filter={isActive ? "url(#outplace-layer-glow)" : isAtsCap ? "url(#outplace-layer-glow)" : undefined}
                  animate={{ opacity: isActive || isAtsCap ? 1 : 0.9 }}
                />
                <LayerVignette
                  layerIndex={layerIndex}
                  cx={cx}
                  baseY={baseY}
                  skew={skew}
                  depth={depth}
                  isActive={isActive || isAtsCap}
                />
                <line
                  x1={right + skew * 0.85}
                  y1={labelY}
                  x2={labelX - 4}
                  y2={labelY}
                  stroke="color-mix(in srgb, var(--border) 80%, transparent)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  opacity={0.9}
                />
                <text
                  x={labelX}
                  y={labelY}
                  dominantBaseline="middle"
                  fill={isActive ? "var(--primary)" : "var(--muted-foreground)"}
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                  }}
                >
                  {layers[layerIndex].label}
                </text>
              </motion.g>
            );
          })}

          <motion.circle
            cx={420}
            cy={72}
            r={5}
            fill="var(--primary)"
            fillOpacity={0.2}
            animate={reduceMotion ? undefined : { opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function LanderAgentFeatures() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="capabilities" className="scroll-mt-20 border-b border-border/50 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground font-secondary">
            The Outplace stack
          </p>
          <p className="font-mono text-[11px] tabular-nums text-muted-foreground sm:pt-0.5">
            [ {String(active + 1).padStart(2, "0")} / {LAYER_COUNT} ]
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-primary text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Six layers.{" "}
            <span className="font-tertiary text-primary not-italic">Complete placement ops.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground font-secondary">
            Every capability stacks on the last—from ATS data to invoicing—so your agency runs as one system, not six tabs. The next section shows those layers in motion.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={landerViewport}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg ring-1 ring-border/25"
        >
          <div className="grid lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)] lg:divide-x lg:divide-border/60">
            <div className="relative border-b border-border/60 bg-muted/20 px-4 py-8 md:border-b-0 md:px-4 md:py-10 lg:px-8">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Architecture
              </p>
              <p className="mb-4 max-w-[280px] text-[11px] leading-relaxed text-muted-foreground font-secondary md:hidden">
                Each layer has a different footprint—wider for ATS &amp; screen, narrow for voice &amp; billing.
              </p>
              <FeatureIsoStack activeLayerIndex={active} reduceMotion={reduce} />
            </div>

            <div className="border-t border-border/50 bg-accent/25 p-4 sm:p-5 lg:border-t-0" role="tablist" aria-label="Outplace product layers">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Product layers
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {FEATURE_LAYERS.map((layer, i) => {
                  const isOpen = active === i;
                  return (
                    <button
                      key={layer.key}
                      type="button"
                      role="tab"
                      aria-selected={isOpen}
                      id={`layer-tab-${i}`}
                      className={cn(
                        "group flex min-h-[300px] w-full flex-col overflow-hidden rounded-2xl border bg-card p-4 text-left shadow-sm transition-[border-color,box-shadow,transform,background-color]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                        isOpen
                          ? "border-primary/55 bg-primary/[0.04] shadow-md"
                          : "border-border/60 hover:-translate-y-0.5 hover:border-border hover:bg-card/90",
                      )}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "text-[11px] font-semibold tabular-nums",
                            isOpen ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")} / {layers[i].label}
                        </span>
                        <span
                          className={cn("size-2 rounded-full transition-colors", isOpen ? "bg-primary" : "bg-border")}
                          aria-hidden
                        />
                      </div>
                      <h3
                        className={cn(
                          "mt-4 font-primary text-left text-base font-semibold leading-snug transition-colors",
                          isOpen ? "text-primary" : "text-foreground",
                        )}
                      >
                        {layer.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground font-secondary">
                        {layer.body}
                      </p>
                      <div className="mt-auto max-h-[142px] overflow-hidden pt-2">
                        {layer.visual}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
