"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BOOK_DEMO_HREF } from "@/components/lander/constants";
import { fadeUp, landerViewport } from "@/components/lander/motion-presets";

export function LanderCta() {
  return (
    <section className="relative border-b border-border/10 bg-primary text-primary-foreground overflow-hidden p-4 m-4 rounded-2xl">
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
          Bring a live req and a slice of your candidate data—we will walk through match, voice, and interview in one session.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8 rounded-md bg-primary-foreground px-8 text-primary hover:bg-primary-foreground/90"
          asChild
        >
          <a href={BOOK_DEMO_HREF}>Book demo</a>
        </Button>
      </motion.div>
    </section>
  );
}
