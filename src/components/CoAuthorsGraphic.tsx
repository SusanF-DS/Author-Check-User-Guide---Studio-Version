import React from 'react';
import { ChevronDown, BarChart2 } from 'lucide-react';

export const CoAuthorsGraphic: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-white text-slate-800 font-sans my-3">
      {/* Title */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xl font-normal text-slate-900 tracking-tight">
          Co-authors
        </h3>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto p-3 sm:p-4 pr-6 sm:pr-7">
        <div className="min-w-[850px] border border-slate-200">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-slate-200 text-slate-700 font-semibold">
                <th className="p-2.5 border-r border-slate-200 w-36">
                  <div className="flex items-center gap-1">
                    <span>Strength of collaboration</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-2.5 border-r border-slate-200 w-56 font-bold">Co-author</th>
                <th className="p-2.5 border-r border-slate-200 w-32 font-bold">Active</th>
                <th className="p-2.5 border-r border-slate-200 w-44 font-bold">Main research field</th>
                <th className="p-2.5 border-r border-slate-200 w-44 font-bold">Grants</th>
                <th className="p-2.5 border-r border-slate-200 w-36 font-bold text-center">Percentile of publication output (0-100%)</th>
                <th className="p-2.5 border-r border-slate-200 w-28 font-bold text-center">Flagged publications</th>
                <th className="p-2.5 w-28 font-bold text-center">Unusual network flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Row 1: Pierre-Edouard Fournier */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-2.5 border-r border-slate-200 align-top bg-[#d4e8fd]">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-5 bg-[#335c8d] rounded-sm flex items-center justify-center text-[10px] text-white">
                      ■
                    </span>
                    <span className="font-bold text-slate-900 text-xs">763</span>
                    <span className="text-[10px] text-slate-500">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs hover:text-sky-700 cursor-pointer">
                    Pierre-Edouard Fournier
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Méditerranée Infection Foundation
                  </div>
                  <div className="text-[11px] text-slate-600">France</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    (ORCID 0000-0001-8463-8885)
                    <span className="ml-1 text-slate-400">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900">63 years</div>
                  <div className="text-[11px] text-slate-600">1964 - 2026</div>
                  <div className="text-[11px] text-slate-600">
                    1119 Publications
                    <span className="ml-1 text-slate-400">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  Microbiology, Clinical Sciences
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900">20 Grants</div>
                  <div className="text-[11px] text-slate-600 leading-tight">
                    Top Funder: Canadian Institutes of Health Research, Canada
                    <span className="ml-1 text-slate-400">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-center bg-[#f1f3f5] text-slate-800 font-medium">
                  Top 1%
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-center bg-[#f18900] text-black font-bold">
                  149
                </td>
                <td className="p-2.5 align-top text-center bg-[#a0c4ff] text-black font-medium">
                  No
                </td>
              </tr>

              {/* Row 2: Jean-Christophe Lagier */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-4 bg-[#335c8d] rounded-sm flex items-center justify-center text-[9px] text-white">
                      ■
                    </span>
                    <span className="font-bold text-slate-900 text-xs">384</span>
                    <span className="text-[10px] text-slate-500">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900 text-xs hover:text-sky-700 cursor-pointer">
                    Jean-Christophe Lagier
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Méditerranée Infection Foundation
                  </div>
                  <div className="text-[11px] text-slate-600">France</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    (ORCID 0000-0003-0771-8245)
                    <span className="ml-1 text-slate-400">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <div className="font-bold text-slate-900">20 years</div>
                  <div className="text-[11px] text-slate-600">2007 - 2026</div>
                  <div className="text-[11px] text-slate-600">
                    481 Publications
                    <span className="ml-1 text-slate-400">...</span>
                  </div>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  Microbiology, Clinical Sciences
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-400">
                  {/* Empty */}
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-center bg-[#f1f3f5] text-slate-800 font-medium">
                  Top 1%
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-center bg-[#f18900] text-black font-bold">
                  77
                </td>
                <td className="p-2.5 align-top text-center bg-[#a0c4ff] text-black font-medium">
                  No
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
