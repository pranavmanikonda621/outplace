"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BOOK_DEMO_HREF,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
} from "@/components/lander/constants";
import { fadeUp, landerViewport } from "@/components/lander/motion-presets";

export function LanderContact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/50 bg-background">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={landerViewport}
        variants={fadeUp}
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
            Contact
          </p>
          <h2 className="mt-2 font-primary text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Tell us about your{" "}
            <span className="font-tertiary text-secondary not-italic">desk</span> and reqs.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground font-secondary">
            We reply to pilot questions within a few business hours. Prefer a calendar hold? Grab a demo slot.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="default" size="lg" className="rounded-md px-6" asChild>
              <a href={CONTACT_MAILTO}>Email {CONTACT_EMAIL}</a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-md border-border px-6" asChild>
              <a href={BOOK_DEMO_HREF}>Book demo</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
