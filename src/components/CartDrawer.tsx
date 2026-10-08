import { useEffect, useState } from "react";
import { money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Icon, Qty } from "@/components/ui";
import { scrollToId } from "@/components/Header";
import { cn } from "@/utils/cn";

const FREE_SHIP = 60;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, subtotal, savings, setQty, remove, count, clear } = useShop();
  const [stage, setStage] = useState<"cart" | "loading" | "done">("cart");

  useEffect(() => {
    if (!cartOpen) window.setTimeout(() => setStage("cart"), 400);
  }, [cartOpen]);

  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const shipPct = Math.min(100, (subtotal / FREE_SHIP) * 100);

  const checkout = () => {
    setStage("loading");
    window.setTimeout(() => setStage("done"), 1500);
  };

  return (
    <div className={cn("fixed inset-0 z-[80]", cartOpen ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        onClick={() => setCartOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/45 backdrop-blur-[3px] transition-opacity duration-600",
          cartOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-cream shadow-[0_0_80px_rgba(25,22,18,.3)] transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-espresso/10 px-5 py-5 md:px-7">
          <div>
            <p className="label text-stone">Your bag</p>
            <p className="display mt-1 text-[22px] text-espresso">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button aria-label="Close bag" onClick={() => setCartOpen(false)} className="p-2 text-espresso">
            <Icon.Close className="h-5 w-5" />
          </button>
        </header>

        {stage === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-moss text-cream">
              <Icon.Check className="h-7 w-7" />
            </span>
            <h3 className="display text-[28px] text-espresso">Order confirmed</h3>
            <p className="max-w-xs text-[13.5px] leading-relaxed text-stone">
              This is a front-end demo — no payment was taken. In the live store you'd now be on Shopify's secure
              checkout with Shop Pay, Apple Pay and Klarna enabled.
            </p>
            <button
              onClick={() => {
                clear();
                setCartOpen(false);
              }}
              className="mt-2 rounded-full bg-espresso px-8 py-3.5 text-[11px] tracking-[0.18em] text-cream uppercase"
            >
              Back to the shop
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-espresso/15 text-stone">
              <Icon.Bag className="h-6 w-6" />
            </span>
            <h3 className="display text-[24px] text-espresso">Your bag is empty</h3>
            <p className="max-w-[26ch] text-[13.5px] leading-relaxed text-stone">
              Start with the Cacao & Hazelnut Bites — it's where most people begin.
            </p>
            <button
              onClick={() => {
                setCartOpen(false);
                window.setTimeout(() => scrollToId("shop"), 320);
              }}
              className="mt-2 rounded-full bg-espresso px-8 py-3.5 text-[11px] tracking-[0.18em] text-cream uppercase transition-colors hover:bg-ink"
            >
              Shop best sellers
            </button>
          </div>
        ) : (
          <>
            {/* free shipping meter */}
            <div className="border-b border-espresso/10 px-5 py-4 md:px-7">
              <p className="text-[12px] text-stone">
                {remaining > 0 ? (
                  <>
                    You're <span className="text-espresso">{money(remaining)}</span> away from free shipping
                  </>
                ) : (
                  <span className="text-moss">Complimentary shipping unlocked</span>
                )}
              </p>
              <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-espresso/10">
                <div
                  className="h-full rounded-full bg-moss transition-[width] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ width: `${shipPct}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7">
              <ul className="space-y-5">
                {cart.map((l) => (
                  <li key={l.key} className="pop-in flex gap-4 border-b border-espresso/8 pb-5 last:border-0">
                    <div className="h-24 w-20 shrink-0 overflow-hidden bg-ivory">
                      <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[14px] text-espresso">{l.name}</p>
                          <p className="mt-0.5 text-[12px] text-stone">{l.flavor}</p>
                          {l.meta && <p className="mt-0.5 line-clamp-2 text-[11px] text-stone/80">{l.meta}</p>}
                        </div>
                        <button
                          onClick={() => remove(l.key)}
                          aria-label="Remove item"
                          className="shrink-0 p-1 text-stone transition-colors hover:text-espresso"
                        >
                          <Icon.Close className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <Qty value={l.qty} onChange={(n) => setQty(l.key, n)} compact />
                        <div className="text-right">
                          <p className="text-[14px] text-espresso tabular-nums">{money(l.price * l.qty)}</p>
                          {l.compareAt && (
                            <p className="text-[11.5px] text-stone line-through tabular-nums">
                              {money(l.compareAt * l.qty)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-espresso/10 bg-paper px-5 py-5 md:px-7">
              <div className="space-y-1.5 text-[13.5px]">
                {savings > 0 && (
                  <div className="flex justify-between text-moss">
                    <span>Bundle & offer savings</span>
                    <span className="tabular-nums">−{money(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone">
                  <span>Shipping</span>
                  <span>{remaining > 0 ? "Calculated at checkout" : "Free"}</span>
                </div>
                <div className="flex items-baseline justify-between pt-2 text-espresso">
                  <span className="label">Subtotal</span>
                  <span className="display text-[26px] tabular-nums">{money(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={checkout}
                disabled={stage === "loading"}
                className="relative mt-5 w-full overflow-hidden rounded-full bg-espresso py-4 text-[11px] tracking-[0.18em] text-cream uppercase transition-colors hover:bg-ink"
              >
                {stage === "loading" ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="h-3 w-3 animate-spin rounded-full border border-cream/40 border-t-cream" />
                    Securing checkout
                  </span>
                ) : (
                  <>Checkout · {money(subtotal)}</>
                )}
              </button>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-3 w-full py-2 text-[11px] tracking-[0.16em] text-stone uppercase transition-colors hover:text-espresso"
              >
                Continue shopping
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone">
                <Icon.Truck className="h-3.5 w-3.5" /> Dispatched within 24h · 30-day returns
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
