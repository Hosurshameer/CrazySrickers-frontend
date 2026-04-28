import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PageTltle from "./PageTltle";

const previewNotes = [
  "Clean sticker framing with a bold presentation.",
  "Ready to review before you continue editing or sharing.",
  "Designed to feel like a finished reveal, not just an image dump.",
];

export default function DisplaySticker() {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;
  const hasImage = Boolean(imageUrl);

  return (
    <>
      <PageTltle title="Sticker Reveal" />

      <div className="relative min-h-[70vh] overflow-hidden px-4 pb-12 pt-6">
        <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-52 max-w-4xl rounded-full bg-[radial-gradient(circle,_rgba(0,146,184,0.24),_transparent_68%)] blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-28 h-44 w-44 rounded-full bg-primary/12 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="glass-panel rounded-[32px] p-7 md:p-8">
            <span className="inline-flex w-fit rounded-full border border-primary/15 bg-white/70 px-4 py-1 text-sm font-semibold tracking-[0.2em] text-primary uppercase dark:border-primary/25 dark:bg-gray-900/70">
              Final Preview
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 dark:text-white sm:text-4xl">
              Your sticker is ready for the spotlight
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
              This screen gives your sticker a more polished reveal, with a
              cleaner preview area and stronger action buttons so the result
              feels like a real design moment.
            </p>

            <div className="mt-8 grid gap-3">
              {previewNotes.map((note) => (
                <div
                  key={note}
                  className="flex items-start gap-3 rounded-2xl border border-primary/12 bg-white/65 px-4 py-3 shadow-[0_12px_28px_rgba(15,23,42,0.06)] dark:border-primary/20 dark:bg-gray-900/70"
                >
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold tracking-wide text-white">
                    OK
                  </span>
                  <p className="text-sm leading-6 text-gray-700 dark:text-gray-200">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/50 bg-white/70 px-4 py-5 text-center shadow-[0_18px_38px_rgba(15,23,42,0.08)] dark:border-primary/15 dark:bg-gray-900/75">
                <p className="text-2xl font-black text-primary">01</p>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Upload
                </p>
              </div>
              <div className="rounded-3xl border border-white/50 bg-white/70 px-4 py-5 text-center shadow-[0_18px_38px_rgba(15,23,42,0.08)] dark:border-primary/15 dark:bg-gray-900/75">
                <p className="text-2xl font-black text-primary">02</p>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Style
                </p>
              </div>
              <div className="rounded-3xl border border-white/50 bg-white/70 px-4 py-5 text-center shadow-[0_18px_38px_rgba(15,23,42,0.08)] dark:border-primary/15 dark:bg-gray-900/75">
                <p className="text-2xl font-black text-primary">03</p>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Reveal
                </p>
              </div>
            </div>

          </section>

          <section className="relative overflow-hidden rounded-[32px] border border-primary/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(232,244,248,0.92))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.12)] dark:border-primary/20 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.95),rgba(7,16,28,0.95))] sm:p-7">
            <div className="pointer-events-none absolute -right-10 top-6 h-24 w-24 rounded-full border border-primary/15 bg-primary/10 blur-xl" />
            <div className="pointer-events-none absolute -left-12 bottom-6 h-28 w-28 rounded-full bg-yellow-200/35 blur-2xl dark:bg-primary/15" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.22em] text-primary uppercase">
                  Preview Card
                </p>
                <h3 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                  Your Sticker
                </h3>
              </div>

              {hasImage && (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold tracking-[0.18em] text-emerald-700 uppercase dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-200">
                  Ready
                </span>
              )}
            </div>

            <div className="relative mt-6 rounded-[28px] border border-white/70 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(232,244,248,0.82))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_20px_45px_rgba(15,23,42,0.08)] dark:border-primary/20 dark:bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.96),rgba(15,23,42,0.88))] sm:p-5">
              <div className="rounded-[24px] border border-dashed border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,250,252,0.78))] p-4 dark:border-primary/25 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(15,23,42,0.82))]">
                {hasImage ? (
                  <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(0,105,137,0.14),rgba(255,255,255,0.8),rgba(255,214,102,0.26))] p-3 shadow-[0_18px_45px_rgba(0,105,137,0.18)]">
                    <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-primary uppercase backdrop-blur-sm dark:border-primary/20 dark:bg-slate-900/75">
                      Showcase
                    </div>
                    <img
                      src={imageUrl}
                      alt="Generated sticker"
                      className="max-h-[520px] w-full rounded-[18px] object-contain bg-white/70 dark:bg-slate-950/40"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[22px] border border-dashed border-primary/20 bg-white/65 px-6 py-10 text-center dark:border-primary/25 dark:bg-slate-900/50">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                      !
                    </div>
                    <h4 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                      No sticker preview found
                    </h4>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-300">
                      Upload or generate an image first, then come back here to
                      see the final sticker presentation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to="/upload"
                state={{imageUrl}}
                className="glass-button inline-flex items-center justify-center"
              >
                Back to upload
              </NavLink>

              {hasImage ? (
                <a
                  href={imageUrl}
                  download="sticker-preview"
                  className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-white/80 px-5 py-3 text-base font-semibold text-primary shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/45 dark:border-primary/25 dark:bg-gray-900/85 dark:text-light"
                >
                  Download preview
                </a>
              ) : (
                <NavLink
                  to="/customize"
                  className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-white/80 px-5 py-3 text-base font-semibold text-primary shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/45 dark:border-primary/25 dark:bg-gray-900/85 dark:text-light"
                >
                  Choose a source
                </NavLink>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
