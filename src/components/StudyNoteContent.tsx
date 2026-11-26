import React from 'react';

interface StudyNoteContentProps {
  markdown: string;
}

/**
 * Renders structured study guide text safely using pure React JSX elements
 * (headings, bullet lists, numbered steps, paragraphs) without raw HTML injection.
 */
export function StudyNoteContent({ markdown }: StudyNoteContentProps) {
  const lines = markdown.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = (keyPrefix: string) => {
    if (listItems.length === 0 || !listType) return;
    if (listType === 'ul') {
      blocks.push(
        <ul
          key={`${keyPrefix}-ul`}
          className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
        >
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol
          key={`${keyPrefix}-ol`}
          className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
        >
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    }
    listItems = [];
    listType = null;
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`empty-${index}`);
      return;
    }

    if (line.startsWith('## ')) {
      flushList(`h2-${index}`);
      blocks.push(
        <h4
          key={`h2-${index}`}
          className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-100 pt-3 first:pt-0"
        >
          {line.slice(3).trim()}
        </h4>
      );
      return;
    }

    if (line.startsWith('# ')) {
      flushList(`h1-${index}`);
      blocks.push(
        <h3
          key={`h1-${index}`}
          className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white pt-3 first:pt-0"
        >
          {line.slice(2).trim()}
        </h3>
      );
      return;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType && listType !== 'ul') flushList(`switch-ul-${index}`);
      listType = 'ul';
      listItems.push(line.slice(2).trim());
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      if (listType && listType !== 'ol') flushList(`switch-ol-${index}`);
      listType = 'ol';
      listItems.push(orderedMatch[1].trim());
      return;
    }

    flushList(`p-${index}`);
    blocks.push(
      <p key={`p-${index}`} className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
        {line}
      </p>
    );
  });

  flushList('end');

  return <div className="space-y-2.5">{blocks}</div>;
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
