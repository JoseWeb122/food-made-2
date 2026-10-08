import { useEffect, useState } from "react";
import { useShop } from "@/store/shop";
import { Icon } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function NotifyModal() {
  const { notify: p, setNotify } = useShop();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    if (p) {
      setEmail("");
      setState("idle");
    }
  }, [p]);

  const open = !!p;
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setState("sending");
    window.setTimeout(() => setState("done"), 1100);
  };

  return (
    <div className={cn("fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6", !open && "pointer-events-none")}>
      <div
        onClick={() => setNotify(null)}
        className={cn("absolute inset-0 bg-ink/55 backdrop-blur-[3px] transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
      />
      <div
        className={cn(
          "relative w-full max-w-md overflow-hidden bg-cream transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-10 opacity-0 sm:scale-95",
        )}
      >
        {p && (
          <>
            <button
              onClick={() => setNotify(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper/80 text-espresso backdrop-blur transition-colors hover:bg-espresso hover:text-cream"
            >
              <Icon.Close className="h-4 w-4" />
            </button>
            <div className="h-40 overflow-hidden bg-ivory sm:h-48">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover grayscale-[25%]" />
            </div>
            <div className="p-7">
              {state === "done" ? (
                <div className="pop-in text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss text-cream">
                    <Icon.Check className="h-6 w-6" />
                  </span>
                  <h3 className="display mt-5 text-[26px] text-espresso">You're on the list</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-stone">
                    We'll email <span className="text-espresso">{email}</span> the moment {p.name} returns — usually
                    within three weeks.
                  </p>
                  <button
                    onClick={() => setNotify(null)}
                    className="mt-6 rounded-full border border-espresso/20 px-7 py-3 text-[11px] tracking-[0.16em] text-espresso uppercase transition-colors hover:bg-espresso hover:text-cream"
                  >
                    Keep shopping
                  </button>
                </div>
              ) : (
                <>
                  <p className="label text-stone">Currently sold out</p>
                  <h3 className="display mt-3 text-[28px] text-espresso">
                    Be the <span className="ital">first to know.</span>
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-stone">
                    {p.name} is made in batches of ninety. Leave your email and we'll reserve you a place in the next
                    run.
                  </p>
                  <form onSubmit={submit} className="mt-6 space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-full border border-espresso/15 bg-paper px-5 py-3.5 text-[14px] text-espresso outline-none transition-colors placeholder:text-stone/70 focus:border-espresso"
                    />
                    <button
                      type="submit"
                      disabled={!valid || state === "sending"}
                      className="w-full rounded-full bg-espresso py-3.5 text-[11px] tracking-[0.18em] text-cream uppercase transition-all hover:bg-ink disabled:opacity-40"
                    >
                      {state === "sending" ? "Adding you…" : "Notify Me"}
                    </button>
                  </form>
                  <p className="mt-4 text-center text-[11px] text-stone">One email. No marketing. Unsubscribe anytime.</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
