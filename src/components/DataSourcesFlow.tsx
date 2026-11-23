import React from 'react';
import { DATA_SOURCES } from '../data/guideData';
import { TerminologyTooltip } from './TerminologyTooltip';
import { 
  Database, 
  Layers, 
  Sparkles, 
  Flame,
  ArrowDown,
  Info
} from 'lucide-react';

interface DataSourcesFlowProps {
  onOpenGlossary?: (term: string) => void;
}

export const DataSourcesFlow: React.FC<DataSourcesFlowProps> = ({ onOpenGlossary }) => {
  const ladderTiers = [
    {
      tier: 1,
      name: 'Problematic Paper Screener (PPS)',
      flagType: 'Tortured Phrases & Citejacked References',
      status: 'Early-Warning Fingerprint',
      role: 'Flags automated paraphrasing and predatory journal citations years before publisher inquiry.',
      badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200'
    },
    {
      tier: 2,
      name: 'Publisher Notice (CrossRef / PubMed)',
      flagType: 'Expression of Concern',
      status: 'Interim Editorial Warning',
      role: 'Publisher or editorial board alerts readers of potential data reliability issues under investigation.',
      badgeColor: 'bg-sky-50 text-sky-800 border border-sky-200'
    },
    {
      tier: 3,
      name: 'PubMed & CrossRef Registry',
      flagType: 'Publisher Retraction Notice',
      status: 'Formal Retraction',
      role: 'Journal confirms article withdrawal in bibliographic indexing.',
      badgeColor: 'bg-rose-50 text-rose-800 border border-rose-200'
    },
    {
      tier: 4,
      name: 'Retraction Watch Curated Database',
      flagType: 'Retraction with Taxonomy Metadata (Top Display)',
      status: 'Most Severe with Full Reasons',
      role: 'Author Check prioritizes this flag because it contains standardized taxonomy reasons, author agreement, and full dates.',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                <Database className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Data Sources & Indexing
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Why Dimensions Author Check compiles data from five complementary sources to find atypical events.
            </p>
          </div>

          <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-sky-800 font-semibold shrink-0">
            Total Multi-Source Ingestion: ~200,000+ flagged records
          </div>
        </div>
      </div>

      {/* The 5 Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {DATA_SOURCES.map((src) => (
          <div
            key={src.id}
            className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-3 hover:border-sky-300 transition-colors shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">Flag Source</span>
                <span className="font-mono text-xs font-bold text-emerald-700">
                  {src.approxPubs}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {src.name}
              </h4>
              <p className="text-[11px] text-sky-700 font-mono mt-0.5 font-medium">
                {src.type}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {src.focus}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500 font-medium">
              {src.metadataQuality}
            </div>
          </div>
        ))}
      </div>

      {/* Why Dimensions Needs its Own Detection */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs shadow-2xs">
        <div className="space-y-1.5">
          <span className="font-bold text-sky-800 flex items-center gap-1.5 text-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Why Not Just Rely on One Source?</span>
          </span>
          <p className="text-slate-600 leading-relaxed">
            Publishers frequently fail to push retraction metadata updates to CrossRef. Often only a title changes, a retraction notice with an entirely different DOI is published without a backlink, or a silent PDF replacement is uploaded. Dimensions’ proprietary detection algorithm (~24,000 papers) identifies these unlinked retractions.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="font-bold text-orange-800 flex items-center gap-1.5 text-sm">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>Early Warning from Problematic Paper Screener</span>
          </span>
          <div className="text-slate-600 leading-relaxed">
            Prof. Guillaume Cabanac’s open-science screener identifies <TerminologyTooltip termKey="tortured-phrases" onOpenFullGlossary={onOpenGlossary}>tortured phrases</TerminologyTooltip> and <TerminologyTooltip termKey="citejacking" onOpenFullGlossary={onOpenGlossary}>citejacked articles</TerminologyTooltip> years before official journal inquiries conclude, providing actionable early signals.
          </div>
        </div>
      </div>

      {/* Visual Flag Escalation & Resolution Ladder */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-sky-600" />
            <h4 className="text-base font-bold text-slate-900">
              Visual Flag Escalation & Priority Resolution Ladder
            </h4>
          </div>
          <p className="text-xs text-slate-600">
            When a publication has flags from multiple sources, Author Check displays the <strong>most serious flag with the most metadata</strong> on the researcher profile card.
          </p>
        </div>

        {/* Visual Ladder Flowchart */}
        <div className="space-y-3">
          {ladderTiers.map((tier, idx) => (
            <div key={tier.tier} className="flex flex-col">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-sky-700 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {tier.tier}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">{tier.flagType}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${tier.badgeColor}`}>
                        {tier.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {tier.role}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500 sm:text-right shrink-0">
                  Source: {tier.name}
                </div>
              </div>

              {idx < ladderTiers.length - 1 && (
                <div className="flex justify-center my-1">
                  <ArrowDown className="w-4 h-4 text-sky-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Priority Banner Note */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-3 text-xs">
          <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">
              Where do the other flags go?
            </span>
            <p className="text-slate-700 leading-relaxed">
              All preliminary flags are preserved! When you <strong>click the flag badge</strong> in the Flagged Publications table on a researcher profile, a modal opens displaying the complete chronological chain of all flags from every source, including dates, original DOIs, and mapped taxonomy reasons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
