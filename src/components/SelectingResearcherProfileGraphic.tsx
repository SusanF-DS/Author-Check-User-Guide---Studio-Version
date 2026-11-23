import React from 'react';
import { User, MoreHorizontal, MessageSquare } from 'lucide-react';

export const SelectingResearcherProfileGraphic: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-white text-slate-800 font-sans my-2.5 relative">
      {/* Give Feedback Tab on right border matching screenshot */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#595959] text-white text-[9px] font-semibold py-2.5 px-1 rounded-l flex items-center justify-center writing-mode-vertical z-10 shadow-sm select-none">
        <span className="[writing-mode:vertical-lr] rotate-180 tracking-wider">Give Feedback</span>
      </div>

      {/* Author Check Header */}
      <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-slate-700">
            <User className="w-3 h-3" />
          </div>
          <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight">
            Author Check
          </h2>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
          Assess authors for multiple research integrity flags based on prior activities, including retractions, unusual networks or productivity.
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto p-1.5 sm:p-2.5 pr-6 sm:pr-7">
        <div className="min-w-[720px] border border-slate-200 rounded">
          <table className="w-full text-[11px] text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-slate-200 text-slate-700 font-semibold text-[10px] sm:text-[11px]">
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold">Researcher</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold">Active</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold">Main research field(s)</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold">Grants</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold text-center">Percentile of publication output</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold text-center">Flagged publications</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold text-center">Unusual network flag</th>
                <th className="px-2 py-1.5 border-r border-slate-200 font-bold text-center">Co-authors with network flag</th>
                <th className="px-2 py-1.5 font-bold text-center">Co-authors with flagged publications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Row 1: Tilo Menges */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="px-2 py-1.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs hover:text-sky-700 hover:underline cursor-pointer">
                    Tilo Menges
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">University of Giessen</div>
                  <div className="text-[10px] text-slate-600 leading-tight">Germany</div>
                  <button className="mt-0.5 px-1 py-0 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-[9px] leading-tight">
                    ...
                  </button>
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs">11 years</div>
                  <div className="text-[10px] text-slate-600 leading-tight">1994 - 2004</div>
                  <div className="text-[10px] text-slate-600 leading-tight">11 Publications</div>
                  <button className="mt-0.5 px-1 py-0 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-[9px] leading-tight">
                    ...
                  </button>
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-slate-700 text-[10px] sm:text-[11px] leading-tight">
                  Clinical Sciences
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-slate-400">
                  {/* Empty */}
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#f1f3f5] text-slate-800 font-medium text-xs">
                  Top 34%
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#f18900] text-black font-bold text-xs">
                  6
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#a0c4ff] text-black font-medium text-xs">
                  No
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#a0c4ff] text-black font-medium text-xs">
                  0%
                </td>
                <td className="px-2 py-1.5 align-top text-center bg-[#f18900] text-black font-bold text-xs">
                  21%
                </td>
              </tr>

              {/* Row 2: Joachim Md Boldt */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="px-2 py-1.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs hover:text-sky-700 hover:underline cursor-pointer">
                    Joachim Md Boldt
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">Klinikum Ludwigshafen</div>
                  <div className="text-[10px] text-slate-600 leading-tight">Germany</div>
                  <button className="mt-0.5 px-1 py-0 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-[9px] leading-tight">
                    ...
                  </button>
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs">43 years</div>
                  <div className="text-[10px] text-slate-600 leading-tight">1984 - 2026</div>
                  <div className="text-[10px] text-slate-600 leading-tight">618 Publications</div>
                  <button className="mt-0.5 px-1 py-0 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-[9px] leading-tight">
                    ...
                  </button>
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-slate-700 text-[10px] sm:text-[11px] leading-tight">
                  Clinical Sciences
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-slate-400">
                  {/* Empty */}
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#f1f3f5] text-slate-800 font-medium text-xs">
                  Top 1%
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#f18900] text-black font-bold text-xs">
                  256
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#a0c4ff] text-black font-medium text-xs">
                  No
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#a0c4ff] text-black font-medium text-xs">
                  0%
                </td>
                <td className="px-2 py-1.5 align-top text-center bg-[#f18900] text-black font-bold text-xs">
                  54%
                </td>
              </tr>

              {/* Row 3: Gunter Hempelmann */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="px-2 py-1.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs hover:text-sky-700 hover:underline cursor-pointer">
                    Gunter Hempelmann
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">University of Giessen</div>
                  <div className="text-[10px] text-slate-600 leading-tight">Germany</div>
                  <button className="mt-0.5 px-1 py-0 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-[9px] leading-tight">
                    ...
                  </button>
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs">56 years</div>
                  <div className="text-[10px] text-slate-600 leading-tight">1970 - 2025</div>
                  <div className="text-[10px] text-slate-600 leading-tight">889 Publications</div>
                  <button className="mt-0.5 px-1 py-0 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-[9px] leading-tight">
                    ...
                  </button>
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-slate-700 text-[10px] sm:text-[11px] leading-tight">
                  Clinical Sciences, Cardiovascular Medicine and Haematology
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-slate-400">
                  {/* Empty */}
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#f1f3f5] text-slate-800 font-medium text-xs">
                  Top 1%
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#f18900] text-black font-bold text-xs">
                  89
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#a0c4ff] text-black font-medium text-xs">
                  No
                </td>
                <td className="px-2 py-1.5 border-r border-slate-200 align-top text-center bg-[#a0c4ff] text-black font-medium text-xs">
                  0%
                </td>
                <td className="px-2 py-1.5 align-top text-center bg-[#f18900] text-black font-bold text-xs">
                  13%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
