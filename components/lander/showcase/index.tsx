"use client";

import {
  type ReactNode,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  Clock,
  Copy,
  ExternalLink,
  FileEdit,
  FileText,
  Inbox,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  List,
  Mic,
  Phone,
  PhoneCall,
  Receipt,
  Search,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react';

import {
  fadeUp,
  landerViewport,
} from '@/components/lander/motion-presets';
import { LanderSection } from '@/components/lander/section-surface';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ShowcaseTabId =
  | "home"
  | "candidate-database"
  | "agentic-inbox"
  | "resume-optimizer"
  | "ai-outreach"
  | "ai-interviewer"
  | "invoice-timesheets";

interface SidebarItem {
  id: ShowcaseTabId;
  Icon: LucideIcon;
  label: string;
}

const sidebarGroups: { label: string; items: SidebarItem[] }[] = [
  {
    label: "Candidate central",
    items: [
      { id: "home", Icon: LayoutDashboard, label: "Home" },
      { id: "candidate-database", Icon: Users, label: "Candidate database" },
      { id: "agentic-inbox", Icon: Inbox, label: "Agentic inbox" },
    ],
  },
  {
    label: "Placement",
    items: [
      { id: "resume-optimizer", Icon: FileEdit, label: "Resume optimizer" },
      { id: "ai-outreach", Icon: Phone, label: "AI candidate outreach" },
      { id: "ai-interviewer", Icon: Mic, label: "AI interviewer" },
    ],
  },
  {
    label: "Post-placement",
    items: [{ id: "invoice-timesheets", Icon: Receipt, label: "Invoice & timesheets" }],
  },
];

const interviewRows = [
  {
    interview: "Neha Sharma",
    jobTitle: "SAP SuccessFactors Architect",
    difficulty: "Mid-level",
    questions: 5,
    sessions: 0,
    created: "Apr 8, 2026",
  },
  {
    interview: "Marcus Thompson",
    jobTitle: "SAP Technical Lead",
    difficulty: "Senior",
    questions: 8,
    sessions: 1,
    created: "Apr 7, 2026",
  },
  {
    interview: "Sarah Kim",
    jobTitle: "SF Implementation Manager",
    difficulty: "Mid-level",
    questions: 5,
    sessions: 3,
    created: "Apr 5, 2026",
  },
] as const;

const rankedMatches = [
  {
    initials: "NS",
    name: "Neha Sharma",
    status: "Offer prep",
    statusTone: "secondary" as const,
    matchPct: 98,
    summary:
      "Direct match for SAP SuccessFactors Architect based in Atlanta, GA. Strong overlap with Employee Central and Compensation modules.",
    email: "neha.sharma@email.com",
    phone: "(404) 555-0142",
    location: "Atlanta, GA",
    role: "SAP SuccessFactors Architect",
    rate: "$122/hr",
    immigration: "H-1B",
    updated: "Apr 2, 2026",
    skills: ["SuccessFactors", "Employee Central", "Compensation"],
  },
  {
    initials: "MT",
    name: "Marcus Thompson",
    status: "Client submission",
    statusTone: "muted" as const,
    matchPct: 91,
    summary:
      "NLP index ranks high for your natural-language req; SAP lead experience in greater Atlanta.",
    email: "m.thompson@email.com",
    phone: "(770) 555-0199",
    location: "Marietta, GA",
    role: "SAP Technical Lead",
    rate: "$135/hr",
    immigration: "US Citizen",
    updated: "Mar 28, 2026",
    skills: ["SAP SF", "Integration", "Fiori"],
  },
] as const;

const databasePreviewRows = [
  { name: "Neha Sharma", role: "SAP SuccessFactors Architect", loc: "Atlanta, GA", stage: "Interview" },
  { name: "Marcus Thompson", role: "SAP Technical Lead", loc: "Marietta, GA", stage: "Submitted" },
  { name: "Sarah Kim", role: "SF Implementation Manager", loc: "Alpharetta, GA", stage: "Screen" },
] as const;

const inboxItems = [
  {
    title: "AI interview completed — Neha Sharma",
    meta: "SAP SuccessFactors Architect · grading ready",
    time: "12m ago",
    tone: "action" as const,
  },
  {
    title: "Voice outreach summary — Marcus Thompson",
    meta: "Availability confirmed · notes attached",
    time: "1h ago",
    tone: "done" as const,
  },
  {
    title: "New semantic matches for Req #442",
    meta: "5 ranked profiles · Atlanta metro",
    time: "3h ago",
    tone: "action" as const,
  },
  {
    title: "Timesheet batch imported",
    meta: "14 entries · awaiting invoice sync",
    time: "Yesterday",
    tone: "neutral" as const,
  },
] as const;

function DifficultyBadge({ label }: { label: string }) {
  const isSenior = label.toLowerCase().includes("senior");
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium",
        isSenior
          ? "border-chart-4/50 bg-chart-4/15 text-foreground"
          : "border-primary/25 bg-primary/10 text-primary",
      )}
    >
      {label}
    </span>
  );
}

function PanelHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-border/60 px-5 py-6 sm:px-6 sm:py-7">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
        {eyebrow}
      </p>
      <h3 className="mt-1 font-primary text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground font-secondary">
        {description}
      </p>
    </div>
  );
}

function HomePanel() {
  return (
    <>
      <PanelHeader
        eyebrow="Home"
        title="AI-native ATS command center"
        description="Your system of record for every candidate—semantic search, list and kanban views, and bulk tools—indexed so downstream AI workflows always have context."
      />
      <div className="space-y-6 px-5 pb-8 pt-5 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active reqs", value: "24", hint: "4 closing this week" },
            { label: "Candidates indexed", value: "12.4k", hint: "NLP + resume text" },
            { label: "Placements MTD", value: "11", hint: "Across 6 accounts" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border/70 bg-muted/25 px-4 py-3 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground font-secondary">
                {s.label}
              </p>
              <p className="mt-1 font-primary text-2xl font-semibold tabular-nums text-foreground">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground font-secondary">{s.hint}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-primary font-secondary">
            <Search className="size-3.5 shrink-0" aria-hidden />
            Natural language search
          </div>
          <p className="mt-2 rounded-lg border border-border/60 bg-card px-3 py-2.5 text-[13px] text-foreground shadow-inner font-secondary">
            <span className="text-muted-foreground">Try: </span>
            SAP SuccessFactors architect based in Atlanta, GA
          </p>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground font-secondary">
            Describe the open requirement in plain English; Outplace ranks matches across your full database, not just keyword fields.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm font-secondary">
            <Clock className="size-3 text-muted-foreground" aria-hidden />
            Recent: Bulk import · 180 profiles
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-secondary/25 bg-secondary/10 px-2.5 py-1 text-[11px] font-medium text-foreground font-secondary">
            <Check className="size-3 text-secondary" aria-hidden />
            List & kanban in sync
          </span>
        </div>
      </div>
    </>
  );
}

function CandidateDatabasePanel() {
  return (
    <>
      <PanelHeader
        eyebrow="Candidate database"
        title="Search, sort, and shortlist at scale"
        description="Feature parity with a modern ATS—plus semantic ranking when you need a ranked shortlist from a natural-language requirement."
      />
      <div className="space-y-5 px-5 pb-8 pt-3 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
            <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <p className="truncate text-[12px] text-foreground font-secondary">
              <span className="text-muted-foreground">Query: </span>
              SAP architect · Atlanta metro · SuccessFactors
            </p>
          </div>
          <div
            className="inline-flex rounded-lg border border-border bg-card p-0.5 shadow-sm"
            role="group"
            aria-label="View mode"
          >
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2.5 py-1.5 text-[11px] font-semibold text-primary font-secondary">
              <List className="size-3.5" aria-hidden />
              List
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground font-secondary">
              <LayoutGrid className="size-3.5" aria-hidden />
              Kanban
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground font-secondary">
              <Layers className="size-3.5" aria-hidden />
              Board
            </span>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full min-w-[520px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 pl-3 pr-3 font-secondary">Candidate</th>
                <th className="py-2.5 pr-3 font-secondary">Role</th>
                <th className="py-2.5 pr-3 font-secondary">Location</th>
                <th className="py-2.5 pr-3 font-secondary">Pipeline</th>
                <th className="py-2.5 pr-3 font-secondary">AI rank</th>
              </tr>
            </thead>
            <tbody>
              {databasePreviewRows.map((row, i) => (
                <tr key={row.name} className="border-b border-border/50 last:border-0 hover:bg-muted/25">
                  <td className="py-2.5 pl-3 pr-3 font-medium text-foreground font-secondary">{row.name}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground font-secondary">{row.role}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground font-secondary">{row.loc}</td>
                  <td className="py-2.5 pr-3">
                    <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium text-foreground">
                      {row.stage}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className="inline-flex tabular-nums rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      #{i + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground font-secondary">
          Open any profile to launch voice outreach, interviews, resume polish, and billing—without switching tools.
        </p>
      </div>
    </>
  );
}

function AgenticInboxPanel() {
  return (
    <>
      <PanelHeader
        eyebrow="Agentic inbox"
        title="Everything AI did while you were on the phone"
        description="Structured handoffs from voice agents, interview sessions, and matching jobs—prioritized so recruiters act on signal, not noise."
      />
      <ul className="divide-y divide-border/60 px-3 pb-6 sm:px-5" role="list">
        {inboxItems.map((item) => (
          <li key={item.title} className="flex gap-3 px-2 py-4 sm:px-3">
            <span
              className={cn(
                "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border",
                item.tone === "action"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : item.tone === "done"
                    ? "border-secondary/30 bg-secondary/10 text-secondary"
                    : "border-border bg-muted/40 text-muted-foreground",
              )}
            >
              {item.tone === "action" ? (
                <Bell className="size-3.5" aria-hidden />
              ) : item.tone === "done" ? (
                <Check className="size-3.5" aria-hidden />
              ) : (
                <Inbox className="size-3.5" aria-hidden />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[13px] font-medium text-foreground font-secondary">{item.title}</p>
                <span className="text-[10px] tabular-nums text-muted-foreground font-secondary">{item.time}</span>
              </div>
              <p className="mt-0.5 text-[12px] text-muted-foreground font-secondary">{item.meta}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  Open thread
                  <ArrowRight className="size-3" aria-hidden />
                </button>
                {item.tone === "action" ? (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Needs review
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function ResumeOptimizerPanel() {
  return (
    <>
      <PanelHeader
        eyebrow="Resume optimizer"
        title="Client-ready resumes in one pass"
        description="Paste or upload a resume, match it to the job description, and ship a tailored version aligned to the role—without another late-night rewrite."
      />
      <div className="grid gap-5 px-5 pb-8 pt-3 lg:grid-cols-2 sm:px-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-foreground font-secondary">
              <FileText className="size-3.5 text-muted-foreground" aria-hidden />
              Candidate resume
            </div>
            <div className="mt-2 space-y-1.5 rounded-lg border border-dashed border-border/80 bg-card/80 px-3 py-3 text-[11px] leading-relaxed text-muted-foreground font-secondary">
              <p className="text-foreground/90">Neha Sharma · SAP SuccessFactors · 8 yrs</p>
              <p>Employee Central, Compensation, EC Payroll integrations…</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-foreground font-secondary">
              <Building2 className="size-3.5 text-muted-foreground" aria-hidden />
              Job description
            </div>
            <div className="mt-2 space-y-1.5 rounded-lg border border-border bg-card px-3 py-3 text-[11px] leading-relaxed text-muted-foreground font-secondary">
              <p className="font-medium text-foreground">SAP SuccessFactors Architect (contract)</p>
              <p>Atlanta hybrid · lead workshops · Employee Central + Compensation depth required.</p>
            </div>
          </div>
          <Button size="sm" variant="secondary" className="rounded-md gap-1.5 w-full sm:w-auto" type="button">
            <Upload className="size-3.5" aria-hidden />
            Upload files
          </Button>
        </div>
        <div className="rounded-xl border border-secondary/25 bg-secondary/5 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wide text-secondary font-secondary">
              Optimized output
            </p>
            <span className="rounded-full border border-secondary/30 bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary">
              Client-safe
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-[11px] leading-snug font-secondary">
            <li className="border-l-2 border-secondary pl-3 text-foreground">
              <span className="text-muted-foreground">Summary · </span>
              Positioned SuccessFactors architecture ownership for Atlanta enterprise rollout.
            </li>
            <li className="border-l-2 border-primary/40 bg-primary/5 pl-3 py-1.5 text-foreground">
              <span className="text-muted-foreground">Bullets · </span>
              Highlighted Compensation + EC depth to mirror JD keywords.
            </li>
            <li className="border-l-2 border-border pl-3 text-muted-foreground">
              <span className="text-foreground">Skills · </span>
              Normalized module names; added integration stack from requirement.
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" className="rounded-md gap-1.5">
              <Sparkles className="size-3.5" aria-hidden />
              Regenerate section
            </Button>
            <Button size="sm" variant="outline" className="rounded-md">
              Copy for client
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function AiOutreachPanel() {
  return (
    <>
      <PanelHeader
        eyebrow="AI candidate outreach"
        title="Voice screening that prefills the record"
        description="From a profile, launch an AI voice call that introduces your firm, confirms availability and location, and scores fit—notes land back on the candidate automatically."
      />
      <div className="space-y-5 px-5 pb-8 pt-3 sm:px-6">
        <div className="rounded-xl border border-border bg-muted/25 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground font-secondary">
                Prefilled candidate
              </p>
              <p className="mt-1 font-primary text-lg font-semibold text-foreground">Neha Sharma</p>
              <p className="text-[12px] text-muted-foreground font-secondary">
                SAP SuccessFactors Architect · Atlanta, GA
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
              <PhoneCall className="size-3" aria-hidden />
              Ready to dial
            </span>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              { label: "Role & stack", detail: "Maps to SuccessFactors EC + Comp" },
              { label: "Availability", detail: "Agent confirms start / travel" },
              { label: "Location", detail: "Hybrid expectations captured" },
            ].map((x) => (
              <li
                key={x.label}
                className="rounded-lg border border-border/70 bg-card px-3 py-2 text-[11px] shadow-sm"
              >
                <p className="font-semibold text-foreground font-secondary">{x.label}</p>
                <p className="mt-0.5 text-muted-foreground">{x.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="rounded-md gap-1.5">
            <Phone className="size-3.5" aria-hidden />
            Queue AI outreach call
          </Button>
          <Button size="sm" variant="outline" className="rounded-md gap-1.5">
            <FileText className="size-3.5" aria-hidden />
            View call script
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground font-secondary">
          Candidates receive a branded call from your agency; structured notes sync to the profile for recruiters and AMs.
        </p>
      </div>
    </>
  );
}

function AiInterviewerPanel() {
  return (
    <>
      <div className="border-b border-border/60 px-5 py-6 sm:px-6 sm:py-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
          AI interviewer
        </p>
        <h3 className="mt-1 font-primary text-xl font-semibold text-foreground sm:text-2xl">
          Interview management
        </h3>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground font-secondary">
          Create AI-powered interviews with auto-generated questions. Share public links with candidates for
          voice-based sessions—screen share and camera for integrity, SAP-relevant questions for the role.
        </p>
        <div
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-secondary/25 bg-secondary/10 px-4 py-3 text-left"
          role="status"
        >
          <p className="text-[13px] text-foreground font-secondary">
            Interview created. Candidate details will be prefilled on the interview link.
          </p>
          <button type="button" className="text-[12px] font-medium text-primary underline-offset-2 hover:underline">
            Dismiss
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" className="rounded-md gap-1.5">
            <Sparkles className="size-3.5" aria-hidden />
            Create interview
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto px-4 pb-6 sm:px-6">
        <table className="w-full min-w-[640px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="py-3 pr-4 font-secondary">Interview</th>
              <th className="py-3 pr-4 font-secondary">Job title</th>
              <th className="py-3 pr-4 font-secondary">Difficulty</th>
              <th className="py-3 pr-3 font-secondary tabular-nums">Questions</th>
              <th className="py-3 pr-3 font-secondary tabular-nums">Sessions</th>
              <th className="py-3 pr-4 font-secondary">Created</th>
              <th className="py-3 font-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviewRows.map((row) => (
              <tr key={row.interview} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                <td className="py-3 pr-4 font-medium text-foreground font-secondary">{row.interview}</td>
                <td className="py-3 pr-4 text-muted-foreground font-secondary">{row.jobTitle}</td>
                <td className="py-3 pr-4">
                  <DifficultyBadge label={row.difficulty} />
                </td>
                <td className="py-3 pr-3 tabular-nums text-foreground">{row.questions}</td>
                <td className="py-3 pr-3 tabular-nums text-foreground">{row.sessions}</td>
                <td className="py-3 pr-4 text-muted-foreground font-secondary">{row.created}</td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                      title="Copy link"
                    >
                      <Copy className="size-3.5" aria-hidden />
                      <span className="sr-only">Copy link</span>
                    </button>
                    <button type="button" className="font-medium text-primary hover:underline">
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end border-t border-border/50 px-4 py-3 sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-[11px] font-medium text-foreground shadow-sm font-secondary">
          <Check className="size-3.5 text-secondary" aria-hidden />
          Interview link copied
        </p>
      </div>
    </>
  );
}

function InvoicePanel() {
  return (
    <>
      <PanelHeader
        eyebrow="Invoice & timesheets"
        title="Close the loop on every placement"
        description="Add consultants and vendors, import or upload timesheets, and generate invoices with prefilled rates—hourly or fixed fee."
      />
      <div className="space-y-5 px-5 pb-8 pt-3 sm:px-6">
        <div
          className="inline-flex rounded-lg border border-border bg-card p-0.5 shadow-sm"
          role="group"
          aria-label="Billing mode"
        >
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-3 py-1.5 text-[11px] font-semibold text-primary font-secondary">
            Hourly
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-muted-foreground font-secondary">
            Fixed fee
          </span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full min-w-[480px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 pl-3 pr-3 font-secondary">Consultant</th>
                <th className="py-2.5 pr-3 font-secondary">Vendor</th>
                <th className="py-2.5 pr-3 font-secondary tabular-nums">Hours</th>
                <th className="py-2.5 pr-3 font-secondary">Rate</th>
                <th className="py-2.5 pr-3 font-secondary tabular-nums">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Neha Sharma", vendor: "BrightPath Staffing", hours: "86", rate: "$122/hr", amt: "$10,492" },
                { name: "Marcus Thompson", vendor: "BrightPath Staffing", hours: "40", rate: "$135/hr", amt: "$5,400" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-border/50 last:border-0 hover:bg-muted/25">
                  <td className="py-2.5 pl-3 pr-3 font-medium text-foreground font-secondary">{row.name}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground font-secondary">{row.vendor}</td>
                  <td className="py-2.5 pr-3 tabular-nums text-foreground">{row.hours}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground font-secondary">{row.rate}</td>
                  <td className="py-2.5 pr-3 font-semibold tabular-nums text-foreground">{row.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground font-secondary">
            <Upload className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            Timesheet CSV ready · manual adjustments supported
          </div>
          <Button size="sm" className="rounded-md gap-1.5 w-full sm:w-auto shrink-0">
            <Receipt className="size-3.5" aria-hidden />
            Generate invoice
          </Button>
        </div>
      </div>
    </>
  );
}

const panelByTab: Record<ShowcaseTabId, ReactNode> = {
  home: <HomePanel />,
  "candidate-database": <CandidateDatabasePanel />,
  "agentic-inbox": <AgenticInboxPanel />,
  "resume-optimizer": <ResumeOptimizerPanel />,
  "ai-outreach": <AiOutreachPanel />,
  "ai-interviewer": <AiInterviewerPanel />,
  "invoice-timesheets": <InvoicePanel />,
};

export function LanderProcessingShowcase() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<ShowcaseTabId>("ai-interviewer");

  return (
    <LanderSection id="demo" surface="plain" className="border-b border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
            Inside Outplace
          </p>
          <h2 className="mt-2 font-primary text-2xl font-semibold tracking-tight sm:text-3xl">
            The same{" "}
            <span className="font-tertiary text-primary not-italic">ATS, matching, and AI workflows</span> your team
            uses daily
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground font-secondary">
            Natural-language search surfaces ranked candidates; from a profile you launch voice outreach, AI interviews,
            resume optimization, and billing—without leaving one system.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={landerViewport}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-xl ring-1 ring-border/40"
        >
          <div className="flex flex-col lg:min-h-[540px] lg:flex-row">
            <aside className="flex w-full flex-col border-b border-product-border bg-product-surface lg:w-[220px] lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 border-b border-product-border px-4 py-4">
                <img src="/logo.png" alt="Logo" className="size-9 rounded-lg object-contain bg-primary" />
                <span className="font-tertiary text-lg font-semibold text-primary-foreground tracking-tight">
                  Outplace
                </span>
              </div>

              <nav className="flex-1 space-y-8 overflow-y-auto p-3 sm:p-4" aria-label="Product areas">
                {sidebarGroups.map((group) => (
                  <div key={group.label}>
                    <p className="px-2 pb-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-product-subtle">
                      {group.label}
                    </p>
                    <div role="tablist" aria-orientation="vertical" className="space-y-1">
                      {group.items.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            id={`showcase-tab-${item.id}`}
                            aria-selected={isActive}
                            aria-controls="showcase-main-panel"
                            onClick={() => setActiveId(item.id)}
                            className={cn(
                              "flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-[12px] font-medium transition-colors",
                              isActive
                                ? "bg-primary/25 text-product-fg shadow-sm ring-1 ring-primary/20"
                                : "text-product-muted hover:bg-product-surface-elevated hover:text-product-fg",
                            )}
                          >
                            <item.Icon className="size-3 shrink-0 opacity-90" aria-hidden />
                            <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </aside>

            <div
              className="min-w-0 flex-1 bg-card"
              role="tabpanel"
              id="showcase-main-panel"
              aria-labelledby={`showcase-tab-${activeId}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeId}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {panelByTab[activeId]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={landerViewport}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-muted/40 p-2 shadow-lg ring-1 ring-border/30 sm:p-4"
        >
          <div className="rounded-lg border border-border bg-card p-2 shadow-sm sm:p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-muted-foreground font-secondary">
                  AI-ranked matches
                </span>
                <h3 className="mt-0.5 font-primary text-lg font-semibold text-foreground">5 semantic matches</h3>
              </div>
              <p className="mt-2 sm:mt-0 text-[11px] max-w-sm leading-snug text-muted-foreground sm:text-right font-secondary">
                Ranked by semantic fit. Clear AI results to return to manual list—exactly like searching for &quot;SAP
                architect Atlanta&quot;.
              </p>
            </div>

            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border/30 text-muted-foreground font-bold uppercase tracking-wide text-[9px]">
                    <th className="p-2 text-left font-secondary">
                      Candidate{" "}
                      <div className="block text-[8px] font-normal normal-case text-muted-foreground/80">AI rank</div>
                    </th>
                    <th className="p-2 text-left font-secondary">Contact</th>
                    <th className="p-2 text-left font-secondary">Loc</th>
                    <th className="p-2 text-left font-secondary">Role</th>
                    <th className="p-2 text-left font-secondary">
                      Rate{" "}
                      <div className="block text-[8px] font-normal text-muted-foreground/80">AI rank</div>
                    </th>
                    <th className="p-2 text-left font-secondary">Immig.</th>
                    <th className="p-2 text-left font-secondary">
                      Updated{" "}
                      <div className="block text-[8px] font-normal text-muted-foreground/80">Activity</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankedMatches.map((c) => (
                    <tr
                      key={c.name}
                      className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition"
                    >
                      <td className="p-2 align-top">
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                            {c.initials}
                          </span>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-primary font-medium text-foreground">{c.name}</span>
                              <button
                                type="button"
                                className="ml-0.5 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                                title="Copy"
                              >
                                <Copy className="size-3" aria-hidden />
                              </button>
                            </div>
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full border px-1 py-0.5 text-[9px] font-medium mt-1",
                                c.statusTone === "secondary"
                                  ? "border-secondary/30 bg-secondary/10 text-secondary"
                                  : "border-border bg-muted text-muted-foreground",
                              )}
                            >
                              <span
                                className={cn(
                                  "size-1 rounded-full",
                                  c.statusTone === "secondary" ? "bg-secondary" : "bg-muted-foreground/50",
                                )}
                                aria-hidden
                              />
                              {c.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-primary">
                            {c.matchPct}
                          </span>
                        </div>
                      </td>

                      <td className="p-2 align-top">
                        <div className="font-secondary">
                          <span className="block text-foreground break-all">{c.email}</span>
                          <span className="block text-muted-foreground text-[10px]">{c.phone}</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          <button className="inline-flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 text-[9px] text-muted-foreground hover:border-primary/50 hover:bg-primary/5">
                            <ExternalLink className="size-2.5" aria-hidden />
                            LinkedIn
                          </button>
                          <button className="inline-flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 text-[9px] text-muted-foreground hover:border-primary/50 hover:bg-primary/5">
                            <FileEdit className="size-2.5" aria-hidden />
                            Resume
                          </button>
                        </div>
                      </td>

                      <td className="p-2 align-top font-secondary">
                        <span className="block text-foreground">{c.location}</span>
                        <span className="block text-muted-foreground text-[9px]">Candidate loc</span>
                      </td>

                      <td className="p-2 align-top font-secondary">
                        <span className="block text-foreground">{c.role}</span>
                        <span className="block text-muted-foreground text-[9px]">C2C</span>
                      </td>

                      <td className="p-2 align-top font-secondary">
                        <span className="block font-medium text-foreground">{c.rate}</span>
                      </td>

                      <td className="p-2 align-top font-secondary">{c.immigration}</td>

                      <td className="p-2 align-top font-secondary">
                        <span className="block text-foreground">{c.updated}</span>
                        <span className="block text-muted-foreground text-[9px]">Recent</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-2 grid gap-2 md:grid-cols-2">
              {rankedMatches.map((c) => (
                <li
                  key={c.name}
                  className="rounded-md border border-border/50 bg-background p-2 shadow-xs flex flex-col gap-1"
                >
                  <p className="text-[11px] text-muted-foreground font-secondary leading-snug mb-1">{c.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </LanderSection>
  );
}
