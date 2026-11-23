import React, { useState } from 'react';
import { X, Download, Printer, FileText, CheckCircle2, Globe } from 'lucide-react';
import { WORKFLOW_STEPS, SEARCH_METHODS, ROLE_SCREENING_GUIDES } from '../data/userGuideData';
import { INDICATORS } from '../data/guideData';

interface GuideDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideDownloadModal: React.FC<GuideDownloadModalProps> = ({
  isOpen,
  onClose
}) => {
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const generatePlainTextGuide = (): string => {
    return `================================================================================
DIMENSIONS AUTHOR CHECK — STEP-BY-STEP USER & INDICATOR GUIDE
Digital Science • Dimensions Author Check
Last updated: October 2026
================================================================================

AN INDICATOR IS NOT A VERDICT
The indicators in Author Check are not "metrics" that can be used for benchmarking,
and none of them can determine misconduct by themself. A highlight means "worth a
closer look", not "this person has done something wrong."

--------------------------------------------------------------------------------
TABLE OF CONTENTS
--------------------------------------------------------------------------------
PART 1: START HERE — 4 SEQUENTIAL WORKFLOW STEPS
  Step 1: Find the Researcher
  Step 2: Review the Summary Indicators
  Step 3: Investigate the Details
  Step 4: Export Data

PART 2: THE 6 INDICATORS DEEP DIVE & THRESHOLDS
  Indicator 1: Percentile of Publication Output (Contextual — Never Orange)
  Indicator 2: Flagged Publications (1 or more retractions/expressions/tortured phrases)
  Indicator 3: Self-citations (Unusual absence of self-citations; 3 eligibility rules)
  Indicator 4: Unusual Network Flag (Disjointed co-author clusters; 100x statistical risk)
  Indicator 5: Co-authors with Network Flags (Collaborators with network flags)
  Indicator 6: Co-authors with Flagged Publications (20% co-author threshold)

PART 3: SCREENING BY ROLE RESPONSIBLY
  - Assessing Authors of Submitted Manuscripts
  - Assessing Potential Peer Reviewers
  - Assessing Candidates for Editorial Board Positions

================================================================================
PART 1: START HERE — 4 SEQUENTIAL WORKFLOW STEPS
================================================================================

--------------------------------------------------------------------------------
STEP 1: FIND THE RESEARCHER
--------------------------------------------------------------------------------
Open Researcher Finder from "Apps" in the left-hand navigation sidebar at dimensions.ai.

CHOOSE YOUR SEARCH METHOD:
1. Name + Affiliation (More Precise)
   - Best when: You only have a name and, ideally, an institution.
   - Tip: Several researchers often share the same name; specify the current or historical affiliation.
   - Example: Elena Rostova + University of Cambridge

2. Dimensions Researcher ID or ORCID (Most Precise)
   - Best when: You have an identifier from a submission system, CV, or grant application.
   - Tip: The quickest and most precise lookup without name ambiguity.
   - Example: 0000-0002-1825-0097 or ur.013456789.22

3. DOI or Dimensions Document ID (Co-authors)
   - Best when: You want to check all co-authors listed on a submitted paper at once.
   - Tip: Returns every researcher listed on that publication.
   - Example: 10.1038/s41586-023-06123-x

APPLYING FILTERS & AND LOGIC:
- Click "Researcher finder", then "Filter".
- Available filters: Name, ORCID, Dimensions researcher ID, Affiliation, Affiliation filter type, DOI, Dimensions document ID.
- Combining multiple filters creates an "AND" search (all conditions must match).
- If zero results are returned, remove one filter to broaden your search.

SELECTING THE RESEARCHER PROFILE:
- In the search results table, review Researcher Name, Affiliation, Active Years, and preliminary indicator status.
- Orange cells highlight potential areas for closer look.
- Click the researcher's name or row to open their full report.

--------------------------------------------------------------------------------
STEP 2: REVIEW THE SUMMARY INDICATORS
--------------------------------------------------------------------------------
Work from the top overview of the researcher profile:
- 5 indicators can turn orange when an atypical pattern is detected.
- Percentile of publication output is ALWAYS grey (contextual only).

SUMMARY INDICATORS OVERVIEW:
* Publications: Total count and percentile rank compared to peers. (Grey)
* Flagged publications: Turns orange if the researcher has >= 1 retracted paper, notice of concern, or publication with tortured phrases.
* Self-citations: Turns orange if the researcher has an unusually low self-citation rate (<80th percentile) despite meeting all 3 eligibility criteria.
* Unusual network flag: Turns orange if the researcher's co-author network exhibits fragmented, unrelated clusters indicative of paper mill activity.
* Co-authors with network flags: Turns orange if >= 1 co-author has an unusual network flag.
* Co-authors with flagged publications: Turns orange only if >= 20% of co-authors have flagged publications (protecting researchers with large normal networks).

ROLE SCREENING RESPONSIBILITIES:
- Manuscript Authors: Focus on Flagged Publications (fraud vs honest error) and Unusual Network.
- Peer Reviewers: Focus on Self-citations and Flagged Publications; check if collaborator retractions overlap with the manuscript topic.
- Editors: Check all 5 indicators, especially Co-authors with Network Flags.

--------------------------------------------------------------------------------
STEP 3: INVESTIGATE THE DETAILS
--------------------------------------------------------------------------------
1. Investigate Flagged Publications:
   - Review the Flagged Publications table.
   - The summary table displays the single most severe flag for each paper.
   - Click any flag to reveal all underlying flags, including:
     * Data Source (Retraction Watch, Crossref, PPS)
     * Date of Notice
     * Reason Code
     * Retraction Taxonomy (Misconduct vs Publisher Error vs Self-Correction)
   - Distinguish between honest error self-retractions (which count in the author's favor) and forced fraud.

2. Review the Co-authors Network:
   - Sort co-authors by "Strength of Collaboration" (number of joint publications).
   - Check whether co-authors with flags are frequent long-term lab collaborators or one-time co-authors on massive multi-author papers.

3. Drill into Self-Citations:
   - See the publications behind a self-citation figure:
     1) Go to the top overview of the researcher profile.
     2) Click the self-citation percentages.
     3) Click the link to show the full overview drill-down.
   - Check if the researcher meets all 3 eligibility rules:
     a) Published within the last 2 years.
     b) Has at least 5 eligible publications.
     c) Each publication has at least 9 references.
   - If an author has fewer than 5 eligible papers (e.g. Early Career Researcher), the indicator remains Neutral (Grey).
   - If eligible and self-citation is 0%, compare against the discipline benchmark (e.g. 18.4% 80th percentile threshold).

--------------------------------------------------------------------------------
STEP 4: EXPORT DATA
--------------------------------------------------------------------------------
- Download individual tables: Click the 3 vertical dots on any indicator tile to export as CSV or PDF.
- Download full profile: Click the 3 dots in the top-right of the dashboard.
- Drill-downs are capped at 500 records for optimal system performance.
- When communicating externally, state that data is publicly sourced and does not imply misconduct by itself.

================================================================================
PART 2: THE 6 INDICATORS DEEP DIVE & THRESHOLDS
================================================================================

INDICATOR 1: PERCENTILE OF PUBLICATION OUTPUT
- Meaning: Volume ranking against peers in the same ANZSRC Level 2 field who published their first paper in the same year.
- Threshold: NEVER turns orange. Always displayed as neutral grey.
- Why: High productivity alone is not misconduct; hyper-prolific output provides context for evaluating network size.

INDICATOR 2: FLAGGED PUBLICATIONS
- Meaning: Identifies papers with retraction notices, expressions of concern, or tortured phrases (Problematic Paper Screener).
- Threshold: Turns Orange if count >= 1.
- Why: A single retraction warrants inspection to distinguish honest mistake from deliberate fraud.

INDICATOR 3: SELF-CITATIONS
- Meaning: Flags an anomalous absence of self-citations (<80th percentile of discipline).
- Threshold: Turns Orange if below 80th percentile threshold, provided all 3 eligibility criteria are met:
  1) Active in the last 2 years.
  2) Has >= 5 eligible publications.
  3) Each paper has >= 9 references.
- Why: Paper mills sell authorship slots to clients who contribute no genuine intellectual citations. Early-career researchers with <5 papers stay grey.

INDICATOR 4: UNUSUAL NETWORK FLAG
- Meaning: Co-author graph topology algorithm detecting disjoint clusters of co-authors who have never published together.
- Threshold: Turns Orange if algorithm detects fragmented network topology.
- Prevalence: Only ~0.01% of all researchers trigger this flag, but 50% of them have flagged publications (100x statistical risk).

INDICATOR 5: CO-AUTHORS WITH NETWORK FLAGS
- Meaning: Identifies whether any collaborator holds an Unusual Network Flag.
- Threshold: Turns Orange if >= 1 co-author has a network flag.
- Why: Signals possible secondary exposure to paper mill networks.

INDICATOR 6: CO-AUTHORS WITH FLAGGED PUBLICATIONS
- Meaning: Percentage of co-authors who have had publications retracted or flagged.
- Threshold: Turns Orange ONLY if >= 20% of co-authors have flagged publications.
- Why: Roughly 30% of all normal researchers have at least one co-author with a retraction. A 20% threshold prevents false alarms.

================================================================================
Generated via Dimensions Author Check Interactive Guide
Digital Science • https://dimensions.ai
================================================================================`;
  };

  const handleDownloadHtml = () => {
    fetch('/Dimensions_Author_Check_User_Guide.html')
      .then(res => res.text())
      .then(htmlContent => {
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Dimensions_Author_Check_User_Guide.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setDownloadSuccessMessage('Document downloaded successfully as standalone HTML (.html)!');
        setTimeout(() => setDownloadSuccessMessage(null), 4000);
      })
      .catch(() => {
        window.open('/Dimensions_Author_Check_User_Guide.html', '_blank');
      });
  };

  const handleDownloadText = () => {
    const text = generatePlainTextGuide();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dimensions_Author_Check_User_Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccessMessage('Document downloaded successfully as plain text (.txt)!');
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handlePrintPDF = () => {
    const textContent = generatePlainTextGuide();
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dimensions Author Check — User & Indicator Guide</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 20mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #1a202c;
              line-height: 1.5;
              padding: 24px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              font-size: 22px;
              font-weight: 800;
              color: #1f1a45;
              border-bottom: 2px solid #304e9d;
              padding-bottom: 6px;
              margin-bottom: 4px;
            }
            h2 {
              font-size: 16px;
              font-weight: 700;
              color: #1f1a45;
              background: #f1f5f9;
              padding: 6px 10px;
              border-left: 4px solid #40bbed;
              margin-top: 24px;
              margin-bottom: 12px;
              page-break-after: avoid;
            }
            h3 {
              font-size: 14px;
              font-weight: 700;
              color: #241e52;
              margin-top: 16px;
              margin-bottom: 6px;
            }
            p, li {
              font-size: 12px;
              color: #334155;
            }
            ul, ol {
              padding-left: 20px;
              margin: 6px 0;
            }
            li {
              margin-bottom: 4px;
            }
            .banner {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              padding: 10px 14px;
              border-radius: 6px;
              font-size: 11px;
              color: #92400e;
              margin-bottom: 18px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
              margin: 12px 0;
              page-break-inside: avoid;
            }
            th, td {
              border: 1px solid #cbd5e1;
              padding: 6px 8px;
              text-align: left;
            }
            th {
              background: #f8fafc;
              font-weight: 700;
            }
            .badge-orange {
              background: #f18900;
              color: #000;
              font-weight: bold;
              padding: 2px 6px;
              border-radius: 3px;
            }
            .badge-blue {
              background: #a0c4ff;
              color: #000;
              padding: 2px 6px;
              border-radius: 3px;
            }
            .footer {
              margin-top: 32px;
              padding-top: 12px;
              border-top: 1px solid #cbd5e1;
              font-size: 10px;
              color: #64748b;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>DIMENSIONS AUTHOR CHECK — USER & INDICATOR GUIDE</h1>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 12px;">Digital Science • Dimensions Author Check • October 2026</div>

          <div class="banner">
            <strong>AN INDICATOR IS NOT A VERDICT:</strong> An orange indicator is a prompt for a closer look, never an automated proof of misconduct. Always evaluate the context before drawing conclusions.
          </div>

          <h2>PART 1: START HERE — 4 SEQUENTIAL WORKFLOW STEPS</h2>
          
          <h3>Step 1: Find the Researcher</h3>
          <p>Search for scholars via Researcher Finder using one of three search methods:</p>
          <ul>
            <li><strong>1. Name + Affiliation (More Precise):</strong> Disambiguate common scholar names by adding past or current institution.</li>
            <li><strong>2. Dimensions Researcher ID or ORCID (Most Precise):</strong> Direct lookup with 100% exact profile resolution.</li>
            <li><strong>3. DOI or Dimensions Document ID (Co-authors):</strong> Check all co-authors on a submitted manuscript simultaneously.</li>
          </ul>

          <h3>Step 2: Review the Summary Indicators</h3>
          <p>Work from the top overview of the profile. Five indicators can turn orange when an atypical pattern is detected. Percentile of publication output is always grey for context.</p>

          <h3>Step 3: Investigate the Details</h3>
          <ul>
            <li><strong>1. Investigate Flagged Publications:</strong> Summary shows the most severe flag. Click any flag to reveal data source (Retraction Watch, Crossref, PPS), date, reason, and retraction taxonomy.</li>
            <li><strong>2. Co-authors Network:</strong> Examine collaborator strength and identify whether flagged partners are core team members or peripheral co-authors.</li>
            <li><strong>3. Drill into Self-Citations:</strong> See the publications behind a self-citation figure. Verify that researcher satisfies all 3 eligibility rules (active in last 2 years, &ge;5 eligible papers, &ge;9 references each). Outliers under the 80th percentile turn orange.</li>
          </ul>

          <h3>Step 4: Export Data</h3>
          <p>Download individual indicator tables or full researcher profiles as CSV or PDF. Maintain confidentiality and communicate findings responsibly.</p>

          <h2>PART 2: THE 6 INDICATORS DEEP DIVE & THRESHOLDS</h2>
          <table>
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Threshold Rule</th>
                <th>Color Trigger</th>
                <th>Context & Rationale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Percentile of Publication Output</strong></td>
                <td>Peer cohort ranking by ANZSRC field and career start</td>
                <td>Always Grey</td>
                <td>High productivity alone is not misconduct; establishes network context.</td>
              </tr>
              <tr>
                <td><strong>2. Flagged Publications</strong></td>
                <td>Retractions, Notices of Concern, Tortured Phrases</td>
                <td>Orange if &ge; 1</td>
                <td>Prompts review to distinguish honest self-corrections from paper mill fraud.</td>
              </tr>
              <tr>
                <td><strong>3. Self-citations</strong></td>
                <td>Unusual absence (&lt; 80th percentile threshold)</td>
                <td>Orange if &lt; threshold</td>
                <td>Requires &ge;5 eligible papers with &ge;9 refs. Early career scholars stay grey.</td>
              </tr>
              <tr>
                <td><strong>4. Unusual Network Flag</strong></td>
                <td>Disconnected co-author cluster graph topology</td>
                <td>Orange if detected</td>
                <td>Rare (~0.01% prevalence) but carries 100x statistical risk of retractions.</td>
              </tr>
              <tr>
                <td><strong>5. Co-authors with Network Flags</strong></td>
                <td>Collaborators with unusual cluster flags</td>
                <td>Orange if &ge; 1 co-author</td>
                <td>Screens for indirect connection to commercial paper mill syndicates.</td>
              </tr>
              <tr>
                <td><strong>6. Co-authors with Flagged Publications</strong></td>
                <td>Percentage of co-authors with retractions</td>
                <td>Orange if &ge; 20%</td>
                <td>20% threshold prevents false alarms since ~30% of scholars have 1 flagged co-author.</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            Dimensions Author Check &bull; Digital Science &bull; Published for Academic Integrity Evaluation
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl text-slate-800 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Download Quick Start Guide (HTML/PDF/Text)
              </h3>
              <p className="text-xs text-slate-600">
                Step-by-step workflow &amp; indicator reference
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
          <p>
            This download compiles the complete contents of both the <strong>Start Here</strong> core workflow (all 4 steps, search methods, investigations, and export rules) and <strong>The 6 Indicators Deep Dive</strong> (thresholds, formulas, peer cohort rules, and prevalence benchmarks) into a clean traditional document format.
          </p>
        </div>

        {/* Success message */}
        {downloadSuccessMessage && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={handleDownloadHtml}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-sky-300 text-left transition-all group flex flex-col justify-between shadow-2xs hover:border-sky-500"
          >
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-4 h-4 text-sky-600" />
              <span className="text-[10px] font-mono uppercase bg-sky-100 px-1.5 py-0.5 rounded text-sky-800 font-bold border border-sky-200">
                .HTML
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 group-hover:text-sky-700">
                Download as HTML
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Portable standalone webpage; opens offline in any browser.
              </div>
            </div>
          </button>

          <button
            onClick={handlePrintPDF}
            className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 border border-amber-300 text-left transition-all text-slate-900 flex flex-col justify-between shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <Printer className="w-4 h-4 text-slate-900" />
              <span className="text-[10px] font-mono uppercase bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 font-bold">
                PRINT / PDF
              </span>
            </div>
            <div>
              <div className="font-black text-xs text-slate-900">
                Print / Save as PDF
              </div>
              <div className="text-[11px] text-slate-800 font-medium mt-0.5">
                Opens clean printable report to save via browser PDF.
              </div>
            </div>
          </button>

          <button
            onClick={handleDownloadText}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <span className="text-[10px] font-mono uppercase bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 border border-slate-300">
                .TXT
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 group-hover:text-sky-700">
                Download as Text
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Plain text file formatted for offline reading &amp; notes.
              </div>
            </div>
          </button>
        </div>

        {/* Close Button */}
        <div className="pt-2 text-right border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
