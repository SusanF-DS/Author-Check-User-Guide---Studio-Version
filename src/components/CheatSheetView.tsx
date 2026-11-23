import React, { useState } from 'react';
import { INDICATORS } from '../data/guideData';
import { Printer, Copy, Check, FileCheck, Shield, AlertTriangle } from 'lucide-react';

export const CheatSheetView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `DIMENSIONS AUTHOR CHECK — INVESTIGATOR QUICK REFERENCE JOB AID (OCTOBER 2026)

CORE PRINCIPLE: An Indicator Is Not A Verdict. A highlight means "worth a closer look", not "this person has done something wrong."

THE SIX INDICATORS SUMMARY:
1. Percentile of Publication Output: Always Grey (Context only). Peers = same Level 2 ANZSRC field & same first pub year.
2. Flagged Publications: Turns ORANGE at >= 1 flagged publication (Retraction Watch, CrossRef, PubMed, Dimensions, PPS). Honest self-retractions count in author's favor.
3. Self-Citations: Turns ORANGE at 0 self-citations. Caveat: ONLY evaluates authors with >=5 eligible publications (>=9 refs) active in last 2 years. Junior authors are protected!
4. Unusual Network Flag: Turns ORANGE if "Yes" (Porter & McIntosh 2024). 100x higher probability of flagged papers; hallmark of paper mills.
5. Co-Authors with Network Flag: Turns ORANGE at >= 1 co-author with network flag. Check strength of collaboration.
6. Co-Authors with Flagged Publications: Turns ORANGE ONLY at >= 20% of co-authors! (30% of normal researchers have >=1 co-author with flags; 20% threshold filters out noise).

DATA SOURCES: CrossRef (~70k), Retraction Watch (~57k), PubMed (~30k), Dimensions Detection (~24k), Problematic Paper Screener (~23k). Multi-flag priority highlights most severe flag with richest metadata.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-cyan-400" />
            <span>Investigator Triage Cheat Sheet & Job Aid Card</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compact matrix for quick author screening, desk review, and integrity triage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Job Aid</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text Summary</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Job Aid</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6 print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Header Block */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-4 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider print:text-cyan-800">
              Dimensions Author Check • Fast Reference Matrix
            </div>
            <h2 className="text-xl font-bold text-white print:text-black mt-1">
              Author Check Triage Decision Job Aid
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
              Reference guide for Research Integrity Officers, Department Heads, and Peer Reviewers
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 print:text-slate-500 font-mono hidden sm:block">
            <span>Last Updated: Oct 2026</span>
          </div>
        </div>

        {/* Golden Rule Banner */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 print:border-amber-600 print:bg-amber-50 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-300 print:text-amber-900">
            <Shield className="w-4 h-4 text-amber-400 print:text-amber-700" />
            <span>PRIMARY DIRECTIVE: An Indicator Is Not A Verdict</span>
          </div>
          <p className="text-slate-300 print:text-slate-800 leading-relaxed pl-6">
            A highlight means <span className="font-semibold text-white print:text-black">&ldquo;worth a closer look&rdquo;</span>, not &ldquo;this person has done something wrong.&rdquo; Never automate disciplinary decisions based solely on indicator status.
          </p>
        </div>

        {/* Summary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 print:border-slate-400 text-slate-400 print:text-slate-700 bg-slate-950/60 print:bg-slate-100">
                <th className="py-2.5 px-3 font-semibold">#</th>
                <th className="py-2.5 px-3 font-semibold">Indicator</th>
                <th className="py-2.5 px-3 font-semibold">Turns Orange When</th>
                <th className="py-2.5 px-3 font-semibold">Key Pitfall / Caveat</th>
                <th className="py-2.5 px-3 font-semibold">Investigator Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-slate-300 text-slate-300 print:text-slate-800">
              {INDICATORS.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-800/40 print:hover:bg-transparent">
                  <td className="py-3 px-3 font-mono text-cyan-400 print:text-cyan-800 font-bold">
                    {ind.number}
                  </td>
                  <td className="py-3 px-3 font-bold text-white print:text-black">
                    {ind.name}
                  </td>
                  <td className="py-3 px-3 font-medium">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                      ind.alwaysGrey
                        ? 'bg-slate-800 text-slate-300 print:bg-slate-200 print:text-slate-800'
                        : 'bg-amber-500/10 text-amber-300 print:bg-amber-100 print:text-amber-800 font-semibold'
                    }`}>
                      {ind.thresholdSummary}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[11px] text-slate-300 print:text-slate-700 max-w-xs">
                    {ind.pitfalls[0]}
                  </td>
                  <td className="py-3 px-3 text-[11px] text-slate-300 print:text-slate-700">
                    {ind.investigatorAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Vital Triage Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1">
            <span className="font-bold text-cyan-300 print:text-cyan-800 block">1. Inspect the Retraction Metadata</span>
            <p className="text-slate-400 print:text-slate-600 text-[11px]">
              Honest mistakes and self-retractions count in an author&apos;s favor. Publisher errors have 0 author fault.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1">
            <span className="font-bold text-cyan-300 print:text-cyan-800 block">2. Protect Junior Researchers</span>
            <p className="text-slate-400 print:text-slate-600 text-[11px]">
              Indicator 3 self-citation check does NOT apply to scholars with &lt;5 eligible papers or inactive in last 2 years.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1">
            <span className="font-bold text-cyan-300 print:text-cyan-800 block">3. Remember the 20% Co-Author Threshold</span>
            <p className="text-slate-400 print:text-slate-600 text-[11px]">
              Having 1 flagged co-author is common (~30% of authors). Only systemic networks (≥20%) turn orange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
