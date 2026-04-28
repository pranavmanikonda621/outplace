"use client";

import { BriefcaseBusiness, Handshake, Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUp,
  landerViewport,
  staggerContainer,
  staggerItem,
} from "@/components/lander/motion-presets";
import { cn } from "@/lib/utils";

const integrationGroups = [
  {
    title: "Email and workspace",
    eyebrow: "Inbox",
    icon: Mail,
    description:
      "Connect recruiter inboxes with OAuth for onboarding, sync, read/send mail, and the agentic inbox.",
    integrations: [
      "Gmail / Google Workspace",
      "Microsoft Outlook / Microsoft 365",
    ],
  },
  {
    title: "ATS platforms",
    eyebrow: "System of record",
    icon: BriefcaseBusiness,
    description:
      "Bring candidate, job, and workflow context from the staffing systems your team already uses.",
    integrations: [
      "Ashby",
      "Greenhouse",
      "JobDiva",
      "Workable",
      "Zoho Recruit",
      "Bullhorn",
      "RecruiterFlow",
      "Loxo",
      "Lever",
    ],
  },
  {
    title: "CRM platforms",
    eyebrow: "Client pipeline",
    icon: Handshake,
    description:
      "Keep account, contact, and opportunity context close to recruiting execution.",
    integrations: ["Salesforce", "HubSpot", "RecruitCRM"],
  },
] as const;

export function LanderIntegrations() {
  return (
    <section id="integrations" className="scroll-mt-20 border-b border-border/50 bg-muted/35 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground font-secondary">
            Integrations
          </p>
          <h2 className="mt-3 font-primary text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Works with the systems{" "}
            <span className="font-tertiary text-primary not-italic">your agency already runs.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground font-secondary">
            Outplace connects to inboxes, ATS platforms, and CRMs so recruiters can adopt AI workflows without losing operational context.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={staggerContainer}
          className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.35fr_0.85fr]"
        >
          {integrationGroups.map((group) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.title}
                variants={staggerItem}
                className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-2 font-primary text-left text-xl font-semibold text-foreground">
                      {group.title}
                    </h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground font-secondary">
                  {group.description}
                </p>

                <div
                  className={cn(
                    "mt-6 flex flex-wrap gap-2",
                    group.integrations.length > 4 && "grid grid-cols-2 sm:flex"
                  )}
                >
                  {group.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="inline-flex min-h-8 items-center rounded-md border border-border/70 bg-background px-3 py-1 text-[13px] font-medium text-foreground shadow-sm font-secondary"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
