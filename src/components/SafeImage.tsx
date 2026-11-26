import { useState } from 'react';
import { BrandMark } from './BrandMark';

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function SafeImage({ src, alt, fallbackTitle, className = '' }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/70 to-indigo-50/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 p-6 ${className}`}
      >
        <BrandMark className="w-10 h-10 mb-3 opacity-80" />
        <span className="text-sm font-medium text-[#0F172A] dark:text-slate-100">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
