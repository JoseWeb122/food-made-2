import { useEffect, useState } from "react";
import { IMG } from "@/data/catalog";
import { Icon } from "@/components/ui";
import { scrollToId } from "@/components/Header";

export default function Hero() {
  const [y, setY] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = window.setTimeout(() => setReady(true), 80);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  const p = Math.min(1, y / 700);

  return (
    <section
      id="top"
      className="relative isolate h-[88svh] min-h-[600px] w-full overflow-hidden bg-ivory"
    >
      {/* parallax image */}
      <div
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: `translate3d(0, ${y * 0.26}px, 0) scale(${1.05 + p * 0.06})` }}
      >
        <img
          src={IMG.hero}
          alt="Organic raw snacks styled on warm travertine"
          className="h-full w-full object-cover object-[70%_center] transition-[filter,opacity,transform] duration-[1800ms] ease-[cubic-bezier(.22,1,.36,1)] md:object-center"
          style={{
            opacity: ready ? 1 : 0,
            filter: ready ? "blur(0px)" : "blur(16px)",
            transform: ready ? "scale(1)" : "scale(1.04)",
          }}
        />
      </div>

      {/* editorial ivory scrims */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cream via-cream/72 to-transparent md:via-cream/45 md:to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cream/90 via-transparent to-cream/55" />

      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
        <div className="max-w-[760px]" style={{ opacity: 1 - p * 1.3, transform: `translateY(${p * -40}px)` }}>
          <p
            className="label text-stone transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transitionDelay: "280ms" }}
          >
            Est. 2016 — A small-batch raw food atelier
          </p>

          <h1 className="display mt-5 text-[clamp(2.7rem,8.6vw,6.8rem)] text-espresso">
            {["Food, made", "closer to"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <span
                  className="block transition-transform duration-[1500ms] ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{
                    transform: ready ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: `${340 + i * 110}ms`,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="block transition-transform duration-[1500ms] ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ transform: ready ? "translateY(0)" : "translateY(110%)", transitionDelay: "560ms" }}
              >
                <span className="ital pr-2 text-amber">nature.</span>
              </span>
            </span>
          </h1>

          <p
            className="mt-7 max-w-[26rem] text-[15px] leading-relaxed text-espresso/65 transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] md:text-base"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transitionDelay: "800ms" }}
          >
            Organic. Raw. Vegan. Nutritionally dense. Nine ingredients or fewer, nothing heated above 42°C, and never
            a gram of added sugar.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] sm:flex-row sm:items-center"
            style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(18px)", transitionDelay: "940ms" }}
          >
            <button
              onClick={() => scrollToId("shop")}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-espresso px-8 py-4 text-[11px] tracking-[0.18em] text-cream uppercase transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-ink active:scale-[.985]"
            >
              Shop All
              <Icon.Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("story")}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-espresso/25 bg-cream/40 px-8 py-4 text-[11px] tracking-[0.18em] text-espresso uppercase backdrop-blur-[2px] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-espresso hover:bg-espresso hover:text-cream"
            >
              Discover Our Story
            </button>
          </div>
        </div>

        {/* bottom rail */}
        <div
          className="mt-10 flex items-end justify-between gap-6 border-t border-espresso/12 pt-5 transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] md:mt-12 md:pt-6"
          style={{ opacity: ready ? 1 - p * 1.4 : 0, transitionDelay: "1100ms" }}
        >
          <button onClick={() => scrollToId("about")} className="group flex items-center gap-4">
            <span className="relative hidden h-9 w-px overflow-hidden bg-espresso/20 sm:block">
              <span className="scroll-dot absolute inset-x-0 top-0 h-4 bg-espresso" />
            </span>
            <span className="label text-stone transition-colors group-hover:text-espresso">Scroll to explore</span>
          </button>
          <div className="hidden items-center gap-10 md:flex">
            {[
              ["11", "Grower partners"],
              ["42°C", "Never exceeded"],
              ["0 g", "Added sugar"],
            ].map(([a, b]) => (
              <div key={b} className="text-right">
                <p className="display text-[22px] text-espresso">{a}</p>
                <p className="label mt-1 text-stone">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
