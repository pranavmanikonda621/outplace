"use client";

import { useState } from "react";
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
    cta: "Book a demo",
    href: BOOK_DEMO_HREF,
    highlighted: false,
    features: [
      "20 AI voice calls, then $0.30 each",
      "30 interviews, then $0.50 each",
      "50 resume optimizations, then $0.25 each",
      "Candidate database and ATS",
      "AI candidate outreach",
      "Invoice and timesheets",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 599,
    suffix: "/seat/mo",
    cta: "Book a demo",
    href: BOOK_DEMO_HREF,
    highlighted: true,
    badge: "Most popular",
    features: [
      "Unlimited AI voice calls",
      "Unlimited interviews",
      "Unlimited resume optimizations",
      "Agentic inbox",
      "Document automation",
      "Consultant portals",
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

type BillingCycle = "monthly" | "annual";

function getPlanPrice(plan: (typeof plans)[number], billingCycle: BillingCycle) {
  const monthlyPrice = "monthlyPrice" in plan ? plan.monthlyPrice : undefined;

  if (typeof monthlyPrice !== "number") {
    return "priceLabel" in plan ? plan.priceLabel : "";
  }

  const multiplier = billingCycle === "annual" ? 0.85 : 1;
  return `$${Math.round(monthlyPrice * multiplier)}`;
}

export function LanderPricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");

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
            Platform fees are per seat per month. Starter usage is shared across the workspace.
          </p>
          <div
            className="mx-auto mt-6 inline-flex rounded-lg border border-product-border/70 bg-product-surface-elevated p-1"
            role="group"
            aria-label="Billing cycle"
          >
            {[
              { value: "monthly", label: "Monthly" },
              { value: "annual", label: "Annual", helper: "15% off" },
            ].map((option) => {
              const selected = billingCycle === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "flex min-h-9 items-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors",
                    selected
                      ? "bg-[#4b73ff] text-white shadow-sm"
                      : "text-product-muted hover:bg-product-surface hover:text-product-fg"
                  )}
                  aria-pressed={selected}
                  onClick={() => setBillingCycle(option.value as BillingCycle)}
                >
                  <span>{option.label}</span>
                  {option.helper ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px]",
                        selected ? "bg-white/18 text-white" : "bg-product-surface text-product-muted"
                      )}
                    >
                      {option.helper}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
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
                "relative flex min-h-[520px] flex-col rounded-lg border bg-product-surface px-6 py-8 sm:px-8 lg:px-9",
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
                    {getPlanPrice(plan, billingCycle)}
                  </span>
                  {plan.suffix ? (
                    <span className="pb-2 text-base font-semibold text-product-subtle font-secondary sm:text-lg">
                      {plan.suffix}
                    </span>
                  ) : null}
                </div>
                {"monthlyPrice" in plan && billingCycle === "annual" ? (
                  <p className="mt-3 text-[13px] font-medium text-product-muted font-secondary">
                    Billed annually with 15% savings.
                  </p>
                ) : null}
              </div>

              <ul className="mt-10 space-y-5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-base leading-snug text-product-fg/90 font-secondary sm:text-lg"
                  >
                    <Check className="mt-0.5 size-5 shrink-0 stroke-[3] text-[#4b73ff]" />
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
