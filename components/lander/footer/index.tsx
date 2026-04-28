"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, landerViewport } from "@/components/lander/motion-presets";
import { nav } from "@/components/lander/header";
import Image from "next/image";

// Keep the nav links content as-is
const quickLinks = [...nav, { href: "#contact", label: "Contact" }];

export function LanderFooter() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border/60">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={landerViewport}
        variants={fadeUp}
        className="mx-auto max-w-7xl px-4 sm:px-8"
      >
        {/* Main Footer Content */}
        <div className="flex flex-col gap-10 py-10 sm:flex-row sm:justify-between">
          {/* Logo & Description */}
          <div className="flex flex-col gap-3 min-w-[200px]">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Outplace"
                width={26}
                height={26}
                className="shrink-0"
                priority
              />
              <span className="font-primary text-base font-bold tracking-tight text-foreground">Outplace</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground font-secondary max-w-[250px]">
              The AI-native operating system for staffing and recruiting agencies.
            </p>
          </div>

          {/* Quick Links */}
          <nav
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full sm:max-w-2xl"
            aria-label="Footer"
          >
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground/80">
                Product
              </div>
              <ul className="space-y-1">
                {quickLinks.slice(0, 2).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground/80">
                Resources
              </div>
              <ul className="space-y-1">
                {quickLinks.slice(2, 4).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground/80">
                Company
              </div>
              <ul className="space-y-1">
                {quickLinks.slice(4).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contact/Icons */}
          <div className="flex flex-col gap-2 items-start min-w-[110px]">
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground/80">
              Contact
            </span>
            <div className="flex gap-3">
              {/* Placeholder icons (replace with actual icons as needed) */}
              <a
                href="mailto:contact@outplace.com"
                aria-label="Email"
                className="text-muted-foreground hover:text-foreground transition-colors text-lg"
              >
                <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <rect x={3} y={5} width={18} height={14} rx={3} stroke="currentColor" strokeWidth={1.6} />
                  <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth={1.6} fill="none" />
                </svg>
              </a>
              {/* Add more icons/links as needed */}
            </div>
          </div>
        </div>
        <p className="text-[12px] text-muted-foreground sm:text-right mt-4 text-center mb-8">
          © {new Date().getFullYear()} Outplace
        </p>
      </motion.div>
    </footer>
  );
}
