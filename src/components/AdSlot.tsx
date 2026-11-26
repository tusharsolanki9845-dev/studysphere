import { useCatalog } from '../lib/catalogContext';
import { useFocusMode } from '../lib/focusContext';

interface AdSlotProps {
  slotId: string;
  format?: 'horizontal' | 'inline';
  className?: string;
}

/**
 * Advertising-ready slot component.
 * Advertisements are strictly DISABLED by default (`settings.adsEnabled === false`)
 * and always suppressed while Do Not Disturb focus mode is active.
 */
export function AdSlot({ slotId, format = 'horizontal', className = '' }: AdSlotProps) {
  const { catalog } = useCatalog();
  const { dndEnabled } = useFocusMode();

  if (!catalog.settings.adsEnabled || dndEnabled) {
    return null;
  }

  return (
    <aside
      aria-label="Sponsored placement"
      data-ad-slot={`${catalog.settings.adNetworkSlotPrefix}-${slotId}`}
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 px-4 py-3 text-center text-xs text-slate-500 dark:text-slate-400 ${
        format === 'horizontal' ? 'min-h-[90px] flex flex-col items-center justify-center' : ''
      } ${className}`}
    >
      <span className="font-medium text-slate-600 dark:text-slate-300">Advertisement Slot Ready</span>
      <span className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
        {catalog.settings.adNetworkSlotPrefix}-{slotId}
      </span>
    </aside>
  );
}
