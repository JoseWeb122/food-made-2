import { useEffect, useState } from "react";
import { money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { FlavorPicker, Icon, Qty, Stars } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function QuickView() {
  const { quickView: p, setQuickView, add, setDetail, setNotify } = useShop();
  const [flavor, setFlavor] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"about" | "ingredients" | "nutrition">("about");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (p) {
      setFlavor(p.flavors[0]);
      setQty(1);
      setTab("about");
      setAdded(false);
    }
  }, [p]);

  const open = !!p;

  return (
    <div className={cn("fixed inset-0 z-[85] flex items-end justify-center md:items-center", !open && "pointer-events-none")}>
      <div
        onClick={() => setQuickView(null)}
        className={cn("absolute inset-0 bg-ink/55 backdrop-blur-[3px] transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
      />
      <div
        className={cn(
          "relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden bg-cream transition-all duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] md:max-h-[88svh] md:flex-row",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[.98] opacity-0",
        )}
      >
        {p && (
          <>
            <button
              onClick={() => setQuickView(null)}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper/85 text-espresso backdrop-blur transition-colors hover:bg-espresso hover:text-cream"
            >
              <Icon.Close className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ivory md:aspect-auto md:h-auto md:w-[46%]">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              {p.badge && (
                <span className="label absolute top-4 left-4 rounded-full bg-paper/90 px-2.5 py-1 text-espresso backdrop-blur">
                  {p.badge}
                </span>
              )}
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-9">
              <div className="flex items-center gap-3">
                <Stars rating={p.rating} className="text-amber" />
                <span className="text-[11.5px] text-stone">
                  {p.rating} · {p.reviews} reviews
                </span>
              </div>
              <h3 className="display mt-3 text-[clamp(1.7rem,4vw,2.4rem)] text-espresso">{p.name}</h3>
              <p className="mt-2 text-[13px] text-amber">{p.weight}</p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="display text-[24px] text-espresso">{money(p.price)}</span>
                {p.compareAt && <span className="text-[13px] text-stone line-through">{money(p.compareAt)}</span>}
                {p.compareAt && (
                  <span className="label rounded-full bg-moss px-2 py-0.5 text-cream">
                    Save {money(p.compareAt - p.price)}
                  </span>
                )}
              </div>

              {/* tabs */}
              <div className="mt-6 flex gap-5 border-b border-espresso/10">
                {([
                  ["about", "Description"],
                  ["ingredients", "Ingredients"],
                  ["nutrition", "Nutrition"],
                ] as const).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={cn(
                      "relative pb-3 text-[11px] tracking-[0.14em] uppercase transition-colors",
                      tab === id ? "text-espresso" : "text-stone hover:text-espresso/70",
                    )}
                  >
                    {label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px origin-left bg-espresso transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                        tab === id ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                ))}
              </div>

              <div key={tab} className="anim-in mt-5 min-h-[112px]">
                {tab === "about" && <p className="text-[14px] leading-[1.8] text-espresso/70">{p.description}</p>}
                {tab === "ingredients" && (
                  <p className="text-[14px] leading-[1.8] text-espresso/70">{p.ingredients}</p>
                )}
                {tab === "nutrition" && (
                  <ul className="divide-y divide-espresso/8">
                    {p.nutrition.map((n) => (
                      <li key={n.label} className="flex justify-between py-2 text-[13.5px]">
                        <span className="text-stone">{n.label}</span>
                        <span className="text-espresso tabular-nums">{n.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6">
                <p className="label mb-2.5 text-stone">Flavour</p>
                <FlavorPicker flavors={p.flavors} value={flavor} onChange={setFlavor} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Qty value={qty} onChange={setQty} />
                {p.soldOut ? (
                  <button
                    onClick={() => {
                      const prod = p;
                      setQuickView(null);
                      window.setTimeout(() => setNotify(prod), 220);
                    }}
                    className="h-11 flex-1 rounded-full bg-espresso px-6 text-[11px] tracking-[0.18em] text-cream uppercase"
                  >
                    Notify me when back
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      add(p, flavor, qty);
                      setAdded(true);
                      window.setTimeout(() => setAdded(false), 1800);
                    }}
                    className={cn(
                      "relative h-11 flex-1 overflow-hidden rounded-full px-6 text-[11px] tracking-[0.18em] uppercase transition-colors duration-500",
                      added ? "bg-moss text-cream" : "bg-espresso text-cream hover:bg-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 flex items-center justify-center transition-all duration-400",
                        added ? "-translate-y-full opacity-0" : "translate-y-0",
                      )}
                    >
                      Add to Bag · {money(p.price * qty)}
                    </span>
                    <span
                      className={cn(
                        "absolute inset-0 flex items-center justify-center gap-2 transition-all duration-400",
                        added ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                      )}
                    >
                      <Icon.Check className="h-3.5 w-3.5" /> Added to bag
                    </span>
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  const prod = p;
                  setQuickView(null);
                  window.setTimeout(() => setDetail(prod), 260);
                }}
                className="group mt-5 inline-flex items-center gap-2 self-start text-[12px] text-stone transition-colors hover:text-espresso"
              >
                View full product page
                <Icon.ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


