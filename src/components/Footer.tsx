import { PRODUCTS, SOCIALS } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { Icon } from "@/components/ui";
import { scrollToId } from "@/components/Header";

export default function Footer({ onPick }: { onPick: (id: string) => void }) {
  const { setNotify, setSearchOpen, pushToast } = useShop();

  const goCollection = (id: string) => {
    onPick(id);
    window.setTimeout(() => scrollToId("shop"), 120);
  };

  const columns: { title: string; links: { label: string; onClick: () => void }[] }[] = [
    {
      title: "Shop",
      links: [
        { label: "All products", onClick: () => goCollection("all") },
        { label: "Collections", onClick: () => scrollToId("collections") },
        { label: "Bundles", onClick: () => scrollToId("bundle") },
        { label: "Best sellers", onClick: () => goCollection("best") },
        { label: "New products", onClick: () => goCollection("new") },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Our story", onClick: () => scrollToId("story") },
        { label: "How we create our products", onClick: () => scrollToId("story") },
        { label: "Stores we are in", onClick: () => scrollToId("stores") },
        { label: "Ingredients & sourcing", onClick: () => scrollToId("about") },
        { label: "Contact", onClick: () => pushToast({ title: "hello@izhar.com", sub: "We reply within one working day" }) },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { label: "Shipping", onClick: () => pushToast({ title: "Shipping", sub: "Free over $60 · dispatched in 24h" }) },
        { label: "Returns", onClick: () => pushToast({ title: "Returns", sub: "30 days, no receipt needed" }) },
        { label: "FAQ", onClick: () => pushToast({ title: "FAQ", sub: "Demo page — content coming soon" }) },
        { label: "Search", onClick: () => setSearchOpen(true) },
        {
          label: "Notify me",
          onClick: () => setNotify(PRODUCTS.find((p) => p.soldOut)!),
        },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left">
              <p className="display text-[30px] tracking-[0.3em] text-cream">IZHAR</p>
              <p className="label mt-2 text-cream/40">Organic · Raw · Vegan</p>
            </button>
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-cream/50">
              Nutritionally dense food, made closer to nature. Nine ingredients or fewer, never heated above 42°C,
              never any added sugar.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {SOCIALS.map((s) => {
                const Ico =
                  (
                    {
                      Instagram: Icon.Instagram,
                      TikTok: Icon.TikTok,
                      YouTube: Icon.YouTube,
                      Pinterest: Icon.Pinterest,
                      Substack: Icon.Substack,
                      Reddit: Icon.Reddit,
                    } as Record<string, (p: { className?: string }) => React.ReactElement>
                  )[s.name] ?? Icon.Instagram;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all duration-500 hover:border-cream hover:bg-cream hover:text-ink"
                  >
                    <Ico className="h-[17px] w-[17px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <p className="label text-cream/40">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={l.onClick}
                      className="group inline-flex items-center gap-2 text-left text-[13.5px] text-cream/70 transition-colors hover:text-cream"
                    >
                      {l.label}
                      <span className="h-px w-0 bg-cream transition-all duration-500 group-hover:w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="label text-cream/40">Social</p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[13.5px] text-cream/70 transition-colors hover:text-cream"
                  >
                    {s.name}
                    <Icon.ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-cream/40">© {new Date().getFullYear()} Izhar Organics. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Accessibility", "Cookie settings"].map((l) => (
              <button
                key={l}
                onClick={() => pushToast({ title: l, sub: "Demo link — no page attached" })}
                className="text-[12px] text-cream/40 transition-colors hover:text-cream"
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-cream/40">Designed as a front-end concept · Shopify-ready</p>
        </div>
      </div>
    </footer>
  );
}
