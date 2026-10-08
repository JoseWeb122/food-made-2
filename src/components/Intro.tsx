import { IMG } from "@/data/catalog";
import { Icon, Reveal, SectionKicker } from "@/components/ui";
import { scrollToId } from "@/components/Header";

export default function Intro() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <SectionKicker>The House of Izhar</SectionKicker>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.6vw,4.2rem)] text-espresso">
                We make food the <span className="ital">long way</span> round.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-espresso/70">
                <p>
                  Izhar began in a borrowed kitchen with one obsession: could something genuinely good for you also be
                  the most delicious thing on the table? Ten years and eleven grower partnerships later, the answer
                  sits in a matte ivory box.
                </p>
                <p>
                  Everything is organic, raw, vegan and gluten-free. Nothing carries added sugar. Nothing is heated
                  above 42°C. And nothing leaves the atelier unless a maker has put their initials on the batch card.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-espresso/10 pt-8">
                {[
                  ["10 yrs", "In the atelier"],
                  ["142", "Stockists worldwide"],
                  ["4.9", "Average rating"],
                ].map(([a, b]) => (
                  <div key={b}>
                    <p className="display text-[26px] text-espresso md:text-[32px]">{a}</p>
                    <p className="label mt-2 text-stone">{b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={280}>
              <button
                onClick={() => scrollToId("story")}
                className="group mt-9 inline-flex items-center gap-3 rounded-full border border-espresso/20 px-7 py-3.5 text-[11px] tracking-[0.18em] text-espresso uppercase transition-all duration-500 hover:bg-espresso hover:text-cream"
              >
                How we created this magic
                <Icon.Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <div className="relative">
              <div className="overflow-hidden">
                <img
                  src={IMG.ingredients}
                  alt="Raw organic ingredients laid out"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.05]"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 w-[62%] max-w-xs border border-espresso/10 bg-paper p-5 shadow-[0_30px_70px_-45px_rgba(43,37,32,.6)] md:-bottom-10 md:-left-10 md:p-7">
                <p className="label text-stone">On every label</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-espresso">
                  Nine ingredients or fewer. Each one you could find in a kitchen, not a laboratory.
                </p>
                <div className="mt-5 flex items-center gap-2 text-amber">
                  <Icon.Leaf className="h-4 w-4" />
                  <span className="label text-espresso/60">Certified organic</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
