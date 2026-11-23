import React, { useState } from 'react';
import { 
  SEARCH_METHODS, 
  SEARCH_FILTERS, 
  ROLE_SCREENING_GUIDES, 
  RoleScreeningGuide 
} from '../data/userGuideData';
import { INDICATORS } from '../data/guideData';
import { TerminologyTooltip } from './TerminologyTooltip';
import { SelectingResearcherProfileGraphic } from './SelectingResearcherProfileGraphic';
import { SummaryIndicatorsGraphic } from './SummaryIndicatorsGraphic';
import { FlaggedPubs1Graphic } from './FlaggedPubs1Graphic';
import { FlaggedPubs2Graphic } from './FlaggedPubs2Graphic';
import { CoAuthorsGraphic } from './CoAuthorsGraphic';
import { SelfCiteDetailsGraphic } from './SelfCiteDetailsGraphic';
import { InStepIndicatorDrawer } from './InStepIndicatorDrawer';
import { 
  Search, 
  Users, 
  UserCheck, 
  FileText, 
  Download, 
  ExternalLink, 
  PlayCircle, 
  ArrowRight, 
  AlertTriangle, 
  Filter, 
  HelpCircle,
  BarChart3,
  GitBranch,
  FileWarning,
  Quote
} from 'lucide-react';

export const CATEGORY_MAP = {
  workflow: {
    key: 'workflow',
    label: 'Core Workflow & Search',
    short: 'Core Workflow',
    colorHex: '#0284c7',
    badgeClass: 'bg-sky-50 text-sky-700 border border-sky-200 font-bold uppercase',
    dotClass: 'bg-sky-600',
    borderClass: 'border-l-4 border-sky-600',
    bgLight: 'bg-sky-50',
    textClass: 'text-sky-700',
  },
  indicators: {
    key: 'indicators',
    label: 'Indicators & Metrics',
    short: 'Indicators & Metrics',
    colorHex: '#d97706',
    badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200 font-bold uppercase',
    dotClass: 'bg-amber-500',
    borderClass: 'border-l-4 border-amber-500',
    bgLight: 'bg-amber-50',
    textClass: 'text-amber-800',
  },
  taxonomy: {
    key: 'taxonomy',
    label: 'Taxonomy & Data Sources',
    short: 'Taxonomy & Data',
    colorHex: '#7e22ce',
    badgeClass: 'bg-purple-50 text-purple-700 border border-purple-200 font-bold uppercase',
    dotClass: 'bg-purple-600',
    borderClass: 'border-l-4 border-purple-600',
    bgLight: 'bg-purple-50',
    textClass: 'text-purple-700',
  },
  guidance: {
    key: 'guidance',
    label: 'Role Guidance & Best Practices',
    short: 'Role Guidance',
    colorHex: '#059669',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase',
    dotClass: 'bg-emerald-600',
    borderClass: 'border-l-4 border-emerald-600',
    bgLight: 'bg-emerald-50',
    textClass: 'text-emerald-700',
  },
} as const;

interface UserGuideViewProps {
  activeStep?: number;
  onStepChange?: (step: number) => void;
  onNavigateTab: (tabId: 'workflow' | 'indicators' | 'taxonomy-terms' | 'datasources' | 'troubleshooting' | 'examples') => void;
  onOpenGlossary: (termId?: string) => void;
  onOpenDownloadGuide?: () => void;
}

export const UserGuideView: React.FC<UserGuideViewProps> = ({
  activeStep: propActiveStep,
  onStepChange,
  onNavigateTab,
  onOpenGlossary,
  onOpenDownloadGuide
}) => {
  const [internalActiveStep, setInternalActiveStep] = useState<number>(1);
  const activeStep = propActiveStep !== undefined ? propActiveStep : internalActiveStep;
  const [selectedRole, setSelectedRole] = useState<'Author' | 'Peer Reviewer' | 'Editor'>('Author');
  const [selectedDrawerIndicatorId, setSelectedDrawerIndicatorId] = useState<string | null>(null);

  const handleStepChange = (step: number) => {
    if (onStepChange) {
      onStepChange(step);
    } else {
      setInternalActiveStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tabId: 'workflow' | 'indicators' | 'taxonomy-terms' | 'datasources' | 'troubleshooting' | 'examples') => {
    onNavigateTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentRoleGuide: RoleScreeningGuide = 
    ROLE_SCREENING_GUIDES.find(r => r.role === selectedRole) || ROLE_SCREENING_GUIDES[0];

  const stepsList = [
    { 
      step: 1, 
      title: '1. Find the Researcher', 
      subtitle: 'Search, filter, open profile'
    },
    { 
      step: 2, 
      title: '2. Review Summary Indicators', 
      subtitle: 'Triage orange highlights & screen by role'
    },
    { 
      step: 3, 
      title: '3. Investigate Details', 
      subtitle: 'Self-citations, flagged papers & co-authors'
    },
    { 
      step: 4, 
      title: '4. Export Data', 
      subtitle: 'Download tables & whole reports'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview & Quick Onboarding Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-600 font-bold">
              <span>PART I</span>
              <span>&bull;</span>
              <span>QUICK START WORKFLOW</span>
              <span>&bull;</span>
              <span className="text-slate-500 font-medium">4 SEQUENTIAL STEPS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dimensions Author Check &mdash; Quick Start Guide
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Screen researchers for potential research integrity flags based on prior retractions, unusual co-authorship networks, or publication volume. Follow the 4-step sequence below to find a researcher, triage their indicators, and document findings responsibly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <a
              href="https://app.storylane.io/share/pef17sbcf2g6?chapter=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm border border-amber-300 transition-all text-center"
            >
              <PlayCircle className="w-4 h-4 shrink-0 text-slate-900" />
              <span>Watch the Demo (5 min)</span>
            </a>

            {onOpenDownloadGuide && (
              <button
                onClick={onOpenDownloadGuide}
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 transition-colors text-center"
              >
                <Download className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Download Quick Start Guide</span>
              </button>
            )}
          </div>
        </div>

        {/* Compact Horizontal Step Navigation Rail */}
        <div className="pt-3 border-t border-slate-100 flex items-center overflow-x-auto scrollbar-none gap-2">
          {stepsList.map((s) => {
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => handleStepChange(s.step)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] font-mono ${
                  isActive ? 'bg-white text-sky-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  {s.step}
                </span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: FIND THE RESEARCHER */}
      {activeStep === 1 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase font-bold text-sky-600 tracking-wider">
                  Quick Start &bull; Step 1 of 4
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                1. Find the Researcher
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Open the Researcher Finder to search for one researcher or multiple researchers affiliated with an institution or listed on a manuscript.
              </p>
            </div>

            <a
              href="https://app.storylane.io/share/pef17sbcf2g6?chapter=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold shadow-sm border border-amber-300 flex items-center gap-1.5 shrink-0 transition-all"
            >
              <PlayCircle className="w-3.5 h-3.5 text-slate-900" />
              <span>Watch the Demo</span>
              <ExternalLink className="w-3 h-3 text-slate-900/70" />
            </a>
          </div>

          {/* Numbered Flow of Steps */}
          <div className="space-y-4">
            <span className="text-xs font-condensed uppercase font-bold text-slate-700 tracking-wider block">
              Step-by-Step Search Flow:
            </span>

            {/* 1. Open Author Check */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Open Author Check</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Log in at <span className="font-mono text-sky-600 font-semibold">dimensions.ai</span> and open Author Check from <strong>Apps</strong> in the left-hand navigation sidebar.
                </p>
              </div>
            </div>

            {/* 2. Three Ways to Find Someone */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-2 flex-1">
                <h4 className="text-sm font-bold text-slate-900">Choose Your Search Method</h4>
                <p className="text-xs text-slate-600">
                  Select the search method that fits the information you have available:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                  {SEARCH_METHODS.map((method, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-900 text-xs">{method.method}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                          {method.precision}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">{method.bestWhen}</p>
                      <p className="text-[10px] font-mono text-sky-600 pt-1 border-t border-slate-100 font-medium">
                        {method.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Filter Options & Screenshot */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-3 flex-1">
                <h4 className="text-sm font-bold text-slate-900">Apply Filters in Researcher Finder</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click <strong>Researcher finder</strong>, then <strong>Filter</strong>. You can enter Name, ORCID, Dimensions Researcher ID, Affiliation, DOI, or Document ID. Using multiple filters creates an &ldquo;AND&rdquo; search (all criteria must match).
                </p>

                {/* Screenshot Attachment Graphic */}
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-700">
                    <span className="font-condensed uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-sky-600" />
                      <span>Dimensions Author Check &mdash; Researcher Finder Filter Interface</span>
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">Filter Panel</span>
                  </div>
                  <img
                    src="/assets/aistudio/Researcher_Finder_Search_Filters_Screenshot_30b88560.png"
                    alt="Researcher Finder Search Filters interface showing Name, ORCID, Dimensions researcher ID, Affiliation, Affiliation filter type, DOI, and Dimensions document ID"
                    className="w-full h-auto object-contain max-h-[380px] bg-slate-50"
                  />
                </div>

                {/* Filter Quick Reference */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-1 text-[11px]">
                  {SEARCH_FILTERS.map((f, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="font-bold text-slate-900 block">{f.name}</span>
                      <span className="text-slate-600 text-[10px]">{f.purpose}</span>
                    </div>
                  ))}
                </div>

                {/* Watch the Demo link for Step 3 (chapter 2) */}
                <div className="pt-2 border-t border-slate-200">
                  <a
                    href="https://app.storylane.io/share/pef17sbcf2g6?chapter=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold shadow-xs border border-amber-300 transition-all"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-slate-900" />
                    <span>Watch the Demo: See filters in action</span>
                    <ExternalLink className="w-3 h-3 text-slate-900/70" />
                  </a>
                </div>
              </div>
            </div>

            {/* 4. Selecting the Researcher Profile (with Graphic) */}
            <div className="p-4 rounded-xl bg-slate-50 border-2 border-sky-300 flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Selecting the Researcher Profile</h4>
                  <span className="text-[10px] font-condensed uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    Confirm & Proceed
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once your search executes, the results list displays indicator details for each match—such as their institution affiliation, active publishing years, main fields of research (<TerminologyTooltip termKey="anzsrc" onOpenFullGlossary={onOpenGlossary}>ANZSRC Level 2</TerminologyTooltip>), and major grants. Use these details to confirm you have selected the right person, then <strong>click the researcher&apos;s name</strong> to open their complete profile report.
                </p>

                {/* Embedded Selecting_the_Researcher_Profile graphic */}
                <div className="pt-1">
                  <SelectingResearcherProfileGraphic />
                </div>

                {/* Alternative Start from Dimensions Search Tip */}
                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-slate-900">Alternative: Starting from a Standard Dimensions Search</span>
                    <a
                      href="https://app.storylane.io/share/pef17sbcf2g6?chapter=6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-900 text-[11px] font-bold shadow-xs transition-all"
                    >
                      <PlayCircle className="w-3 h-3 text-slate-900" />
                      <span>Watch the Demo: Start from a Dimensions Search</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    From search results, open the <strong>Researcher filter</strong> &rarr; click <em>&ldquo;View in Author Check&rdquo;</em>, or click any researcher name in <strong>Analytical Views</strong> &rarr; Researchers view.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                  <span className="text-xs text-slate-500">Ready to triage the report?</span>
                  <button
                    onClick={() => handleStepChange(2)}
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Proceed to Step 2: Review Summary Indicators</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW SUMMARY INDICATORS */}
      {activeStep === 2 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase font-bold text-sky-600 tracking-wider">
                  Quick Start &bull; Step 2 of 4
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                2. Review Summary Indicators
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Open the researcher profile. Work through it from the top: summary indicators first, then the detail behind any orange highlight.
              </p>
            </div>

            <div>
              <button
                onClick={() => handleNavigateTab('indicators')}
                className="px-3.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 flex items-center gap-1.5 transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
                <span>The 6 Indicators Deep Dive</span>
              </button>
            </div>
          </div>

          {/* Screenshot Summary_Indicators Added Before The Six Indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-condensed uppercase font-bold text-slate-800 tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span>Researcher Profile &mdash; Summary Indicators Interface</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Example Author Profile
              </span>
            </div>
            <SummaryIndicatorsGraphic />
          </div>

          {/* The 6 Indicators at a Glance Table with In-Step Drawer Triggers */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-condensed uppercase font-bold text-slate-900 tracking-wider">
                  The Six Indicators at a Glance:
                </span>
                <span className="text-[10px] font-condensed uppercase font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Click Any Row for Details
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Orange indicates &ldquo;worth a closer look&rdquo;
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700 bg-slate-50">
                    <th className="py-2.5 px-3 font-semibold">Indicator</th>
                    <th className="py-2.5 px-3 font-semibold">The question it answers</th>
                    <th className="py-2.5 px-3 font-semibold">Turns orange when</th>
                    <th className="py-2.5 px-3 font-semibold text-right">In-Step Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {INDICATORS.map((ind) => (
                    <tr 
                      key={ind.id} 
                      onClick={() => setSelectedDrawerIndicatorId(ind.id)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors group"
                      title={`Click to inspect Indicator ${ind.number} without leaving page`}
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-amber-700 border border-amber-300 font-mono text-[10px] flex items-center justify-center shrink-0">
                            {ind.number}
                          </span>
                          <span>{ind.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {ind.question}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                          ind.alwaysGrey
                            ? 'bg-slate-100 text-slate-500 border border-slate-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold'
                        }`}>
                          {ind.turnsOrangeWhen}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDrawerIndicatorId(ind.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <BarChart3 className="w-3 h-3 text-amber-700" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Direct Link to The 6 Indicators Tab */}
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-700">
                Want the full definitions, peer group calculations, and data sources for these indicators?
              </span>
              <button
                onClick={() => handleNavigateTab('indicators')}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold font-condensed uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-xs"
              >
                <span>The 6 Indicators Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Screening by Role Matrix */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-4 border-emerald-500 pl-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-condensed uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Role Guidance &amp; Best Practices
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Screening by Role</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Weigh what you find differently whether you are checking an author, a peer reviewer, or an editor.
                </p>
              </div>

              {/* Role selector tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['Author', 'Peer Reviewer', 'Editor'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedRole === role
                        ? 'bg-sky-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="text-sm font-bold text-slate-900">Guidelines for Screening an {currentRoleGuide.role}</span>
                  <p className="text-xs text-slate-500">{currentRoleGuide.targetAudience}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-sky-600" />
                    <span>What to look at first:</span>
                  </span>
                  <ul className="space-y-1.5 pl-1">
                    {currentRoleGuide.lookAtFirst.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2">
                  <span className="font-bold text-amber-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Keep in mind:</span>
                  </span>
                  <ul className="space-y-1.5 pl-1">
                    {currentRoleGuide.keepInMind.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-slate-700 space-y-1">
                  <span className="font-bold text-rose-800 block">Red Flags / Misconduct Signals:</span>
                  {currentRoleGuide.dangerSigns.map((d, idx) => (
                    <div key={idx} className="text-[11px] flex items-start gap-1">
                      <span className="text-rose-600 font-bold">&bull;</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-slate-700 space-y-1">
                  <span className="font-bold text-emerald-800 block">Reassurance & Integrity Signals:</span>
                  {currentRoleGuide.reassuranceSigns.map((r, idx) => (
                    <div key={idx} className="text-[11px] flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* The Four Principles of Using Results Responsibly */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 border-l-4 border-emerald-500 pl-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-condensed uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Role Guidance &amp; Best Practices
              </span>
              <span className="text-xs font-condensed uppercase font-bold text-slate-900 tracking-wider">
                Four Principles of Responsible Usage:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. A prompt, not a finding</span>
                <p className="text-slate-600 text-[11px]">
                  None of the indicators can determine misconduct by themselves.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. Read indicators together</span>
                <p className="text-slate-600 text-[11px]">
                  Multiple highlights that point the same way deserve more attention than one alone.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3. Look behind the number</span>
                <p className="text-slate-600 text-[11px]">
                  Open the flagged publications to see what type of flag it is, when it happened, and why.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">4. Absence &ne; clearance</span>
                <p className="text-slate-600 text-[11px]">
                  The retraction process is slow, and many problematic papers have not been reported.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 Bottom Navigation & Technical Reference Link */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleStepChange(1)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                &larr; Previous: 1. Find the Researcher
              </button>

              <button
                onClick={() => handleStepChange(3)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Proceed to Step 3 &mdash; 3. Investigate Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Technical Reference Companion Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold uppercase tracking-wider text-[11px] font-mono">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Technical Reference Companion</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Looking for the full mathematical derivations, peer cohort percentiles, and statistical distributions for these 6 indicators?
                </p>
              </div>
              <button
                onClick={() => handleNavigateTab('indicators')}
                className="shrink-0 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold flex items-center gap-1.5 transition-colors shadow-xs text-xs"
              >
                <span>The 6 Indicators Deep Dive</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: INVESTIGATE DETAILS */}
      {activeStep === 3 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase font-bold text-sky-600 tracking-wider">
                  Quick Start &bull; Step 3 of 4
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                3. Investigate Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Drill into self-citations, investigate flagged publications, and explore the co-author network.
              </p>
            </div>

            <a
              href="https://app.storylane.io/share/pef17sbcf2g6?chapter=4"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold shadow-sm border border-amber-300 flex items-center gap-1.5 shrink-0 transition-all"
            >
              <PlayCircle className="w-3.5 h-3.5 text-slate-900" />
              <span>Watch the Demo &mdash; Investigate the Details</span>
              <ExternalLink className="w-3 h-3 text-slate-900/70" />
            </a>
          </div>

          {/* 3 Detail Areas */}
          <div className="space-y-6">
            {/* Area 1: Investigate a Flagged Publication */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-700">
                      AREA 1 &bull; RETRACTIONS &amp; FLAGS
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-amber-600" />
                    <span>1. Investigate a Flagged Publication</span>
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedDrawerIndicatorId('ind-2')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Indicator 2</span>
                  </button>
                  <button
                    onClick={() => handleNavigateTab('taxonomy-terms')}
                    className="text-xs text-purple-700 hover:text-purple-900 hover:underline font-medium flex items-center gap-1 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200"
                  >
                    <span>Taxonomy &amp; Terminology</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                The flagged publications table lists the researcher&apos;s flagged publications and shows the most serious or important flag for each. When a publication has multiple flags (for example, tortured phrases detected by PPS, followed by an expression of concern, and later a retraction), the table displays the retraction.
              </p>

              {/* Graphic 1: Flagged_Pubs_1 with Caption */}
              <div className="space-y-1.5 pt-1">
                <FlaggedPubs1Graphic />
                <p className="text-xs text-slate-600 font-medium italic pl-1">
                  The flagged publications table shows the most serious flag for each publication.
                </p>
              </div>

              {/* Graphic 2: Flagged_Pubs_2 with Caption */}
              <div className="space-y-1.5 pt-2">
                <FlaggedPubs2Graphic />
                <p className="text-xs text-slate-600 font-medium italic pl-1">
                  Clicking a flag lists every flag, with data source, date, reason and retraction taxonomy
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-slate-900 block">How to see every flag on a publication:</span>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  <li>Open the researcher profile.</li>
                  <li>Find the publication in the <strong>Flagged publications table</strong>.</li>
                  <li><strong>Click the flag badge</strong>. A pop-up list opens showing every flag, plus data source, date, reason, and mapped retraction taxonomy.</li>
                </ol>
              </div>
            </div>

            {/* Area 2: Explore Co-Authors & Collaboration Strength */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-800">
                      AREA 2 &bull; COLLABORATION NETWORK
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>2. Explore the Co-Authors Table</span>
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedDrawerIndicatorId('ind-4')}
                    className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold"
                  >
                    Indicator 4
                  </button>
                  <button
                    onClick={() => setSelectedDrawerIndicatorId('ind-5')}
                    className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold"
                  >
                    Indicator 5
                  </button>
                  <button
                    onClick={() => setSelectedDrawerIndicatorId('ind-6')}
                    className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold"
                  >
                    Indicator 6
                  </button>
                  <button
                    onClick={() => handleNavigateTab('examples')}
                    className="text-xs text-sky-600 hover:underline font-medium"
                  >
                    Interactive Scenarios &rarr;
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                The co-authors table reveals who the researcher collaborates with. <strong>Strength of collaboration</strong> is the number of times the selected researcher is named alongside each co-author on publications in Dimensions.
              </p>

              {/* Co-Authors Graphic */}
              <div className="pt-1">
                <CoAuthorsGraphic />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">What to look for:</span>
                  <p className="text-slate-600 text-[11px]">
                    Identify co-authors with unusual network flags or flagged publications. Check whether flagged collaborators are central lab colleagues (high strength) or peripheral co-authors.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Table Controls:</span>
                  <p className="text-slate-600 text-[11px]">
                    Sort any table by clicking the column header arrows. Re-order columns by dragging and dropping them across the view.
                  </p>
                </div>
              </div>
            </div>

            {/* Area 3: Drill into Self-Citations */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-700">
                      AREA 3 &bull; CITATION BEHAVIOR
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-emerald-600" />
                    <span>3. Drill into Self-Citations</span>
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedDrawerIndicatorId('ind-3')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Indicator 3</span>
                  </button>
                  <button
                    onClick={() => handleNavigateTab('indicators')}
                    className="text-xs text-sky-600 hover:underline font-medium"
                  >
                    The 6 Indicators Deep Dive &rarr;
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-slate-900">
                  See the publications behind a self-citation figure
                </h5>
                <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-600">
                  <li>Go to the top overview of the researcher profile.</li>
                  <li>Click the self-citation percentages.</li>
                  <li>Click the link to show the overview.</li>
                </ol>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Where:</span>
                    <span className="text-slate-700">Top overview of the researcher profile, self-citation percentages</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Result:</span>
                    <span className="text-slate-700">A drill-down shows all publications, whether each is eligible for the analysis, and whether it is a self-citation.</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Screenshot with Highlights */}
              <div className="pt-2">
                <SelfCiteDetailsGraphic />
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <span className="font-bold text-slate-900 block">Self-Citation Verification Rules:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                  <li><strong>Eligibility Gate:</strong> Only evaluated for scholars with at least 5 eligible publications (each having &ge;9 references) and activity in the last 2 years.</li>
                  <li><strong>Early Career Researchers:</strong> If an author has fewer than 5 eligible papers, Indicator 3 remains Neutral (Grey) to avoid false penalties.</li>
                  <li><strong>Threshold:</strong> Highlights in Orange only if the self-citation percentage falls below the discipline&apos;s 80th percentile threshold (typically &lt;2%).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 Bottom Navigation & Technical Reference Link */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleStepChange(2)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                &larr; Previous: 2. Review Summary Indicators
              </button>

              <button
                onClick={() => handleStepChange(4)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Proceed to Step 4 &mdash; 4. Export Data</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Technical Reference Companion Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-purple-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-purple-800 font-bold uppercase tracking-wider text-[11px] font-mono">
                  <GitBranch className="w-3.5 h-3.5 text-purple-600" />
                  <span>Technical Reference Companion</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Looking for the complete taxonomy of retraction causes (Author Integrity, Unreliable Data, Publisher Error, Paper Mills) and glossary?
                </p>
              </div>
              <button
                onClick={() => handleNavigateTab('taxonomy-terms')}
                className="shrink-0 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs text-xs"
              >
                <span>Taxonomy &amp; Terminology</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: EXPORT DATA */}
      {activeStep === 4 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase font-bold text-sky-600 tracking-wider">
                  Quick Start &bull; Step 4 of 4
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                4. Export Data
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Download reports as PDF or CSV, observe drill-down limits, and document findings responsibly.
              </p>
            </div>

            <a
              href="https://app.storylane.io/share/pef17sbcf2g6?chapter=5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold shadow-sm border border-amber-300 flex items-center gap-1.5 shrink-0 transition-all"
            >
              <PlayCircle className="w-3.5 h-3.5 text-slate-900" />
              <span>Watch the Demo &mdash; Export Data</span>
              <ExternalLink className="w-3 h-3 text-slate-900/70" />
            </a>
          </div>

          {/* Exporting Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>Download a Single Tile or Table:</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Some tiles can be downloaded individually. Select the <strong>three vertical dots</strong> on the tile, choose <em>Download data</em>, then select PDF or CSV. Advanced options give more control over what you download.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Where: Three vertical dots on the tile menu
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Download an Entire Profile Page:</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Select the <strong>three dots at the top right of the dashboard</strong>, then click <em>Download</em>. Choose between PDF or CSV format to export the entire dossier.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Where: Three dots, top right of the dashboard
              </div>
            </div>
          </div>

          {/* Drill-down Limits & FAQ link */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Drill-Down Result Limit (500 Records):</span>
              </span>
              <button
                onClick={() => handleNavigateTab('troubleshooting')}
                className="text-sky-600 hover:underline font-medium"
              >
                Tips, FAQs & Role Screening &rarr;
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Drill-downs are limited to a maximum of <strong>500 results</strong> to preserve system and browser performance. If an export cuts off, filter by a shorter publication timeframe or export tables individually.
            </p>
          </div>

          {/* Disclaimer & Responsible Use Directives */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 block">Responsible Documentation Reminder:</span>
            <p className="text-slate-600 leading-relaxed">
              Always state in external communications that data in Dimensions Author Check is publicly sourced and does not imply that anyone has done anything wrong. None of the indicators can determine misconduct by themselves.
            </p>
          </div>

          {/* Step 4 Bottom Navigation & Reference Links */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleStepChange(3)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                &larr; Previous: 3. Investigate Details
              </button>

              <button
                onClick={() => handleStepChange(1)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Return to 1. Find the Researcher &circlearrowleft;
              </button>
            </div>

            {/* Technical Reference Companion Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase tracking-wider text-[11px] font-mono">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Technical Reference: Checklists &amp; Scenarios</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Need role screening checklists or want to practice with interactive researcher profiles?
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigateTab('troubleshooting')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-xs text-xs"
                >
                  <span>Tips, FAQs & Role Screening</span>
                </button>
                <button
                  onClick={() => handleNavigateTab('examples')}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors shadow-xs text-xs"
                >
                  <span>Interactive Scenarios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Step Indicator Slide-Over Drawer */}
      <InStepIndicatorDrawer
        indicatorId={selectedDrawerIndicatorId}
        onClose={() => setSelectedDrawerIndicatorId(null)}
        onNavigateFullTab={handleNavigateTab}
        onOpenGlossary={onOpenGlossary}
      />
    </div>
  );
};
