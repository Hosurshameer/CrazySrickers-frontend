import EntryBrandC from "./EntryBrandC";

export default function EntrySplash({ showText = true, leaving = false }) {
  return (
    <div
      className={[
        "fixed inset-0 z-[9999]",
        "transition-opacity duration-700 ease-out",
        leaving ? "opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden={leaving ? "true" : "false"}
    >
      <div
        className={[
          "absolute inset-0 entry-netflix-bg",
          leaving ? "entry-netflix-leave" : "entry-netflix-enter",
        ].join(" ")}
      />
      <div className="absolute inset-0 entry-netflix-vignette" />
      <div className="absolute inset-x-0 bottom-0 h-[28vh] entry-netflix-floor" />

      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 px-6">
          <div className={["entry-netflix-shell", leaving ? "entry-netflix-shell-leaving" : ""].join(" ")}>
            <div className="entry-netflix-aura" />
            <div className="entry-netflix-beam" />
            <EntryBrandC className="entry-netflix-mark w-[240px] max-w-[76vw] md:w-[340px]" />
          </div>
          {showText ? (
            <p className="entry-netflix-copy text-lg font-semibold uppercase tracking-[0.35em] text-light">
              Crazy Stickers
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
