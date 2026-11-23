import React from 'react';
import { ExternalLink, MoreVertical } from 'lucide-react';

export const SummaryIndicatorsGraphic: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 shadow-xl bg-white text-slate-800 font-sans my-4">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200">
        <div className="text-xs text-slate-500 font-medium">Researcher:</div>
        
        {/* Author Name with Red Outline Box matching screenshot */}
        <div className="inline-block mt-1">
          <div className="border-2 border-red-600 px-3 py-1 bg-slate-300 text-slate-900 font-bold text-base sm:text-lg">
            Example Author 1
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-sky-600 font-medium">
          <span className="hover:underline cursor-pointer">View in Dimensions</span>
          <span className="hover:underline cursor-pointer">Search on Google</span>
          <span className="hover:underline cursor-pointer">Search ORCID Profile</span>
        </div>

        {/* Affiliation & Active Years */}
        <div className="mt-2 text-xs sm:text-sm text-slate-700">
          <div className="font-semibold text-slate-900">Aix-Marseille University</div>
          <div className="text-slate-500 text-xs">Active Years: 1979-2026</div>
        </div>
      </div>

      {/* Summary Indicators Table */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="flex justify-end pb-1">
            <MoreVertical className="w-4 h-4 text-slate-500 cursor-pointer" />
          </div>

          <div className="divide-y divide-slate-200 text-xs sm:text-[13px]">
            {/* Row 1: Publications */}
            <div className="py-2.5 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4 font-semibold text-slate-900">
                Publications
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#cbd5e1] text-slate-800 font-bold text-xs">
                  3,748
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#cbd5e1] text-slate-800 font-semibold text-xs">
                  Top 1%*
                </span>
              </div>
              <div className="col-span-5 text-slate-400 text-xs">
                {/* empty contextual note */}
              </div>
            </div>

            {/* Row 2: Flagged publications (Orange) */}
            <div className="py-2.5 grid grid-cols-12 gap-3 items-center bg-orange-50/40">
              <div className="col-span-4 font-semibold text-slate-900">
                Flagged publications
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <span className="px-3 py-0.5 rounded-full bg-[#f18900] text-black font-bold text-xs shadow-sm">
                  293
                </span>
              </div>
              <div className="col-span-5 text-xs text-slate-700 leading-snug">
                This person has at least one retracted papers, notices of concern, and/or publication with tortured phrases. Note that some retractions are due to honest errors.
              </div>
            </div>

            {/* Row 3: Self-citations (Blue) */}
            <div className="py-2.5 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4 font-semibold text-slate-900">
                Self-citations
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#a0c4ff] text-black font-semibold text-xs">
                  97%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#a0c4ff] text-black font-semibold text-xs">
                  Top 9%*
                </span>
              </div>
              <div className="col-span-5 text-xs text-slate-700 leading-snug">
                The self-citations are in line with normal publishing behaviour.
              </div>
            </div>

            {/* Row 4: Unusual network flag (Blue) */}
            <div className="py-2.5 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4 font-semibold text-slate-900">
                Unusual network flag
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <span className="px-3 py-0.5 rounded-full bg-[#a0c4ff] text-black font-semibold text-xs">
                  No
                </span>
              </div>
              <div className="col-span-5 text-xs text-slate-700 leading-snug">
                No unusual co-author network detected.
              </div>
            </div>

            {/* Row 5: Co-authors with network flags (Orange) */}
            <div className="py-2.5 grid grid-cols-12 gap-3 items-center bg-orange-50/40">
              <div className="col-span-4 font-semibold text-slate-900">
                Co-authors with network flags
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f18900] text-black font-bold text-xs shadow-sm">
                  1%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f18900] text-black font-bold text-xs shadow-sm">
                  Top 1%*
                </span>
              </div>
              <div className="col-span-5 text-xs text-slate-700 leading-snug">
                This flag indicates the researcher may have collaborated with people who have been flagged for unusual publishing patterns. This does not mean the researcher themselves have been flagged.
              </div>
            </div>

            {/* Row 6: Co-authors with flagged publications (Blue) */}
            <div className="py-2.5 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4 font-semibold text-slate-900">
                Co-authors with flagged publications
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#a0c4ff] text-black font-semibold text-xs">
                  11%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#a0c4ff] text-black font-semibold text-xs">
                  Top 1%*
                </span>
              </div>
              <div className="col-span-5 text-xs text-slate-700 leading-snug">
                The percentage of co-authors with retractions or otherwise flagged publications is within an acceptable range.
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 italic">
            *Compared to other researchers in the same main research field (&lsquo;Clinical Sciences&rsquo;) and over a similar publishing period (since 1979).
          </div>
        </div>
      </div>
    </div>
  );
};
