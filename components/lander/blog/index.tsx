"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LanderSection } from "@/components/lander/section-surface";
import { fadeUp, landerViewport, staggerContainer, staggerItem } from "@/components/lander/motion-presets";

export interface LanderBlogPostPreview {
  id: string;
  title: string;
  description: string;
  category: string;
  readTimeMinutes: number;
  href?: string;
}

/** Example topics for layout and copy—swap for real posts when `/blog` ships. */
export const LANDER_BLOG_EXAMPLE_POSTS: readonly LanderBlogPostPreview[] = [
  {
    id: "geo-candidate-discovery",
    title: "How answer engines reshuffle candidate discovery for staffing firms",
    description:
      "What generative-engine optimization (GEO) means for recruiting brands, and how to show up when buyers ask ChatGPT instead of Google.",
    category: "GEO",
    readTimeMinutes: 8,
  },
  {
    id: "seo-job-schema",
    title: "Schema markup for job posts: a practical checklist for agencies",
    description:
      "JobPosting JSON-LD, indexable landing pages, and avoiding duplicate-content traps across your ATS exports.",
    category: "SEO",
    readTimeMinutes: 6,
  },
  {
    id: "local-desk-seo",
    title: "Local SEO for recruiting desks without sounding like a directory farm",
    description:
      "City + niche pages that rank, entity signals for your brand, and internal links that pass weight to reqs.",
    category: "Playbook",
    readTimeMinutes: 7,
  },
];

interface LanderBlogProps {
  comingSoon?: boolean;
  posts?: readonly LanderBlogPostPreview[];
}

function BlogPostCard({
  post,
  comingSoon,
  reduce,
}: {
  post: LanderBlogPostPreview;
  comingSoon: boolean;
  reduce: boolean | null;
}) {
  const href = post.href;
  const isLink = Boolean(href) && !comingSoon;

  const shellClassName =
    "group flex h-full min-h-[280px] flex-col rounded-2xl border bg-card p-5 text-left shadow-sm sm:p-6 " +
    (isLink
      ? "border-border/80 transition-[box-shadow,border-color] hover:border-border hover:shadow-md"
      : "border-border/60 bg-card/80");

  const inner = (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-4">
        <Badge
          variant="secondary"
          className="shrink-0 px-2.5 py-0.5 font-secondary text-[10px] font-semibold uppercase tracking-[0.12em]"
        >
          {post.category}
        </Badge>
        <span className="shrink-0 text-right text-[11px] tabular-nums text-muted-foreground font-secondary">
          {post.readTimeMinutes} min
        </span>
      </div>

      <h3 className="mt-5 font-primary text-[17px] font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
        {post.title}
      </h3>

      <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground font-secondary">
        {post.description}
      </p>

      {comingSoon ? (
        <p className="mt-auto border-t border-border/50 pt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground font-secondary">
          Sample topic · guide in progress
        </p>
      ) : null}
    </>
  );

  return (
    <motion.div variants={reduce ? undefined : staggerItem} className="h-full">
      {isLink && href ? (
        <Link
          href={href}
          className={
            shellClassName +
            " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          }
        >
          {inner}
        </Link>
      ) : (
        <div className={shellClassName}>{inner}</div>
      )}
    </motion.div>
  );
}

export function LanderBlog({
  comingSoon = true,
  posts = LANDER_BLOG_EXAMPLE_POSTS,
}: LanderBlogProps) {
  const reduce = useReducedMotion();

  return (
    <LanderSection id="blog" surface="plain" className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={fadeUp}
          className="mb-12 mx-auto max-w-3xl text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground font-secondary">
              Insights
            </p>
            {comingSoon ? (
              <Badge
                variant="outline"
                className="font-secondary text-[10px] font-semibold uppercase tracking-[0.12em]"
              >
                Coming soon
              </Badge>
            ) : null}
          </div>
          <h2 className="mt-3 font-primary text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Guides for{" "}
            <span className="font-tertiary text-primary not-italic">SEO</span>,{" "}
            <span className="font-tertiary text-primary not-italic">GEO</span>, and staffing growth
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-pretty text-[15px] leading-[1.65] text-muted-foreground font-secondary">
            We are building a library of playbooks on search, structured data, and how AI-driven
            discovery changes the way agencies win inbound. Below is a preview of the topics we will
            publish first.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          initial="hidden"
          whileInView="show"
          viewport={landerViewport}
          variants={reduce ? undefined : staggerContainer}
        >
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} comingSoon={comingSoon} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </LanderSection>
  );
}
