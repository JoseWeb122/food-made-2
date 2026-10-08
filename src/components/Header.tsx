import { useEffect, useState } from "react";
import { useShop } from "@/store/shop";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";

export const NAV = [
  { label: "Shop", id: "shop" },
  { label: "Collections", id: "collections" },
  { label: "Stores We're In", id: "stores" },
  { label: "Bundles", id: "bundle" },
  { label: "Our Story", id: "story" },
  { label: "About", id: "about" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Header() {
  const { count, setCartOpen, setSearchOpen, menuOpen, setMenuOpen, pushToast } = useShop();
  const [p, setP] = useState(0); // 0 → 1 scroll progress over first 320px
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setP(Math.min(1, window.scrollY / 260));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 450);
    return () => window.clearTimeout(t);
  }, [count]);

  const solid = p > 0.5;

  const go = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToId(id), menuOpen ? 220 : 0);
  };

  return (
    <>
      {/* announcement */}
      <div
        className="fixed inset-x-0 top-0 z-50 overflow-hidden bg-espresso text-cream transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ height: `${(1 - p) * 34}px`, opacity: 1 - p }}
      >
        <div className="flex h-[34px] items-center justify-center gap-6 px-4">
          <p className="label truncate opacity-85">Complimentary shipping over $60 · Ships within 24h</p>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          solid ? "border-b border-espresso/8" : "border-b border-transparent",
        )}
        style={{
          top: `${(1 - p) * 34}px`,
          backgroundColor: `rgba(251,249,244,${p * 0.82})`,
          backdropFilter: p > 0.12 ? `blur(${14 * p}px) saturate(140%)` : "none",
          WebkitBackdropFilter: p > 0.12 ? `blur(${14 * p}px) saturate(140%)` : "none",
        }}
      >
        <div
          className="mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:px-10"
          style={{ height: `${86 - p * 26}px` }}
        >
          {/* left: mobile menu / desktop nav */}
          <div className="flex flex-1 items-center gap-7">
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="-ml-1 p-1 text-espresso transition-colors lg:hidden"
            >
              <Icon.Menu className="h-5 w-5" />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {NAV.slice(0, 3).map((n) => (
                <NavLink key={n.id} solid={solid} onClick={() => go(n.id)}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex shrink-0 flex-col items-center text-espresso transition-colors duration-500"
          >
            <span
              className="display leading-none transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ fontSize: `${26 - p * 5}px`, letterSpacing: `${0.34 - p * 0.1}em`, paddingLeft: "0.3em" }}
            >
              IZHAR
            </span>
            <span
              className="overflow-hidden text-[8.5px] tracking-[0.42em] uppercase transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ height: `${(1 - p) * 15}px`, opacity: 1 - p, paddingLeft: "0.42em" }}
            >
              Organic
            </span>
          </button>

          {/* right */}
          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="hidden items-center gap-7 lg:flex">
              {NAV.slice(3).map((n) => (
                <NavLink key={n.id} solid={solid} onClick={() => go(n.id)}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-1 text-espresso transition-colors">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2 transition-all duration-400 hover:scale-110"
              >
                <Icon.Search className="h-[18px] w-[18px]" />
              </button>
              <button
                aria-label="Account"
                onClick={() => pushToast({ title: "Account", sub: "Sign-in is disabled in this preview" })}
                className="hidden rounded-full p-2 transition-all duration-400 hover:scale-110 sm:block"
              >
                <Icon.User className="h-[18px] w-[18px]" />
              </button>
              <button
                aria-label="Open bag"
                onClick={() => setCartOpen(true)}
                className="relative rounded-full p-2 transition-all duration-400 hover:scale-110"
              >
                <Icon.Bag className="h-[18px] w-[18px]" />
                <span
                  className={cn(
                    "absolute top-0 right-0 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-espresso px-1 text-[9.5px] font-medium text-cream transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                    count ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    bump && "scale-125",
                  )}
                >
                  {count}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} go={go} />
    </>
  );
}

function NavLink({
  children,
  onClick,
  solid,
}: {
  children: React.ReactNode;
  onClick: () => void;
  solid: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative py-1 text-[12.5px] font-medium tracking-[0.02em] transition-colors duration-500",
        solid ? "text-espresso/75 hover:text-espresso" : "text-espresso/80 hover:text-espresso",
      )}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
    </button>
  );
}

function MobileMenu({ open, onClose, go }: { open: boolean; onClose: () => void; go: (id: string) => void }) {
  const { setSearchOpen } = useShop();
  return (
    <div className={cn("fixed inset-0 z-[70] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        className={cn(
          "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <span className="display text-[20px] tracking-[0.3em]">IZHAR</span>
          <button aria-label="Close menu" onClick={onClose} className="p-2">
            <Icon.Close className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          {NAV.map((n, i) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              style={{ transitionDelay: `${open ? 120 + i * 55 : 0}ms` }}
              className={cn(
                "group flex w-full items-center justify-between border-b border-espresso/8 py-5 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              <span className="display text-[30px] text-espresso">{n.label}</span>
              <Icon.Arrow className="h-4 w-4 text-stone transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          ))}
          <button
            onClick={() => {
              onClose();
              window.setTimeout(() => setSearchOpen(true), 260);
            }}
            className="mt-8 flex w-full items-center gap-3 rounded-full border border-espresso/15 px-5 py-3.5 text-left text-sm text-stone"
          >
            <Icon.Search className="h-4 w-4" /> Search the shop
          </button>
        </nav>
        <div className="border-t border-espresso/10 px-6 py-6">
          <p className="label text-stone">Organic · Raw · Vegan</p>
          <p className="mt-2 text-xs leading-relaxed text-stone">
            Free shipping over $60. Shipped from our atelier within 24 hours.
          </p>
        </div>
      </aside>
    </div>
  );
}
