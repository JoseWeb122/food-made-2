import { useState } from "react";
import { PRODUCTS, money } from "@/data/catalog";
import type { Product } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { FlavorPicker, Icon, Qty, Reveal, SectionKicker, Stars } from "@/components/ui";
import { cn } from "@/utils/cn";

const FEATURED_IDS = ["superfood-bars", "cacao-hazelnut", "date-tahini-truffles"];

export default function BestSellers() {
  const featured = FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);

  return (
    <section id="best" className="relative bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="max-w-2xl">
          <SectionKicker>Best Sellers</SectionKicker>
          <h2 className="display mt-5 text-[clamp(2.1rem,5.4vw,3.9rem)] text-espresso">
            The three that <span className="ital">never sit still.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        {featured.map((p, i) => (
          <FeatureRow key={p.id} product={p} flip={i % 2 === 1} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({ product, flip, index }: { product: Product; flip: boolean; index: number }) {
  const { add, setDetail } = useShop();
  const [flavor, setFlavor] = useState(product.flavors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product, flavor, qty);
    setAdded(true);
    setQty(1);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-10">
      <div className={cn("grid items-center gap-9 lg:grid-cols-12 lg:gap-16")}>
        <Reveal className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
          <button
            onClick={() => setDetail(product)}
            className="group relative block w-full overflow-hidden bg-ivory"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[2200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] md:aspect-[16/11]"
            />
            <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 backdrop-blur-sm">
              <span className="label text-espresso">No. 0{index + 1}</span>
            </span>
            <span className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-espresso opacity-0 backdrop-blur-sm transition-all duration-600 group-hover:opacity-100">
              <Icon.ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </Reveal>

        <Reveal delay={100} className={cn("lg:col-span-5", flip && "lg:order-1 lg:col-start-1")}>
          <div className="flex items-center gap-3">
            <Stars rating={product.rating} className="text-amber" />
            <span className="text-[11.5px] text-stone">{product.reviews} reviews</span>
          </div>
          <h3 className="display mt-4 text-[clamp(1.9rem,4.2vw,3rem)] text-espresso">{product.name}</h3>
          <p className="mt-3 text-[13px] tracking-[0.02em] text-amber">{product.tagline}</p>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.8] text-espresso/70">{product.description}</p>

          <ul className="mt-7 grid gap-2.5 border-t border-espresso/10 pt-6">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[13.5px] text-espresso/75">
                <Icon.Check className="h-3.5 w-3.5 text-moss" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="label mb-2.5 text-stone">Choose your flavour</p>
            <FlavorPicker flavors={product.flavors} value={flavor} onChange={setFlavor} />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2.5">
              <span className="display text-[26px] text-espresso">{money(product.price)}</span>
              {product.compareAt && (
                <span className="text-[13px] text-stone line-through">{money(product.compareAt)}</span>
              )}
            </div>
            <Qty value={qty} onChange={setQty} />
            <button
              onClick={onAdd}
              className={cn(
                "relative h-11 min-w-[172px] flex-1 overflow-hidden rounded-full px-7 text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 sm:flex-none",
                added ? "bg-moss text-cream" : "bg-espresso text-cream hover:bg-ink",
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-400",
                  added ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
                )}
              >
                Add to Bag
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
          </div>
          <button
            onClick={() => setDetail(product)}
            className="group mt-5 inline-flex items-center gap-2 text-[12px] text-stone transition-colors hover:text-espresso"
          >
            Full product story, ingredients & nutrition
            <Icon.ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Reveal>
      </div>
    </div>
  );
}
