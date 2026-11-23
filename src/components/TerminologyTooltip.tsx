import React, { useState, useRef, useEffect } from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/guideData';
import { HelpCircle, Sparkles, BookOpen, ExternalLink, X } from 'lucide-react';

interface TerminologyTooltipProps {
  termKey: string;
  children?: React.ReactNode;
  onOpenFullGlossary?: (termKey: string) => void;
  className?: string;
}

export const TerminologyTooltip: React.FC<TerminologyTooltipProps> = ({
  termKey,
  children,
  onOpenFullGlossary,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const termData: GlossaryTerm | undefined = GLOSSARY_TERMS[termKey.toLowerCase()];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!termData) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center gap-1 font-medium text-cyan-300 hover:text-cyan-200 border-b border-dashed border-cyan-400/60 hover:border-cyan-300 transition-colors cursor-help text-left ${className}`}
        aria-label={`Definition for ${termData.term}`}
      >
        <span>{children || termData.term}</span>
        <HelpCircle className="w-3 h-3 text-cyan-400/80 inline shrink-0" />
      </button>

      {/* Tooltip Card */}
      {isOpen && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 sm:w-96 p-4 bg-slate-900/98 backdrop-blur-md border border-cyan-500/40 rounded-xl shadow-2xl shadow-cyan-950/50 text-left text-slate-200 animate-in fade-in zoom-in-95 duration-150 block cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <span className="flex items-start justify-between gap-2 pb-2 border-b border-slate-700/60">
            <span className="block">
              <span className="text-[10px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold inline-block">
                {termData.category}
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {termData.term}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>

          {/* Plain English Banner */}
          <span className="mt-2.5 p-2 rounded-lg bg-cyan-950/40 border border-cyan-900/60 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span className="text-xs block">
              <span className="font-semibold text-cyan-200">In Plain English: </span>
              <span className="text-cyan-100/90">{termData.plainEnglish}</span>
            </span>
          </span>

          {/* Why it Matters in Author Check */}
          <span className="mt-2 text-xs space-y-1 block">
            <span className="text-slate-300 leading-relaxed block">
              <span className="font-medium text-amber-300">Why it matters: </span>
              {termData.whyItMatters}
            </span>
          </span>

          {/* Example */}
          <span className="mt-2 text-[11px] p-2 rounded bg-slate-800/80 text-slate-300 border-l-2 border-cyan-400 font-mono block">
            <span className="font-semibold text-slate-400 block font-sans text-[10px] uppercase">Example</span>
            {termData.example}
          </span>

          {/* Footer action */}
          {onOpenFullGlossary && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenFullGlossary(termData.id);
              }}
              className="mt-3 w-full py-1.5 px-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-cyan-300 bg-slate-800 hover:bg-slate-700/80 rounded border border-slate-700 hover:border-cyan-500/50 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              <span>Explore full term & Author Check impact</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          )}

          {/* Tooltip arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-slate-900 border-t-8 border-x-transparent border-x-8 border-b-0 block w-0 h-0" />
        </span>
      )}
    </span>
  );
};
