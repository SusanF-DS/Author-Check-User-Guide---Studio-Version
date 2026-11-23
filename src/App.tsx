import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TableOfContentsSidebar, SectionId } from './components/TableOfContentsSidebar';
import { UserGuideView } from './components/UserGuideView';
import { IndicatorDeepDive } from './components/IndicatorDeepDive';
import { TaxonomyAndTerminology } from './components/TaxonomyAndTerminology';
import { DataSourcesFlow } from './components/DataSourcesFlow';
import { TroubleshootingFAQ } from './components/TroubleshootingFAQ';
import { IndicatorSimulator } from './components/IndicatorSimulator';
import { GlossaryModal } from './components/GlossaryModal';
import { GuideDownloadModal } from './components/GuideDownloadModal';
import { InStepIndicatorDrawer } from './components/InStepIndicatorDrawer';
import { GLOSSARY_TERMS, INDICATORS, RETRACTION_TAXONOMIES } from './data/guideData';
import { Search } from 'lucide-react';

export type TabType = 
  | 'workflow' 
  | 'indicators' 
  | 'taxonomy-terms' 
  | 'datasources' 
  | 'troubleshooting' 
  | 'examples';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('workflow');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isMobileTOCOpen, setIsMobileTOCOpen] = useState<boolean>(false);
  const [quickDrawerIndicatorId, setQuickDrawerIndicatorId] = useState<string | null>(null);

  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isDownloadGuideOpen, setIsDownloadGuideOpen] = useState(false);
  const [targetGlossaryTermId, setTargetGlossaryTermId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenGlossary = (termId?: string) => {
    setTargetGlossaryTermId(termId || null);
    setIsGlossaryOpen(true);
  };

  // Quick search matching across terminology, indicators, and taxonomies
  const matchingTerms = searchQuery.trim()
    ? Object.values(GLOSSARY_TERMS).filter(t => 
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.plainEnglish.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingIndicators = searchQuery.trim()
    ? INDICATORS.filter(i => 
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.howItWorks.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingTaxonomies = searchQuery.trim()
    ? RETRACTION_TAXONOMIES.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.retractionWatchReasons.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const hasSearchResults = searchQuery.trim().length > 0;

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (section: SectionId) => {
    if (section === 'workflow-1') {
      setActiveTab('workflow');
      setActiveStep(1);
    } else if (section === 'workflow-2') {
      setActiveTab('workflow');
      setActiveStep(2);
    } else if (section === 'workflow-3') {
      setActiveTab('workflow');
      setActiveStep(3);
    } else if (section === 'workflow-4') {
      setActiveTab('workflow');
      setActiveStep(4);
    } else {
      setActiveTab(section as TabType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Top Utility Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenDownloadGuide={() => setIsDownloadGuideOpen(true)}
        onOpenQuickDrawer={() => setQuickDrawerIndicatorId('ind-1')}
        onToggleMobileTOC={() => setIsMobileTOCOpen(true)}
      />

      {/* Main 2-Column Documentation Canvas */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex">
        {/* Table of Contents Sticky Sidebar */}
        <TableOfContentsSidebar
          activeTab={activeTab}
          activeStep={activeStep}
          onSelectSection={handleSelectSection}
          onOpenDownloadGuide={() => setIsDownloadGuideOpen(true)}
          onOpenQuickDrawer={() => setQuickDrawerIndicatorId('ind-1')}
          isMobileOpen={isMobileTOCOpen}
          onCloseMobile={() => setIsMobileTOCOpen(false)}
        />

        {/* Focused Reading Pane */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Global Search Results Overlay (If user is typing in search) */}
          {hasSearchResults && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-300 shadow-xl space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-bold text-slate-900">
                    Search Results for &ldquo;{searchQuery}&rdquo;
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Clear Search
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Terminology matches */}
                <div className="space-y-2">
                  <span className="font-condensed uppercase tracking-wider text-[11px] font-bold text-sky-700 block">
                    Terminology ({matchingTerms.length})
                  </span>
                  {matchingTerms.length === 0 ? (
                    <p className="text-slate-400 italic">No matching terms</p>
                  ) : (
                    matchingTerms.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          handleOpenGlossary(t.id);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 block transition-colors"
                      >
                        <div className="font-bold text-slate-900 text-xs">{t.term}</div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">{t.plainEnglish}</div>
                      </button>
                    ))
                  )}
                </div>

                {/* Indicator matches */}
                <div className="space-y-2">
                  <span className="font-condensed uppercase tracking-wider text-[11px] font-bold text-orange-700 block">
                    Indicators ({matchingIndicators.length})
                  </span>
                  {matchingIndicators.length === 0 ? (
                    <p className="text-slate-400 italic">No matching indicators</p>
                  ) : (
                    matchingIndicators.map(i => (
                      <button
                        key={i.id}
                        onClick={() => {
                          handleSelectTab('indicators');
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 block transition-colors"
                      >
                        <div className="font-bold text-slate-900 text-xs">Indicator {i.number}: {i.name}</div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">{i.question}</div>
                      </button>
                    ))
                  )}
                </div>

                {/* Taxonomy matches */}
                <div className="space-y-2">
                  <span className="font-condensed uppercase tracking-wider text-[11px] font-bold text-purple-700 block">
                    Retraction Taxonomy ({matchingTaxonomies.length})
                  </span>
                  {matchingTaxonomies.length === 0 ? (
                    <p className="text-slate-400 italic">No matching taxonomies</p>
                  ) : (
                    matchingTaxonomies.map(tax => (
                      <button
                        key={tax.id}
                        onClick={() => {
                          handleSelectTab('taxonomy-terms');
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 block transition-colors"
                      >
                        <div className="font-bold text-slate-900 text-xs">{tax.name}</div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">{tax.summary}</div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content Display */}
          <div className="space-y-6">
            {activeTab === 'workflow' && (
              <UserGuideView
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onNavigateTab={handleSelectTab}
                onOpenGlossary={handleOpenGlossary}
                onOpenDownloadGuide={() => setIsDownloadGuideOpen(true)}
              />
            )}

            {activeTab === 'indicators' && (
              <IndicatorDeepDive onOpenGlossary={handleOpenGlossary} />
            )}

            {activeTab === 'taxonomy-terms' && (
              <TaxonomyAndTerminology />
            )}

            {activeTab === 'datasources' && (
              <DataSourcesFlow onOpenGlossary={handleOpenGlossary} />
            )}

            {activeTab === 'troubleshooting' && (
              <TroubleshootingFAQ />
            )}

            {activeTab === 'examples' && (
              <IndicatorSimulator onOpenGlossary={handleOpenGlossary} />
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500 text-center space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <span className="font-bold text-slate-900 font-sans">Dimensions Author Check User Guide</span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Comprehensive Reference &bull; Last updated October 2026 &bull; Figures describe November 2025 statistics
            </p>
          </div>
          <div className="text-[11px] text-slate-500 max-w-md text-right sm:text-right">
            Disclaimer: Information is sourced from Dimensions Author Check and does not determine misconduct by itself. A highlight indicates &ldquo;worth a closer look.&rdquo;
          </div>
        </div>
      </footer>

      {/* Global In-Step Indicator Drawer */}
      <InStepIndicatorDrawer
        indicatorId={quickDrawerIndicatorId}
        onClose={() => setQuickDrawerIndicatorId(null)}
        onNavigateFullTab={(tabId) => {
          handleSelectTab(tabId);
          setQuickDrawerIndicatorId(null);
        }}
        onOpenGlossary={(termId) => {
          handleOpenGlossary(termId);
        }}
      />

      {/* Global Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialTermId={targetGlossaryTermId}
      />

      {/* Guide Download Modal (HTML, Text & Printable PDF) */}
      <GuideDownloadModal
        isOpen={isDownloadGuideOpen}
        onClose={() => setIsDownloadGuideOpen(false)}
      />
    </div>
  );
}
