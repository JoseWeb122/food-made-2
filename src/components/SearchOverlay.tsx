import { useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";

const SUGGESTED = ["Cacao", "Bars", "Granola", "Gifting", "No added sugar", "Bundles"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, add, setDetail, setNotify } = useShop();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => input.current?.focus(), 420);
    else window.setTimeout(() => setQ(""), 400);
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.tagline, p.description, p.tags.join(" "), p.flavors.join(" "), p.collections.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [q]);

  return (
    <div className={cn("fixed inset-0 z-[88]", searchOpen ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        onClick={() => setSearchOpen(false)}
        className={cn("absolute inset-0 bg-ink/50 backdrop-blur-[3px] transition-opacity duration-600", searchOpen ? "opacity-100" : "opacity-0")}
      />
      <div
        className={cn(
          "absolute inset-x-0 top-0 max-h-[92svh] overflow-y-auto bg-cream transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]",
          searchOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="mx-auto max-w-[1200px] px-5 py-6 md:px-10 md:py-10">
          <div className="flex items-center justify-between">
            <p className="label text-stone">Search</p>
            <button
              onClick={() => setSearchOpen(false)}
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-espresso uppercase"
            >
              Close <Icon.Close className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4 border-b border-espresso/15 pb-4">
            <Icon.Search className="h-5 w-5 shrink-0 text-stone" />
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, flavours, ingredients…"
              className="display w-full bg-transparent text-[clamp(1.4rem,4vw,2.4rem)] text-espresso outline-none placeholder:text-stone/45"
            />
            {q && (
              <button onClick={() => setQ("")} className="shrink-0 text-[11px] tracking-[0.14em] text-stone uppercase">
                Clear
              </button>
            )}
          </div>

          {!q && (
            <div className="mt-8">
              <p className="label text-stone">Popular searches</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="rounded-full border border-espresso/15 px-4 py-2 text-[12px] text-espresso/70 transition-colors hover:border-espresso hover:text-espresso"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <button key={p.id} onClick={() => { setSearchOpen(false); window.setTimeout(() => setDetail(p), 280); }} className="group text-left">
                    <div className="overflow-hidden bg-ivory">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="aspect-square w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2.5 text-[13px] text-espresso">{p.name}</p>
                    <p className="text-[12px] text-stone tabular-nums">{money(p.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && results.length === 0 && (
            <div className="py-16 text-center">
              <p className="display text-[26px] text-espresso">No matches for “{q}”</p>
              <p className="mt-3 text-[13.5px] text-stone">
                Try “cacao”, “granola” or “gifting” — or browse the full shop.
              </p>
            </div>
          )}

          {q && results.length > 0 && (
            <div className="mt-8">
              <p className="label text-stone">
                {results.length} result{results.length > 1 ? "s" : ""}
              </p>
              <ul className="mt-5 divide-y divide-espresso/8">
                {results.map((p, i) => (
                  <li
                    key={p.id}
                    className="anim-in flex items-center gap-4 py-4"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        window.setTimeout(() => setDetail(p), 280);
                      }}
                      className="group flex min-w-0 flex-1 items-center gap-4 text-left"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden bg-ivory sm:h-20 sm:w-20">
                        <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[14.5px] text-espresso">{p.name}</p>
                        <p className="truncate text-[12.5px] text-stone">{p.tagline}</p>
                        <p className="mt-1 text-[13px] text-espresso tabular-nums">{money(p.price)}</p>
                      </div>
                    </button>
                    {p.soldOut ? (
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          window.setTimeout(() => setNotify(p), 280);
                        }}
                        className="shrink-0 rounded-full border border-espresso/20 px-4 py-2.5 text-[10.5px] tracking-[0.16em] text-espresso uppercase"
                      >
                        Notify me
                      </button>
                    ) : (
                      <button
                        onClick={() => add(p, p.flavors[0], 1)}
                        className="shrink-0 rounded-full bg-espresso px-4 py-2.5 text-[10.5px] tracking-[0.16em] text-cream uppercase transition-colors hover:bg-ink"
                      >
                        Add
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
