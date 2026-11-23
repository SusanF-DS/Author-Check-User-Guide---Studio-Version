import React, { useState } from 'react';
import { KEY_TAKEAWAY_BANNERS } from '../data/guideData';
import { 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  Network, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  CheckCheck,
  AlertTriangle
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-400" />,
  Users: <Users className="w-5 h-5 text-cyan-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-indigo-400" />,
  Network: <Network className="w-5 h-5 text-rose-400" />
};

export const KeyTakeawayBanner: React.FC<{
  onSelectTakeaway?: (id: string) => void;
}> = () => {
  const [expandedId, setExpandedId] = useState<string | null>('takeaway-1');
  const [filter, setFilter] = useState<string>('all');

  const filteredBanners = KEY_TAKEAWAY_BANNERS.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'core') return b.id === 'takeaway-1';
    if (filter === 'coauthors') return b.id === 'takeaway-2';
    if (filter === 'ethics') return b.id === 'takeaway-3';
    if (filter === 'network') return b.id === 'takeaway-5';
    if (filter === 'career') return b.id === 'takeaway-4';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header with Quick Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lightbulb className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Essential Investigator Takeaways
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Key principles transformed into high-impact visual banners to avoid common assessment errors
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              filter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            All Takeaways (5)
          </button>
          <button
            onClick={() => setFilter('coauthors')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              filter === 'coauthors'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            Why 20%?
          </button>
          <button
            onClick={() => setFilter('core')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              filter === 'core'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            Not a Verdict
          </button>
          <button
            onClick={() => setFilter('network')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              filter === 'network'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            100x Multiplier
          </button>
        </div>
      </div>

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredBanners.map((banner) => {
          const isExpanded = expandedId === banner.id;
          const borderColors: Record<string, string> = {
            amber: 'border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-slate-900',
            cyan: 'border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 via-slate-900/90 to-slate-900',
            emerald: 'border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 via-slate-900/90 to-slate-900',
            indigo: 'border-indigo-500/40 bg-gradient-to-r from-indigo-950/30 via-slate-900/90 to-slate-900',
            rose: 'border-rose-500/40 bg-gradient-to-r from-rose-950/30 via-slate-900/90 to-slate-900'
          };

          const badgeStyles: Record<string, string> = {
            amber: 'bg-amber-950/80 text-amber-300 border-amber-600/40',
            cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-600/40',
            emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40',
            indigo: 'bg-indigo-950/80 text-indigo-300 border-indigo-600/40',
            rose: 'bg-rose-950/80 text-rose-300 border-rose-600/40'
          };

          return (
            <div
              key={banner.id}
              className={`rounded-xl border transition-all duration-200 shadow-md ${
                borderColors[banner.color] || 'border-slate-700 bg-slate-900'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : banner.id)}
                className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-800/90 border border-slate-700/80 shrink-0">
                    {iconMap[banner.icon]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${badgeStyles[banner.color]}`}>
                        {banner.badge}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {banner.headline}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {banner.subhead}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {isExpanded ? 'Collapse' : 'Deep Dive'}
                  </span>
                  <div className="p-1 rounded-md bg-slate-800 text-slate-300 hover:text-white">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-3.5 text-xs sm:text-sm">
                  <p className="text-slate-300 leading-relaxed">
                    {banner.body}
                  </p>

                  <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 font-semibold text-white text-xs">
                      <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Investigator Action Checklist:</span>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {banner.actionBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {banner.id === 'takeaway-2' && (
                    <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-2 text-xs text-cyan-200">
                      <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">Statistical reality (Nov 2025): </span>
                        Average researcher co-author flag rate is only 3%. That is why 20% is chosen—it isolates the real statistical outliers without falsely tarnishing one third of the world&apos;s researchers.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
