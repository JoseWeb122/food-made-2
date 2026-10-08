import { RIBBON_WORDS } from "@/data/catalog";
import { cn } from "@/utils/cn";

function Row({ reverse, tone }: { reverse?: boolean; tone: "dark" | "light" }) {
  const words = [...RIBBON_WORDS, ...RIBBON_WORDS, ...RIBBON_WORDS, ...RIBBON_WORDS];
  return (
    <div className={cn("marquee-track", reverse && "rev")}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="flex shrink-0 items-center">
          <span
            className={cn(
              "px-6 text-[13px] tracking-[0.3em] whitespace-nowrap uppercase md:px-9 md:text-[15px]",
              tone === "dark" ? "text-cream/90" : "text-espresso/80",
            )}
          >
            {w}
          </span>
          <span className={cn("h-1 w-1 rotate-45", tone === "dark" ? "bg-cream/40" : "bg-espresso/30")} />
        </span>
      ))}
    </div>
  );
}

export default function Ribbon() {
  return (
    <section id="ribbon" className="marquee-host relative overflow-hidden bg-espresso py-5 md:py-6">
      <div className="edge-fade">
        <Row tone="dark" />
      </div>
    </section>
  );
}

export function RibbonLight() {
  return (
    <div className="marquee-host relative overflow-hidden border-y border-espresso/10 bg-ivory py-4">
      <div className="edge-fade">
        <Row tone="light" reverse />
      </div>
    </div>
  );
}
