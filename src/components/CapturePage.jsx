import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import PageTltle from "./PageTltle";
import CameraCapture from "../components/CameraCapture";

export default function CapturePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleDone = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      localStorage.setItem("capturedImage", imageUrl);
      navigate("/upload");
    }
  };

  return (
    <>
      <PageTltle title="Capture your image" />
      <div className="min-h-[70vh] px-4 py-10">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-[32px] border border-primary/15 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-primary/20 dark:bg-gray-900/85 md:grid-cols-[0.95fr_1.05fr] md:p-8">
          <div className="flex flex-col justify-center rounded-[28px] bg-gradient-to-br from-primary/10 via-white to-yellow-50 p-8 dark:from-primary/15 dark:via-gray-900 dark:to-black">
            <span className="mb-4 w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary dark:bg-primary/20">
              Live Camera
            </span>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
              Capture a fresh image for your sticker design
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
              Use your camera to snap a photo, review the preview, and continue
              to the same upload workflow you already use.
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-gray-800/70">
                Keep the subject centered for the best sticker crop.
              </p>
              <p className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-gray-800/70">
                You can retake the shot before moving to the next step.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-gray-50 p-6 shadow-inner dark:bg-gray-800/80">
            <div className="mb-4 flex justify-end">
              <NavLink
                to="/customize"
                className="rounded-2xl border border-primary/25 bg-white px-4 py-2 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 dark:bg-gray-900 dark:text-light"
              >
                Back to customize
              </NavLink>
            </div>
            <CameraCapture setFile={setFile} />

            {file && (
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Image captured successfully.
                </p>
                <button
                  onClick={handleDone}
                  className="rounded-2xl bg-primary px-5 py-3 text-base font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Use this image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
