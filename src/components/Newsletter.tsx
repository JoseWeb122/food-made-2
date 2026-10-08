import { useState } from "react";
import { IMG } from "@/data/catalog";
import { Icon, Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setState("sending");
    window.setTimeout(() => setState("done"), 1100);
  };

  return (
    <section id="newsletter" className="relative overflow-hidden bg-espresso py-20 text-cream md:py-28">
      <img
        src={IMG.hero}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-espresso/60" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="label text-cream/50">The Izhar Letter</p>
            <h2 className="display mt-5 text-[clamp(2.3rem,6vw,4.2rem)] text-cream">
              Good things, <span className="ital">delivered.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/60">
              One considered email a fortnight: new releases before they go live, raw recipes from the atelier,
              nutrition notes from our in-house team, the stories behind our growers, and quiet offers reserved for
              subscribers.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <div className="lg:pt-16">
              {state === "done" ? (
                <div className="pop-in border border-cream/15 bg-cream/5 p-8 backdrop-blur-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cream text-espresso">
                    <Icon.Check className="h-5 w-5" />
                  </span>
                  <h3 className="display mt-5 text-[26px] text-cream">Welcome to the table</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-cream/60">
                    Check <span className="text-cream">{email}</span> — a confirmation and a 10% welcome code are on
                    their way.
                  </p>
                  <button
                    onClick={() => {
                      setState("idle");
                      setEmail("");
                    }}
                    className="mt-6 text-[11px] tracking-[0.16em] text-cream/60 uppercase underline-offset-4 hover:text-cream hover:underline"
                  >
                    Subscribe another address
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 items-center gap-3 border-b border-cream/25 pb-3 transition-colors focus-within:border-cream">
                      <Icon.Mail className="h-4 w-4 shrink-0 text-cream/50" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent text-[15px] text-cream outline-none placeholder:text-cream/40"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!valid || state === "sending"}
                      className={cn(
                        "shrink-0 rounded-full px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase transition-all duration-500",
                        valid ? "bg-cream text-espresso hover:bg-white" : "bg-cream/20 text-cream/50",
                      )}
                    >
                      {state === "sending" ? "Subscribing…" : "Subscribe"}
                    </button>
                  </div>
                  <p className="mt-4 text-[11.5px] text-cream/40">
                    By subscribing you agree to our privacy policy. Unsubscribe in one click, anytime.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
