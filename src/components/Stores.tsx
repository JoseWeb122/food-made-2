import { useMemo, useRef, useState } from "react";
import { STORES } from "@/data/catalog";
import { Icon, Reveal, SectionKicker } from "@/components/ui";
import { cn } from "@/utils/cn";

const REGIONS = ["All", "US", "UK", "EU", "AU"];
const inRegion = (r: string, region: string) =>
  region === "All" ||
  (region === "EU" ? ["FR", "NL", "DE"].includes(r) : region === "US" ? ["CA", "NY", "TX", "US"].includes(r) : r === region);

export default function Stores() {
  const [region, setRegion] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const list = useMemo(
    () =>
      STORES.filter(
        (s) =>
          inRegion(s.region, region) &&
          (q.trim() === "" ||
            `${s.name} ${s.city} ${s.region} ${s.type}`.toLowerCase().includes(q.trim().toLowerCase())),
      ),
    [region, q],
  );

  const findStore = () => {
    setOpen(true);
    window.setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <section id="stores" className="relative bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionKicker>Stockists</SectionKicker>
            <h2 className="display mt-5 text-[clamp(2.1rem,5.4vw,3.9rem)] text-espresso">
              Stores we are <span className="ital">in.</span>
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-stone">
              You'll find Izhar on 142 shelves across twelve countries — from the Erewhon cold case in Los Angeles to
              the Selfridges Foodhall in London.
            </p>
          </div>
          <button
            onClick={findStore}
            className="group inline-flex items-center gap-3 self-start rounded-full bg-espresso px-7 py-4 text-[11px] tracking-[0.18em] text-cream uppercase transition-all duration-500 hover:bg-ink md:self-auto"
          >
            <Icon.Pin className="h-4 w-4" />
            Find a Store
          </button>
        </Reveal>

        {/* locator */}
        <div
          ref={listRef}
          className={cn(
            "grid overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]",
            open ? "mt-10 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <div className="border border-espresso/10 bg-paper p-5 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full items-center gap-3 border-b border-espresso/15 pb-3 md:max-w-sm">
                  <Icon.Search className="h-4 w-4 shrink-0 text-stone" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by city or retailer"
                    className="w-full bg-transparent text-[14px] text-espresso outline-none placeholder:text-stone/70"
                  />
                </div>
                <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
                  {REGIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-all duration-500",
                        region === r
                          ? "border-espresso bg-espresso text-cream"
                          : "border-espresso/12 text-espresso/60 hover:border-espresso/40",
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[12px] text-stone">
                {list.length} retailer{list.length === 1 ? "" : "s"} found
                {q && ` for “${q}”`}
              </p>
            </div>
          </div>
        </div>

        {/* grid */}
        <div className="mt-10 grid grid-cols-2 gap-px border border-espresso/10 bg-espresso/10 md:grid-cols-3 lg:grid-cols-4">
          {(open ? list : STORES).map((s, i) => (
            <div
              key={s.name}
              className="anim-in group relative flex flex-col justify-between gap-6 bg-cream p-5 transition-colors duration-500 hover:bg-paper md:p-7"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-espresso/12 text-[13px] text-espresso transition-colors duration-500 group-hover:border-espresso/40">
                  {s.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="label text-stone">{s.type}</span>
              </div>
              <div>
                <p className="text-[14.5px] leading-snug text-espresso">{s.name}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-stone">
                  <Icon.Pin className="h-3.5 w-3.5" />
                  {s.city}
                  {s.region !== "US" && s.city !== "Nationwide" ? `, ${s.region}` : ""}
                </p>
                <p className="mt-2 text-[11.5px] text-stone/80">{s.locations} locations</p>
              </div>
            </div>
          ))}
          {open && list.length === 0 && (
            <div className="col-span-full bg-cream p-12 text-center">
              <p className="display text-[22px] text-espresso">No stockists there yet</p>
              <p className="mt-2 text-[13px] text-stone">
                We're expanding every season — order online in the meantime.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-[12px] text-stone">
          Are you a retailer? <span className="text-espresso underline underline-offset-4">Open a wholesale account →</span>
        </p>
      </div>
    </section>
  );
}
