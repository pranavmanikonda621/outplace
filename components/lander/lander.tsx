"use client";

import { LanderAgentFeatures } from "@/components/lander/features";
import { LanderFooter } from "@/components/lander/footer";
import { LanderFormTypes } from "@/components/lander/process";
import { LanderHeader } from "@/components/lander/header";
import { LanderHero } from "@/components/lander/hero";
import { LanderPlatform } from "@/components/lander/platform";
import { LanderProcessingShowcase } from "@/components/lander/showcase";
import { LanderStats } from "@/components/lander/stats";
import { LanderCta } from "@/components/lander/cta";
import { LanderContact } from "@/components/lander/contact";
import { LanderDemo } from "@/components/lander/demo";
import { LanderBlog } from "@/components/lander/blog";

export function Lander() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanderHeader />
      <main className="mt-12">
        <LanderHero />
        <LanderDemo />
        <LanderStats />
        <LanderAgentFeatures />
        <LanderPlatform />
        <LanderFormTypes />
        <LanderProcessingShowcase />
        <LanderCta />
        <LanderContact />
        <LanderBlog />
      </main>
      <LanderFooter />
    </div>
  );
}
