"use client";

import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import { CloudLightning } from 'lucide-react';
import Image from 'next/image';

import {
  BOOK_DEMO_HREF,
  CONTACT_MAILTO,
} from '@/components/lander/constants';
import { MARQUEE_LOGOS } from '@/components/lander/hero/marquee-logos';
import {
  staggerContainer,
  staggerItem,
} from '@/components/lander/motion-presets';
import { Button } from '@/components/ui/button';

function Marquee() {
  const images = MARQUEE_LOGOS;

  return (
    <div className="w-full overflow-x-hidden py-5 mb-3 bg-transparent">
      <div className="text-center text-sm font-semibold text-gray-500 mb-8">
        Built by people who worked at
      </div>
      <div className="marquee relative w-full max-w-4xl mx-auto px-4 sm:px-8">
        <div className="flex gap-10 animate-marquee items-center">
          {images.map((img) => (
            <div
              key={img.src}
              className="flex-shrink-0 h-10 flex items-center"
              style={{ minWidth: 100 }}
            >
              <Image
                src={img.src}
                alt={img.alt || "logo"}
                width={100}
                height={40}
                style={{ objectFit: "contain", height: 40 }}
                className="w-auto max-h-10"
                unoptimized
              />
            </div>
          ))}

          {/* Duplicate for seamless animation */}
          {images.map((img) => (
            <div
              key={`${img.src}-dup`}
              className="flex-shrink-0 h-10 flex items-center"
              style={{ minWidth: 100 }}
            >
              <Image
                src={img.src}
                alt={img.alt || "logo"}
                width={100}
                height={40}
                style={{ objectFit: "contain", height: 40 }}
                className="w-auto max-h-10"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
      {/* Marquee CSS */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee-scroll 28s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export function LanderHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border/50 bg-white"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          animate="show"
          className="text-left lg:col-span-7"
        >
          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 shadow-sm"
          >
            <CloudLightning className="size-3.5 text-secondary" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground font-secondary">
              AI-native Operating System for Staffing and Recruiting Agencies
            </span>
          </motion.div>
          <motion.h1
            variants={reduce ? undefined : staggerItem}
            className="font-primary text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-foreground"
          >
            Outplace your <span className="font-tertiary text-primary not-italic">competitors</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : staggerItem}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-[17px] font-secondary"
          >
            Outplace is the AI-native OS that runs search, voice outreach, AI interviews, resume optimization, and client invoicing in
            one system—so agencies stay focused on closing placements, not admin burden.
          </motion.p>
          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="rounded-md px-7" asChild>
              <a href={BOOK_DEMO_HREF}>Book a demo</a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-md border-border px-7" asChild>
              <a href={CONTACT_MAILTO}>Talk to us</a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 flex items-center justify-center">
          {/* <Image src="/hero_real.png" alt="Outplace" width={1600} height={1600} className="w-[110%] h-[110%] object-contain" /> */}
          <Image
            src="/hero.png"
            alt="Outplace"
            width={1600}
            height={1600}
            className="w-[110%] h-[110%] object-contain"
          />
        </div>
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Marquee />
      </div>

    </section>
  );
}
