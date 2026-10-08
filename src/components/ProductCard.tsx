import { useState } from "react";
import type { Product } from "@/data/catalog";
import { money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { FlavorPicker, Icon, Qty, Stars } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const { add, setQuickView, setDetail, setNotify } = useShop();
  const [flavor, setFlavor] = useState(product.flavors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);

  const onAdd = () => {
    add(product, flavor, qty);
    setAdded(true);
    setQty(1);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const alt = product.gallery[1] ?? product.image;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group/card relative flex h-full flex-col border border-espresso/8 bg-paper transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:border-espresso/20 hover:shadow-[0_26px_60px_-38px_rgba(43,37,32,.55)]"
    >
      {/* media */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <button
          onClick={() => setDetail(product)}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
              hover ? "scale-[1.07] opacity-0" : "scale-100 opacity-100",
              product.soldOut && "grayscale-[35%]",
            )}
          />
          <img
            src={alt}
            alt=""
            loading="lazy"
            aria-hidden
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
              hover ? "scale-[1.04] opacity-100" : "scale-110 opacity-0",
            )}
          />
        </button>

        {/* badges */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span
              className={cn(
                "label rounded-full px-2.5 py-1 backdrop-blur-sm",
                product.soldOut ? "bg-ink/70 text-cream" : "bg-paper/90 text-espresso",
              )}
            >
              {product.badge}
            </span>
          )}
          {product.compareAt && !product.soldOut && (
            <span className="label rounded-full bg-moss/90 px-2.5 py-1 text-cream">
              Save {money(product.compareAt - product.price)}
            </span>
          )}
        </div>

        {/* quick view */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)]",
            hover ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 lg:opacity-0",
            "max-lg:translate-y-0 max-lg:opacity-100",
          )}
        >
          <button
            onClick={() => setQuickView(product)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-paper/92 py-2.5 text-[10.5px] tracking-[0.18em] text-espresso uppercase backdrop-blur-md transition-colors hover:bg-espresso hover:text-cream"
          >
            <Icon.Eye className="h-3.5 w-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* body */}
      <div className={cn("flex flex-1 flex-col p-4 md:p-5", compact && "p-4")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button
              onClick={() => setDetail(product)}
              className="block text-left text-[15px] leading-snug font-medium text-espresso transition-colors hover:text-amber"
            >
              {product.name}
            </button>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-stone">{product.tagline}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[15px] text-espresso tabular-nums">{money(product.price)}</p>
            {product.compareAt && (
              <p className="text-[11.5px] text-stone line-through tabular-nums">{money(product.compareAt)}</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Stars rating={product.rating} className="text-amber" />
          <span className="text-[11px] text-stone">
            {product.rating} · {product.reviews} reviews
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((t) => (
            <span key={t} className="label rounded-full border border-espresso/12 px-2 py-0.5 text-stone">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          {product.soldOut ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center rounded-full border border-espresso/12 bg-ivory py-3 text-[10.5px] tracking-[0.2em] text-stone uppercase">
                Sold Out
              </div>
              <button
                onClick={() => setNotify(product)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3 text-[10.5px] tracking-[0.2em] text-cream uppercase transition-colors hover:bg-ink"
              >
                <Icon.Bell className="h-3.5 w-3.5" /> Notify Me
              </button>
            </div>
          ) : (
            <>
              <p className="label mb-2 text-stone">Flavour</p>
              <FlavorPicker flavors={product.flavors} value={flavor} onChange={setFlavor} />
              <div className="mt-3.5 flex items-center gap-2">
                <Qty value={qty} onChange={setQty} compact />
                <button
                  onClick={onAdd}
                  className={cn(
                    "relative h-9 flex-1 overflow-hidden rounded-full text-[10.5px] tracking-[0.18em] uppercase transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] active:scale-[.98]",
                    added ? "bg-moss text-cream" : "bg-espresso text-cream hover:bg-ink",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center gap-2 transition-all duration-400",
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
                    <Icon.Check className="h-3.5 w-3.5" /> Added
                  </span>
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => setDetail(product)}
            className="group/info mt-3 inline-flex items-center gap-1.5 text-[11px] text-stone transition-colors hover:text-espresso"
          >
            Product information
            <Icon.ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover/info:translate-x-0.5 group-hover/info:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
