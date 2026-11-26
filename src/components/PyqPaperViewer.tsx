import { ChevronDown, ChevronUp, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link } from '../lib/router';
import type { PyqPaper } from '../shared/types';
import { downloadTextFile } from './StudyNoteContent';

interface PyqPaperViewerProps {
  paper: PyqPaper;
  defaultExpanded?: boolean;
  showSubjectLink?: boolean;
}

function formatPaperAsText(paper: PyqPaper): string {
  const lines: string[] = [
    paper.title,
    `${paper.subjectCode} | ${paper.examSession} ${paper.examYear} | ${paper.paperType}`,
    paper.maxMarks || paper.durationMinutes
      ? `Max Marks: ${paper.maxMarks ?? 70} | Duration: ${paper.durationMinutes ?? 180} minutes`
      : '',
    '',
    paper.authorNote,
    '',
  ];

  if (paper.sections) {
    for (const section of paper.sections) {
      lines.push(`=== ${section.name} ===`);
      lines.push(section.instruction);
      lines.push('');
      for (const q of section.questions) {
        const unitLabel = q.unitNumber ? ` [Unit ${q.unitNumber}]` : '';
        lines.push(`${q.number}. ${q.text}${unitLabel} (${q.marks} Marks)`);
      }
      lines.push('');
    }
  }

  return lines.join('\n').trim() + '\n';
}

export function PyqPaperViewer({
  paper,
  defaultExpanded = false,
  showSubjectLink = false,
}: PyqPaperViewerProps) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const hasSections = Boolean(paper.sections && paper.sections.length > 0);
  const totalQuestions =
    paper.sections?.reduce((sum, sec) => sum + sec.questions.length, 0) ?? 0;

  const handleDownload = () => {
    const safeSlug = `${paper.subjectCode.toLowerCase()}-${paper.examYear}-${paper.id}`;
    downloadTextFile(`${safeSlug}.txt`, formatPaperAsText(paper));
  };

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            {showSubjectLink ? (
              <Link
                to={`/subjects/${encodeURIComponent(paper.subjectCode)}?tab=pyq`}
                className="font-mono font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
              >
                {paper.subjectCode}
              </Link>
            ) : (
              <span className="font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                {paper.subjectCode}
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span className="font-mono">
              {paper.examSession} {paper.examYear}
            </span>
            <span aria-hidden="true">·</span>
            <span>{paper.paperType}</span>
            {paper.maxMarks && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{paper.maxMarks} Marks</span>
              </>
            )}
            {totalQuestions > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{totalQuestions} Questions</span>
              </>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-100">
            {paper.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {paper.authorNote}
          </p>
        </div>

        <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
          {hasSections && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white text-xs font-medium hover:bg-[#1B2A4A] dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
            >
              <span>{expanded ? 'Hide Paper' : 'View Questions'}</span>
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          {hasSections && (
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
          )}
          {paper.resourceUrl && (
            <a
              href={paper.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-[#1D4ED8] dark:text-blue-400 hover:border-[#1D4ED8] dark:hover:border-blue-400 transition-colors whitespace-nowrap"
            >
              <span>Open Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {expanded && paper.sections && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-6">
          {paper.sections.map((section, secIdx) => (
            <section key={`${paper.id}-sec-${secIdx}`} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h4 className="text-sm font-bold text-[#0F172A] dark:text-slate-100">
                  {section.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{section.instruction}</p>
              </div>
              <ol className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg bg-[#F8FAFC]/70 dark:bg-slate-950/60">
                {section.questions.map((q, qIdx) => (
                  <li
                    key={`${paper.id}-q-${secIdx}-${qIdx}`}
                    className="px-4 py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 mt-0.5 shrink-0 tabular-nums">
                        {q.number}
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{q.text}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 sm:pl-4 tabular-nums">
                      {q.unitNumber && <span>Unit {q.unitNumber}</span>}
                      {q.unitNumber && <span aria-hidden="true">·</span>}
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {q.marks}M
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
