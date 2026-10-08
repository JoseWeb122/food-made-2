import { IMG, SOCIALS } from "@/data/catalog";
import { Icon, Reveal, SectionKicker } from "@/components/ui";

const ICONS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  Instagram: Icon.Instagram,
  TikTok: Icon.TikTok,
  YouTube: Icon.YouTube,
  Pinterest: Icon.Pinterest,
  Substack: Icon.Substack,
  Reddit: Icon.Reddit,
};

const TILES = [IMG.lifestyle, IMG.cacao, IMG.editorial, IMG.truffle, IMG.granola, IMG.ingredients];

export default function Social() {
  return (
    <section className="relative bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionKicker>Community</SectionKicker>
            <h2 className="display mt-5 text-[clamp(2.1rem,5.4vw,3.6rem)] text-espresso">
              Life, <span className="ital">unprocessed.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-stone">
            Recipes, atelier days and the occasional 4pm confession. Tag <span className="text-espresso">#izharmade</span>{" "}
            to appear here.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {TILES.map((src, i) => (
            <Reveal key={i} delay={i * 60}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-ivory"
              >
                <img
                  src={src}
                  alt="Izhar on social"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.09]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/35 opacity-0 transition-opacity duration-600 group-hover:opacity-100">
                  <Icon.Instagram className="h-6 w-6 text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-px border border-espresso/10 bg-espresso/10 sm:grid-cols-2 lg:grid-cols-6">
          {SOCIALS.map((s) => {
            const I = ICONS[s.name];
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-cream px-5 py-5 transition-colors duration-500 hover:bg-espresso"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <I className="h-[18px] w-[18px] shrink-0 text-espresso transition-colors duration-500 group-hover:text-cream" />
                  <span className="min-w-0">
                    <span className="block text-[13.5px] text-espresso transition-colors duration-500 group-hover:text-cream">
                      {s.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-stone transition-colors duration-500 group-hover:text-cream/60">
                      {s.handle}
                    </span>
                  </span>
                </span>
                <Icon.ArrowUpRight className="h-4 w-4 shrink-0 text-stone transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cream" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
