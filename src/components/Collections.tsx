import { FEATURED_COLLECTIONS } from "@/data/catalog";
import { Icon, Reveal, SectionKicker } from "@/components/ui";
import { scrollToId } from "@/components/Header";

export default function Collections({ onPick }: { onPick: (id: string) => void }) {
  const go = (id: string) => {
    onPick(id);
    window.setTimeout(() => scrollToId("shop"), 120);
  };

  return (
    <section id="collections" className="relative bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionKicker>Collections</SectionKicker>
            <h2 className="display mt-5 text-[clamp(2.1rem,5.4vw,3.9rem)] text-espresso">
              Find your <span className="ital">shelf.</span>
            </h2>
          </div>
          <button
            onClick={() => go("all")}
            className="group inline-flex items-center gap-2 self-start text-[12px] tracking-[0.06em] text-espresso md:self-auto"
          >
            Browse all collections
            <Icon.Arrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </Reveal>

        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {FEATURED_COLLECTIONS.map((c, i) => (
            <Reveal
              key={c.id}
              delay={i * 70}
              className="w-[78%] shrink-0 snap-start sm:w-[52%] md:w-auto md:shrink"
            >
              <button
                onClick={() => go(c.id)}
                className="group relative block h-full w-full overflow-hidden bg-espresso text-left"
              >
                <div className="aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                  <div>
                    <p className="label text-white/60">{c.count} products</p>
                    <h3 className="display mt-2 text-[26px] text-white md:text-[30px]">{c.name}</h3>
                    <p className="mt-1.5 max-w-[22ch] text-[12.5px] leading-relaxed text-white/70">{c.copy}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover:bg-white group-hover:text-ink">
                    <Icon.Arrow className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
