export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  plainEnglish: string;
  whyItMatters: string;
  example: string;
  category: 'Classification' | 'Integrity & Paper Mills' | 'Network Metrics' | 'Bibliometrics';
  authorCheckImpact: string;
}

export interface IndicatorInfo {
  id: string;
  number: number;
  name: string;
  question: string;
  turnsOrangeWhen: string;
  alwaysGrey: boolean;
  thresholdSummary: string;
  source: string;
  howItWorks: string;
  whyItMatters: string;
  pitfalls: string[];
  caveats: string[];
  statsNov2025: string;
  prevalencePercentage: string;
  investigatorAction: string;
}

export interface TaxonomyCategory {
  id: string;
  name: string;
  summary: string;
  isMisconduct: boolean;
  severity: 'Critical' | 'High' | 'Moderate' | 'Informational / Positive';
  retractionWatchReasons: string[];
  ppsFlags: string[];
  exampleNotice: string;
  authorCheckFlagType: string;
  investigatorGuidance: string;
  dimensionsMappingNote: string;
}

export interface ScenarioProfile {
  id: string;
  name: string;
  role: string;
  description: string;
  field: string;
  careerStartYear: number;
  publicationCount: number;
  percentileRank: number; // e.g. 98 = Top 2%
  eligiblePublications: number;
  selfCitations: number;
  flaggedPublicationsCount: number;
  flaggedTypes: string[];
  networkFlag: boolean;
  coAuthorsTotal: number;
  coAuthorsWithNetworkFlag: number;
  coAuthorsWithFlaggedPubsCount: number;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  jobAidRule: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  'anzsrc': {
    id: 'anzsrc',
    term: 'ANZSRC Field of Research (Level 2)',
    shortDefinition: 'Australian and New Zealand Standard Research Classification codes that categorize publications into specific disciplinary branches.',
    plainEnglish: 'The specific academic discipline of the author (e.g., Pure Mathematics, Oncology, or Microeconomics) rather than broad buckets like "Science".',
    whyItMatters: 'Author Check calculates publication output percentiles by comparing an author against exact peers publishing in the same Level 2 field who started in the same year.',
    example: 'A researcher who started in 2013 in "0101 Pure Mathematics" is compared strictly to other 2013 Pure Math researchers, not to high-volume Biomedical scholars.',
    category: 'Classification',
    authorCheckImpact: 'Determines the baseline peer cohort for Indicator 1 (Percentile of Publication Output).'
  },
  'citejacking': {
    id: 'citejacking',
    term: 'Citejacking / Hijacked Journals',
    shortDefinition: 'A practice where publications cite articles appearing in cloned or hijacked journals that illegitimately mimic legitimate publications.',
    plainEnglish: 'Citing fake clone websites that stole the name, ISSN, and reputation of respected academic journals to publish unvetted spam.',
    whyItMatters: 'Paper mills and predatory rings often citejack fake journals to artificially inflate citation counts or pad bibliographies with unreviewed papers.',
    example: 'Citing a paper hosted on a pirated clone domain of a Swiss journal that charges rapid publication fees without peer review.',
    category: 'Integrity & Paper Mills',
    authorCheckImpact: 'Detected via Guillaume Cabanac’s Problematic Paper Screener and flagged in Indicator 2.'
  },
  'bibliometrics': {
    id: 'bibliometrics',
    term: 'Bibliometrics',
    shortDefinition: 'The statistical analysis of scientific publications, citation counts, co-authorship networks, and scholarly communication patterns.',
    plainEnglish: 'Using data science and math to study how scientific papers, citations, and co-authors behave in large databases.',
    whyItMatters: 'Author Check relies on bibliometric graph algorithms and citation indexing from Dimensions to uncover anomalies invisible on single papers.',
    example: 'Analyzing 140 million scientific records to spot citation rings, sudden output spikes, or isolated co-authorship graphs.',
    category: 'Bibliometrics',
    authorCheckImpact: 'Underpins the entire Dimensions graph analysis, output percentiles, and citation checks.'
  },
  'tortured-phrases': {
    id: 'tortured-phrases',
    term: 'Tortured Phrases',
    shortDefinition: 'Bizarre synonym corruptions of established technical terms resulting from automated paraphrasing algorithms used to evade plagiarism software.',
    plainEnglish: 'Absurd computer-generated synonyms (like "counterfeit consciousness" for "artificial intelligence" or "colossal information" for "big data").',
    whyItMatters: 'A smoking gun of low-effort plagiarism or paper mill text spinning, detected by the Problematic Paper Screener (PPS).',
    example: 'Writing "random timber" instead of "random forest", or "breast malignant growth" instead of "breast cancer".',
    category: 'Integrity & Paper Mills',
    authorCheckImpact: 'Ingested from Problematic Paper Screener to generate an atypical publication flag in Indicator 2.'
  },
  'paper-mill': {
    id: 'paper-mill',
    term: 'Paper Mill',
    shortDefinition: 'Commercial organizations that fabricate, plagiarize, and sell scientific manuscripts and co-authorship positions for financial profit.',
    plainEnglish: 'Black-market essay factories for researchers that sell fake research, forged peer reviews, and author slots on ready-made papers.',
    whyItMatters: 'Paper mills account for tens of thousands of corrupted papers worldwide. Author Check was built specifically to detect their topological fingerprints.',
    example: 'Paying $1,500 to have your name added as 3rd co-author on a pre-fabricated clinical study with co-authors you have never met.',
    category: 'Integrity & Paper Mills',
    authorCheckImpact: 'Target of Indicators 3 (lack of self-citations), 4 (unusual network flag), and 5/6 (co-author flags).'
  },
  'network-flag': {
    id: 'network-flag',
    term: 'Unusual Network Flag (Porter & McIntosh 2024)',
    shortDefinition: 'An algorithmic indicator identifying atypical co-authorship graph patterns where a researcher’s co-authors rarely or never collaborate with each other.',
    plainEnglish: 'A red flag showing a researcher’s co-authors are scattered strangers who never publish together—a hallmark of paper mill author allocation.',
    whyItMatters: 'Researchers with a network flag are approximately 100 times more likely to have authored flagged publications.',
    example: 'An author who co-authors 8 papers with 30 distinct people who have zero cross-collaborations or prior shared institutions.',
    category: 'Network Metrics',
    authorCheckImpact: 'Powers Indicator 4 and Indicator 5. Highly conservative: only ~0.01% of researchers trigger it, but 50% of those have retractions!'
  },
  'strength-of-collaboration': {
    id: 'strength-of-collaboration',
    term: 'Strength of Collaboration',
    shortDefinition: 'The number of times the selected researcher is named alongside each co-author across all publications in Dimensions.',
    plainEnglish: 'How many times two researchers have co-authored papers together.',
    whyItMatters: 'Helps distinguish long-term lab partners (high collaboration strength) from one-off random co-authors bought on a paper mill marketplace.',
    example: 'Prof. Miller has co-authored 24 papers with Dr. Chen (strength 24), but only 1 paper with 4 other co-authors (strength 1).',
    category: 'Network Metrics',
    authorCheckImpact: 'Provides context in the co-author table to see if flagged co-authors are core collaborators or casual acquaintances.'
  },
  'eligible-publication': {
    id: 'eligible-publication',
    term: 'Eligible Publication',
    shortDefinition: 'A review paper, research paper, research chapter, or conference paper with a minimum of 9 references.',
    plainEnglish: 'A substantive scholarly paper with at least 9 cited references, excluding brief editorials, letters, or short abstracts.',
    whyItMatters: 'Used to filter out short opinion pieces or letters where an author naturally might not cite their own previous work.',
    example: 'A 12-page empirical study citing 35 references is an eligible publication; a 1-page editorial citing 2 references is excluded.',
    category: 'Classification',
    authorCheckImpact: 'Required baseline for Indicator 3: author must have at least 5 eligible publications before self-citation check activates.'
  },
  'self-citation': {
    id: 'self-citation',
    term: 'Self-Citation',
    shortDefinition: 'A publication where at least one of its authors is also an author on at least one of its cited references.',
    plainEnglish: 'When a new paper cites an earlier paper written by any of the current paper’s co-authors.',
    whyItMatters: 'Real researchers naturally build on their previous work. An active senior researcher with 0 self-citations is highly unusual and suggests outsourced paper mill papers.',
    example: 'Dr. Santos published Paper A in 2022; her 2024 Paper B cites Paper A in its literature review.',
    category: 'Bibliometrics',
    authorCheckImpact: 'Indicator 3 turns Orange when a qualified author has 0 self-citations across all eligible publications.'
  },
  'retraction-taxonomy': {
    id: 'retraction-taxonomy',
    term: 'Retraction Taxonomy',
    shortDefinition: 'A structured classification system mapping hundreds of granular Retraction Watch reasons into standardized, navigable integrity categories.',
    plainEnglish: 'A clean folder hierarchy that organizes messy retraction notices into clear categories (e.g. Image Tampering, Publisher Error, Paper Mill).',
    whyItMatters: 'Lets investigators immediately understand whether a paper was retracted due to serious fraud vs an accidental publisher printing blunder.',
    example: 'Mapping Retraction Watch codes "Concerns/Issues About Image" and "Falsification of Data" to the "Image & Data Manipulation" category.',
    category: 'Classification',
    authorCheckImpact: 'Powers the metadata drawer when clicking any flagged publication in Author Check.'
  },
  'pps': {
    id: 'pps',
    term: 'Problematic Paper Screener (PPS)',
    shortDefinition: 'An open-science tool developed by Prof. Guillaume Cabanac that scans scholarly literature for automated fingerprints, tortured phrases, and citejacking.',
    plainEnglish: 'An automated web scanner hunting for fake scientific writing and pirated citations across global literature.',
    whyItMatters: 'Catches problematic papers years before official publisher retractions are issued (currently tracking ~23,000 papers).',
    example: 'Catching a paper that substituted "counterfeit consciousness" for AI before the journal editorial board even launches an inquiry.',
    category: 'Integrity & Paper Mills',
    authorCheckImpact: 'One of the 5 primary data sources ingested by Dimensions Author Check.'
  }
};

export const INDICATORS: IndicatorInfo[] = [
  {
    id: 'ind-1',
    number: 1,
    name: 'Percentile of Publication Output',
    question: 'How much has this person published compared with their peers?',
    turnsOrangeWhen: 'Never. Always grey; shown for context only.',
    alwaysGrey: true,
    thresholdSummary: 'Always Neutral (Contextual baseline)',
    source: 'Dimensions publications & ANZSRC Level 2 Field of Research classification. Includes preprints, books, and book chapters.',
    howItWorks: 'Calculates the percentile rank against "peers" defined as researchers in the exact same primary Level 2 ANZSRC research field who published their very first paper in the exact same year. For multidisciplinary authors, the percentile is calculated within the field covering the majority of their papers.',
    whyItMatters: 'A researcher in the top 1% or 2% is hyper-prolific. This could reflect exceptional genius, massive laboratory leadership, or the purchase of authorship slots from paper mills.',
    pitfalls: [
      'Do not assume high output equals misconduct. Renowned lab heads often legitimately publish 20+ papers a year.',
      'Field differences matter: A mathematician with 4 papers a year might be top 5%, while a genomics researcher needs 25 papers.',
      'This indicator NEVER turns orange because productivity alone is not an integrity violation.'
    ],
    caveats: [
      'Preprints and book chapters are included in the volume tally.',
      'Career breaks or maternity leaves are not accounted for in first publication year calculations.'
    ],
    statsNov2025: 'Context metric across all indexed Dimensions researchers.',
    prevalencePercentage: 'N/A (Standard distribution)',
    investigatorAction: 'Use as a backdrop: if an author is in the 99th percentile AND has network flags or zero self-citations, investigate paper mill activity.'
  },
  {
    id: 'ind-2',
    number: 2,
    name: 'Flagged Publications',
    question: 'Have any of this person’s publications had retractions or other atypical events?',
    turnsOrangeWhen: 'At least one flagged publication (Count ≥ 1).',
    alwaysGrey: false,
    thresholdSummary: 'Orange at ≥ 1 flagged publication',
    source: 'Retraction Watch, CrossRef, PubMed, Dimensions internal detection algorithm, and Problematic Paper Screener (PPS).',
    howItWorks: 'Aggregates atypical publication events across 5 independent sources. When multiple flags exist on a single paper (e.g. Tortured Phrase detected by PPS → Expression of Concern → Retraction notice on PubMed), Author Check highlights the most severe flag with the richest metadata.',
    whyItMatters: 'Past problematic behavior is a statistical risk factor for future questionable practices. However, honest retractions must be separated from fraudulent ones.',
    pitfalls: [
      'Honest mistakes count in a researcher’s favor! Authors who self-report errors and request retractions should be praised, not penalized.',
      'Publisher administrative blunders (e.g. duplicate online publication by the journal) also trigger retractions without any author fault.',
      'Many problematic papers are never officially retracted due to slow journal investigations (the tip of the iceberg).'
    ],
    caveats: [
      'Click the flag in Author Check to inspect the full metadata, retraction reason, and whether the author agreed.',
      'Retraction notices can take 1 to 5 years from initial complaint to final publication.'
    ],
    statsNov2025: 'About 1.0% of recently active researchers had ≥ 1 flagged publication. Only ~0.2% had ≥ 2.',
    prevalencePercentage: '1.0% of active authors',
    investigatorAction: 'Read the retraction notice. Check if it was self-retracted for honest scientific error vs forced retraction for data fraud or paper mill involvement.'
  },
  {
    id: 'ind-3',
    number: 3,
    name: 'Self-Citations',
    question: 'Does this person ever cite their own or their co-authors’ work?',
    turnsOrangeWhen: 'The researcher has NO self-citations (0 self-citations) across eligible publications (with caveats).',
    alwaysGrey: false,
    thresholdSummary: 'Orange at exactly 0 self-citations (if eligible)',
    source: 'Dimensions citation graph and publications data.',
    howItWorks: 'A publication counts as a self-citation if at least one author on the paper is also an author on at least one of its cited references. Author Check tests whether an active author has ZERO self-citations.',
    whyItMatters: 'Legitimate researchers work sequentially, building on their prior findings and citing their laboratory network. Paper mill customers, however, are assigned to random pre-fabricated manuscripts where their own prior work is completely absent.',
    pitfalls: [
      'DO NOT penalize early-career researchers! Authors with fewer than 5 eligible publications or who haven’t published in the last 2 years are excluded.',
      'Some interdisciplinary researchers switching to a brand new field might have very low self-citations legitimately.'
    ],
    caveats: [
      'Only eligible publications (reviews, research papers, book chapters, conference proceedings with ≥ 9 references) are evaluated.',
      'Author must have at least 5 eligible papers and have published within the last 24 months.'
    ],
    statsNov2025: 'Extremely rare among established researchers with >5 papers (<0.5%).',
    prevalencePercentage: '< 0.5% of established authors',
    investigatorAction: 'If an author has 15+ papers and literally 0 self-citations, scrutinize authorship contribution statements and field coherence.'
  },
  {
    id: 'ind-4',
    number: 4,
    name: 'Unusual Network Flag',
    question: 'Does this person’s co-author network show unusual patterns?',
    turnsOrangeWhen: 'The researcher has an unusual network flag ("Yes").',
    alwaysGrey: false,
    thresholdSummary: 'Orange if Network Flag = "Yes"',
    source: 'Topological network algorithm based on Porter & McIntosh (2024), Nature Scientific Reports, implemented on Dimensions graph.',
    howItWorks: 'Analyzes the multi-dimensional topology of co-authorship. In genuine academic circles, co-authors form dense clusters (colleagues, postdocs, frequent collaborators). Paper mills, by contrast, assign paying customers randomly to papers, yielding star-like or disconnected topologies with zero cross-ties.',
    whyItMatters: 'This is a mathematical smoking gun of paper mill participation: researchers with this flag are approximately 100 times more likely to author flagged publications!',
    pitfalls: [
      'Very conservative metric: absence of a network flag does NOT prove innocence; paper mills that sell entire papers to existing lab groups evade this indicator.',
      'Massive hyper-authorship physics or astronomy consortia (e.g. CERN with 3,000 authors) require special contextual appraisal.'
    ],
    caveats: [
      'Requires sufficient co-authorship volume to compute network density.',
      'Only about 1 in 10,000 recently active researchers triggers this flag (0.01%).'
    ],
    statsNov2025: 'About 0.01% of recently active researchers had this flag. 50% of them also had flagged publications!',
    prevalencePercentage: '0.01% of active authors (100x risk multiplier)',
    investigatorAction: 'High priority alert: inspect co-author networks immediately. Check if co-authors share institutions or have any logical research connection.'
  },
  {
    id: 'ind-5',
    number: 5,
    name: 'Co-Authors with Network Flag',
    question: 'Do any of their co-authors show unusual network patterns?',
    turnsOrangeWhen: 'The researcher has at least one co-author with an unusual network flag (Count ≥ 1).',
    alwaysGrey: false,
    thresholdSummary: 'Orange at ≥ 1 co-author with network flag',
    source: 'Derived from Indicator 4 applied across all co-authors in Dimensions.',
    howItWorks: 'Evaluates every co-author of the selected researcher. If even one co-author has triggered the Porter & McIntosh unusual network flag, this indicator highlights orange.',
    whyItMatters: 'Because the network flag itself is very conservative (only 0.01% of authors), collaborating directly with a flagged researcher is a strong warning sign of proximity to paper mill networks.',
    pitfalls: [
      'Collaboration could be accidental or distant (e.g., 8th author on a large multi-center study).',
      'Check the "Strength of Collaboration": did they write 1 paper together or 15 papers?'
    ],
    caveats: [
      'Shows both raw count and percentage of co-authors with the flag.'
    ],
    statsNov2025: 'About 2% of recently active researchers had such co-authors. 9% of these researchers had flagged publications (9x normal rate).',
    prevalencePercentage: '2.0% of active authors',
    investigatorAction: 'Identify which co-author triggered the flag and examine the shared papers. Was it a single peripheral paper or core lab output?'
  },
  {
    id: 'ind-6',
    number: 6,
    name: 'Co-Authors with Flagged Publications',
    question: 'Do their co-authors have flagged publications?',
    turnsOrangeWhen: 'At least 20% of the researcher’s co-authors have flagged publications (≥ 20%).',
    alwaysGrey: false,
    thresholdSummary: 'Orange ONLY at ≥ 20% of co-authors',
    source: 'Flagged publication counts compiled across all co-authors in Dimensions.',
    howItWorks: 'Tallies the percentage of all unique co-authors who have at least one flagged paper anywhere in their record. It turns orange only when this percentage reaches or exceeds 20%.',
    whyItMatters: 'Collaborating heavily with researchers who have had papers retracted or flagged increases the systemic likelihood of questionable research environment.',
    pitfalls: [
      'CRITICAL: Why is the threshold 20% instead of 1 person? Having co-authors with flagged publications is NOT rare! Roughly 30% of all active researchers in Dimensions have at least one co-author with a retraction, simply because prolific authors have hundreds of collaborators.',
      'Setting the threshold at 1 would flood investigators with false alarms on almost a third of the scientific community.'
    ],
    caveats: [
      'On average, only ~3% of co-authors across healthy academic networks have flagged publications.',
      'A 20% threshold ensures only heavily contaminated co-authorship circles trigger an alert.'
    ],
    statsNov2025: 'About 30% of active researchers have at least 1 co-author with a flagged paper. The average co-author flag rate is ~3%.',
    prevalencePercentage: 'Triggers when ≥ 20% of co-authors have flags',
    investigatorAction: 'If >20%, review the joint publications. Are the retracted papers the ones co-authored with this researcher, or on independent work?'
  }
];

export const RETRACTION_TAXONOMIES: TaxonomyCategory[] = [
  {
    id: 'tax-papermill',
    name: 'Paper Mill & Commercial Misconduct',
    summary: 'Systemic black-market fabrication, commercial brokering of authorship slots, fake peer reviews, and automated text paraphrasing.',
    isMisconduct: true,
    severity: 'Critical',
    retractionWatchReasons: [
      'Paper Mill',
      'Rogue Editor / Compromised Peer Review',
      'Fake Email Addresses / Identity Theft',
      'Bought Authorship',
      'Systematic Manipulation of Publication Process'
    ],
    ppsFlags: ['Tortured Phrases', 'Citejacking', 'Spurious References'],
    exampleNotice: 'The publisher retracts this article following an investigation into systematic manipulation of the peer review process and hallmarks of commercial paper mill origin.',
    authorCheckFlagType: 'Retraction (Retraction Watch) + Problematic Paper Screener',
    dimensionsMappingNote: 'Maps directly from Retraction Watch reason codes "Paper Mill" & "Compromised Peer Review". Directly correlates with Indicator 4 (Network Flag).',
    investigatorGuidance: 'Look for disconnected co-author networks, sudden publication spikes in unrelated medical or engineering disciplines, and tortured phrasing.'
  },
  {
    id: 'tax-image-data',
    name: 'Image & Data Manipulation / Fabrication',
    summary: 'Deliberate altering, splicing, duplication, or complete fabrication of scientific experimental data, western blots, micrographs, or flow cytometry.',
    isMisconduct: true,
    severity: 'Critical',
    retractionWatchReasons: [
      'Falsification/Fabrication of Data',
      'Concerns/Issues About Image',
      'Duplication of Image',
      'Manipulation of Images',
      'Unreliable Data/Results'
    ],
    ppsFlags: ['Image Duplication Flag (where indexed)'],
    exampleNotice: 'Western blot bands in Figures 2B and 4D were found to be duplicated and spliced across different experimental conditions without disclosure.',
    authorCheckFlagType: 'Retraction (Retraction Watch / PubMed)',
    dimensionsMappingNote: 'Retraction Watch tags "Concerns/Issues About Image" are aggregated under Image Manipulation in the metadata breakdown.',
    investigatorGuidance: 'Examine raw data availability. Did the institutional inquiry find original lab notebook records or forensic alterations in image contrast/geometry?'
  },
  {
    id: 'tax-plagiarism',
    name: 'Plagiarism & Salami Slicing',
    summary: 'Direct copying of text, figures, or ideas without attribution, redundant duplicate publication, or unauthorized appropriation of draft manuscripts.',
    isMisconduct: true,
    severity: 'High',
    retractionWatchReasons: [
      'Plagiarism of Text',
      'Plagiarism of Data',
      'Duplicate Publication / Self-Plagiarism',
      'Salami Slicing',
      'Copyright Infringement'
    ],
    ppsFlags: ['Tortured Phrases (often used to mask text plagiarism)'],
    exampleNotice: 'Substantial overlap was identified between this article and a previously published study in another journal without appropriate attribution.',
    authorCheckFlagType: 'Retraction (CrossRef / Retraction Watch)',
    dimensionsMappingNote: 'Captures both publisher notifications in CrossRef and detailed text-overlap findings in Retraction Watch.',
    investigatorGuidance: 'Check if the overlap is in standardized methodology sections (lower severity) or copied results/conclusions (severe fraud).'
  },
  {
    id: 'tax-publisher-error',
    name: 'Publisher & Editorial Errors',
    summary: 'Mistakes made by the journal, editorial office, or typesetting vendor with ZERO fault or wrongdoing by the contributing authors.',
    isMisconduct: false,
    severity: 'Moderate',
    retractionWatchReasons: [
      'Error by Publisher',
      'Duplicate Publication by Publisher',
      'Typesetting / Inadvertent Release of Draft',
      'Administrative Withdrawal'
    ],
    ppsFlags: [],
    exampleNotice: 'This article is retracted at the request of the Publisher due to an administrative error that resulted in duplicate publication of the accepted manuscript.',
    authorCheckFlagType: 'Retraction / Withdrawal (CrossRef)',
    dimensionsMappingNote: 'Author Check lists the retraction notice, but clicking the flag reveals "Error by Publisher". This distinction is vital for fair author assessment.',
    investigatorGuidance: 'DO NOT hold against the author! Check if the publisher subsequently issued a replacement article or an apology notice.'
  },
  {
    id: 'tax-authorship-ethics',
    name: 'Authorship Disputes & Ethics Non-Compliance',
    summary: 'Disagreements on author credit, inclusion of researchers without knowledge or consent (gift/ghost authorship), or lack of IRB/patient consent.',
    isMisconduct: true,
    severity: 'High',
    retractionWatchReasons: [
      'Authorship Dispute',
      'Lack of IRB / Ethics Committee Approval',
      'Lack of Informed Consent',
      'Forged Author Signatures',
      'Conflict of Interest Undisclosed'
    ],
    ppsFlags: [],
    exampleNotice: 'Retracted following confirmation that two co-authors were listed without their knowledge or consent and institutional animal welfare approval was lacking.',
    authorCheckFlagType: 'Retraction / Expression of Concern',
    dimensionsMappingNote: 'Aggregated under Authorship & Ethical Governance in Author Check metadata viewer.',
    investigatorGuidance: 'Determine whether the selected researcher was the perpetrator who added fake co-authors, or an innocent victim added without consent.'
  },
  {
    id: 'tax-honest-error',
    name: 'Honest Error & Scientific Self-Correction',
    summary: 'Legitimate researchers identifying calculation errors, unverified cell line contamination, or non-reproducible reagents and requesting self-retraction.',
    isMisconduct: false,
    severity: 'Informational / Positive',
    retractionWatchReasons: [
      'Error in Data / Calculations (Unintentional)',
      'Contaminated Cell Lines / Reagents',
      'Results Not Reproducible',
      'Self-Retraction by Author'
    ],
    ppsFlags: [],
    exampleNotice: 'The authors voluntarily retract this paper after discovering that an antibody was non-specific, rendering Figure 3 uninterpretable. We apologize to readers.',
    authorCheckFlagType: 'Retraction (Retraction Watch / PubMed)',
    dimensionsMappingNote: 'Retraction Watch reason explicitly includes "Self-Retraction" and "Error in Analysis". In Author Check, this is a mark of scientific integrity.',
    investigatorGuidance: 'Interpret as a positive ethical signal! The author placed scientific accuracy above personal bibliometric vanity.'
  }
];

export const KEY_TAKEAWAY_BANNERS = [
  {
    id: 'takeaway-1',
    headline: 'An Indicator Is Not A Verdict',
    subhead: 'A highlight means “worth a closer look”, not “this person has done something wrong.”',
    badge: 'Golden Rule of Author Check',
    icon: 'ShieldAlert',
    color: 'amber',
    body: 'The indicators in Dimensions Author Check are not benchmarking scores or algorithmic verdicts. They are triage signals designed to guide human integrity officers. No single flag proves guilt, and healthy scholars can occasionally trigger flags due to large team science, interdisciplinary shifts, or journal publishing errors.',
    actionBullets: [
      'Never automate disciplinary or hiring decisions based solely on Author Check status.',
      'Always click into the flag metadata to read the actual notice and context.',
      'Synthesize multiple indicators together rather than isolating one in a silo.'
    ]
  },
  {
    id: 'takeaway-2',
    headline: 'Why only 20%? Because co-author flags are surprisingly common!',
    subhead: 'Almost 30% of all active researchers share a paper with someone who has had a retraction.',
    badge: 'Threshold Rationale: Indicator 6',
    icon: 'Users',
    color: 'cyan',
    body: 'Why does Indicator 6 require 20% of co-authors to have flagged papers instead of just 1 person? Because researchers with flagged publications have far larger networks of co-authors, and ~30% of all active researchers have at least one co-author with a flagged paper. If the threshold were 1, nearly a third of all innocent scientists would be highlighted orange.',
    actionBullets: [
      'Healthy baseline: across normal academic networks, only ~3% of co-authors have flags.',
      'Setting the highlight trigger at 20% isolates genuine systemic problem clusters.',
      'Always inspect collaboration strength: is it a one-off conference paper or repeated co-authorships?'
    ]
  },
  {
    id: 'takeaway-3',
    headline: 'Honest Mistakes Count in a Researcher’s Favor',
    subhead: 'Self-reporting errors and requesting voluntary retractions shows scientific integrity.',
    badge: 'Investigator Triage Tip',
    icon: 'CheckCircle2',
    color: 'emerald',
    body: 'Science progresses by self-correction. When researchers discover a faulty reagent, coding error in data processing, or non-reproducible experiment, self-retracting the paper is the gold standard of ethical research. In Author Check, clicking a flag reveals whether the authors self-reported the issue.',
    actionBullets: [
      'Check who initiated the retraction: authors vs editor/publisher vs whistleblower.',
      'Verify if the author agreed with the retraction notice.',
      'Distinguish honest analytical errors from intentional data faking.'
    ]
  },
  {
    id: 'takeaway-4',
    headline: 'Watch Out For Early-Career Researchers',
    subhead: 'Do not interpret missing self-citations as a warning sign for junior scholars.',
    badge: 'Caveat Rule: Indicator 3',
    icon: 'GraduationCap',
    color: 'indigo',
    body: 'Indicator 3 checks for the absence of self-citations. However, early-career researchers naturally have not yet built up a body of published work to cite! Author Check specifically enforces a threshold: researchers must have at least 5 eligible publications (papers with ≥9 references) and have published within the last 2 years. If outside this pool, Indicator 3 remains neutral.',
    actionBullets: [
      'Never read a missing self-citation result on an early-career scholar as suspicious.',
      'Check academic age (first publication year) before drawing conclusions.',
      'Remember eligible papers require substantive reference lists (minimum 9 references).'
    ]
  },
  {
    id: 'takeaway-5',
    headline: 'The 100x Multiplier: The Power of Network Flags',
    subhead: 'Authors with the Porter & McIntosh network flag are ~100x more likely to have flagged papers.',
    badge: 'Paper Mill Detection: Indicator 4',
    icon: 'Network',
    color: 'rose',
    body: 'The Unusual Network Flag (Indicator 4) is exceptionally conservative: only about 0.01% of all active researchers trigger it. But of those rare authors, fully 50% also have flagged publications! This massive 100x statistical association arises because paper mills mechanically allocate random unrelated clients to pre-made author lists.',
    actionBullets: [
      'If Indicator 4 is "Yes", treat it as an urgent priority for comprehensive dossier review.',
      'Even if Indicator 4 is grey, check Indicator 5 (Co-authors with network flag, ~2% prevalence).',
      'Cross-check with Problematic Paper Screener for tortured phrases in their bibliography.'
    ]
  }
];

export const DATA_SOURCES = [
  {
    id: 'rw',
    name: 'Retraction Watch',
    approxPubs: '57,000',
    type: 'Curated Database',
    focus: 'Detailed retraction reasons, notices, author agreements, expressions of concern.',
    metadataQuality: 'Highest (provides taxonomy reason codes)',
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'crossref',
    name: 'CrossRef',
    approxPubs: '70,000',
    type: 'Publisher Metadata Registry',
    focus: 'Publisher-updated metadata tags indicating retracted status or corrections.',
    metadataQuality: 'Broadest coverage, variable metadata detail',
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
  },
  {
    id: 'pubmed',
    name: 'PubMed',
    approxPubs: '30,000',
    type: 'Biomedical Index',
    focus: 'Biomedical & life sciences publisher retraction notices and errata.',
    metadataQuality: 'Strong in health and life sciences',
    color: 'bg-violet-500/10 border-violet-500/30 text-violet-400'
  },
  {
    id: 'dimensions',
    name: 'Dimensions Algorithmic Detection',
    approxPubs: '24,000',
    type: 'Proprietary Detection',
    focus: 'Catches title modifications, separate retraction notices with new DOIs, and unlinked versions missed by CrossRef.',
    metadataQuality: 'Fills gaps where publishers fail to update metadata',
    color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'pps',
    name: 'Problematic Paper Screener (PPS)',
    approxPubs: '23,000',
    type: 'Open Science Screener (Prof. Cabanac)',
    focus: 'Detects tortured phrases and citejacked references from predatory/hijacked journals.',
    metadataQuality: 'Leading early-warning fingerprint detector',
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400'
  }
];

export const SCENARIO_PROFILES: ScenarioProfile[] = [
  {
    id: 'scenario-legit-star',
    name: 'Prof. Elena Rostova',
    role: 'Senior Professor of Astrophysics',
    description: 'Renowned researcher leading international telescope consortia. Highly productive with a voluntary honest-error retraction from 2021.',
    field: '0201 Astronomical and Space Sciences',
    careerStartYear: 2008,
    publicationCount: 240,
    percentileRank: 99, // Top 1%
    eligiblePublications: 210,
    selfCitations: 145,
    flaggedPublicationsCount: 1,
    flaggedTypes: ['Honest Error Self-Retraction (Retraction Watch)'],
    networkFlag: false,
    coAuthorsTotal: 380,
    coAuthorsWithNetworkFlag: 0,
    coAuthorsWithFlaggedPubsCount: 42, // ~11% (under 20%)
    notes: 'Indicator 1 is Top 1% (Grey). Indicator 2 is Orange (1 flagged paper, but metadata reveals voluntary self-retraction for telescope calibration error). Indicators 3-6 are all Grey. Verdict: Model integrity.'
  },
  {
    id: 'scenario-papermill-customer',
    name: 'Dr. Malik Thorne',
    role: 'Mid-Career Associate Professor',
    description: 'Surge in high-output papers across unrelated fields (nanomaterials, cardiology, cryptography) with zero past collaborators.',
    field: '0904 Chemical Engineering',
    careerStartYear: 2019,
    publicationCount: 52,
    percentileRank: 97, // Top 3%
    eligiblePublications: 38,
    selfCitations: 0, // 0 self citations!
    flaggedPublicationsCount: 4,
    flaggedTypes: ['Tortured Phrases (PPS)', 'Retracted - Paper Mill (Retraction Watch)', 'Citejacking'],
    networkFlag: true, // Network flag YES!
    coAuthorsTotal: 84,
    coAuthorsWithNetworkFlag: 8, // Co-authors have network flag
    coAuthorsWithFlaggedPubsCount: 26, // ~31% (above 20%!)
    notes: 'Triggered 5 out of 6 indicators! Indicator 1 is high output. Indicator 2 has 4 flagged papers including tortured phrases. Indicator 3 is Orange (0 self-citations with 38 eligible papers). Indicator 4 is Orange (Network flag). Indicator 5 & 6 are Orange. Classic paper mill signature.'
  },
  {
    id: 'scenario-junior-postdoc',
    name: 'Dr. Maya Lin',
    role: 'Second-Year Postdoctoral Fellow',
    description: 'Early career researcher with 3 published papers, none citing herself yet. No retractions or network flags.',
    field: '0601 Biochemistry and Cell Biology',
    careerStartYear: 2024,
    publicationCount: 3,
    percentileRank: 45,
    eligiblePublications: 3, // Less than 5 eligible!
    selfCitations: 0,
    flaggedPublicationsCount: 0,
    flaggedTypes: [],
    networkFlag: false,
    coAuthorsTotal: 7,
    coAuthorsWithNetworkFlag: 0,
    coAuthorsWithFlaggedPubsCount: 0,
    notes: 'Crucial Job Aid example: Even though Dr. Lin has 0 self-citations, Indicator 3 is NOT orange! She has fewer than 5 eligible publications, so the self-citation indicator stays grey / N/A.'
  },
  {
    id: 'scenario-collateral-risk',
    name: 'Dr. Arthur Pendelton',
    role: 'Senior Clinical Investigator',
    description: 'Clinician who collaborated on a large 40-author multicenter clinical trial where another co-author had prior retracted work.',
    field: '1103 Clinical Sciences',
    careerStartYear: 2014,
    publicationCount: 75,
    percentileRank: 84,
    eligiblePublications: 68,
    selfCitations: 34,
    flaggedPublicationsCount: 0,
    flaggedTypes: [],
    networkFlag: false,
    coAuthorsTotal: 120,
    coAuthorsWithNetworkFlag: 1, // 1 co-author has network flag
    coAuthorsWithFlaggedPubsCount: 14, // 14 / 120 = 11.6% (Under 20% threshold!)
    notes: 'Indicator 5 turns Orange because 1 co-author has a network flag. BUT Indicator 6 stays GREY because only 11.6% of co-authors have flags (well under the 20% threshold). This shows the threshold protecting normal researchers from false alarms.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Why does Indicator 1 (Percentile of Publication Output) NEVER turn orange, even if a researcher is in the 99.9th percentile?',
    context: 'Section 2: Indicator 1 of 6',
    options: [
      {
        text: 'Because Dimensions lacks data on older publication records.',
        isCorrect: false,
        explanation: 'Dimensions has extensive historical coverage; that is not the reason.'
      },
      {
        text: 'Because high productivity alone is not misconduct; it is contextual information.',
        isCorrect: true,
        explanation: 'Correct! High output may stem from brilliance, running a massive productive lab, or unethical paper mills. Output by itself is not an integrity violation, so it remains strictly neutral grey.'
      },
      {
        text: 'Because percentiles are only calculated once every five years.',
        isCorrect: false,
        explanation: 'Calculations are based on active profile data.'
      },
      {
        text: 'Because only authors with network flags are assigned percentiles.',
        isCorrect: false,
        explanation: 'All researchers with peers are ranked.'
      }
    ],
    jobAidRule: 'Indicator 1 is always grey: productivity is context, not a violation.'
  },
  {
    id: 'q2',
    question: 'Dr. Vance has 3 eligible publications and 0 self-citations. What color will Indicator 3 (Self-Citations) show in Author Check?',
    context: 'Section 2: Indicator 3 of 6 (Self-Citations caveats)',
    options: [
      {
        text: 'Orange, because zero self-citations is always an automatic paper mill flag.',
        isCorrect: false,
        explanation: 'Incorrect. Early career researchers with few papers naturally have little prior work to cite.'
      },
      {
        text: 'Grey / Neutral, because the indicator only evaluates researchers with at least 5 eligible publications.',
        isCorrect: true,
        explanation: 'Correct! Author Check protects early-career researchers: only authors with at least 5 eligible publications (each having ≥9 references) and activity in the last 2 years are analyzed.'
      },
      {
        text: 'Red, because Dr. Vance failed to cite literature.',
        isCorrect: false,
        explanation: 'Author Check does not use Red flags, only Orange highlights and Grey neutrals.'
      },
      {
        text: 'Orange, but only if they also have a network flag.',
        isCorrect: false,
        explanation: 'Indicator 3 operates on its own qualification criteria.'
      }
    ],
    jobAidRule: 'Indicator 3 requires ≥5 eligible publications and recent activity before activating.'
  },
  {
    id: 'q3',
    question: 'Why is Indicator 6 (Co-Authors with Flagged Publications) set to turn orange at 20% instead of at just 1 co-author?',
    context: 'Section 2 & 4: Indicator 6 & Statistics',
    options: [
      {
        text: 'Because roughly 30% of all active researchers already have at least 1 co-author with a retraction.',
        isCorrect: true,
        explanation: 'Correct! Researchers with retractions have larger networks, and about 30% of normal scientists have at least one co-author with a flag. A 1-author trigger would falsely highlight a third of the scientific community!'
      },
      {
        text: 'Because Dimensions only indexes 20% of global co-authorship graphs.',
        isCorrect: false,
        explanation: 'Dimensions indexes comprehensive global publication networks.'
      },
      {
        text: 'Because publishers do not allow alerts until a paper is 20 months old.',
        isCorrect: false,
        explanation: 'Threshold is based on network co-author proportion, not publication age.'
      },
      {
        text: 'Because 20% is the statutory legal requirement for fraud investigations.',
        isCorrect: false,
        explanation: 'It is a bibliometric heuristic based on empirical distribution.'
      }
    ],
    jobAidRule: 'Indicator 6 threshold is 20% because single co-author retractions are widespread (~30% of researchers).'
  },
  {
    id: 'q4',
    question: 'A paper has multiple flags: a tortured phrase detected by PPS, an Expression of Concern, and a Retraction Watch notice. Which flag is highlighted in Author Check?',
    context: 'Section 2: When a publication has more than one flag',
    options: [
      {
        text: 'The earliest chronologically detected flag (Tortured Phrase).',
        isCorrect: false,
        explanation: 'Earlier preliminary screening flags yield to final formal notices.'
      },
      {
        text: 'The most serious flag with the most metadata (Retraction Watch retraction).',
        isCorrect: true,
        explanation: 'Correct! The guide explicitly states that when multiple flags exist, the most serious flag with the richest metadata is highlighted, while all other flags remain accessible when clicking the entry.'
      },
      {
        text: 'All flags are combined into a single new score out of 100.',
        isCorrect: false,
        explanation: 'Author Check does not produce combined numerical metric scores.'
      },
      {
        text: 'The Expression of Concern replaces all others permanently.',
        isCorrect: false,
        explanation: 'A formal retraction is more definitive than an Expression of Concern.'
      }
    ],
    jobAidRule: 'Flag priority hierarchy: Most serious flag with richest metadata takes top display.'
  }
];
