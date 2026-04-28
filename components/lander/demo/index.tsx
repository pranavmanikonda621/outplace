"use client";

import { cn } from "@/lib/utils";

export function LanderDemo() {
  const videoSrc = "https://www.loom.com/embed/2cf92c67381d42e197eb3a1571713f37";
  return (
    <section id="demo" className="w-full scroll-mt-20 flex items-center justify-center mb-16 px-2 mt-4">
      <div
        className={cn(
          "w-full max-w-6xl aspect-[16/16] md:aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border-2 border-muted-foreground bg-muted transition-all duration-300"
        )}
      >
        <iframe
          src={videoSrc}
          className="w-full h-full rounded-xl"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          title="Demo Video"
          frameBorder="0"
        ></iframe>
      </div>
    </section>
  );
}
