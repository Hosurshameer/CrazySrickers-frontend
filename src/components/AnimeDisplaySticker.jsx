import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import PageTltle from "./PageTltle";
import apiClient from "../api/apiClient";

const steps = [
  "Source image selected and ready for processing.",
  "Add a prompt to describe how the anime sticker should look.",
  "Generate becomes available only when image and prompt are both ready.",
];

function normalizeAnimeSticker(data) {
  if (typeof data === "string") {
    return { imageUrl: data };
  }

  if (data?.imageUrl) {
    return data;
  }

  if (data?.url) {
    return { ...data, imageUrl: data.url };
  }

  return null;
}

async function createFileFromImageUrl(sourceImageUrl) {
  const response = await fetch(sourceImageUrl);
  const blob = await response.blob();
  const extension = blob.type?.split("/")[1] || "jpg";

  return new File([blob], `anime-source.${extension}`, {
    type: blob.type || "image/jpeg",
  });
}

export default function AnimeDisplaySticker() {
  const location = useLocation();
  const sourceImageUrl =
    location.state?.sourceImageUrl || location.state?.imageUrl || null;
  const sourceFile = location.state?.file || null;
  const initialAnimeSticker = normalizeAnimeSticker(location.state?.animeSticker);

  const [animeSticker, setAnimeSticker] = useState(initialAnimeSticker);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasSourceImage = Boolean(sourceImageUrl);
  const hasAnimeSticker = Boolean(animeSticker?.imageUrl);
  const hasPrompt = Boolean(prompt.trim());
  const canGenerate = Boolean((sourceFile || hasSourceImage) && hasPrompt && !isLoading);

  const handleGenerateClick = async () => {
    if (!canGenerate) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setAnimeSticker(null);

    try {
      const uploadFile = sourceFile || (await createFileFromImageUrl(sourceImageUrl));
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("prompt", prompt.trim());

      const response = await apiClient.post("/anime", formData);
      const normalizedSticker = normalizeAnimeSticker(response.data);

      if (!normalizedSticker?.imageUrl) {
        throw new Error("Anime sticker preview was not returned.");
      }

      setAnimeSticker(normalizedSticker);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errorMessage ||
          error.message ||
          "Something went wrong while generating the anime sticker."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTltle title="Anime Sticker Reveal" />

      <div className="min-h-[70vh] px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="glass-panel rounded-[32px] p-7 md:p-8">
            <span className="inline-flex w-fit rounded-full border border-primary/15 bg-white/70 px-4 py-1 text-sm font-semibold tracking-[0.2em] text-primary uppercase dark:border-primary/25 dark:bg-gray-900/70">
              Anime Flow
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 dark:text-white sm:text-4xl">
              Your animated sticker is being prepared
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
              This screen now owns the anime sticker generation flow. Add a
              prompt for the style you want, then generate the AI result from
              your selected image.
            </p>

            <div className="mt-8 grid gap-3">
              {steps.map((step) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border border-primary/12 bg-white/65 px-4 py-3 shadow-[0_12px_28px_rgba(15,23,42,0.06)] dark:border-primary/20 dark:bg-gray-900/70"
                >
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold tracking-wide text-white">
                    AI
                  </span>
                  <p className="text-sm leading-6 text-gray-700 dark:text-gray-200">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <label
                htmlFor="anime-prompt"
                className="mb-3 block text-sm font-semibold tracking-[0.16em] text-primary uppercase"
              >
                Prompt
              </label>
              <textarea
                id="anime-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Example: convert this into a bright anime sticker with expressive eyes and a clean outline"
                rows={5}
                className="w-full rounded-[24px] border border-primary/20 bg-white/80 px-4 py-3 text-sm text-gray-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)] outline-none transition focus:border-primary/45 dark:border-primary/25 dark:bg-gray-900/80 dark:text-gray-200"
              />
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                Enter a prompt and keep an image selected to enable generation.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to="/upload"
                state={hasSourceImage ? { imageUrl: sourceImageUrl } : undefined}
                className="glass-button inline-flex items-center justify-center"
              >
                Back to upload
              </NavLink>

              <button
                type="button"
                onClick={handleGenerateClick}
                disabled={!canGenerate}
                className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-primary px-5 py-3 text-base font-semibold text-white shadow-[0_16px_34px_rgba(0,105,137,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-primary/10 disabled:bg-primary/40"
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>

              <button
                type="button"
                disabled={!hasAnimeSticker}
                aria-label="Add to Cart"
                className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-primary px-5 py-3 text-base font-semibold text-white shadow-[0_16px_34px_rgba(0,105,137,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-primary/10 disabled:bg-primary/40"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>

              {hasAnimeSticker && (
                <a
                  href={animeSticker.imageUrl}
                  download="anime-sticker-preview"
                  className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-white/80 px-5 py-3 text-base font-semibold text-primary shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/45 dark:border-primary/25 dark:bg-gray-900/85 dark:text-light"
                >
                  Download anime sticker
                </a>
              )}
            </div>
          </section>

          <section className="rounded-[32px] border border-primary/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(232,244,248,0.92))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.12)] dark:border-primary/20 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.95),rgba(7,16,28,0.95))] sm:p-7">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[28px] border border-primary/15 bg-white/70 p-4 dark:bg-slate-900/70">
                <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                  Source
                </p>
                <div className="mt-4">
                  {hasSourceImage ? (
                    <img
                      src={sourceImageUrl}
                      alt="Selected source"
                      className="h-72 w-full rounded-[22px] object-cover"
                    />
                  ) : (
                    <div className="flex h-72 items-center justify-center rounded-[22px] border border-dashed border-primary/20 px-6 text-center text-sm text-gray-600 dark:text-gray-300">
                      No source image was passed to the anime sticker screen.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] border border-primary/15 bg-white/70 p-4 dark:bg-slate-900/70">
                <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                  Anime Result
                </p>
                <div className="mt-4">
                  {isLoading ? (
                    <div className="flex h-72 flex-col items-center justify-center rounded-[22px] border border-dashed border-primary/20 px-6 text-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                      <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Generating your anime sticker...
                      </p>
                    </div>
                  ) : hasAnimeSticker ? (
                    <img
                      src={animeSticker.imageUrl}
                      alt="Anime sticker preview"
                      className="h-72 w-full rounded-[22px] object-cover"
                    />
                  ) : (
                    <div className="flex h-72 items-center justify-center rounded-[22px] border border-dashed border-primary/20 px-6 text-center text-sm text-gray-600 dark:text-gray-300">
                      {errorMessage ||
                        "Add a prompt, then click Generate to create the anime sticker preview."}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {errorMessage && !isLoading && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200">
                {errorMessage}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
