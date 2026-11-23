import React, { useState } from 'react';
import { RETRACTION_TAXONOMIES, GLOSSARY_TERMS, TaxonomyCategory, GlossaryTerm } from '../data/guideData';
import { 
  GitBranch, 
  BookOpen, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Layers, 
  FileText, 
  CheckCheck, 
  Sparkles, 
  Copy, 
  Check
} from 'lucide-react';

export const TaxonomyAndTerminology: React.FC = () => {
  const [subTab, setSubTab] = useState<'taxonomy' | 'terminology'>('taxonomy');

  // Retraction Taxonomy State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('tax-papermill');
  const [taxSearch, setTaxSearch] = useState('');
  const [filterMisconduct, setFilterMisconduct] = useState<'all' | 'misconduct' | 'non-misconduct'>('all');

  // Terminology State
  const [termSearch, setTermSearch] = useState('');
  const [selectedTermCategory, setSelectedTermCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Taxonomy computation
  const selectedCategory: TaxonomyCategory = 
    RETRACTION_TAXONOMIES.find(c => c.id === selectedCategoryId) || RETRACTION_TAXONOMIES[0];

  const filteredCategories = RETRACTION_TAXONOMIES.filter(cat => {
    if (filterMisconduct === 'misconduct' && !cat.isMisconduct) return false;
    if (filterMisconduct === 'non-misconduct' && cat.isMisconduct) return false;
    if (!taxSearch) return true;
    const q = taxSearch.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.summary.toLowerCase().includes(q) ||
      cat.retractionWatchReasons.some(r => r.toLowerCase().includes(q))
    );
  });

  // Terminology computation
  const termsList = Object.values(GLOSSARY_TERMS);
  const filteredTerms = termsList.filter(t => {
    if (selectedTermCategory !== 'all' && t.category !== selectedTermCategory) return false;
    if (!termSearch) return true;
    const q = termSearch.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.shortDefinition.toLowerCase().includes(q) ||
      t.plainEnglish.toLowerCase().includes(q) ||
      t.whyItMatters.toLowerCase().includes(q)
    );
  });

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const text = `${term.term}\nPlain English: ${term.plainEnglish}\nWhy it matters: ${term.whyItMatters}`;
    navigator.clipboard.writeText(text);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Taxonomy & Terminology
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Explore how Retraction Watch reasons are classified, and consult clear definitions for Author Check terminology.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setSubTab('taxonomy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              subTab === 'taxonomy'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Retraction Taxonomy</span>
          </button>
          <button
            onClick={() => setSubTab('terminology')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              subTab === 'terminology'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Terminology Glossary ({termsList.length})</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: RETRACTION TAXONOMY EXPLORER */}
      {subTab === 'taxonomy' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search retraction reasons (e.g. image, error)..."
                value={taxSearch}
                onChange={(e) => setTaxSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Filter:</span>
              <button
                onClick={() => setFilterMisconduct('all')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterMisconduct === 'all'
                    ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                All (6)
              </button>
              <button
                onClick={() => setFilterMisconduct('misconduct')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterMisconduct === 'misconduct'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300 font-bold'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Misconduct
              </button>
              <button
                onClick={() => setFilterMisconduct('non-misconduct')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterMisconduct === 'non-misconduct'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Publisher Error / Honest Error
              </button>
            </div>
          </div>

          {/* Two-Column Taxonomy Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Categories List */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-condensed uppercase font-bold text-slate-700 px-1 tracking-wider block">
                Retraction Branches ({filteredCategories.length})
              </span>

              <div className="space-y-2">
                {filteredCategories.map((category) => {
                  const isSelected = selectedCategory.id === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-purple-50 border-purple-500 shadow-sm text-purple-950 ring-1 ring-purple-400 font-semibold'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                          {category.isMisconduct ? (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          )}
                          <span>{category.name}</span>
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                          category.severity === 'Critical' 
                            ? 'bg-rose-50 text-rose-800 border-rose-200' 
                            : category.severity === 'High' 
                              ? 'bg-amber-50 text-amber-800 border-amber-200' 
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {category.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {category.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected Category Details */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-condensed uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                    Retraction Watch Taxonomy Mapping
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    selectedCategory.isMisconduct 
                      ? 'bg-rose-50 text-rose-800 border-rose-200' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {selectedCategory.isMisconduct ? '⚠️ Misconduct Risk' : '✅ Non-Misconduct / Positive Signal'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {selectedCategory.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedCategory.summary}
                </p>
              </div>

              {/* Mapped Reasons Chips */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  <span>Mapped Retraction Watch Reasons:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategory.retractionWatchReasons.map((r, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-800 border border-slate-200 font-mono shadow-2xs"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Example Notice */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Representative Notice Excerpt:</span>
                </span>
                <div className="p-3 rounded-lg bg-slate-50 border-l-4 border-purple-500 text-xs text-slate-700 italic font-serif">
                  &ldquo;{selectedCategory.exampleNotice}&rdquo;
                </div>
              </div>

              {/* Investigator Action */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Investigator Action Checklist:</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedCategory.investigatorGuidance}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TERMINOLOGY GLOSSARY */}
      {subTab === 'terminology' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Search & Category Filter */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-3 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search terminology (e.g. ANZSRC, tortured phrases)..."
                value={termSearch}
                onChange={(e) => setTermSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              {['all', 'Classification', 'Integrity & Paper Mills', 'Network Metrics', 'Bibliometrics'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTermCategory(cat)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    selectedTermCategory === cat
                      ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Terminology' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                id={`term-${term.id}`}
                className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-condensed uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                      {term.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {term.term}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopyDefinition(term)}
                    className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 text-xs flex items-center gap-1 border border-slate-200"
                    title="Copy explanation"
                  >
                    {copiedId === term.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] text-emerald-700 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] text-slate-500">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Plain English Banner */}
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 flex items-start gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">In Plain English: </span>
                    <span className="text-sky-950 font-medium">{term.plainEnglish}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Why it matters: </strong>
                    {term.whyItMatters}
                  </p>
                  <p className="text-slate-600 font-mono text-[11px] p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 font-sans block text-[10px] uppercase font-bold">Example</span>
                    {term.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
