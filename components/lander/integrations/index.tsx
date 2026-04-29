"use client";

import { BriefcaseBusiness, Handshake, Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUp,
  landerViewport,
  staggerContainer,
  staggerItem,
} from "@/components/lander/motion-presets";
import { LanderPurpleNoiseBackground } from "@/components/lander/purple-noise-background";
import { cn } from "@/lib/utils";

// Modern: gradient borders, glassmorphism effect, card hover, slightly oversized integration logos, some playful/unique detail
type IntegrationLogoProps = {
  src: string;
  alt: string;
  title: string;
  sizeClass?: string;
};

function IntegrationLogo({ src, alt, title, sizeClass }: IntegrationLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      className={`${sizeClass ?? "h-8 w-8"} rounded-lg shadow-lg bg-white/80 dark:bg-white/10 object-contain`}
      loading="lazy"
      draggable={false}
      style={{
        filter:
          "drop-shadow(0px 2px 8px rgba(30, 46, 72, 0.05)) drop-shadow(0px 2px 20px rgba(129,140,248,0.07))",
        transition: "transform .28s cubic-bezier(.4,2,.25,1)",
      }}
    />
  );
}

const INTEGRATION_LOGOS: Record<string, React.ReactNode> = {
  "Gmail / Google Workspace": (
    <IntegrationLogo
      src="/integrations/gmail.png"
      alt="Gmail / Google Workspace"
      title="Gmail / Google Workspace"
    />
  ),
  "Microsoft Outlook / Microsoft 365": (
    <IntegrationLogo
      src="/integrations/outlook.png"
      alt="Microsoft Outlook / Microsoft 365"
      title="Microsoft Outlook / Microsoft 365"
    />
  ),
  "Ashby": (
    <IntegrationLogo
      src="/integrations/ashby.png"
      alt="Ashby"
      title="Ashby"
    />
  ),
  "Greenhouse": (
    <IntegrationLogo
      src="/integrations/greenhouse.png"
      alt="Greenhouse"
      title="Greenhouse"
    />
  ),
  "JobDiva": (
    <IntegrationLogo
      src="/integrations/jobdiva.png"
      alt="JobDiva"
      title="JobDiva"
    />
  ),
  "Workable": (
    <IntegrationLogo
      src="/integrations/workable.png"
      alt="Workable"
      title="Workable"
    />
  ),
  "Zoho Recruit": (
    <IntegrationLogo
      src="/integrations/zoho.png"
      alt="Zoho Recruit"
      title="Zoho Recruit"
    />
  ),
  "Bullhorn": (
    <IntegrationLogo
      src="/integrations/bullhorn.png"
      alt="Bullhorn"
      title="Bullhorn"
    />
  ),
  "RecruiterFlow": (
    <IntegrationLogo
      src="/integrations/recruiterflow.png"
      alt="RecruiterFlow"
      title="RecruiterFlow"
    />
  ),
  "Loxo": (
    <IntegrationLogo
      src="/integrations/loxo.png"
      alt="Loxo"
      title="Loxo"
    />
  ),
  "Lever": (
    <IntegrationLogo
      src="/integrations/lever.png"
      alt="Lever"
      title="Lever"
    />
  ),
  "Salesforce": (
    <IntegrationLogo
      src="/integrations/salesforce.png"
      alt="Salesforce"
      title="Salesforce"
    />
  ),
  "HubSpot": (
    <IntegrationLogo
      src="/integrations/hubspot.png"
      alt="HubSpot"
      title="HubSpot"
    />
  ),
  "RecruitCRM": (
    <IntegrationLogo
      src="/integrations/recruitcrm.png"
      alt="RecruitCRM"
      title="RecruitCRM"
    />
  ),
};

const integrationGroups = [
  {
    title: "Email & Workspace",
    eyebrow: "Inbox",
    icon: Mail,
    description:
      "Onboard with instant OAuth. Synced recruiter inboxes bring email + scheduling AI into your flow. Zero-friction, secure, always in context.",
    integrations: [
      "Gmail / Google Workspace",
      "Microsoft Outlook / Microsoft 365",
    ],
  },
  {
    title: "ATS Platforms",
    eyebrow: "System of Record",
    icon: BriefcaseBusiness,
    description:
      "Tie your workflow to your stack. We pull jobs, candidates, stages & more from platforms you rely on—so nothing's ever out of sync.",
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
    title: "CRM Platforms",
    eyebrow: "Client Pipeline",
    icon: Handshake,
    description:
      "Always have client, contact, and deal intelligence at your fingertips. Move faster, close smoother, keep team context fresh.",
    integrations: ["Salesforce", "HubSpot", "RecruitCRM"],
  },
] as const;

export function LanderIntegrations() {
  return (
    <section
      id="integrations"
      className="relative scroll-mt-20 overflow-hidden border-b border-white/10 py-20 sm:py-32"
    >
      <LanderPurpleNoiseBackground />
      <div className="relative z-10 mx-auto max-w-8xl px-2 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-secondary text-[11px] font-bold uppercase tracking-[0.25em] text-purple-200/90">
            Integrations
          </p>
          <h2 className="mt-5 font-primary text-[clamp(1.4rem,4vw,2.15rem)] font-bold leading-[1.12] tracking-tight text-white">
            Connect{" "}
            <span className="font-tertiary not-italic text-purple-100">
              everything your agency runs on
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[17px] leading-[1.6] text-purple-200/85 font-secondary">
            Outplace plugs into your core apps with smooth, secure onboarding–so recruiters can use AI without breaking the flow.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={staggerContainer}
          className="mt-16 grid gap-7 lg:grid-cols-[1.05fr_1.6fr_1fr]"
        >
          {integrationGroups.map((group, cardIdx) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.title}
                variants={staggerItem}
                className={cn(
                  "group relative flex h-full flex-col rounded-[2.5rem] border-0 bg-gradient-to-br from-white/70 via-white/40 to-slate-100/70 dark:from-black/80 dark:via-slate-900/70 dark:to-slate-900 p-7 shadow-[0_6px_24px_-8px_rgba(60,56,150,0.16)] transition-[box-shadow,transform]",
                  "hover:scale-[1.025] hover:shadow-2xl hover:shadow-violet-400/25 hover:z-20 backdrop-blur-md border border-primary/15"
                )}
                style={{
                  borderImage:
                    "linear-gradient(120deg, rgba(99,102,241,0.17) 0%, rgba(195,209,254,0.16) 100%) 1",
                  minHeight: 340,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet-500/90 dark:text-primary/80">
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-2 font-primary text-[15px] font-semibold text-foreground/90 tracking-tight">
                      {group.title}
                    </h3>
                  </div>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-violet-100/30 to-blue-200/40 dark:from-primary/10 dark:to-black/30 shadow-sm ring-1 ring-primary/10 transition group-hover:scale-110">
                    <Icon className="size-6 text-primary" aria-hidden />
                  </span>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-foreground/60 font-secondary">
                  {group.description}
                </p>

                <div
                  className={cn(
                    "mt-8 flex flex-wrap gap-3 justify-start items-start",
                    group.integrations.length > 4 && "grid grid-cols-2 sm:grid-cols-3 gap-x-5"
                  )}
                >
                  {group.integrations.map((integration, idx) => (
                    <span
                      key={integration}
                      className={cn(
                        "group/integration flex items-center gap-2 rounded-xl border border-border bg-background/75 backdrop-blur-lg px-3.5 py-2 shadow-md hover:shadow-primary/20 transition font-secondary text-[12px] font-medium text-foreground/95 ring-1 ring-primary/10 hover:bg-primary/10 hover:text-primary/90",
                        "min-h-12 w-full sm:w-auto select-none",
                        "hover:scale-105 active:scale-95 duration-200",
                        idx % 2 === 0 ? "bg-white/90 dark:bg-slate-900/80" : "bg-background/85"
                      )}
                      style={{
                        boxShadow:
                          "0 1px 10px 0 rgba(99,102,241,0.04), 0 2px 16px 0 rgba(200,200,255,0.08)",
                        alignItems: 'center'
                      }}
                    >
               
               
                      <span className="mr-2 flex items-center">
                        {INTEGRATION_LOGOS[integration] || integration}
                      </span>
                      <span className="ml-1">{integration.replace(/ \/ .*/, "")}</span>
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
