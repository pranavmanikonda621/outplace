"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BOOK_DEMO_HREF,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
} from "@/components/lander/constants";
import { fadeUp, landerViewport } from "@/components/lander/motion-presets";

export function LanderCta() {
  return (
    <section id="contact" className="relative scroll-mt-20 border-b border-border/10 bg-primary text-primary-foreground overflow-hidden p-4 m-4 rounded-2xl">
      {/* Background image */}
      {/*
        Replace background image with background video.
        Autoplay, muted, looped, covers the parent, and with opacity 0.2 to match current styling.
      */}
      {(() => {
        const VIDEO_URL =
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";
        return (
          <video
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 object-cover w-full h-full"
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            style={{
              opacity: 0.8,
            }}
          />
        );
      })()}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={landerViewport}
        variants={fadeUp}
        className="relative z-10 mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20"
      >
        <h2 className="font-primary text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to run your desk on{" "}
          <span className="font-tertiary text-primary-foreground/95 not-italic">Outplace</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-primary-foreground/85 font-secondary">
          Bring a live req and a slice of your candidate data. We will walk through match, voice, interview, and integrations in one session.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
            className="rounded-md bg-primary-foreground px-8 text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <a href={BOOK_DEMO_HREF}>Book demo</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-md border-primary-foreground/45 bg-primary-foreground/10 px-8 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            asChild
          >
            <a href={CONTACT_MAILTO}>Email {CONTACT_EMAIL}</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
