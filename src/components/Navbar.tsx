import React from 'react';
import { 
  Search,
  Download,
  Menu,
  BarChart3
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenDownloadGuide?: () => void;
  onOpenQuickDrawer?: () => void;
  onToggleMobileTOC?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenDownloadGuide,
  onOpenQuickDrawer,
  onToggleMobileTOC
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Left: Mobile TOC Toggle & Brand */}
        <div className="flex items-center gap-3">
          {onToggleMobileTOC && (
            <button
              onClick={onToggleMobileTOC}
              className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Open Table of Contents"
            >
              <Menu className="w-4 h-4 text-sky-600" />
              <span className="hidden sm:inline">Contents</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight font-sans">
                DIMENSIONS AUTHOR CHECK
              </span>
              <span className="text-[10px] font-condensed tracking-wider uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 font-bold hidden sm:inline">
                User Guide
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Quick Start Workflow &bull; Indicator Guidance &bull; Technical Reference
            </p>
          </div>
        </div>

        {/* Center/Right: Search, 6 Indicators, Download */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end max-w-xl">
          <div className="relative w-full max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guide & terminology..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 shadow-2xs"
            />
          </div>

          {onOpenQuickDrawer && (
            <button
              onClick={onOpenQuickDrawer}
              className="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold hidden md:flex items-center gap-1.5 transition-all shadow-xs"
              title="Quick reference for the 6 indicators"
            >
              <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
              <span>6 Indicators</span>
            </button>
          )}

          {onOpenDownloadGuide && (
            <button
              onClick={onOpenDownloadGuide}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-[#ffbc00] hover:bg-yellow-400 text-[#181438] text-xs font-black flex items-center gap-1.5 transition-all shadow-xs font-condensed uppercase tracking-wider"
              title="Download step-by-step user guide as HTML, PDF, or Text"
            >
              <Download className="w-3.5 h-3.5 text-[#181438]" />
              <span className="hidden sm:inline">Download Guide</span>
              <span className="sm:hidden">PDF</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
