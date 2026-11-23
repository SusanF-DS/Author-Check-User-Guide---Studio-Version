import React, { useState } from 'react';
import { KEY_TAKEAWAY_BANNERS, INDICATORS } from '../data/guideData';
import { USER_GUIDE_FAQS } from '../data/userGuideData';
import { 
  HelpCircle, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Network, 
  ChevronDown, 
  ChevronUp, 
  CheckCheck, 
  Printer, 
  Copy, 
  Check
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-600" />,
  Users: <Users className="w-5 h-5 text-sky-600" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-indigo-600" />,
  Network: <Network className="w-5 h-5 text-rose-600" />
};

export const TroubleshootingFAQ: React.FC = () => {
  const [expandedTakeawayId, setExpandedTakeawayId] = useState<string | null>('takeaway-1');
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `DIMENSIONS AUTHOR CHECK — FAST REFERENCE JOB AID

CORE DIRECTIVE: An Indicator Is Not A Verdict. A highlight means "worth a closer look", not "this person has done something wrong."

THE SIX INDICATORS SUMMARY:
1. Percentile of Publication Output: Always Grey (Context only). Peers = same Level 2 ANZSRC field & same first pub year.
2. Flagged Publications: Turns ORANGE at >= 1 flagged publication. Honest self-retractions count in author's favor.
3. Self-Citations: Turns ORANGE at 0 self-citations. Caveat: ONLY evaluates authors with >=5 eligible publications (>=9 refs) active in last 2 years.
4. Unusual Network Flag: Turns ORANGE if "Yes" (Porter & McIntosh 2024). ~100x higher probability of flagged papers; hallmark of paper mills.
5. Co-Authors with Network Flag: Turns ORANGE at >= 1 co-author with network flag. Check strength of collaboration.
6. Co-Authors with Flagged Publications: Turns ORANGE ONLY at >= 20% of co-authors! (Single co-author retractions are common across ~30% of authors).

EXPORT & DRILL-DOWN LIMITS: Maximum 500 records per drill-down. Filter by shorter time range if export cuts off.`;
    navigator.clipboard.writeText(text);
    setCopiedCheatSheet(true);
    setTimeout(() => setCopiedCheatSheet(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Tips, FAQs & Role Screening
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Key takeaways for responsible review, technical tips, frequently asked questions, and a printable triage cheat sheet.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 transition-colors shadow-2xs"
          >
            {copiedCheatSheet ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied Summary</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Job Aid</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold font-condensed uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: ESSENTIAL INVESTIGATOR TAKEAWAYS (HIGHLIGHT CARDS) */}
      <div className="space-y-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-orange-600" />
            <span>Essential Investigator Takeaways</span>
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Key principles to keep in mind to avoid common misinterpretations when screening researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {KEY_TAKEAWAY_BANNERS.map((banner) => {
            const isExpanded = expandedTakeawayId === banner.id;
            return (
              <div
                key={banner.id}
                className="rounded-xl border border-slate-200 bg-white transition-all duration-150 overflow-hidden shadow-2xs"
              >
                <div
                  onClick={() => setExpandedTakeawayId(isExpanded ? null : banner.id)}
                  className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3 select-none hover:bg-slate-50/70"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
                      {iconMap[banner.icon]}
                    </div>
                    <div>
                      <span className="text-[10px] font-condensed uppercase tracking-wider font-bold text-sky-800">
                        {banner.badge}
                      </span>
                      <h5 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                        {banner.headline}
                      </h5>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {banner.subhead}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 p-1 rounded bg-slate-100 text-slate-500 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3 text-xs sm:text-sm">
                    <p className="text-slate-700 leading-relaxed">
                      {banner.body}
                    </p>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Investigator Action Checklist:</span>
                      </span>
                      <ul className="space-y-1 pl-1">
                        {banner.actionBullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: TROUBLESHOOTING & FAQS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Troubleshooting */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span>Troubleshooting Guide</span>
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Full page export cuts off:</span>
              <p className="text-slate-600 leading-relaxed">
                Filter by a shorter publication timeframe, or export individual tables via the 3-dot menu on each tile.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Cannot copy text from within tables:</span>
              <p className="text-slate-600 leading-relaxed">
                Click into the cell and press <strong>CTRL+C</strong> (or <strong>CMD+C</strong> on Mac) to copy the full cell contents.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Bad page breaks in PDF export:</span>
              <p className="text-slate-600 leading-relaxed">
                Format your PDF print settings to <em>&ldquo;Fit to dashboard&rdquo;</em> or <em>&ldquo;Fit to page&rdquo;</em> rather than standard paper size.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>Frequently Asked Questions</span>
          </h4>

          <div className="space-y-2.5 text-xs">
            {USER_GUIDE_FAQS.map((faq, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-sky-900 block">{faq.q}</span>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: FAST REFERENCE TRIAGE CHEAT SHEET */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 print:bg-white print:text-black print:border-none">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-condensed uppercase font-bold text-sky-700 tracking-wider block">
              Fast Reference Matrix
            </span>
            <h4 className="text-lg font-bold text-slate-900 print:text-black">
              Author Check Triage Decision Sheet
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-500 print:text-slate-600">
            Dimensions Author Check
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-700 bg-slate-50 print:bg-slate-100 print:text-black">
                <th className="py-2.5 px-3 font-semibold">#</th>
                <th className="py-2.5 px-3 font-semibold">Indicator</th>
                <th className="py-2.5 px-3 font-semibold">Turns Orange When</th>
                <th className="py-2.5 px-3 font-semibold">Key Pitfall / Caveat</th>
                <th className="py-2.5 px-3 font-semibold">Investigator Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 print:divide-slate-300 print:text-black">
              {INDICATORS.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-50 print:hover:bg-transparent">
                  <td className="py-2.5 px-3 font-mono font-bold text-sky-700">
                    {ind.number}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900 print:text-black">
                    {ind.name}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                      ind.alwaysGrey
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-orange-50 text-orange-800 border border-orange-200 font-semibold'
                    }`}>
                      {ind.thresholdSummary}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-600 print:text-slate-700 max-w-xs">
                    {ind.pitfalls[0]}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-600 print:text-slate-700">
                    {ind.investigatorAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
