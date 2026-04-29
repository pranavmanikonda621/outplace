"use client";

import { LanderAgentFeatures } from "@/components/lander/features";
import { LanderFooter } from "@/components/lander/footer";
import { LanderFormTypes } from "@/components/lander/process";
import { LanderHeader } from "@/components/lander/header";
import { LanderHero } from "@/components/lander/hero";
import { LanderIntegrations } from "@/components/lander/integrations";
import { LanderStats } from "@/components/lander/stats";
import { LanderCta } from "@/components/lander/cta";
import { LanderDemo } from "@/components/lander/demo";
import { Marquee } from "./marquee";

export function Lander() {
  return (
    <div className="min-h-screen text-foreground">
      <LanderHeader />
      <main className="mt-12">
        <LanderHero />
        <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-32 py-8">
        <Marquee />
      </div>
        <LanderDemo />
        <LanderStats />
        <LanderAgentFeatures />
        <LanderIntegrations />
        <LanderFormTypes />
        <LanderCta />
      </main>
      <LanderFooter />
    </div>
  );
}
