import { useMemo, useState } from "react";
import { PRODUCTS, money } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Icon, Qty, Reveal, SectionKicker } from "@/components/ui";
import { cn } from "@/utils/cn";

const STEPS = [
  {
    id: "base",
    title: "The Bites",
    hint: "Choose your base — the pieces you reach for daily.",
    ids: ["cacao-hazelnut", "pistachio-rose", "golden-turmeric"],
  },
  {
    id: "everyday",
    title: "The Everyday",
    hint: "Breakfast shelf, pantry staples and fuel.",
    ids: ["buckwheat-granola", "superfood-bars", "almond-butter"],
  },
  {
    id: "treat",
    title: "The Treat",
    hint: "Something slower, for the end of the day.",
    ids: ["date-tahini-truffles", "cacao-sea-salt-bar", "discovery-box"],
  },
];

type Sel = Record<string, { qty: number; flavor: string }>;

const tierFor = (units: number) => (units >= 7 ? 0.2 : units >= 5 ? 0.15 : units >= 3 ? 0.1 : 0);
const nextTier = (units: number) => (units < 3 ? 3 : units < 5 ? 5 : units < 7 ? 7 : null);

export default function BundleBuilder() {
  const { addBundle, setCartOpen } = useShop();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Sel>({});

  const lines = useMemo(
    () =>
      Object.entries(sel)
        .map(([id, v]) => ({ product: PRODUCTS.find((p) => p.id === id)!, ...v }))
        .filter((l) => l.product && l.qty > 0),
    [sel],
  );

  const units = lines.reduce((n, l) => n + l.qty, 0);
  const regular = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
  const rate = tierFor(units);
  const discount = regular * rate;
  const total = regular - discount;
  const target = nextTier(units);
  const progress = Math.min(100, target ? (units / target) * 100 : 100);

  const toggle = (id: string, flavor: string) =>
    setSel((s) => {
      const copy = { ...s };
      if (copy[id]) delete copy[id];
      else copy[id] = { qty: 1, flavor };
      return copy;
    });

  const setQty = (id: string, qty: number) =>
    setSel((s) => (qty <= 0 ? Object.fromEntries(Object.entries(s).filter(([k]) => k !== id)) : { ...s, [id]: { ...s[id], qty } }));

  const setFlavor = (id: string, flavor: string) => setSel((s) => ({ ...s, [id]: { ...s[id], flavor } }));

  const submit = () => {
    if (!lines.length) return;
    addBundle({
      name: `Custom Bundle · ${units} item${units > 1 ? "s" : ""}`,
      items: lines.map((l) => `${l.qty}× ${l.product.name} (${l.flavor})`).join(", "),
      price: Number(total.toFixed(2)),
      compareAt: Number(regular.toFixed(2)),
      image: lines[0].product.image,
    });
    setSel({});
    setStep(0);
    window.setTimeout(() => setCartOpen(true), 420);
  };

  const current = STEPS[step];

  return (
    <section id="bundle" className="relative overflow-hidden bg-ivory py-20 md:py-28">
      <div className="pointer-events-none absolute top-1/4 -left-40 h-[420px] w-[420px] rounded-full bg-clay/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionKicker>Bundle Builder</SectionKicker>
            <h2 className="display mt-5 text-[clamp(2.1rem,5.4vw,3.9rem)] text-espresso">
              Build your own <span className="ital">bundle.</span>
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-stone">
              Choose your favourites. Mix your flavours. Save more — up to 20% as your box fills.
            </p>
          </div>
          <div className="flex gap-2">
            {[
              ["3+", "10% off"],
              ["5+", "15% off"],
              ["7+", "20% off"],
            ].map(([a, b], i) => {
              const on = rate >= [0.1, 0.15, 0.2][i];
              return (
                <div
                  key={a}
                  className={cn(
                    "rounded-lg border px-3.5 py-2.5 text-center transition-all duration-600",
                    on ? "border-moss bg-moss text-cream" : "border-espresso/12 bg-paper text-espresso/60",
                  )}
                >
                  <p className="text-[13px] tabular-nums">{a}</p>
                  <p className="label mt-0.5 opacity-75">{b}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* steps */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* step indicator */}
            <div className="flex items-center gap-2 md:gap-4">
              {STEPS.map((s, i) => {
                const done = i < step;
                const on = i === step;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStep(i)}
                    className="group flex flex-1 items-center gap-3 text-left"
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)]",
                        on
                          ? "border-espresso bg-espresso text-cream"
                          : done
                            ? "border-moss bg-moss text-cream"
                            : "border-espresso/20 text-espresso/40",
                      )}
                    >
                      {done ? <Icon.Check className="h-3 w-3" /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[12.5px] transition-colors",
                          on ? "text-espresso" : "text-espresso/45 group-hover:text-espresso/70",
                        )}
                      >
                        {s.title}
                      </span>
                      <span className="mt-1.5 block h-px w-full bg-espresso/10">
                        <span
                          className={cn(
                            "block h-px origin-left bg-espresso transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                            on || done ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-[13.5px] text-stone">
              <span className="label mr-2 text-espresso">Step {step + 1}</span>
              {current.hint}
            </p>

            <div key={current.id} className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {current.ids.map((id, i) => {
                const p = PRODUCTS.find((x) => x.id === id)!;
                const picked = sel[id];
                return (
                  <div
                    key={id}
                    className="anim-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div
                      className={cn(
                        "group relative flex h-full flex-col overflow-hidden border bg-paper transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)]",
                        picked
                          ? "border-espresso shadow-[0_24px_50px_-36px_rgba(43,37,32,.7)]"
                          : "border-espresso/10 hover:border-espresso/30",
                      )}
                    >
                      <button
                        onClick={() => toggle(id, p.flavors[0])}
                        className="relative aspect-[4/3] w-full overflow-hidden bg-ivory"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className={cn(
                            "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
                            picked ? "scale-[1.04]" : "group-hover:scale-[1.05]",
                          )}
                        />
                        <span
                          className={cn(
                            "absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full border transition-all duration-500",
                            picked
                              ? "scale-100 border-espresso bg-espresso text-cream"
                              : "border-white/70 bg-white/70 text-transparent backdrop-blur-sm",
                          )}
                        >
                          <Icon.Check className="h-3.5 w-3.5" />
                        </span>
                      </button>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[14px] leading-snug text-espresso">{p.name}</p>
                          <p className="shrink-0 text-[13.5px] text-espresso tabular-nums">{money(p.price)}</p>
                        </div>
                        <p className="mt-1 line-clamp-1 text-[12px] text-stone">{p.weight}</p>

                        <div
                          className={cn(
                            "grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                            picked ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-wrap gap-1.5">
                              {p.flavors.map((f) => (
                                <button
                                  key={f}
                                  onClick={() => setFlavor(id, f)}
                                  className={cn(
                                    "rounded-full border px-2.5 py-1 text-[10px] transition-all duration-400",
                                    picked?.flavor === f
                                      ? "border-espresso bg-espresso text-cream"
                                      : "border-espresso/15 text-espresso/60 hover:border-espresso/40",
                                  )}
                                >
                                  {f}
                                </button>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <Qty value={picked?.qty ?? 1} onChange={(n) => setQty(id, n)} compact />
                              <button
                                onClick={() => toggle(id, p.flavors[0])}
                                className="text-[11px] text-stone underline-offset-4 hover:text-espresso hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {!picked && (
                          <button
                            onClick={() => toggle(id, p.flavors[0])}
                            className="mt-4 w-full rounded-full border border-espresso/20 py-2.5 text-[10.5px] tracking-[0.18em] text-espresso uppercase transition-colors hover:bg-espresso hover:text-cream"
                          >
                            Select
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-espresso uppercase transition-opacity disabled:opacity-30"
              >
                <Icon.Arrow className="h-3.5 w-3.5 rotate-180" /> Back
              </button>
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={step === STEPS.length - 1}
                className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-[11px] tracking-[0.16em] text-cream uppercase transition-all duration-500 hover:bg-ink disabled:opacity-30"
              >
                Next step
                <Icon.Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 border border-espresso/10 bg-paper p-6 md:p-7">
              <div className="flex items-center justify-between">
                <p className="label text-stone">Your bundle</p>
                <p className="label text-espresso tabular-nums">{units} items</p>
              </div>

              {/* progress */}
              <div className="mt-5">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-espresso/10">
                  <div
                    className="h-full rounded-full bg-moss transition-[width] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2.5 text-[12px] text-stone">
                  {target ? (
                    <>
                      Add <span className="text-espresso">{target - units}</span> more to unlock{" "}
                      <span className="text-moss">{target === 3 ? "10%" : target === 5 ? "15%" : "20%"} off</span>
                    </>
                  ) : (
                    <span className="text-moss">Maximum 20% saving unlocked.</span>
                  )}
                </p>
              </div>

              <div className="mt-6 max-h-64 space-y-3 overflow-y-auto border-t border-espresso/10 pt-5">
                {lines.length === 0 && (
                  <p className="py-6 text-center text-[13px] text-stone">
                    Nothing selected yet. Pick your first piece to begin.
                  </p>
                )}
                {lines.map((l) => (
                  <div key={l.product.id} className="flex items-center gap-3">
                    <img src={l.product.image} alt="" className="h-12 w-12 shrink-0 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-espresso">{l.product.name}</p>
                      <p className="truncate text-[11.5px] text-stone">
                        {l.flavor} · ×{l.qty}
                      </p>
                    </div>
                    <p className="text-[13px] text-espresso tabular-nums">{money(l.qty * l.product.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-espresso/10 pt-5 text-[13.5px]">
                <div className="flex justify-between text-stone">
                  <span>Regular price</span>
                  <span className="tabular-nums">{money(regular)}</span>
                </div>
                <div className={cn("flex justify-between transition-colors", discount > 0 ? "text-moss" : "text-stone/60")}>
                  <span>Bundle savings {rate > 0 && `(${Math.round(rate * 100)}%)`}</span>
                  <span className="tabular-nums">−{money(discount)}</span>
                </div>
                <div className="flex items-baseline justify-between pt-2 text-espresso">
                  <span className="label">Your bundle</span>
                  <span className="display text-[26px] tabular-nums">{money(total)}</span>
                </div>
              </div>

              <button
                onClick={submit}
                disabled={!lines.length}
                className="mt-6 w-full rounded-full bg-espresso py-4 text-[11px] tracking-[0.18em] text-cream uppercase transition-all duration-500 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                Add Bundle to Bag
              </button>
              <p className="mt-3 text-center text-[11px] text-stone">Free shipping on bundles over $60</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
