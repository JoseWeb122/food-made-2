import { money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Icon } from "@/components/ui";

export default function Toasts() {
  const { toasts, setCartOpen, count, subtotal, cartOpen } = useShop();

  return (
    <>
      <div className="pointer-events-none fixed top-20 right-4 z-[95] flex w-[min(340px,calc(100vw-2rem))] flex-col gap-2.5 md:right-8">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pop-in pointer-events-auto flex items-center gap-3 border border-espresso/10 bg-paper/95 p-3 shadow-[0_24px_60px_-34px_rgba(43,37,32,.6)] backdrop-blur-xl"
          >
            {t.image ? (
              <img src={t.image} alt="" className="h-12 w-12 shrink-0 object-cover" />
            ) : (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ivory text-espresso">
                <Icon.Check className="h-4 w-4" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-espresso">{t.title}</p>
              {t.sub && <p className="truncate text-[11.5px] text-stone">{t.sub}</p>}
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="shrink-0 rounded-full border border-espresso/15 px-3 py-2 text-[10px] tracking-[0.14em] text-espresso uppercase transition-colors hover:bg-espresso hover:text-cream"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* mobile sticky bag bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[60] transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
          count > 0 && !cartOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={() => setCartOpen(true)}
          className="flex w-full items-center justify-between gap-4 border-t border-espresso/10 bg-espresso/95 px-5 py-3.5 text-cream backdrop-blur-xl"
        >
          <span className="flex items-center gap-3">
            <Icon.Bag className="h-[18px] w-[18px]" />
            <span className="text-[12.5px]">
              {count} {count === 1 ? "item" : "items"} in bag
            </span>
          </span>
          <span className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase">
            View bag · {money(subtotal)}
            <Icon.Arrow className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </>
  );
}
