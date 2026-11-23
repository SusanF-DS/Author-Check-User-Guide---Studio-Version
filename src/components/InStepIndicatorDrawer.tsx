import React, { useEffect, useState } from 'react';
import { INDICATORS, IndicatorInfo } from '../data/guideData';
import { 
  X, 
  BarChart3, 
  AlertTriangle, 
  ExternalLink, 
  Info, 
  UserCheck,
  ChevronRight
} from 'lucide-react';

interface InStepIndicatorDrawerProps {
  indicatorId: string | null;
  onClose: () => void;
  onNavigateFullTab: (tabId: 'indicators' | 'taxonomy-terms') => void;
  onOpenGlossary?: (termId: string) => void;
}

export const InStepIndicatorDrawer: React.FC<InStepIndicatorDrawerProps> = ({
  indicatorId,
  onClose,
  onNavigateFullTab,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'screening' | 'pitfalls'>('overview');

  const indicator: IndicatorInfo | undefined = INDICATORS.find(i => i.id === indicatorId);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!indicator) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white border-l border-slate-200 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200 text-slate-800">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-condensed uppercase tracking-wider font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-amber-600" />
                  <span>Indicators &amp; Metrics</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200">
                  Indicator {indicator.number} of 6
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{indicator.name}</span>
              </h2>
              <p className="text-xs text-slate-600 italic">
                &ldquo;{indicator.question}&rdquo;
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Threshold & Prevalence Bar */}
          <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Highlight Rule:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                indicator.alwaysGrey 
                  ? 'bg-slate-200 text-slate-700 border border-slate-300' 
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {indicator.turnsOrangeWhen}
              </span>
            </div>
            <div className="text-[11px] text-slate-600">
              <span className="text-slate-500 font-medium">As of November 2025:</span> {indicator.prevalencePercentage}
            </div>
          </div>

          {/* Drawer Navigation Sub-tabs */}
          <div className="px-5 pt-3 pb-2 border-b border-slate-200 bg-white flex space-x-2 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              How It Works &amp; Logic
            </button>
            <button
              onClick={() => setActiveTab('screening')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'screening'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Screening Action
            </button>
            <button
              onClick={() => setActiveTab('pitfalls')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'pitfalls'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Pitfalls &amp; Caveats
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Why it matters */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Info className="w-4 h-4 text-sky-600" />
                    <span>Why This Indicator Matters</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {indicator.whyItMatters}
                  </p>
                </div>

                {/* Calculation & Logic */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <BarChart3 className="w-4 h-4 text-amber-600" />
                    <span>Exact Calculation &amp; Peer Group Baseline</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {indicator.howItWorks}
                  </p>
                </div>

                {/* Data Source */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-condensed uppercase tracking-wider text-purple-700 font-bold block">
                    Data Sources &amp; Indexing
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {indicator.source}
                  </p>
                </div>

                {/* Statistics Box */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                  <span className="font-bold text-amber-800 block">As of November 2025 Benchmark:</span>
                  <p className="text-[11px] leading-relaxed text-amber-900/90">
                    {indicator.statsNov2025}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'screening' && (
              <div className="space-y-4">
                {/* Investigator Action */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <UserCheck className="w-4 h-4 text-sky-600" />
                    <span>Recommended Investigator Action</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 font-medium">
                    {indicator.investigatorAction}
                  </p>
                </div>

                {/* Three Roles Guidance */}
                <div className="space-y-3">
                  <span className="text-xs font-condensed uppercase font-bold text-slate-800 tracking-wider block">
                    Role-Specific Nuances for this Indicator:
                  </span>

                  <div className="p-3 rounded-lg bg-slate-50 border-l-4 border-sky-500 space-y-1">
                    <span className="font-bold text-slate-900 block">Author Screening:</span>
                    <p className="text-slate-600 text-[11px]">
                      {indicator.number === 2 && 'Check whether the author was first author, corresponding author, or junior collaborator on flagged papers. Inspect whether retractions were honest self-corrections.'}
                      {indicator.number === 3 && 'For primary authors, 0 self-citations on >5 papers indicates disconnected or purchased work. Check topic coherence.'}
                      {indicator.number === 4 && 'Direct network flag indicates high likelihood of paper mill author allocation. Scrutinize institution affiliation and co-author overlap.'}
                      {indicator.number === 5 && 'Identify which co-author triggered the flag and determine if the author co-authored multiple papers with them.'}
                      {indicator.number === 6 && 'If ≥20% of collaborators have flagged papers, the research environment or collaboration circle warrants elevated scrutiny.'}
                      {indicator.number === 1 && 'Context only. Compare with career stage and discipline standard output.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border-l-4 border-emerald-500 space-y-1">
                    <span className="font-bold text-slate-900 block">Peer Reviewer Screening:</span>
                    <p className="text-slate-600 text-[11px]">
                      {indicator.number === 2 && 'Avoid appointing reviewers with recent retractions for peer review manipulation or fabricated data.'}
                      {indicator.number === 4 && 'Do NOT assign reviewers with an unusual network flag—this often indicates fake identities or coordinated review cartels.'}
                      {(indicator.number === 1 || indicator.number === 3 || indicator.number === 5 || indicator.number === 6) && 'Confirm active publication in the manuscript’s exact subfield within the last 24 months.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border-l-4 border-purple-500 space-y-1">
                    <span className="font-bold text-slate-900 block">Editor &amp; Guest Editor Screening:</span>
                    <p className="text-slate-600 text-[11px]">
                      Guest editors must meet the strictest threshold. Any network flag or multiple unaddressed retractions represents an immediate vulnerability to special issue hijacking.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pitfalls' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Common Interpretation Pitfalls</span>
                  </div>
                  <ul className="space-y-2">
                    {indicator.pitfalls.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 text-[11px]">
                        <span className="text-rose-600 font-bold mt-0.5">&bull;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Info className="w-4 h-4 text-sky-600" />
                    <span>Important Technical Caveats</span>
                  </div>
                  <ul className="space-y-2">
                    {indicator.caveats.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 text-[11px]">
                        <span className="text-sky-600 font-bold mt-0.5">&bull;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
            >
              Done &amp; Close
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {indicator.number === 2 && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateFullTab('taxonomy-terms');
                  }}
                  className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Taxonomy</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  onNavigateFullTab('indicators');
                }}
                className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>The 6 Indicators Deep Dive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
