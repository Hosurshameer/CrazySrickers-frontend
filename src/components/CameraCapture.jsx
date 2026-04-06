import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function CameraCapture({ setFile }) {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    // Convert base64 → file (important)
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "captured.jpg", {
          type: "image/jpeg",
        });
        setFile(file);
      });
  };

  const retake = () => {
    setImage(null);
    setFile(null);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Camera preview
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          Capture a photo and review it before continuing.
        </p>
      </div>

      {!image ? (
        <>
          <div className="overflow-hidden rounded-[28px] border border-primary/15 bg-black shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="h-[360px] w-full object-cover"
              videoConstraints={{ facingMode: "user" }}
            />
          </div>
          <button
            onClick={capture}
            className="mt-5 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Capture
          </button>
        </>
      ) : (
        <>
          <div className="overflow-hidden rounded-[28px] border border-primary/15 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] dark:bg-gray-900">
            <img
              src={image}
              alt="preview"
              className="h-[360px] w-full object-cover"
            />
          </div>
          <button
            onClick={retake}
            className="mt-5 rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition duration-200 hover:-translate-y-0.5 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
          >
            Retake
          </button>
        </>
      )}
    </div>
  );
}
