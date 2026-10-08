import { useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ Reveal */
export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h2";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error polymorphic ref
    <As ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", seen && "in", className)}>
      {children}
    </As>
  );
}

/* ------------------------------------------------------------------ Button */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  full?: boolean;
};

export function Btn({ variant = "solid", size = "md", full, className, children, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cn(
        "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] disabled:cursor-not-allowed disabled:opacity-40",
        size === "sm" && "px-4 py-2 text-[11px] tracking-[0.14em] uppercase",
        size === "md" && "px-6 py-3 text-[11px] tracking-[0.16em] uppercase",
        size === "lg" && "px-8 py-4 text-xs tracking-[0.18em] uppercase",
        variant === "solid" && "bg-espresso text-cream hover:bg-ink active:scale-[.985]",
        variant === "outline" &&
          "border border-espresso/25 text-espresso hover:border-espresso hover:bg-espresso hover:text-cream",
        variant === "light" && "border border-white/35 text-white backdrop-blur-sm hover:bg-white hover:text-ink",
        variant === "ghost" && "text-espresso/70 hover:text-espresso",
        full && "w-full",
        className,
      )}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ Qty */
export function Qty({
  value,
  onChange,
  tone = "light",
  compact,
}: {
  value: number;
  onChange: (n: number) => void;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border select-none",
        tone === "light" ? "border-espresso/15 bg-paper" : "border-white/25",
        compact ? "h-9" : "h-11",
      )}
    >
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className={cn(
          "grid h-full place-items-center rounded-l-full transition-colors hover:bg-espresso/5",
          compact ? "w-9" : "w-11",
        )}
      >
        <Icon.Minus className="h-3 w-3" />
      </button>
      <span className={cn("min-w-6 text-center text-sm tabular-nums", compact && "text-xs")}>{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(99, value + 1))}
        className={cn(
          "grid h-full place-items-center rounded-r-full transition-colors hover:bg-espresso/5",
          compact ? "w-9" : "w-11",
        )}
      >
        <Icon.Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ Flavors */
export function FlavorPicker({
  flavors,
  value,
  onChange,
  tone = "light",
}: {
  flavors: string[];
  value: string;
  onChange: (f: string) => void;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {flavors.map((f) => {
        const active = f === value;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[10.5px] tracking-[0.08em] transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)]",
              tone === "light"
                ? active
                  ? "border-espresso bg-espresso text-cream"
                  : "border-espresso/15 text-espresso/70 hover:border-espresso/45 hover:text-espresso"
                : active
                  ? "border-cream bg-cream text-ink"
                  : "border-white/25 text-white/70 hover:border-white/60 hover:text-white",
            )}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ Section heading */
export function SectionKicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("label flex items-center gap-3 text-stone", className)}>
      <span className="h-px w-8 bg-current opacity-40" />
      {children}
    </div>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon.Star key={i} className={cn("h-3 w-3", i < Math.round(rating) ? "opacity-100" : "opacity-25")} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ Icons */
const s = (p: { className?: string; children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={p.className}
    aria-hidden="true"
  >
    {p.children}
  </svg>
);

export const Icon = {
  Search: (p: { className?: string }) =>
    s({ ...p, children: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></> }),
  Bag: (p: { className?: string }) =>
    s({
      ...p,
      children: (
        <>
          <path d="M4.5 8h15l-1 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9Z" />
          <path d="M8.75 10.5V6.75a3.25 3.25 0 0 1 6.5 0v3.75" />
        </>
      ),
    }),
  User: (p: { className?: string }) =>
    s({ ...p, children: <><circle cx="12" cy="8.5" r="3.6" /><path d="M4.8 20.2c1.3-3.6 4-5.4 7.2-5.4s5.9 1.8 7.2 5.4" /></> }),
  Menu: (p: { className?: string }) => s({ ...p, children: <><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h12" /></> }),
  Close: (p: { className?: string }) => s({ ...p, children: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></> }),
  Plus: (p: { className?: string }) => s({ ...p, children: <><path d="M12 5v14" /><path d="M5 12h14" /></> }),
  Minus: (p: { className?: string }) => s({ ...p, children: <path d="M5 12h14" /> }),
  Arrow: (p: { className?: string }) => s({ ...p, children: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></> }),
  ArrowUpRight: (p: { className?: string }) => s({ ...p, children: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></> }),
  Check: (p: { className?: string }) => s({ ...p, children: <path d="m4.5 12.5 5 5 10-11" /> }),
  Chevron: (p: { className?: string }) => s({ ...p, children: <path d="m6 9 6 6 6-6" /> }),
  Pin: (p: { className?: string }) =>
    s({ ...p, children: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></> }),
  Star: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden="true">
      <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9Z" />
    </svg>
  ),
  Leaf: (p: { className?: string }) =>
    s({ ...p, children: <><path d="M5 19c0-8 5.5-13 15-13 0 9.5-5 14-12 14H5Z" /><path d="M5 19c3.5-4 7-6.5 11-8.5" /></> }),
  Truck: (p: { className?: string }) =>
    s({
      ...p,
      children: (
        <>
          <path d="M2.5 16.5V6.5h11v10" />
          <path d="M13.5 9.5h4l3.5 3.5v3.5h-7.5" />
          <circle cx="7" cy="17.5" r="1.9" />
          <circle cx="17" cy="17.5" r="1.9" />
        </>
      ),
    }),
  Eye: (p: { className?: string }) =>
    s({ ...p, children: <><path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.6" /></> }),
  Mail: (p: { className?: string }) =>
    s({ ...p, children: <><rect x="2.8" y="5.5" width="18.4" height="13" rx="2" /><path d="m3.5 7 8.5 6.2L20.5 7" /></> }),
  Bell: (p: { className?: string }) =>
    s({ ...p, children: <><path d="M18 16.5H6l1.3-2.2V10a4.7 4.7 0 0 1 9.4 0v4.3Z" /><path d="M10.3 19.5a1.9 1.9 0 0 0 3.4 0" /></> }),
  Instagram: (p: { className?: string }) =>
    s({ ...p, children: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.7" fill="currentColor" /></> }),
  TikTok: (p: { className?: string }) =>
    s({ ...p, children: <><path d="M14.5 3.5v10.9a3.6 3.6 0 1 1-3-3.55" /><path d="M14.5 5.2c.7 2 2.3 3.2 4.6 3.4" /></> }),
  YouTube: (p: { className?: string }) =>
    s({ ...p, children: <><rect x="2.8" y="5.8" width="18.4" height="12.4" rx="4" /><path d="m10.4 9.6 5 2.4-5 2.4Z" /></> }),
  Pinterest: (p: { className?: string }) =>
    s({ ...p, children: <><circle cx="12" cy="12" r="8.8" /><path d="M11.2 15.4 9.4 21" /><path d="M9.6 14.4c-.8-1.9-.3-4.6 2.2-5.4 2-.6 3.9.4 4.2 2.3.3 2.1-.8 4.2-2.7 4.2-1 0-1.7-.7-1.5-1.6" /></> }),
  Substack: (p: { className?: string }) =>
    s({ ...p, children: <><path d="M5 5.5h14" /><path d="M5 9.8h14" /><path d="M5 14v6l7-3.4L19 20v-6Z" /></> }),
  Reddit: (p: { className?: string }) =>
    s({
      ...p,
      children: (
        <>
          <circle cx="12" cy="13.2" r="7.2" />
          <circle cx="19.4" cy="5.6" r="1.5" />
          <path d="M13.2 6.2 14.6 3l3.6 1.2" />
          <path d="M9.4 13.4h.02M14.6 13.4h.02" strokeWidth="2.2" />
          <path d="M9.4 16.4c1.6 1.1 3.6 1.1 5.2 0" />
        </>
      ),
    }),
};
