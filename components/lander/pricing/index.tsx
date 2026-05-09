"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BOOK_DEMO_HREF } from "@/components/lander/constants";
import {
  fadeUp,
  landerViewport,
  staggerContainer,
  staggerItem,
} from "@/components/lander/motion-presets";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 99,
    suffix: "/seat/mo",
    priceNote: "1-seat minimum",
    cta: "Book a demo",
    href: BOOK_DEMO_HREF,
    highlighted: false,
    features: [
      "100 voice minutes included, then $0.76/min",
      "250 SMS segments included, then $0.10/segment",
      "10 AI interviews included, then $1.00/interview",
      "20 resume tailoring runs included, then $0.30/run",
      "Candidate database and ATS",
      "AI candidate outreach",
      "Base timesheets and invoicing",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 399,
    suffix: "/seat/mo",
    priceNote: "2-seat minimum; $798/mo minimum base",
    cta: "Book a demo",
    href: BOOK_DEMO_HREF,
    highlighted: true,
    badge: "Most popular",
    features: [
      "1,000 voice minutes included, then $0.76/min",
      "2,500 SMS segments included, then $0.10/segment",
      "100 AI interviews included, then $1.00/interview",
      "200 resume tailoring runs included, then $0.30/run",
      "Agentic inbox and smart replies",
      "Document automation",
      "Custom consultant timesheet and invoicing portals",
      "AI smart invoicing",
      "2-way SMS candidate outreach",
      "Predefined admin, recruiter, and finance roles",
    ],
  },
  {
    name: "Enterprise",
    priceLabel: "Custom",
    suffix: "",
    cta: "Book a demo",
    href: BOOK_DEMO_HREF,
    highlighted: false,
    badge: "Custom rollout",
    features: [
      "Custom platform agreement",
      "Volume usage and overage terms",
      "Dedicated onboarding and data migration",
      "Custom RBAC, permissions, and approval workflows",
      "SSO and security review support",
      "Priority support for multi-office teams",
    ],
  },
];

function getPlanPrice(plan: (typeof plans)[number]) {
  const monthlyPrice = "monthlyPrice" in plan ? plan.monthlyPrice : undefined;

  if (typeof monthlyPrice !== "number") {
    return "priceLabel" in plan ? plan.priceLabel : "";
  }

  return `$${monthlyPrice}`;
}

export function LanderPricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 bg-background px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={landerViewport}
        variants={fadeUp}
        className="mx-auto max-w-7xl rounded-2xl border border-product-border/60 bg-product-surface p-5 text-product-fg shadow-2xl shadow-black/10 sm:p-8 lg:p-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-primary text-center text-3xl font-semibold tracking-tight text-product-fg sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-product-muted font-secondary sm:text-lg">
            Platform fees are per seat per month. Included usage is shared across the workspace, with overages billed by usage.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-6"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={staggerItem}
              className={cn(
                "relative flex min-h-[560px] flex-col rounded-lg border bg-product-surface px-6 py-8 sm:px-8 lg:px-7",
                plan.highlighted
                  ? "border-[#4b73ff] shadow-[0_0_0_1px_rgba(75,115,255,0.7)]"
                  : "border-product-border/50"
              )}
            >
              {plan.badge ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4b73ff] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4b73ff]/25 sm:text-base">
                  {plan.badge}
                </div>
              ) : null}

              <div>
                <h3 className="font-primary text-left text-2xl font-semibold text-product-fg sm:text-3xl">
                  {plan.name}
                </h3>
                <div className="mt-8 flex items-end gap-1">
                  <span className="font-primary text-left text-5xl font-semibold tracking-tight text-product-fg sm:text-6xl">
                    {getPlanPrice(plan)}
                  </span>
                  {plan.suffix ? (
                    <span className="pb-2 text-base font-semibold text-product-subtle font-secondary sm:text-lg">
                      {plan.suffix}
                    </span>
                  ) : null}
                </div>
                {"priceNote" in plan ? (
                  <p className="mt-3 text-[13px] font-medium text-product-muted font-secondary">
                    {plan.priceNote}
                  </p>
                ) : null}
              </div>

              <ul className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-[15px] leading-snug text-product-fg/90 font-secondary sm:text-base"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 stroke-[3] text-[#4b73ff]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.highlighted ? "secondary" : "outline"}
                className={cn(
                  "mt-auto h-12 rounded-md text-base font-semibold",
                  plan.highlighted
                    ? "border-0 bg-[#775dea] text-white hover:bg-[#6b53d6]"
                    : "border-product-border bg-product-surface-elevated text-product-fg hover:bg-product-surface-elevated/80"
                )}
                asChild
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
