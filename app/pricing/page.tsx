import type { Metadata } from "next";
import { LanderFooter } from "@/components/lander/footer";
import { LanderHeader } from "@/components/lander/header";
import { LanderPricing } from "@/components/lander/pricing";

export const metadata: Metadata = {
  title: "Pricing | Outplace",
  description: "Outplace pricing for staffing and recruiting teams.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanderHeader />
      <main className="mt-12">
        <LanderPricing />
      </main>
      <LanderFooter />
    </div>
  );
}
