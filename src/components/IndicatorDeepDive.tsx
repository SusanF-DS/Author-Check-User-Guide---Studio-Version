import React, { useState } from 'react';
import { INDICATORS, IndicatorInfo } from '../data/guideData';
import { 
  AlertCircle, 
  Database, 
  BarChart3, 
  ShieldAlert
} from 'lucide-react';

interface IndicatorDeepDiveProps {
  onOpenGlossary?: (term: string) => void;
}

export const IndicatorDeepDive: React.FC<IndicatorDeepDiveProps> = ({ onOpenGlossary }) => {
  const [selectedIndicatorId, setSelectedIndicatorId] = useState<string>('ind-2');

  const activeIndicator: IndicatorInfo = 
    INDICATORS.find(i => i.id === selectedIndicatorId) || INDICATORS[1];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                The 6 Indicators Deep Dive
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore the data sources, calculation logic, orange alert trigger thresholds, and false-positive pitfalls for each indicator.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span className="font-medium">5 Indicators Alert (Orange) • 1 Always Neutral (Grey)</span>
          </div>
        </div>

        {/* 6 Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 pt-3 border-t border-slate-200">
          {INDICATORS.map((ind) => {
            const isSelected = selectedIndicatorId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndicatorId(ind.id)}
                className={`p-2.5 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-xs ring-1 ring-sky-400 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono text-sky-700 font-bold">
                    #{ind.number}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${ind.alwaysGrey ? 'bg-slate-400' : 'bg-[#ea580c]'}`} />
                </div>
                <div className="font-bold text-xs line-clamp-1 text-slate-900">
                  {ind.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 line-clamp-1">
                  {ind.thresholdSummary}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Detail Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Indicator {activeIndicator.number} of 6
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                activeIndicator.alwaysGrey
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-orange-50 text-orange-800 border-orange-200'
              }`}>
                {activeIndicator.turnsOrangeWhen}
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">
              {activeIndicator.name}
            </h4>
            <p className="text-sm text-sky-800 mt-1 font-medium">
              &ldquo;{activeIndicator.question}&rdquo;
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs shrink-0 md:text-right space-y-0.5 shadow-2xs">
            <span className="text-slate-500 font-mono block text-[10px] uppercase font-semibold">As of November 2025</span>
            <span className="font-bold text-[#ea580c] font-mono text-sm block">{activeIndicator.prevalencePercentage}</span>
            <span className="text-[11px] text-slate-600">{activeIndicator.statsNov2025}</span>
          </div>
        </div>

        {/* 2-Column Specs: How It Works & Why It Matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
              <Database className="w-4 h-4 text-sky-600" />
              <span>How It Works & Peer Cohort Grouping:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeIndicator.howItWorks}
            </p>
            <div className="mt-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200">
              <span className="text-slate-500">Source: </span>
              <span className="text-slate-800 font-medium">{activeIndicator.source}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
              <ShieldAlert className="w-4 h-4 text-orange-600" />
              <span>Why It Matters for Research Integrity:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeIndicator.whyItMatters}
            </p>
            <div className="mt-2 p-2 rounded bg-sky-50 border border-sky-200 text-[11px] text-slate-700">
              <span className="font-semibold text-sky-800">Action for Investigator: </span>
              {activeIndicator.investigatorAction}
            </div>
          </div>
        </div>

        {/* Pitfalls & False Positive Protections */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span>Common Pitfalls & What to Keep in Mind:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeIndicator.pitfalls.map((pitfall, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                <span>{pitfall}</span>
              </div>
            ))}
          </div>

          {activeIndicator.caveats.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[11px] font-semibold text-slate-600 mb-1">
                Data Rules & Caveats:
              </div>
              <ul className="space-y-1">
                {activeIndicator.caveats.map((cav, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="text-sky-600 font-bold">•</span>
                    <span>{cav}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
