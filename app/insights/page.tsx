import type { Metadata } from "next";
import { LanderBlog } from "@/components/lander/blog";
import { LanderFooter } from "@/components/lander/footer";
import { LanderHeader } from "@/components/lander/header";

export const metadata: Metadata = {
  title: "Insights | Outplace",
  description: "Staffing and recruiting growth guides from Outplace.",
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanderHeader />
      <main className="mt-12">
        <LanderBlog />
      </main>
      <LanderFooter />
    </div>
  );
}
