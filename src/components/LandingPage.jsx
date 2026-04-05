import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-normalbg dark:bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,105,137,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,196,61,0.18),_transparent_28%)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur dark:bg-white/5 dark:text-light">
            Premium custom sticker experience
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Turn your ideas into stickers people remember.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Discover playful, bold, and expressive sticker designs for laptops,
            journals, gifts, and personal collections all in one clean
            storefront.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/home"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-4 text-lg font-bold text-white shadow-[0_16px_40px_rgba(0,105,137,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-dark"
            >
              Explore Stickers
            </Link>
            <Link
              to="/customize"
              className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-white px-7 py-4 text-lg font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 dark:bg-white/5 dark:text-light"
            >
              Create Your Own
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl font-black text-primary">500+</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Sticker styles across fun themes
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl font-black text-primary">Fast</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Smooth browsing with quick checkout
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl font-black text-primary">Custom</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Build stickers from your own ideas
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 h-24 w-24 rounded-3xl bg-yellow-300/50 blur-2xl dark:bg-yellow-200/20" />
          <div className="absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-primary/30 blur-3xl" />

          <div className="relative rounded-[36px] border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-gradient-to-br from-primary via-dark to-slate-900 p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                  Featured Pack
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight">
                  Crazy Cute
                  <br />
                  Collection
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  Bright, modern sticker sets made for creators who want
                  personality on every surface.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-sm font-semibold text-primary">
                    What you can explore
                  </p>
                  <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <li>Anime, quotes, gaming, and aesthetic themes</li>
                    <li>Gift-friendly packs and collectible drops</li>
                    <li>Clean product browsing with easy discovery</li>
                  </ul>
                </div>

                <div className="rounded-[28px] bg-yellow-100 p-5 text-slate-900 dark:bg-yellow-200/90">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                    New
                  </p>
                  <p className="mt-2 text-2xl font-black">
                    Start with one click.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Open the store, browse the latest designs, and pick the
                    stickers that match your vibe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
