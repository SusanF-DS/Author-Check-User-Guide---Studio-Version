import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FlaggedPubs1Graphic: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-white text-slate-800 font-sans my-3">
      {/* Title */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">
          Flagged publications
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-3 sm:p-4">
        <div className="min-w-[700px] border border-slate-200">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-slate-200 text-slate-700 font-semibold">
                <th className="p-2.5 border-r border-slate-200 w-64">Title</th>
                <th className="p-2.5 border-r border-slate-200 w-24">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span>Year</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-2.5 border-r border-slate-200 w-48">Source title</th>
                <th className="p-2.5 border-r border-slate-200 w-40">Publisher</th>
                <th className="p-2.5 w-60">Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Row 1 with Blue Selection Box around Flag */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <span className="font-semibold text-slate-900 block leading-snug">
                    RETRACTED ARTICLE: Multiclass skin lesion classification using deep learning networks optimal information fusion
                  </span>
                  <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer">...</span>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  2024
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  <span>Discover Applied Sciences</span>
                  <span className="text-[10px] text-slate-400 ml-1">...</span>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  <span>Springer Nature</span>
                  <span className="text-[10px] text-slate-400 ml-1">...</span>
                </td>
                {/* Blue Outlined Selection Box on Flag */}
                <td className="p-2 align-top">
                  <div className="border-2 border-sky-600 bg-sky-50/50 p-2 rounded text-slate-900 text-xs shadow-sm">
                    <div className="font-bold text-slate-900 text-xs">
                      Retraction notice
                    </div>
                    <div className="text-[11px] text-slate-700 mt-0.5">
                      Identity Falsification
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      from: Retraction Watch
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      2025-01-07
                    </div>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <span className="font-semibold text-slate-900 block leading-snug">
                    Few-shot learning-based human behavior recognition model
                  </span>
                  <span className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer">...</span>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  2024
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  <span>Computers in Human Behavior</span>
                  <span className="text-[10px] text-slate-400 ml-1">...</span>
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-700">
                  <span>Elsevier</span>
                  <span className="text-[10px] text-slate-400 ml-1">...</span>
                </td>
                <td className="p-2.5 align-top">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">
                      Expression of concern
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      from: Crossref
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      2025-10-23
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
