import { LanderFooter } from "@/components/lander/footer";
import { LanderHeader } from "@/components/lander/header";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanderHeader />
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
        <div className="border-b border-border/70 pb-8">
          <p className="font-secondary text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-3 text-left font-primary text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl font-secondary text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <p className="mt-5 font-secondary text-sm text-muted-foreground">
            Effective Date: {updatedAt}
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="scroll-mt-28">
              <h2 className="text-left font-primary text-2xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-secondary text-[15px] leading-7 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <LanderFooter />
    </div>
  );
}
