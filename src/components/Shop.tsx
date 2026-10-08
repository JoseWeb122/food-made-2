import { useMemo, useState } from "react";
import { COLLECTIONS, PRODUCTS } from "@/data/catalog";
import ProductCard from "@/components/ProductCard";
import { Icon, Reveal, SectionKicker } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Shop({
  collection,
  setCollection,
}: {
  collection: string;
  setCollection: (c: string) => void;
}) {
  const [visible, setVisible] = useState(8);

  const products = useMemo(
    () => (collection === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.collections.includes(collection))),
    [collection],
  );
  const shown = products.slice(0, visible);

  const pick = (id: string) => {
    setCollection(id);
    setVisible(8);
  };

  return (
    <section id="shop" className="relative bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionKicker>The Shop</SectionKicker>
            <h2 className="display mt-5 max-w-xl text-[clamp(2.1rem,5.4vw,3.9rem)] text-espresso">
              Everything we make, <span className="ital">in one place.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-stone">
            Add straight to your bag from any card — flavour, quantity and all. No detours, unless you want them.
          </p>
        </Reveal>

        {/* category tabs */}
        <Reveal delay={80} className="relative mt-10 md:mt-12">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
            {COLLECTIONS.map((c) => {
              const active = c.id === collection;
              const n =
                c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.collections.includes(c.id)).length;
              return (
                <button
                  key={c.id}
                  onClick={() => pick(c.id)}
                  className={cn(
                    "group relative shrink-0 rounded-full border px-4 py-2.5 text-[11px] tracking-[0.14em] uppercase transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                    active
                      ? "border-espresso bg-espresso text-cream"
                      : "border-espresso/12 text-espresso/65 hover:border-espresso/40 hover:text-espresso",
                  )}
                >
                  {c.label}
                  <span className={cn("ml-2 text-[9.5px] tabular-nums", active ? "opacity-60" : "opacity-45")}>
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* grid */}
        <div
          key={collection}
          className="mt-8 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {shown.map((p, i) => (
            <div key={p.id} className="anim-in" style={{ animationDelay: `${i * 70}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-24 text-center">
            <p className="display text-2xl text-espresso">Nothing here yet.</p>
            <p className="mt-2 text-sm text-stone">This collection is being restocked. Try another.</p>
          </div>
        )}

        {visible < products.length && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + 4)}
              className="group inline-flex items-center gap-3 rounded-full border border-espresso/20 px-8 py-4 text-[11px] tracking-[0.18em] text-espresso uppercase transition-all duration-500 hover:bg-espresso hover:text-cream"
            >
              Load more
              <Icon.Chevron className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
