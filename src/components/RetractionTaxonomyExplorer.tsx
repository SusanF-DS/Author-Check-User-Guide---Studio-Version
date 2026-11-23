import React, { useState } from 'react';
import { RETRACTION_TAXONOMIES, TaxonomyCategory } from '../data/guideData';
import { TerminologyTooltip } from './TerminologyTooltip';
import { 
  GitBranch, 
  AlertCircle, 
  CheckCircle, 
  Layers, 
  HelpCircle, 
  Search, 
  FileText, 
  ShieldAlert, 
  CheckCheck,
  Scale
} from 'lucide-react';

interface RetractionTaxonomyExplorerProps {
  onOpenGlossary?: (term: string) => void;
}

export const RetractionTaxonomyExplorer: React.FC<RetractionTaxonomyExplorerProps> = ({
  onOpenGlossary
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('tax-papermill');
  const [filterMisconduct, setFilterMisconduct] = useState<'all' | 'misconduct' | 'non-misconduct'>('all');

  const selectedCategory: TaxonomyCategory = 
    RETRACTION_TAXONOMIES.find(c => c.id === selectedCategoryId) || RETRACTION_TAXONOMIES[0];

  const filteredCategories = RETRACTION_TAXONOMIES.filter(cat => {
    if (filterMisconduct === 'misconduct' && !cat.isMisconduct) return false;
    if (filterMisconduct === 'non-misconduct' && cat.isMisconduct) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GitBranch className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-white">
                Interactive Retraction Taxonomy Explorer
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              See how Dimensions maps hundreds of raw <TerminologyTooltip termKey="retraction-taxonomy" onOpenFullGlossary={onOpenGlossary}>Retraction Watch</TerminologyTooltip> reason codes into standardized categories within Author Check, separating true misconduct from publisher errors and honest self-corrections.
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-xs shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 font-mono">Retraction Watch</div>
              <div className="text-emerald-400 font-bold font-mono">~57,000 papers</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 font-mono">PPS Fingerprints</div>
              <div className="text-amber-400 font-bold font-mono">~23,000 papers</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Filter Categories:</span>
            <button
              onClick={() => setFilterMisconduct('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                filterMisconduct === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              All (6)
            </button>
            <button
              onClick={() => setFilterMisconduct('misconduct')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                filterMisconduct === 'misconduct'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              Misconduct Categories
            </button>
            <button
              onClick={() => setFilterMisconduct('non-misconduct')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                filterMisconduct === 'non-misconduct'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              Publisher Error / Honest Mistakes
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Interactive Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Category Navigator (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Taxonomy Branches ({filteredCategories.length})
          </div>

          <div className="space-y-2">
            {filteredCategories.map((category) => {
              const isSelected = selectedCategory.id === category.id;
              const severityBadge = {
                'Critical': 'bg-rose-950/80 text-rose-300 border-rose-700/50',
                'High': 'bg-amber-950/80 text-amber-300 border-amber-700/50',
                'Moderate': 'bg-blue-950/80 text-blue-300 border-blue-700/50',
                'Informational / Positive': 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
              }[category.severity];

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/30'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-white flex items-center gap-2">
                      {category.isMisconduct ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span>{category.name}</span>
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${severityBadge}`}>
                      {category.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {category.summary}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-1">
                    <span>{category.retractionWatchReasons.length} RW reasons</span>
                    <span>•</span>
                    <span className={category.isMisconduct ? 'text-amber-400/90' : 'text-emerald-400'}>
                      {category.isMisconduct ? 'Potential Misconduct' : 'No Misconduct'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Mapping & Investigator Guide (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
          {/* Header of selected category */}
          <div className="pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
              <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                Author Check Flag Mapping
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                selectedCategory.isMisconduct 
                  ? 'bg-rose-950/70 text-rose-300 border-rose-700/40' 
                  : 'bg-emerald-950/70 text-emerald-300 border-emerald-700/40'
              }`}>
                {selectedCategory.isMisconduct ? '⚠️ High Integrity Risk' : '✅ Non-Misconduct / Positive'}
              </span>
            </div>

            <h4 className="text-xl font-bold text-white tracking-tight">
              {selectedCategory.name}
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              {selectedCategory.summary}
            </p>
          </div>

          {/* Retraction Watch Mapping & Reasons Chips */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mapped Retraction Watch Database Reasons:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategory.retractionWatchReasons.map((reason, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-slate-200 border border-slate-800 font-mono hover:border-cyan-500/50 transition-colors"
                >
                  {reason}
                </span>
              ))}
            </div>
          </div>

          {/* Problematic Paper Screener Linkage */}
          {selectedCategory.ppsFlags.length > 0 && (
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Problematic Paper Screener (PPS) Correlated Fingerprints:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCategory.ppsFlags.map((flag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded bg-amber-950/80 text-amber-200 border border-amber-700/50 font-mono"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sample Retraction Notice */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Representative Notice Excerpt:</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/90 border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 italic font-serif leading-relaxed">
              &ldquo;{selectedCategory.exampleNotice}&rdquo;
            </div>
          </div>

          {/* Dimensions Mapping Note */}
          <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 space-y-1">
            <div className="text-xs font-bold text-cyan-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>How Dimensions Author Check Displays This:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedCategory.dimensionsMappingNote}
            </p>
          </div>

          {/* Investigator Guidance Checklist */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Investigator Action Checklist:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedCategory.investigatorGuidance}
            </p>
          </div>

          {/* Comparison Highlight: Misconduct vs Publisher Error vs Honest Mistake */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Always verify if notice states &quot;Error by Publisher&quot; or &quot;Self-Retraction&quot;</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
