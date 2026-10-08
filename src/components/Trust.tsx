import { IMG, RIBBON_WORDS } from "@/data/catalog";
import { Icon, Reveal, SectionKicker } from "@/components/ui";

const PILLARS = [
  {
    title: "Ingredient transparency",
    copy: "Every ingredient, every percentage, printed on the front of the pack — not buried on the back. If we can't explain it in a sentence, it doesn't go in.",
  },
  {
    title: "The quality promise",
    copy: "Batch-traced from grower to shelf. If a single piece arrives below standard, we replace the whole box, no questions and no receipt required.",
  },
  {
    title: "Sourcing philosophy",
    copy: "Eleven long-term grower partnerships, each paid above the fair-trade floor, each visited by our team at least once a season.",
  },
  {
    title: "Nutrition first",
    copy: "Recipes are built around density: plant protein, fibre, magnesium and healthy fats. Naturally occurring fruit sugars only — never added.",
  },
];

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionKicker>Transparency</SectionKicker>
              <h2 className="display mt-5 text-[clamp(2.1rem,5.2vw,3.6rem)] text-espresso">
                Everything we claim, <span className="ital">we can prove.</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <div className="mt-8 overflow-hidden">
                <img
                  src={IMG.editorial}
                  alt="Making raw organic food by hand"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[2200ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.05]"
                />
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                {RIBBON_WORDS.map((w) => (
                  <div key={w} className="flex items-center gap-2.5 border-b border-espresso/10 py-2.5">
                    <Icon.Check className="h-3.5 w-3.5 shrink-0 text-moss" />
                    <span className="text-[12.5px] text-espresso/80">{w}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px bg-espresso/10 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 70} className="bg-ivory">
                  <div className="h-full p-6 transition-colors duration-500 hover:bg-cream md:p-8">
                    <span className="label text-amber">0{i + 1}</span>
                    <h3 className="display mt-4 text-[22px] text-espresso md:text-[24px]">{p.title}</h3>
                    <p className="mt-3.5 text-[13.5px] leading-[1.8] text-stone">{p.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-espresso/10 pt-8 text-stone">
                {[
                  [<Icon.Leaf key="l" className="h-4 w-4" />, "Certified organic (EU & USDA)"],
                  [<Icon.Truck key="t" className="h-4 w-4" />, "Carbon-neutral delivery"],
                  [<Icon.Check key="c" className="h-4 w-4" />, "Plastic-free packaging"],
                ].map(([icon, label]) => (
                  <span key={String(label)} className="flex items-center gap-2.5 text-[12.5px]">
                    {icon}
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
