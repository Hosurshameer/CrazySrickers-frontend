import React from 'react'

import PageTltle from './PageTltle'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Customize() {
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
  const img = localStorage.getItem("capturedImage");
  if (img) {
    setCapturedImage(img);
  }
}, []);

  const actionButtonClass =
    "inline-flex w-full items-center justify-center rounded-2xl border border-primary/20 bg-primary px-5 py-3 text-base font-primary font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md dark:border-primary/30 dark:bg-primary dark:text-black";

  return (
    <>
      <PageTltle title="Pick your choice" />
      <div className="min-h-[70vh] bg-normalbg px-4 py-10 dark:bg-black">
        <div className="mx-auto flex max-w-5xl items-center justify-center">
          <div className="grid w-full max-w-4xl overflow-hidden rounded-[32px] border border-primary/15 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-primary/20 dark:bg-gray-900 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center bg-gradient-to-br from-primary/10 via-white to-yellow-50 p-8 dark:from-primary/15 dark:via-gray-900 dark:to-black sm:p-10">
              <span className="mb-4 w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary dark:bg-primary/20">
                Custom Sticker Studio
              </span>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
                Start building your perfect sticker design
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
                Choose how you want to begin. Upload an existing photo or open
                your camera to capture something fresh.
              </p>
            </div>

            <div className="flex items-center p-6 sm:p-8">
              <div className="w-full rounded-3xl bg-gray-50 p-6 shadow-inner dark:bg-gray-800/80">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Choose an action
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  Pick one of the options below to continue customizing your
                  design.
                </p>

                <div className="mt-6 space-y-4">
                  <NavLink to="/upload" className={actionButtonClass}>Upload image</NavLink>
                  <NavLink to="/capture" className={actionButtonClass}>
                    Capture image
                  </NavLink>
                </div>
                {capturedImage && (
  <div className="mt-4">
    <img
      src={capturedImage}
      alt="Captured"
      className="w-40 rounded-lg"
    />
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
