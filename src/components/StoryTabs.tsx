import { useState } from "react";
import { STORY_TABS } from "@/data/catalog";
import { Icon, Reveal, SectionKicker } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function StoryTabs() {
  const [active, setActive] = useState(0);
  const tab = STORY_TABS[active];

  return (
    <section id="story" className="relative overflow-hidden bg-espresso py-20 text-cream md:py-32">
      {/* soft organic glow */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-amber/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-24 h-[460px] w-[460px] rounded-full bg-olive/20 blur-[130px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="max-w-3xl">
          <SectionKicker className="text-cream/50">Our Method</SectionKicker>
          <h2 className="display mt-6 text-[clamp(2.2rem,6vw,4.4rem)] text-cream">
            How we created <span className="ital">this magic</span>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/60">
            Five decisions shaped everything we sell. Open each one.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* tab list */}
          <div className="lg:col-span-5">
            <div className="border-t border-cream/12">
              {STORY_TABS.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover:hover)").matches) setActive(i);
                    }}
                    className="group block w-full border-b border-cream/12 py-5 text-left transition-colors md:py-6"
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "label tabular-nums transition-colors duration-500",
                            on ? "text-amber" : "text-cream/35",
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "display text-[22px] transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)] md:text-[28px]",
                            on ? "translate-x-1 text-cream" : "text-cream/50 group-hover:text-cream/80",
                          )}
                        >
                          {t.label}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "label shrink-0 transition-all duration-500",
                          on ? "translate-x-0 text-cream/70 opacity-100" : "-translate-x-2 opacity-0",
                        )}
                      >
                        &gt;&gt;
                      </span>
                    </div>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden",
                        on ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      <p className="text-[14px] leading-[1.8] text-cream/65">{t.body}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* panel */}
          <div className="hidden lg:col-span-7 lg:block">
            <div key={tab.id} className="anim-in grid gap-8 md:grid-cols-5">
              <div className="md:col-span-2">
                <div className="overflow-hidden">
                  <img
                    src={tab.image}
                    alt={tab.heading}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <div className="mt-5 border-t border-cream/12 pt-5">
                  <p className="display text-[34px] text-amber">{tab.stat}</p>
                  <p className="label mt-2 text-cream/50">{tab.statLabel}</p>
                </div>
              </div>
              <div className="md:col-span-3">
                <p className="label text-amber">{tab.kicker}</p>
                <h3 className="display mt-4 text-[30px] text-cream">{tab.heading}</h3>
                <p className="mt-6 text-[15px] leading-[1.9] text-cream/65">{tab.body}</p>
                <div className="mt-8 flex items-center gap-3 text-cream/40">
                  <Icon.Leaf className="h-4 w-4" />
                  <span className="label">Certified organic · Plastic-free · Batch traced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile visual */}
        <div className="mt-10 lg:hidden">
          <img src={tab.image} alt={tab.heading} loading="lazy" className="aspect-[16/10] w-full object-cover" />
          <div className="mt-5 flex items-end justify-between border-t border-cream/12 pt-5">
            <div>
              <p className="display text-[30px] text-amber">{tab.stat}</p>
              <p className="label mt-1.5 text-cream/50">{tab.statLabel}</p>
            </div>
            <p className="label max-w-[45%] text-right text-cream/40">{tab.kicker}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
