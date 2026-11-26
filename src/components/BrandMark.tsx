interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'w-7 h-7' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="18"
        cy="18"
        r="15.5"
        className="stroke-[#0F172A] dark:stroke-slate-100"
        strokeWidth="2.2"
      />
      <ellipse
        cx="18"
        cy="18"
        rx="15.5"
        ry="6.8"
        transform="rotate(-24 18 18)"
        className="stroke-[#1D4ED8] dark:stroke-blue-400"
        strokeWidth="2"
      />
      <path
        d="M18 2.5C22.4 6.6 24.8 12.1 24.8 18C24.8 23.9 22.4 29.4 18 33.5"
        className="stroke-[#5B21B6] dark:stroke-violet-400"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      <circle cx="18" cy="18" r="3" className="fill-[#0F172A] dark:fill-slate-100" />
    </svg>
  );
}
