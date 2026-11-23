import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Percent, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  HelpCircle,
  TrendingDown,
  Layers
} from 'lucide-react';

export const SelfCiteDetailsGraphic: React.FC = () => {
  // Highlight mode: 'all' | 'publications' | 'selfcitations' | 'none'
  const [highlightMode, setHighlightMode] = useState<'all' | 'publications' | 'selfcitations' | 'none'>('all');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const showPublications = highlightMode === 'all' || highlightMode === 'publications';
  const showSelfCitations = highlightMode === 'all' || highlightMode === 'selfcitations';

  return (
    <div className="rounded-xl overflow-hidden border border-[#304e9d] shadow-2xl bg-[#181438] text-slate-200 font-sans my-4">
      {/* Top Controls Header */}
      <div className="p-3 sm:p-4 bg-[#1f1a45] border-b border-[#304e9d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a2c617] animate-pulse" />
          <div>
            <span className="font-condensed uppercase tracking-wider font-bold text-white text-xs block">
              Self-Citation Indicator Drill-Down &bull; Screenshot Inspector
            </span>
            <span className="text-[11px] text-slate-400">
              Interactive highlights for Publications and Self-Citations metrics
            </span>
          </div>
        </div>

        {/* Dynamic Highlight Controls */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs bg-[#181438] p-1 rounded-lg border border-[#304e9d]/60">
          <button
            onClick={() => setHighlightMode('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
              highlightMode === 'all'
                ? 'bg-[#40bbed] text-[#181438] font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#241e52]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highlight All</span>
          </button>

          <button
            onClick={() => setHighlightMode('publications')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
              highlightMode === 'publications'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#241e52]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Publications Metrics</span>
          </button>

          <button
            onClick={() => setHighlightMode('selfcitations')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
              highlightMode === 'selfcitations'
                ? 'bg-[#f18900] text-black font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-[#241e52]'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-[#f18900]" />
            <span>Self-Citations Metrics</span>
          </button>

          <button
            onClick={() => setHighlightMode('none')}
            className={`px-2 py-1 rounded text-xs transition-all ${
              highlightMode === 'none'
                ? 'bg-slate-700 text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#241e52]'
            }`}
            title="Hide all highlight overlays"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Screenshot Container */}
      <div className="p-3 sm:p-5 bg-[#120f2c] overflow-x-auto">
        <div className="min-w-[680px] max-w-[1100px] mx-auto relative rounded-lg overflow-hidden border border-[#304e9d]/80 bg-[#151136] shadow-xl">
          {/* Base Screenshot Image */}
          <img
            src="/assets/aistudio/image_1065a5c1.png"
            alt="Dimensions Self-Citation Indicator Drill-Down Screenshot"
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* ============================================================ */}
          {/* DYNAMIC OVERLAYS: PUBLICATIONS METRICS (Emerald / Green)     */}
          {/* ============================================================ */}

          {/* Publications Metric 1: Top Right Card (Eligibility Rule 6 of 6) */}
          {showPublications && (
            <div
              style={{
                top: '13.5%',
                left: '65.5%',
                width: '32.5%',
                height: '22.5%',
              }}
              className="absolute group cursor-pointer transition-all duration-200"
              onClick={() => setActiveTooltip(activeTooltip === 'pub-rule' ? null : 'pub-rule')}
              onMouseEnter={() => setActiveTooltip('pub-rule')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Highlight Box Ring */}
              <div className="w-full h-full rounded-md border-2 border-emerald-400 bg-emerald-500/15 shadow-[0_0_18px_rgba(52,211,153,0.7)] animate-pulse" />
              
              {/* Floating Badge Tag */}
              <div className="absolute -top-3 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wide shadow-lg border border-emerald-200">
                <FileText className="w-3 h-3" />
                <span>Publications Metric: Rule Check</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'pub-rule' && (
                <div className="absolute top-full mt-2 right-0 w-72 p-3 rounded-lg bg-[#181438] text-white text-xs border border-emerald-400/80 shadow-2xl z-30 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Eligibility Rule: 6 of 6 Papers Qualified</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    To prevent false penalties for junior scholars, Author Check requires an author to have at least <strong>5 eligible publications</strong> (each having <strong>&ge;9 total references</strong>) and activity within the last 2 years.
                  </p>
                  <div className="text-[10px] text-emerald-300 font-mono bg-emerald-950/40 p-1.5 rounded border border-emerald-800">
                    Rule Met: 6 of 6 papers qualifying &rarr; Indicator active
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Publications Metric 2: Table Columns for Total References & Eligibility */}
          {showPublications && (
            <div
              style={{
                top: '41.5%',
                left: '70%',
                width: '28.5%',
                height: '54%',
              }}
              className="absolute group cursor-pointer transition-all duration-200"
              onClick={() => setActiveTooltip(activeTooltip === 'pub-refs' ? null : 'pub-refs')}
              onMouseEnter={() => setActiveTooltip('pub-refs')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Highlight Box Ring */}
              <div className="w-full h-full rounded-md border-2 border-emerald-400/90 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              
              {/* Floating Badge Tag */}
              <div className="absolute -top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] tracking-wide shadow-md">
                <span>References: 38, 42, 29 (&ge;9 refs)</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'pub-refs' && (
                <div className="absolute bottom-full mb-2 right-0 w-72 p-3 rounded-lg bg-[#181438] text-white text-xs border border-emerald-400/80 shadow-2xl z-30 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-emerald-400">
                    Publication Reference Thresholds
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Each individual paper is verified: 38, 42, and 29 references all comfortably satisfy the &ge;9 references benchmark.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* DYNAMIC OVERLAYS: SELF-CITATIONS METRICS (Amber / Orange)    */}
          {/* ============================================================ */}

          {/* Self-Citations Metric 1: Top Left Card (Researcher Rate 0.0%) */}
          {showSelfCitations && (
            <div
              style={{
                top: '13.5%',
                left: '1.2%',
                width: '31%',
                height: '22.5%',
              }}
              className="absolute group cursor-pointer transition-all duration-200"
              onClick={() => setActiveTooltip(activeTooltip === 'cite-rate' ? null : 'cite-rate')}
              onMouseEnter={() => setActiveTooltip('cite-rate')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Highlight Box Ring */}
              <div className="w-full h-full rounded-md border-2 border-[#f18900] bg-orange-500/15 shadow-[0_0_18px_rgba(241,137,0,0.7)] animate-pulse" />
              
              {/* Floating Badge Tag */}
              <div className="absolute -top-3 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f18900] text-black font-black text-[10px] tracking-wide shadow-lg border border-yellow-200">
                <Percent className="w-3 h-3" />
                <span>Self-Citation Metric: Rate 0.0%</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'cite-rate' && (
                <div className="absolute top-full mt-2 left-0 w-72 p-3 rounded-lg bg-[#181438] text-white text-xs border border-[#f18900]/80 shadow-2xl z-30 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-[#f18900] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Flagged Orange: 0.0% Rate</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Author Check flags an author orange when their self-citation rate sits below the <strong>80th percentile threshold</strong> in their discipline. A total absence of self-citation across eligible papers is a signature of bought or paper-mill authorship.
                  </p>
                  <div className="text-[10px] text-amber-300 font-mono bg-amber-950/40 p-1.5 rounded border border-amber-800">
                    Status: Flagged Orange (&lt; 80th %ile)
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Self-Citations Metric 2: Top Middle Card (Field Benchmark 18.4%) */}
          {showSelfCitations && (
            <div
              style={{
                top: '13.5%',
                left: '33.5%',
                width: '30.5%',
                height: '22.5%',
              }}
              className="absolute group cursor-pointer transition-all duration-200"
              onClick={() => setActiveTooltip(activeTooltip === 'cite-bench' ? null : 'cite-bench')}
              onMouseEnter={() => setActiveTooltip('cite-bench')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Highlight Box Ring */}
              <div className="w-full h-full rounded-md border-2 border-[#40bbed] bg-cyan-500/15 shadow-[0_0_16px_rgba(64,187,237,0.6)]" />
              
              {/* Floating Badge Tag */}
              <div className="absolute -top-3 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#40bbed] text-[#181438] font-bold text-[9px] tracking-wide shadow-md">
                <span>Field Benchmark: 18.4%</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'cite-bench' && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-3 rounded-lg bg-[#181438] text-white text-xs border border-[#40bbed]/80 shadow-2xl z-30 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-[#40bbed]">
                    Discipline Benchmark
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Calculated against the researcher&apos;s primary ANZSRC Field of Research (Level 2). In this field, 80% of scholars have up to 18.4% self-citations.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Self-Citations Metric 3: Table Column for Self-Citations 0 (0%) */}
          {showSelfCitations && (
            <div
              style={{
                top: '41.5%',
                left: '79%',
                width: '9.5%',
                height: '54%',
              }}
              className="absolute group cursor-pointer transition-all duration-200"
              onClick={() => setActiveTooltip(activeTooltip === 'cite-col' ? null : 'cite-col')}
              onMouseEnter={() => setActiveTooltip('cite-col')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Highlight Box Ring */}
              <div className="w-full h-full rounded-md border-2 border-[#f18900] bg-orange-500/15 shadow-[0_0_15px_rgba(241,137,0,0.6)] animate-pulse" />
              
              {/* Floating Badge Tag */}
              <div className="absolute -top-3 -left-3 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#f18900] text-black font-black text-[9px] tracking-wide shadow-md whitespace-nowrap">
                <span>0 Self-Cites (0%)</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'cite-col' && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 rounded-lg bg-[#181438] text-white text-xs border border-[#f18900]/80 shadow-2xl z-30 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-[#f18900]">
                    Zero Self-Citations Detected
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Each sampled publication lists 0 references to the author or co-authors&apos; prior works.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Metric Explanation Panels */}
      <div className="p-4 sm:p-5 bg-[#1a153d] border-t border-[#304e9d]/50">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#304e9d]/40">
          <span className="text-xs font-condensed uppercase font-bold text-white tracking-wider flex items-center gap-2">
            <Info className="w-4 h-4 text-[#40bbed]" />
            <span>Understanding the Highlighted Metrics in This Screenshot:</span>
          </span>
          <span className="text-[11px] text-slate-400">
            Click either panel to focus highlights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Panel 1: Publications Metrics */}
          <div
            onClick={() => setHighlightMode('publications')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              highlightMode === 'publications' || highlightMode === 'all'
                ? 'bg-emerald-950/20 border-emerald-400/80 ring-1 ring-emerald-400/40 shadow-lg'
                : 'bg-[#241e52] border-[#304e9d]/40 opacity-75 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                <FileText className="w-4 h-4" />
                <span>Publications Metrics (Eligibility Rule: 6 of 6)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Rule Met
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong>Why it matters:</strong> To ensure fairness, Author Check does not penalize researchers who have not published enough papers to establish a citation history. The algorithm requires:
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-300 list-disc pl-4">
              <li><strong>Publication count gate:</strong> At least <strong>5 eligible publications</strong> in the researcher profile.</li>
              <li><strong>Reference depth gate:</strong> Each counted paper must contain at least <strong>9 references</strong> (e.g. 38, 42, 29 in table).</li>
              <li><strong>Active publishing window:</strong> Evidence of publication within the last 2 years.</li>
              <li><em>Early-career scholars with fewer than 5 eligible papers remain neutral (grey).</em></li>
            </ul>
          </div>

          {/* Panel 2: Self-Citations Metrics */}
          <div
            onClick={() => setHighlightMode('selfcitations')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              highlightMode === 'selfcitations' || highlightMode === 'all'
                ? 'bg-amber-950/20 border-amber-400/80 ring-1 ring-amber-400/40 shadow-lg'
                : 'bg-[#241e52] border-[#304e9d]/40 opacity-75 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[#f18900] flex items-center gap-1.5 text-sm">
                <Percent className="w-4 h-4" />
                <span>Self-Citations Metrics (Rate: 0.0% vs Benchmark: 18.4%)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-[#f18900]/20 text-[#f18900] border border-[#f18900]/40">
                Flagged Orange
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong>Why it matters:</strong> Legitimate scientists naturally build upon and cite their team&apos;s prior work. A complete absence of self-citations (0.0%) when benchmarked against peer disciplines (18.4%) triggers an orange highlight:
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-300 list-disc pl-4">
              <li><strong>Researcher Rate (0.0%):</strong> Calculated as total citations to own or co-authors&apos; papers divided by total references.</li>
              <li><strong>Field Benchmark (18.4%):</strong> 80th percentile threshold of researchers in the same ANZSRC Level 2 field.</li>
              <li><strong>Integrity Risk:</strong> An author who never references their own field work may have purchased authorship from a paper mill rather than written the paper.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
