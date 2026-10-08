import { useEffect, useRef, useState } from "react";
import { PRODUCTS, money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { FlavorPicker, Icon, Qty, Stars } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function ProductDetail() {
  const { detail: p, setDetail, add, setNotify, setCartOpen } = useShop();
  const [flavor, setFlavor] = useState("");
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState<"ingredients" | "nutrition" | "story">("ingredients");
  const [added, setAdded] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!p) return;
    setFlavor(p.flavors[0]);
    setQty(1);
    setImg(0);
    setTab("ingredients");
    setAdded(false);
    scroller.current?.scrollTo({ top: 0 });
  }, [p]);

  const open = !!p;
  const related = p ? PRODUCTS.filter((x) => x.id !== p.id && x.collections.some((c) => p.collections.includes(c))).slice(0, 4) : [];

  const onAdd = () => {
    if (!p) return;
    add(p, flavor, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className={cn("fixed inset-0 z-[84]", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        onClick={() => setDetail(null)}
        className={cn("absolute inset-0 bg-ink/50 backdrop-blur-[3px] transition-opacity duration-600", open ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={scroller}
        className={cn(
          "absolute inset-x-0 bottom-0 top-[4svh] overflow-y-auto overscroll-contain bg-cream transition-transform duration-[720ms] ease-[cubic-bezier(.22,1,.36,1)] md:top-[5svh] md:inset-x-[3vw] lg:inset-x-[6vw]",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {p && (
          <>
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-espresso/10 bg-cream/85 px-5 py-3.5 backdrop-blur-xl md:px-10">
              <p className="label text-stone">Product · {p.collections.includes("best") ? "Best Seller" : "Izhar"}</p>
              <button
                onClick={() => setDetail(null)}
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-espresso uppercase"
              >
                Close <Icon.Close className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>

            <div className="grid gap-8 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-2 lg:gap-14">
              {/* gallery */}
              <div>
                <div className="overflow-hidden bg-ivory">
                  <img
                    key={img}
                    src={p.gallery[img]}
                    alt={p.name}
                    className="anim-in aspect-[4/5] w-full object-cover md:aspect-[4/4.4]"
                  />
                </div>
                <div className="mt-3 flex gap-3">
                  {p.gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setImg(i)}
                      className={cn(
                        "h-20 w-16 overflow-hidden border transition-all duration-500 md:h-24 md:w-20",
                        i === img ? "border-espresso opacity-100" : "border-transparent opacity-55 hover:opacity-90",
                      )}
                    >
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* info */}
              <div className="lg:py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Stars rating={p.rating} className="text-amber" />
                  <span className="text-[12px] text-stone">
                    {p.rating} · {p.reviews} reviews
                  </span>
                  <span className="h-3 w-px bg-espresso/15" />
                  <span className="text-[12px] text-moss">In stock{p.soldOut ? "—restocking" : " · ships in 24h"}</span>
                </div>

                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)] text-espresso">{p.name}</h2>
                <p className="mt-3 text-[14px] text-amber">{p.tagline}</p>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="display text-[30px] text-espresso">{money(p.price)}</span>
                  {p.compareAt && <span className="text-[14px] text-stone line-through">{money(p.compareAt)}</span>}
                  <span className="text-[12px] text-stone">· {p.weight}</span>
                </div>

                <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-espresso/70">{p.description}</p>

                <div className="mt-7 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="label rounded-full border border-espresso/12 px-2.5 py-1 text-stone">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="label mb-2.5 text-stone">Flavour — {flavor}</p>
                  <FlavorPicker flavors={p.flavors} value={flavor} onChange={setFlavor} />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Qty value={qty} onChange={setQty} />
                  {p.soldOut ? (
                    <button
                      onClick={() => setNotify(p)}
                      className="h-11 flex-1 rounded-full bg-espresso px-7 text-[11px] tracking-[0.18em] text-cream uppercase"
                    >
                      Notify me when back
                    </button>
                  ) : (
                    <button
                      onClick={onAdd}
                      className={cn(
                        "relative h-11 min-w-[200px] flex-1 overflow-hidden rounded-full px-7 text-[11px] tracking-[0.18em] uppercase transition-colors duration-500",
                        added ? "bg-moss text-cream" : "bg-espresso text-cream hover:bg-ink",
                      )}
                    >
                      <span className={cn("absolute inset-0 flex items-center justify-center transition-all duration-400", added ? "-translate-y-full opacity-0" : "translate-y-0")}>
                        Add to Bag · {money(p.price * qty)}
                      </span>
                      <span className={cn("absolute inset-0 flex items-center justify-center gap-2 transition-all duration-400", added ? "translate-y-0 opacity-100" : "translate-y-full opacity-0")}>
                        <Icon.Check className="h-3.5 w-3.5" /> Added to bag
                      </span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setDetail(null);
                    window.setTimeout(() => setCartOpen(true), 280);
                  }}
                  className="mt-3 w-full rounded-full border border-espresso/20 py-3.5 text-[11px] tracking-[0.18em] text-espresso uppercase transition-colors hover:bg-espresso hover:text-cream sm:w-auto sm:px-8"
                >
                  View bag
                </button>

                <ul className="mt-8 grid gap-2.5 border-t border-espresso/10 pt-6 text-[13px] text-espresso/70">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <Icon.Check className="h-3.5 w-3.5 text-moss" /> {b}
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <Icon.Truck className="h-4 w-4 text-moss" /> Free shipping over $60 · 30-day returns
                  </li>
                </ul>

                {/* tabs */}
                <div className="mt-9 border-t border-espresso/10">
                  <div className="flex gap-6 pt-6">
                    {([
                      ["ingredients", "Ingredients"],
                      ["nutrition", "Nutrition"],
                      ["story", "Our story"],
                    ] as const).map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={cn(
                          "relative pb-2.5 text-[11px] tracking-[0.14em] uppercase transition-colors",
                          tab === id ? "text-espresso" : "text-stone hover:text-espresso/70",
                        )}
                      >
                        {label}
                        <span
                          className={cn(
                            "absolute inset-x-0 bottom-0 h-px origin-left bg-espresso transition-transform duration-500",
                            tab === id ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <div key={tab} className="anim-in mt-5 min-h-[130px]">
                    {tab === "ingredients" && (
                      <p className="text-[14px] leading-[1.85] text-espresso/70">{p.ingredients}</p>
                    )}
                    {tab === "nutrition" && (
                      <ul className="divide-y divide-espresso/8">
                        {p.nutrition.map((n) => (
                          <li key={n.label} className="flex justify-between py-2.5 text-[13.5px]">
                            <span className="text-stone">{n.label}</span>
                            <span className="text-espresso tabular-nums">{n.value}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {tab === "story" && (
                      <p className="text-[15px] leading-[1.9] text-espresso/70 italic">“{p.story}”</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* related */}
            <div className="border-t border-espresso/10 bg-ivory px-5 py-12 md:px-10 md:py-16">
              <h3 className="display text-[26px] text-espresso md:text-[32px]">
                Pairs <span className="ital">beautifully</span> with
              </h3>
              <div className="no-scrollbar -mx-5 mt-7 flex gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:px-0">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setDetail(r)}
                    className="group w-[62%] shrink-0 text-left sm:w-[40%] md:w-auto"
                  >
                    <div className="overflow-hidden bg-cream">
                      <img
                        src={r.image}
                        alt={r.name}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <p className="mt-3 text-[13.5px] text-espresso">{r.name}</p>
                    <p className="text-[12.5px] text-stone tabular-nums">{money(r.price)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* mobile sticky add */}
            {!p.soldOut && (
              <div className="sticky bottom-0 z-20 flex items-center gap-3 border-t border-espresso/10 bg-cream/90 px-5 py-3 backdrop-blur-xl lg:hidden">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] text-espresso">{p.name}</p>
                  <p className="text-[11.5px] text-stone">{flavor}</p>
                </div>
                <button
                  onClick={onAdd}
                  className="shrink-0 rounded-full bg-espresso px-6 py-3 text-[10.5px] tracking-[0.16em] text-cream uppercase"
                >
                  {added ? "Added" : `Add · ${money(p.price * qty)}`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
