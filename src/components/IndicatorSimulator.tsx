import React, { useState } from 'react';
import { SCENARIO_PROFILES, ScenarioProfile } from '../data/guideData';
import { 
  Sliders, 
  RotateCcw,
  Network,
  Users,
  FileWarning,
  TrendingUp,
  Quote,
  Sparkles,
  Info
} from 'lucide-react';

interface IndicatorSimulatorProps {
  onOpenGlossary?: (term: string) => void;
}

export const IndicatorSimulator: React.FC<IndicatorSimulatorProps> = ({ onOpenGlossary }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('scenario-papermill-customer');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Custom simulator state
  const [name, setName] = useState('Custom Researcher');
  const [field, setField] = useState('0101 Pure Mathematics');
  const [firstPubYear, setFirstPubYear] = useState(2018);
  const [totalPubs, setTotalPubs] = useState(42);
  const [percentileRank, setPercentileRank] = useState(96); // Top 4%
  const [eligiblePubs, setEligiblePubs] = useState(30);
  const [selfCitationsCount, setSelfCitationsCount] = useState(0);
  const [isActiveInLast2Years, setIsActiveInLast2Years] = useState(true);
  const [flaggedPubsCount, setFlaggedPubsCount] = useState(2);
  const [networkFlag, setNetworkFlag] = useState(true);
  const [coAuthorsWithNetworkFlagCount, setCoAuthorsWithNetworkFlagCount] = useState(3);
  const [coAuthorsWithFlaggedPubsPct, setCoAuthorsWithFlaggedPubsPct] = useState(24); // %

  const activePreset = SCENARIO_PROFILES.find(p => p.id === selectedPresetId);

  const applyPreset = (preset: ScenarioProfile) => {
    setSelectedPresetId(preset.id);
    setIsCustomMode(false);
    setName(preset.name);
    setField(preset.field);
    setFirstPubYear(preset.careerStartYear);
    setTotalPubs(preset.publicationCount);
    setPercentileRank(preset.percentileRank);
    setEligiblePubs(preset.eligiblePublications);
    setSelfCitationsCount(preset.selfCitations);
    setIsActiveInLast2Years(true);
    setFlaggedPubsCount(preset.flaggedPublicationsCount);
    setNetworkFlag(preset.networkFlag);
    setCoAuthorsWithNetworkFlagCount(preset.coAuthorsWithNetworkFlag);
    const pct = preset.coAuthorsTotal > 0 
      ? Math.round((preset.coAuthorsWithFlaggedPubsCount / preset.coAuthorsTotal) * 100) 
      : 0;
    setCoAuthorsWithFlaggedPubsPct(pct);
  };

  // Evaluation logic according to indicator rules
  // Indicator 1: ALWAYS GREY
  const ind1IsOrange = false;
  const ind1Text = `Top ${100 - percentileRank}% compared to other researchers in "${field}" over similar publishing period (since ${firstPubYear})`;

  // Indicator 2: Turns orange if flaggedPubsCount >= 1
  const ind2IsOrange = flaggedPubsCount >= 1;

  // Indicator 3: Turns orange if 0 self citations, BUT only if eligiblePubs >= 5 and active in last 2 years
  const isEligibleForSelfCit = eligiblePubs >= 5 && isActiveInLast2Years;
  const ind3IsOrange = isEligibleForSelfCit && selfCitationsCount === 0;

  // Indicator 4: Turns orange if network flag is true
  const ind4IsOrange = networkFlag;

  // Indicator 5: Turns orange if co-authors with network flag >= 1
  const ind5IsOrange = coAuthorsWithNetworkFlagCount >= 1;

  // Indicator 6: Turns orange ONLY if coAuthorsWithFlaggedPubsPct >= 20%
  const ind6IsOrange = coAuthorsWithFlaggedPubsPct >= 20;

  const totalOrange = [ind1IsOrange, ind2IsOrange, ind3IsOrange, ind4IsOrange, ind5IsOrange, ind6IsOrange].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Simulator Control Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                <Sliders className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Interactive Scenarios
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore how the 6 indicators evaluate across realistic researcher archetypes, or build your own custom profile scenario.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isCustomMode
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isCustomMode ? 'Custom Sandbox (Active)' : 'Switch to Custom Sliders'}</span>
            </button>
          </div>
        </div>

        {/* Preset Archetypes Bar */}
        <div>
          <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Load Pre-Engineered Learning Archetypes:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {SCENARIO_PROFILES.map((preset) => {
              const isSelected = !isCustomMode && selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`p-3 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-xs text-sky-950 ring-1 ring-sky-400 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900 mb-0.5 flex items-center justify-between">
                    <span>{preset.name}</span>
                    <span className="text-[10px] font-mono text-sky-700 font-bold">
                      {preset.id === 'scenario-junior-postdoc' ? 'Junior' : preset.id === 'scenario-legit-star' ? 'Prolific' : preset.id === 'scenario-papermill-customer' ? 'Paper Mill' : 'Collateral'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{preset.role}</div>
                  <div className="mt-1.5 text-[11px] text-slate-600 line-clamp-2">
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preset Notes Banner */}
        {!isCustomMode && activePreset && (
          <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 flex items-start gap-2.5 text-xs">
            <Sparkles className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sky-950">Teaching Note for {activePreset.name}: </span>
              <span className="text-slate-700">{activePreset.notes}</span>
            </div>
          </div>
        )}

        {/* Custom Sliders Panel (Visible when Custom Mode is ON) */}
        {isCustomMode && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-sky-600" />
                <span>Adjust Author Parameters Live:</span>
              </span>
              <button
                onClick={() => {
                  if (activePreset) applyPreset(activePreset);
                }}
                className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Preset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Col 1: Volume & Field */}
              <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="font-bold text-slate-900 text-xs">Publication & Field Cohort</div>
                
                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Total Publications:</span>
                    <span className="font-mono text-sky-700 font-bold">{totalPubs}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="300"
                    value={totalPubs}
                    onChange={(e) => setTotalPubs(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Peer Percentile Rank:</span>
                    <span className="font-mono text-sky-700 font-bold">Top {100 - percentileRank}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="99"
                    value={percentileRank}
                    onChange={(e) => setPercentileRank(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">Indicator 1 is always neutral grey</div>
                </div>
              </div>

              {/* Col 2: Self-Citations & Caveats */}
              <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="font-bold text-slate-900 text-xs">Indicator 3 Criteria: Self-Citations</div>
                
                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Eligible Pubs (≥9 refs):</span>
                    <span className="font-mono text-sky-700 font-bold">{eligiblePubs}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={eligiblePubs}
                    onChange={(e) => setEligiblePubs(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {eligiblePubs < 5 ? '⚠️ <5 eligible: Indicator stays GREY (Early career protection)' : '✅ Qualified for evaluation (≥5 eligible)'}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Self-Citations Count:</span>
                    <span className="font-mono text-sky-700 font-bold">{selfCitationsCount}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={selfCitationsCount}
                    onChange={(e) => setSelfCitationsCount(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {selfCitationsCount === 0 && eligiblePubs >= 5 ? '🚨 Exactly 0 self-citations: Turns ORANGE' : 'Neutral grey (citations present)'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-700">Published in last 2 years?</span>
                  <input
                    type="checkbox"
                    checked={isActiveInLast2Years}
                    onChange={(e) => setIsActiveInLast2Years(e.target.checked)}
                    className="accent-sky-600 rounded cursor-pointer w-4 h-4"
                  />
                </div>
              </div>

              {/* Col 3: Flags & Network Co-Authors */}
              <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                <div className="font-bold text-slate-900 text-xs">Flagged Papers & Network Graphs</div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Flagged Publications:</span>
                    <span className="font-mono text-sky-700 font-bold">{flaggedPubsCount}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={flaggedPubsCount}
                    onChange={(e) => setFlaggedPubsCount(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">Turns orange at ≥ 1 flagged paper</div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Unusual Network Flag:</span>
                  <button
                    onClick={() => setNetworkFlag(!networkFlag)}
                    className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-colors ${
                      networkFlag
                        ? 'bg-orange-50 text-orange-800 border border-orange-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {networkFlag ? 'YES (Orange)' : 'NO (Grey)'}
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Co-Authors with Network Flag:</span>
                    <span className="font-mono text-sky-700 font-bold">{coAuthorsWithNetworkFlagCount}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={coAuthorsWithNetworkFlagCount}
                    onChange={(e) => setCoAuthorsWithNetworkFlagCount(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">Turns orange at ≥ 1 co-author</div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span>Co-Authors w/ Flagged Pubs (%):</span>
                    <span className="font-mono text-sky-700 font-bold">{coAuthorsWithFlaggedPubsPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={coAuthorsWithFlaggedPubsPct}
                    onChange={(e) => setCoAuthorsWithFlaggedPubsPct(Number(e.target.value))}
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {coAuthorsWithFlaggedPubsPct >= 20 ? '🚨 ≥20% threshold reached: Turns ORANGE' : 'Neutral grey (< 20% normal range)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulated Author Check Interface */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">{name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                  Dimensions Researcher Profile
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Main Research Field: <span className="text-sky-700 font-semibold">{field}</span> • Publishing since {firstPubYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center gap-2">
              <span className="text-slate-600">Orange Alerts:</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                totalOrange >= 3 
                  ? 'bg-orange-50 text-orange-800 border border-orange-200' 
                  : totalOrange > 0 
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {totalOrange} of 6 Indicators Highlighted
              </span>
            </div>
          </div>
        </div>

        {/* The 6 Indicator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Percentile of Publication Output */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between relative shadow-2xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Indicator 1 of 6
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-200 text-slate-700 border border-slate-300">
                  Always Grey (Context)
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <TrendingUp className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Percentile of Publication Output</h5>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {ind1Text}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{totalPubs} publications</span>
              <span className="text-slate-400 italic">Never triggers orange alert</span>
            </div>
          </div>

          {/* Card 2: Flagged Publications */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between relative transition-all shadow-2xs ${
            ind2IsOrange
              ? 'border-orange-300 bg-orange-50/50'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Indicator 2 of 6
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  ind2IsOrange
                    ? 'bg-orange-100 text-orange-900 border border-orange-300'
                    : 'bg-slate-200 text-slate-700 border border-slate-300'
                }`}>
                  {ind2IsOrange ? 'Orange (≥ 1 Flag)' : 'Grey (0 Flags)'}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <FileWarning className={`w-5 h-5 shrink-0 mt-0.5 ${ind2IsOrange ? 'text-orange-600' : 'text-slate-500'}`} />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Flagged Publications</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    {flaggedPubsCount === 0 ? (
                      'No atypical events or retractions detected across any publications.'
                    ) : (
                      <>
                        <span className="font-bold text-orange-700">{flaggedPubsCount} flagged publication{flaggedPubsCount > 1 ? 's' : ''}</span> identified across Retraction Watch, PPS, or CrossRef.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Trigger: Count ≥ 1</span>
              <span className={ind2IsOrange ? 'text-orange-700 font-semibold' : 'text-slate-500'}>
                {ind2IsOrange ? 'Inspect metadata' : 'Clean'}
              </span>
            </div>
          </div>

          {/* Card 3: Self-Citations */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between relative transition-all shadow-2xs ${
            ind3IsOrange
              ? 'border-orange-300 bg-orange-50/50'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Indicator 3 of 6
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  ind3IsOrange
                    ? 'bg-orange-100 text-orange-900 border border-orange-300'
                    : 'bg-slate-200 text-slate-700 border border-slate-300'
                }`}>
                  {ind3IsOrange ? 'Orange (0 Self-Citations)' : 'Grey (Compliant / Excluded)'}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Quote className={`w-5 h-5 shrink-0 mt-0.5 ${ind3IsOrange ? 'text-orange-600' : 'text-slate-500'}`} />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Self-Citations</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    {!isEligibleForSelfCit ? (
                      <span className="text-slate-500 italic">
                        Not evaluated: Author has &lt;5 eligible publications or inactive in last 2 years. Protects junior researchers.
                      </span>
                    ) : selfCitationsCount === 0 ? (
                      <>
                        <span className="font-bold text-orange-700">0 self-citations</span> found across {eligiblePubs} eligible publications. Highly atypical for established scholars.
                      </>
                    ) : (
                      <>
                        {selfCitationsCount} publications cite self or co-authors. Expected natural citation behavior.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{eligiblePubs} eligible papers</span>
              <span className={ind3IsOrange ? 'text-orange-700 font-semibold' : 'text-slate-500'}>
                {isEligibleForSelfCit ? (selfCitationsCount === 0 ? 'Warning' : 'Normal') : 'Excluded'}
              </span>
            </div>
          </div>

          {/* Card 4: Unusual Network Flag */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between relative transition-all shadow-2xs ${
            ind4IsOrange
              ? 'border-orange-300 bg-orange-50/50'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Indicator 4 of 6
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  ind4IsOrange
                    ? 'bg-orange-100 text-orange-900 border border-orange-300'
                    : 'bg-slate-200 text-slate-700 border border-slate-300'
                }`}>
                  {ind4IsOrange ? 'Orange (Yes)' : 'Grey (No)'}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Network className={`w-5 h-5 shrink-0 mt-0.5 ${ind4IsOrange ? 'text-orange-600' : 'text-slate-500'}`} />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Unusual Network Flag</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    {networkFlag ? (
                      <>
                        <span className="font-bold text-orange-700">Flagged &quot;Yes&quot;.</span> Atypical co-author topology (Porter & McIntosh). Author is ~100x more likely to have flagged publications.
                      </>
                    ) : (
                      'Network shows typical clustered scientific collaboration patterns.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>0.01% global prevalence</span>
              <span className={networkFlag ? 'text-orange-700 font-bold' : 'text-slate-500'}>
                {networkFlag ? '100x Risk Multiplier' : 'Negative'}
              </span>
            </div>
          </div>

          {/* Card 5: Co-Authors with Network Flag */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between relative transition-all shadow-2xs ${
            ind5IsOrange
              ? 'border-orange-300 bg-orange-50/50'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Indicator 5 of 6
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  ind5IsOrange
                    ? 'bg-orange-100 text-orange-900 border border-orange-300'
                    : 'bg-slate-200 text-slate-700 border border-slate-300'
                }`}>
                  {ind5IsOrange ? 'Orange (≥ 1 Co-Author)' : 'Grey (0 Co-Authors)'}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Users className={`w-5 h-5 shrink-0 mt-0.5 ${ind5IsOrange ? 'text-orange-600' : 'text-slate-500'}`} />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Co-Authors with Network Flag</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    {coAuthorsWithNetworkFlagCount > 0 ? (
                      <>
                        <span className="font-bold text-orange-700">{coAuthorsWithNetworkFlagCount} co-author{coAuthorsWithNetworkFlagCount > 1 ? 's have' : ' has'}</span> the unusual network flag. Indicates proximity to paper mill clusters.
                      </>
                    ) : (
                      'None of this researcher’s co-authors hold the unusual network flag.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Trigger: Count ≥ 1</span>
              <span className={ind5IsOrange ? 'text-orange-700 font-semibold' : 'text-slate-500'}>
                {coAuthorsWithNetworkFlagCount > 0 ? 'Examine shared papers' : 'Clean'}
              </span>
            </div>
          </div>

          {/* Card 6: Co-Authors with Flagged Publications */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between relative transition-all shadow-2xs ${
            ind6IsOrange
              ? 'border-orange-300 bg-orange-50/50'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Indicator 6 of 6
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  ind6IsOrange
                    ? 'bg-orange-100 text-orange-900 border border-orange-300'
                    : 'bg-slate-200 text-slate-700 border border-slate-300'
                }`}>
                  {ind6IsOrange ? 'Orange (≥ 20%)' : 'Grey (< 20%)'}
                </span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Users className={`w-5 h-5 shrink-0 mt-0.5 ${ind6IsOrange ? 'text-orange-600' : 'text-slate-500'}`} />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Co-Authors with Flagged Pubs</h5>
                  <p className="text-xs text-slate-600 mt-1">
                    {coAuthorsWithFlaggedPubsPct >= 20 ? (
                      <>
                        <span className="font-bold text-orange-700">{coAuthorsWithFlaggedPubsPct}% of co-authors</span> have flagged publications (Threshold ≥ 20%). Atypical network contamination.
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-slate-800">{coAuthorsWithFlaggedPubsPct}% of co-authors</span> have flags. Below the 20% alert threshold (healthy baseline is ~3%).
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Threshold: ≥ 20%</span>
              <span className={ind6IsOrange ? 'text-orange-700 font-bold' : 'text-slate-500'}>
                {coAuthorsWithFlaggedPubsPct >= 20 ? 'Threshold Exceeded' : 'Protected (<20%)'}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostic Technical Explainer Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Info className="w-4 h-4 text-sky-600" />
            <span>Indicator Diagnostics & Evaluation Reference</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
            <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 shadow-2xs">
              <span className="font-semibold text-sky-800 block">Why did Indicator 1 remain grey?</span>
              <p className="text-[11px] text-slate-600">
                Indicator Rule: Indicator 1 is <span className="text-slate-900 font-medium">strictly contextual</span>. Output volume by itself cannot be benchmarked as misconduct, even for top 1% prolific scholars.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 shadow-2xs">
              <span className="font-semibold text-sky-800 block">
                {eligiblePubs < 5 
                  ? 'Why is Indicator 3 grey despite 0 self-citations?' 
                  : ind6IsOrange 
                    ? 'Why did Indicator 6 turn orange?' 
                    : 'Why is Indicator 6 grey despite having flagged co-authors?'}
              </span>
              <p className="text-[11px] text-slate-600">
                {eligiblePubs < 5 ? (
                  'Indicator Rule: Early-career scholars with <5 eligible publications (≥9 references) are excluded from self-citation checks to avoid false alarms.'
                ) : ind6IsOrange ? (
                  `Indicator Rule: ${coAuthorsWithFlaggedPubsPct}% exceeds the 20% threshold. Having >20% of collaborators involved in retractions indicates systemic cluster risk.`
                ) : (
                  `Indicator Rule: At ${coAuthorsWithFlaggedPubsPct}%, it is below 20%. About 30% of all scholars have at least 1 flagged co-author; the 20% bar prevents flooding investigators.`
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
