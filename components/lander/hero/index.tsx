"use client";

import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import { CloudLightning } from 'lucide-react';
import Image from 'next/image';

import {
  BOOK_DEMO_HREF,
} from '@/components/lander/constants';
import {
  staggerContainer,
  staggerItem,
} from '@/components/lander/motion-presets';
import { Button } from '@/components/ui/button';
import { LanderPurpleNoiseBackground } from '@/components/lander/purple-noise-background';

export function LanderHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-white/10"
    >
      <LanderPurpleNoiseBackground />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          animate="show"
          className="text-left lg:col-span-7"
        >
          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 shadow-sm backdrop-blur-sm"
          >
            <CloudLightning className="size-3.5 text-purple-200/90" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-200/95 font-secondary">
              AI-native Operating System for Staffing and Recruiting Agencies
            </span>
          </motion.div>
          <motion.h1
            variants={reduce ? undefined : staggerItem}
            className="font-primary text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white"
          >
            Outplace your{" "}
            <span className="font-tertiary not-italic text-purple-100">competitors</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : staggerItem}
            className="mt-5 max-w-xl text-base text-purple-200/85 sm:text-[17px] font-secondary"
          >
            Outplace is the AI-native OS that runs search, voice outreach, AI interviews, resume optimization, and client invoicing in
            one system—so agencies stay focused on closing placements, not admin burden.
          </motion.p>
          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mt-9 flex w-full justify-center"
          >
            <Button
              asChild
              className="rounded-lg border-white/35 bg-transparent px-10 py-5 text-lg font-semibold text-white hover:bg-white/10 hover:text-white transition-all duration-150"
              style={{ minWidth: 220, fontSize: '1.25rem' }}
            >
              <a href={BOOK_DEMO_HREF}>Book a demo</a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 flex items-center justify-center">
   
          <Image
            src="/hero3.png"
            alt="Outplace"
            width={1000}
            height={1000}
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
