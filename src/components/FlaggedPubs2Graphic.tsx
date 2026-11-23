import React from 'react';
import { Download, X, ChevronDown } from 'lucide-react';

export const FlaggedPubs2Graphic: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-white text-slate-800 font-sans my-3">
      {/* Title with Download and Close controls matching screenshot */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          Flagged publications
        </h3>
        <div className="flex items-center gap-4 text-xs font-semibold text-sky-700">
          <button className="flex items-center gap-1 hover:underline">
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <button className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subheader banner */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1">
        <span>DDS AUTHORCHECK: RESEARCHER&apos;S FLAGGED PUBLICATIONS (12 Filters)</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-3 sm:p-4">
        <div className="min-w-[850px] border border-slate-200">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-slate-200 text-slate-700 font-semibold">
                <th className="p-2 border-r border-slate-200 w-12 text-center">Rank</th>
                <th className="p-2.5 border-r border-slate-200 w-64">Publication Title</th>
                <th className="p-2 border-r border-slate-200 w-28">Type</th>
                <th className="p-2 border-r border-slate-200 w-28">Data source</th>
                <th className="p-2 border-r border-slate-200 w-24">Date</th>
                <th className="p-2.5 border-r border-slate-200 w-44">Reason</th>
                <th className="p-2.5 border-r border-slate-200 w-40">Retraction taxonomy level 2</th>
                <th className="p-2.5 w-36">Retraction taxonomy level 1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-500">
                  1
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <span className="font-semibold text-slate-900 block leading-snug">
                    RETRACTED ARTICLE: Multiclass skin lesion classification using deep learning networks optimal information fusion
                  </span>
                  <span className="text-[10px] text-slate-400">...</span>
                </td>
                <td className="p-2 border-r border-slate-200 align-top text-slate-700">
                  Retraction notice
                </td>
                <td className="p-2 border-r border-slate-200 align-top text-slate-700">
                  Retraction Watch
                </td>
                <td className="p-2 border-r border-slate-200 align-top font-mono text-slate-600">
                  2025-01-07
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-800">
                  Compromised Peer Review
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-800">
                  Identity Falsification
                </td>
                <td className="p-2.5 align-top text-slate-800">
                  Author Integrity
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-500">
                  2
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top">
                  <span className="font-semibold text-slate-900 block leading-snug">
                    RETRACTED ARTICLE: Multiclass skin lesion classification using deep learning networks optimal information fusion
                  </span>
                  <span className="text-[10px] text-slate-400">...</span>
                </td>
                <td className="p-2 border-r border-slate-200 align-top text-slate-700">
                  Retraction notice
                </td>
                <td className="p-2 border-r border-slate-200 align-top text-slate-700">
                  Retraction Watch
                </td>
                <td className="p-2 border-r border-slate-200 align-top font-mono text-slate-600">
                  2025-01-07
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-800">
                  Unreliable Results and/or Conclusions
                </td>
                <td className="p-2.5 border-r border-slate-200 align-top text-slate-800">
                  Unreliable Research
                </td>
                <td className="p-2.5 align-top text-slate-800">
                  Research
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
