import React from 'react';
import { 
  BarChart3, 
  GitBranch, 
  Database, 
  HelpCircle, 
  Sliders, 
  BookOpen, 
  PlayCircle,
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export type SectionId = 
  | 'workflow-1' 
  | 'workflow-2' 
  | 'workflow-3' 
  | 'workflow-4' 
  | 'indicators' 
  | 'taxonomy-terms' 
  | 'datasources' 
  | 'troubleshooting' 
  | 'examples';

interface TableOfContentsSidebarProps {
  activeTab: string;
  activeStep: number;
  onSelectSection: (section: SectionId) => void;
  onOpenDownloadGuide?: () => void;
  onOpenQuickDrawer?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const TableOfContentsSidebar: React.FC<TableOfContentsSidebarProps> = ({
  activeTab,
  activeStep,
  onSelectSection,
  onOpenDownloadGuide,
  onOpenQuickDrawer,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const isWorkflow = activeTab === 'workflow';

  const quickStartSteps = [
    { 
      id: 'workflow-1' as SectionId, 
      stepNum: 1, 
      label: '1. Find the Researcher', 
      subtitle: 'Search, filters & select profile',
      isActive: isWorkflow && activeStep === 1
    },
    { 
      id: 'workflow-2' as SectionId, 
      stepNum: 2, 
      label: '2. Review Summary Indicators', 
      subtitle: 'Triage orange highlights & roles',
      isActive: isWorkflow && activeStep === 2
    },
    { 
      id: 'workflow-3' as SectionId, 
      stepNum: 3, 
      label: '3. Investigate Details', 
      subtitle: 'Flagged papers, network & citations',
      isActive: isWorkflow && activeStep === 3
    },
    { 
      id: 'workflow-4' as SectionId, 
      stepNum: 4, 
      label: '4. Export Data', 
      subtitle: 'Download dossiers & guidelines',
      isActive: isWorkflow && activeStep === 4
    },
  ];

  const technicalSections = [
    { 
      id: 'indicators' as SectionId, 
      label: 'The 6 Indicators Deep Dive', 
      subtitle: 'Formulas, cohorts & thresholds',
      icon: <BarChart3 className="w-4 h-4 text-[#ea580c]" />,
      isActive: activeTab === 'indicators'
    },
    { 
      id: 'taxonomy-terms' as SectionId, 
      label: 'Taxonomy & Terminology', 
      subtitle: 'Retraction causes & glossary',
      icon: <GitBranch className="w-4 h-4 text-purple-600" />,
      isActive: activeTab === 'taxonomy-terms'
    },
    { 
      id: 'datasources' as SectionId, 
      label: 'Data Sources & Indexing', 
      subtitle: 'Dimensions, Retraction Watch & PPS',
      icon: <Database className="w-4 h-4 text-sky-600" />,
      isActive: activeTab === 'datasources'
    },
    { 
      id: 'troubleshooting' as SectionId, 
      label: "Tips, FAQs & Role Screening", 
      subtitle: 'Checklists & rules of thumb',
      icon: <HelpCircle className="w-4 h-4 text-emerald-600" />,
      isActive: activeTab === 'troubleshooting'
    },
    { 
      id: 'examples' as SectionId, 
      label: 'Interactive Scenarios', 
      subtitle: 'Simulate researcher profiles',
      icon: <Sliders className="w-4 h-4 text-amber-600" />,
      isActive: activeTab === 'examples'
    },
  ];

  const handleItemClick = (sectionId: SectionId) => {
    onSelectSection(sectionId);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 text-slate-800">
      {/* TOC Header */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
            <BookOpen className="w-4 h-4 text-[#0284c7]" />
            <span>Table of Contents</span>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-xs text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 border border-slate-200"
            >
              Close
            </button>
          )}
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Dimensions Author Check Guide
        </p>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-6 text-xs">
        
        {/* SECTION 1: QUICK START */}
        <div className="space-y-2">
          <div className="px-2 flex items-center justify-between">
            <span className="text-[10px] font-condensed uppercase tracking-wider font-extrabold text-sky-700">
              Part I: Quick Start Guide
            </span>
            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
              Core Steps
            </span>
          </div>

          <div className="space-y-1">
            {quickStartSteps.map((step) => {
              return (
                <button
                  key={step.id}
                  onClick={() => handleItemClick(step.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                    step.isActive
                      ? 'bg-white text-sky-950 shadow-sm border border-sky-400 ring-1 ring-sky-300 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 font-mono ${
                    step.isActive 
                      ? 'bg-sky-600 text-white' 
                      : 'bg-slate-200 text-slate-700 border border-slate-300'
                  }`}>
                    {step.stepNum}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs leading-tight">
                      {step.label}
                    </div>
                    <div className={`text-[10px] mt-0.5 truncate ${
                      step.isActive ? 'text-sky-700 font-normal' : 'text-slate-500'
                    }`}>
                      {step.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: TECHNICAL REFERENCE (No Appendix badge) */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="px-2 flex items-center justify-between">
            <span className="text-[10px] font-condensed uppercase tracking-wider font-extrabold text-slate-700">
              Part II: Technical Reference
            </span>
          </div>

          <div className="space-y-1">
            {technicalSections.map((sec) => {
              return (
                <button
                  key={sec.id}
                  onClick={() => handleItemClick(sec.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                    sec.isActive
                      ? 'bg-white text-slate-950 shadow-sm border border-slate-400 ring-1 ring-slate-300 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {sec.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs leading-tight">
                      {sec.label}
                    </div>
                    <div className={`text-[10px] mt-0.5 truncate ${
                      sec.isActive ? 'text-slate-700 font-normal' : 'text-slate-500'
                    }`}>
                      {sec.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Tools & Action Box */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-[11px] shadow-sm">
          <span className="font-bold text-slate-600 block text-[10px] uppercase tracking-wider font-mono">
            Quick Tools
          </span>

          {onOpenQuickDrawer && (
            <button
              onClick={() => {
                onOpenQuickDrawer();
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full text-left px-2.5 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
                <span>6 Indicators</span>
              </div>
              <ChevronRight className="w-3 h-3 text-orange-400" />
            </button>
          )}

          {onOpenDownloadGuide && (
            <button
              onClick={() => {
                onOpenDownloadGuide();
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full text-left px-2.5 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>Download Guide</span>
              </div>
              <span className="text-[9px] uppercase px-1 rounded bg-sky-200 text-sky-900 font-bold">PDF/HTML</span>
            </button>
          )}

          <a
            href="https://app.storylane.io/share/pef17sbcf2g6?chapter=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left px-2.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <PlayCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Watch Demo Walkthrough</span>
            </div>
            <ExternalLink className="w-3 h-3 text-amber-600/70" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] z-20">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
