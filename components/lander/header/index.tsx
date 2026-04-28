"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BOOK_DEMO_HREF } from "@/components/lander/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const nav = [
  { href: "#stats", label: "Impact" },
  { href: "#capabilities", label: "Product" },
  { href: "#platform", label: "Platform" },
  { href: "#pipeline", label: "Workflow" },
  { href: "#demo", label: "Live demo" },
  { href: "#blog", label: "Insights" },
];

export function LanderHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-1/2 top-2 z-50 w-[96vw] max-w-4xl -translate-x-1/2 rounded-3xl border border-border/70",
        "bg-background/85 shadow-xl shadow-black/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70",
        "p-0.5 md:p-1"
      )}
      style={{
        boxShadow:
          "0 4px 16px 0 rgba(0,0,0,0.10), 0 0.75px 2px 0 rgba(0,0,0,0.02)",
      }}
    >
      <div className="mx-auto flex flex-row h-9 md:h-12 max-w-7xl items-center justify-between gap-4 px-3 md:px-5">
        <Link
          href="#hero"
          className="flex flex-row items-center gap-3 shrink-0 font-primary text-[16px] font-semibold tracking-tight text-foreground"
        >
          <Image src="/logo.png" alt="Outplace" width={38} height={38} className="shrink-0" priority />
        </Link>
        <span className="inline font-tertiary text-2xl">Outplace</span>
        <nav
          className="hidden md:flex flex-1 items-center justify-center gap-0.5 lg:gap-1"
          aria-label="Page sections"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground" asChild>
            <a href="#contact">Contact</a>
          </Button>
          <Button variant="default" size="sm" className="rounded-lg px-3 font-medium shadow" asChild>
            <a href={BOOK_DEMO_HREF}>Book demo</a>
          </Button>
          <button
            type="button"
            className="md:hidden inline-flex size-8 items-center justify-center rounded-xl border border-border/60 text-foreground bg-background/80 hover:bg-muted"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="md:hidden mt-2 border-t border-border/60 bg-background/95 rounded-2xl px-3 py-3 shadow-lg">
          <nav className="flex flex-col gap-1" aria-label="Mobile page sections">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-[14px] font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2 text-[14px] font-medium text-foreground hover:bg-muted"
            >
              Contact
            </a>
            <a
              href={BOOK_DEMO_HREF}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground shadow"
            >
              Book demo
            </a>
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}
