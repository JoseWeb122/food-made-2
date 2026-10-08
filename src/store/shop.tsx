import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/data/catalog";

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  flavor: string;
  image: string;
  price: number;
  compareAt?: number;
  qty: number;
  meta?: string;
  isBundle?: boolean;
  savings?: number;
};

type Toast = { id: number; title: string; sub?: string; image?: string };

type ShopCtx = {
  cart: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  add: (p: Product, flavor: string, qty?: number) => void;
  addBundle: (args: { name: string; items: string; price: number; compareAt: number; image: string }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;

  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  detail: Product | null;
  setDetail: (p: Product | null) => void;
  notify: Product | null;
  setNotify: (p: Product | null) => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
};

const Ctx = createContext<ShopCtx | null>(null);

export const useShop = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShop must be used within ShopProvider");
  return v;
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  const [notify, setNotify] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { ...t, id }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3200);
  }, []);

  const add: ShopCtx["add"] = useCallback(
    (p, flavor, qty = 1) => {
      const key = `${p.id}__${flavor}`;
      setCart((prev) => {
        const found = prev.find((l) => l.key === key);
        if (found) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
        return [
          ...prev,
          {
            key,
            productId: p.id,
            name: p.name,
            flavor,
            image: p.image,
            price: p.price,
            compareAt: p.compareAt,
            qty,
            meta: p.weight,
          },
        ];
      });
      pushToast({ title: "Added to bag", sub: `${p.name} · ${flavor}`, image: p.image });
    },
    [pushToast],
  );

  const addBundle: ShopCtx["addBundle"] = useCallback(
    ({ name, items, price, compareAt, image }) => {
      const key = `bundle__${Date.now()}`;
      setCart((prev) => [
        ...prev,
        {
          key,
          productId: "bundle",
          name,
          flavor: "Custom bundle",
          image,
          price,
          compareAt,
          qty: 1,
          meta: items,
          isBundle: true,
          savings: Math.max(0, compareAt - price),
        },
      ]);
      pushToast({ title: "Bundle added", sub: `${name} · saved $${(compareAt - price).toFixed(2)}`, image });
    },
    [pushToast],
  );

  const setQty: ShopCtx["setQty"] = useCallback((key, qty) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setCart((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setCart([]), []);

  const count = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((n, l) => n + l.qty * l.price, 0), [cart]);
  const savings = useMemo(
    () => cart.reduce((n, l) => n + (l.compareAt ? (l.compareAt - l.price) * l.qty : 0), 0),
    [cart],
  );

  // lock body scroll when an overlay is open
  const locked = cartOpen || searchOpen || menuOpen || !!quickView || !!detail || !!notify;
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setCartOpen(false);
      setSearchOpen(false);
      setMenuOpen(false);
      setQuickView(null);
      setNotify(null);
      setDetail(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value: ShopCtx = {
    cart,
    count,
    subtotal,
    savings,
    add,
    addBundle,
    setQty,
    remove,
    clear,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    menuOpen,
    setMenuOpen,
    quickView,
    setQuickView,
    detail,
    setDetail,
    notify,
    setNotify,
    toasts,
    pushToast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
