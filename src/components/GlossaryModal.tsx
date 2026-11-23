import React, { useState, useEffect } from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/guideData';
import { Search, X, BookOpen, Sparkles, Target, Copy, Check } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTermId
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const termsList = Object.values(GLOSSARY_TERMS);

  // Auto scroll to initial term if provided
  useEffect(() => {
    if (initialTermId && isOpen) {
      setTimeout(() => {
        const el = document.getElementById(`term-${initialTermId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [initialTermId, isOpen]);

  const filteredTerms = termsList.filter(t => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.shortDefinition.toLowerCase().includes(q) ||
      t.plainEnglish.toLowerCase().includes(q) ||
      t.whyItMatters.toLowerCase().includes(q)
    );
  });

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const text = `${term.term}\nPlain English: ${term.plainEnglish}\nWhy it matters in Author Check: ${term.whyItMatters}`;
    navigator.clipboard.writeText(text);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
      <div 
        className="bg-white border border-slate-200 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-sky-100 text-sky-700 border border-sky-200">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Dimensions Author Check: Technical Terminology &amp; Glossary
              </h3>
              <p className="text-xs text-slate-600">
                Plain-English explanations and investigator context for all bibliometric and research integrity terminology.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terminology (e.g. ANZSRC, tortured phrases)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            {['all', 'Classification', 'Integrity & Paper Mills', 'Network Metrics', 'Bibliometrics'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-sky-50 text-sky-700 border-sky-300 font-semibold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Terminology' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching technical terms found for &quot;{search}&quot;.
            </div>
          ) : (
            filteredTerms.map((term) => {
              const isTargeted = initialTermId === term.id;
              return (
                <div
                  key={term.id}
                  id={`term-${term.id}`}
                  className={`p-4 rounded-xl border transition-all ${
                    isTargeted
                      ? 'bg-white border-sky-400 shadow-md ring-1 ring-sky-400'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 border border-slate-300">
                        {term.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {term.term}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleCopyDefinition(term)}
                      className="p-1.5 rounded bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs flex items-center gap-1 shadow-2xs"
                      title="Copy explanation"
                    >
                      {copiedId === term.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[10px] text-slate-600 hidden sm:inline font-medium">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Plain English Highlight */}
                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 flex items-start gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-sky-900">Plain-English Translation: </span>
                      <span className="text-sky-800">{term.plainEnglish}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider">
                        Formal Technical Definition
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {term.shortDefinition}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-amber-800 text-[11px] uppercase tracking-wider flex items-center gap-1">
                        <Target className="w-3 h-3 text-amber-600" />
                        <span>Why It Matters in Author Check</span>
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {term.whyItMatters}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                    <div className="text-slate-600">
                      <span className="text-slate-500 font-mono">Example: </span>
                      <span className="text-slate-700 italic">{term.example}</span>
                    </div>
                    <div className="text-sky-700 font-mono text-[10px] font-semibold shrink-0">
                      {term.authorCheckImpact}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>{termsList.length} total technical definitions indexed</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
