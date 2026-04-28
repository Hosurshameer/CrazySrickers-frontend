import { useId } from "react";

export default function BrandC({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  const mainGradientId = `brand-c-main-${uid}`;
  const foldGradientId = `brand-c-fold-${uid}`;
  const highlightGradientId = `brand-c-highlight-${uid}`;

  return (
    <svg
      viewBox="0 0 280 280"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={mainGradientId}
          x1="72"
          y1="60"
          x2="214"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#E8F4F8" />
          <stop offset="0.32" stopColor="#7BDCED" />
          <stop offset="0.7" stopColor="#00A6C7" />
          <stop offset="1" stopColor="#006989" />
        </linearGradient>
        <linearGradient
          id={foldGradientId}
          x1="176"
          y1="86"
          x2="146"
          y2="194"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0A2A36" />
          <stop offset="0.52" stopColor="#005A73" />
          <stop offset="1" stopColor="#6FD7EB" />
        </linearGradient>
        <linearGradient
          id={highlightGradientId}
          x1="88"
          y1="78"
          x2="176"
          y2="146"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.72" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M214 78A96 96 0 1 0 214 202"
        stroke={`url(#${mainGradientId})`}
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M187 98A57 57 0 1 0 187 182"
        stroke={`url(#${foldGradientId})`}
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M200 91A77 77 0 1 0 200 189"
        stroke={`url(#${highlightGradientId})`}
        strokeOpacity="0.5"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
