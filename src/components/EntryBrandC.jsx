import { useId } from "react";

const SLICE_WIDTHS = [18, 16, 12, 10, 14, 10, 12, 16, 18];

const OUTER_C_PATH = "M214 78A96 96 0 1 0 214 202";
const INNER_C_PATH = "M187 98A57 57 0 1 0 187 182";
const HIGHLIGHT_C_PATH = "M200 91A77 77 0 1 0 200 189";

export default function EntryBrandC({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  const mainGradientId = `entry-c-main-${uid}`;
  const foldGradientId = `entry-c-fold-${uid}`;
  const highlightGradientId = `entry-c-highlight-${uid}`;

  let runningX = 20;

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
          x1="80"
          y1="56"
          x2="218"
          y2="222"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#E8F4F8" />
          <stop offset="0.28" stopColor="#93EBF7" />
          <stop offset="0.62" stopColor="#00B9D9" />
          <stop offset="1" stopColor="#006989" />
        </linearGradient>
        <linearGradient
          id={foldGradientId}
          x1="176"
          y1="84"
          x2="144"
          y2="194"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#081F2A" />
          <stop offset="0.5" stopColor="#084D63" />
          <stop offset="1" stopColor="#7BE3F5" />
        </linearGradient>
        <linearGradient
          id={highlightGradientId}
          x1="90"
          y1="78"
          x2="182"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.78" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {SLICE_WIDTHS.map((width, index) => {
          const x = runningX;
          runningX += width + 6;
          return (
            <clipPath id={`entry-c-clip-${uid}-${index}`} key={`clip-${index}`}>
              <rect x={x} y="18" width={width} height="244" rx="7" />
            </clipPath>
          );
        })}
      </defs>

      {SLICE_WIDTHS.map((_, index) => (
        <g
          key={`slice-${index}`}
          clipPath={`url(#entry-c-clip-${uid}-${index})`}
          className={`entry-netflix-c-slice entry-netflix-c-slice-${index + 1}`}
        >
          <path
            d={OUTER_C_PATH}
            stroke={`url(#${mainGradientId})`}
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={INNER_C_PATH}
            stroke={`url(#${foldGradientId})`}
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      <path
        d={OUTER_C_PATH}
        className="entry-netflix-c-outline"
        stroke={`url(#${mainGradientId})`}
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={INNER_C_PATH}
        className="entry-netflix-c-core"
        stroke={`url(#${foldGradientId})`}
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={HIGHLIGHT_C_PATH}
        className="entry-netflix-c-highlight"
        stroke={`url(#${highlightGradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
