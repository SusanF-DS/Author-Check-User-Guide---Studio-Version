export interface WorkflowStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
  actionItems: string[];
  tips: string;
  technicalGuideLinkTab: 'indicators' | 'taxonomy' | 'datasources' | 'simulator';
  technicalGuidePrompt: string;
}

export interface SearchMethod {
  method: string;
  bestWhen: string;
  precision: 'Most Precise' | 'More Precise' | 'Co-authors' | string;
  details: string;
  example: string;
}

export interface FilterItem {
  name: string;
  purpose: string;
  exampleInput: string;
  scopeNote?: string;
}

export interface RoleScreeningGuide {
  role: 'Author' | 'Peer Reviewer' | 'Editor';
  targetAudience: string;
  lookAtFirst: string[];
  keepInMind: string[];
  dangerSigns: string[];
  reassuranceSigns: string[];
  technicalCrossReference: string;
}

export interface StorylaneChapter {
  chapter: number;
  title: string;
  description: string;
  url: string;
  duration: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Find the Researcher',
    tagline: 'Precision search in Researcher Finder',
    description: 'Search for an individual scholar or multiple researchers using Name + Affiliation, an ORCID / Dimensions Researcher ID, or a manuscript DOI to check all co-authors at once.',
    actionItems: [
      'Open Author Check from "Apps" in the left-hand navigation sidebar at dimensions.ai.',
      'Use an ORCID or Dimensions ID for the most precise lookup.',
      'When searching by name, specify the current or historical affiliation to disambiguate common names.',
      'If checking a submitted paper, input the manuscript DOI to return every author listed on the document.'
    ],
    tips: 'Using several filters creates an "AND" search. If you get no results, remove a filter and try again.',
    technicalGuideLinkTab: 'indicators',
    technicalGuidePrompt: 'Want to know how peer cohorts and ANZSRC Level 2 fields are defined for search matches? See The 6 Indicators tab'
  },
  {
    step: 2,
    title: 'Review the Summary Indicators',
    tagline: 'Triage the orange highlights',
    description: 'Open the researcher profile. Work from the top overview: 5 indicators can turn orange when an atypical pattern is detected. Percentile of publication output is always grey for context.',
    actionItems: [
      'Scan the 6 indicator tiles in the top overview.',
      'Note which indicators are highlighted in orange.',
      'Remember: An indicator is a prompt for closer look, NOT an automated verdict of wrongdoing.',
      'Check if multiple indicators align (e.g. high output + unusual network flag + 0 self-citations).'
    ],
    tips: 'Percentile of publication output is NEVER orange because high productivity alone is not misconduct.',
    technicalGuideLinkTab: 'indicators',
    technicalGuidePrompt: 'Explore the exact threshold rules and As of November 2025 benchmark stats for all 6 indicators in The 6 Indicators Deep Dive'
  },
  {
    step: 3,
    title: 'Investigate the Details',
    tagline: 'Self-citations, flagged papers & co-authors',
    description: 'Inspect the evidence sitting behind each highlight: drill into Self-citations, investigate the Flagged Publications table, and explore the Co-authors network.',
    actionItems: [
      'Drill into Self-citations to check eligibility rules (>=5 papers with >=9 refs) and discipline benchmarks.',
      'Click on any flagged publication to see every flag, data source, date, and mapped retraction reason.',
      'Check whether a retraction was voluntary self-correction (counts in author’s favor) or forced fraud.',
      'Examine the Co-authors table: look for co-authors with network flags or flagged publications.',
      'Check "Strength of Collaboration" to see if flagged collaborators are frequent lab partners or one-off strangers.'
    ],
    tips: 'When a paper has multiple flags, Author Check highlights the most severe flag with the richest metadata.',
    technicalGuideLinkTab: 'taxonomy',
    technicalGuidePrompt: 'See how Retraction Watch reasons are mapped into the Retraction Taxonomy (Paper Mill vs Publisher Error)'
  },
  {
    step: 4,
    title: 'Export Data',
    tagline: 'Download tables & whole reports',
    description: 'Download individual tables or full researcher profiles as PDF or CSV. Synthesize all findings responsibly before initiating external inquiries.',
    actionItems: [
      'Click the 3 vertical dots on any tile to download that specific table as CSV or PDF.',
      'Or click the 3 dots in the top-right of the dashboard to download the entire researcher report.',
      'State in communications that data is publicly sourced and does not determine misconduct by itself.',
      'Follow your institution’s or journal’s established integrity assessment protocols.'
    ],
    tips: 'Drill-downs are limited to a maximum of 500 results for optimal system performance.',
    technicalGuideLinkTab: 'simulator',
    technicalGuidePrompt: 'Test researcher profiles in the interactive Simulator to verify your triage decisions'
  }
];

export const SEARCH_METHODS: SearchMethod[] = [
  {
    method: 'Name + Affiliation',
    bestWhen: 'You only have a scholar’s name and, ideally, their institution.',
    precision: 'More Precise',
    details: 'Multiple researchers frequently share the same name. Adding an affiliation filters out false matches. You can toggle between "Current affiliation only" or "All known affiliations (past and present)".',
    example: 'Elena Rostova + University of Cambridge'
  },
  {
    method: 'Dimensions Researcher ID or ORCID',
    bestWhen: 'You have an identifier from a manuscript submission system, grant proposal, or CV.',
    precision: 'Most Precise',
    details: 'The quickest and most precise lookup. Guarantees you are reviewing the exact intended researcher profile without name ambiguity.',
    example: 'ur.013456789.22 or 0000-0002-1825-0097'
  },
  {
    method: 'DOI or Dimensions Document ID',
    bestWhen: 'You are vetting a submitted manuscript and want to check all co-authors simultaneously.',
    precision: 'Co-authors',
    details: 'Returns every author listed on that publication, grant, patent, or clinical trial so you can screen the entire author roster in one unified view.',
    example: '10.1038/s41598-024-71230-8'
  }
];

export const SEARCH_FILTERS: FilterItem[] = [
  {
    name: 'Name',
    purpose: 'Search for the researcher by first, middle, or last name.',
    exampleInput: 'e.g. John Smith'
  },
  {
    name: 'ORCID',
    purpose: 'Exact match against 16-digit Open Researcher and Contributor ID.',
    exampleInput: 'e.g. 0000-0002-1825-0097'
  },
  {
    name: 'Dimensions Researcher ID',
    purpose: 'Unique identifier assigned by Dimensions disambiguation algorithms.',
    exampleInput: 'e.g. ur.0123456789.01'
  },
  {
    name: 'Affiliation',
    purpose: 'Filter by university, research institute, hospital, or corporate affiliation.',
    exampleInput: 'e.g. Oxford University'
  },
  {
    name: 'Affiliation Filter Type',
    purpose: 'Choose whether Affiliation matches only Current institution or All Historical affiliations.',
    exampleInput: 'Current only vs All past & present',
    scopeNote: 'Useful for mobile researchers who recently switched institutions.'
  },
  {
    name: 'DOI (Digital Object Identifier)',
    purpose: 'Enter a journal paper DOI to inspect all co-authors on that specific manuscript.',
    exampleInput: 'e.g. 10.1016/j.cell.2024.01.002'
  },
  {
    name: 'Dimensions Document ID',
    purpose: 'Check authors, investigators, or inventors for publications, grants, patents, or clinical trials.',
    exampleInput: 'e.g. pub.1122334455'
  }
];

export const ROLE_SCREENING_GUIDES: RoleScreeningGuide[] = [
  {
    role: 'Author',
    targetAudience: 'Evaluating submitting authors, corresponding authors, and candidates for academic appointment.',
    lookAtFirst: [
      'Flagged Publications (inspect flag type, date, and retraction reasons)',
      'Self-Citations percentage (is it 0% despite extensive publishing?)',
      'Percentile of Publication Output (context for extreme productivity)'
    ],
    keepInMind: [
      'A high output percentile may reflect legitimate leadership of a prolific laboratory consortium.',
      'A missing self-citation result for an early-career researcher (<5 eligible papers) is completely normal and not a warning sign.',
      'Look at who initiated retractions: voluntary self-retraction for honest calculation error counts in the author’s favor.'
    ],
    dangerSigns: [
      'Sudden spike into 99th percentile across disjoint fields (e.g. oncology, AI, and concrete structures)',
      '0 self-citations across 20+ eligible papers',
      'Retraction Watch reasons tagged with "Paper Mill", "Fake Peer Review", or "Tortured Phrases"'
    ],
    reassuranceSigns: [
      'Author voluntarily reported reagent contamination and requested self-retraction',
      'Retraction was due to publisher typesetting duplication with zero author fault',
      'Co-authors show normal high collaboration strength with consistent institutional peers'
    ],
    technicalCrossReference: 'See: The 6 Indicators Tab (Indicator 2 & Indicator 3)'
  },
  {
    role: 'Peer Reviewer',
    targetAudience: 'Vetting potential peer reviewers, guest editors, and expert referees for manuscript submissions.',
    lookAtFirst: [
      'Flagged Publications (confirm reviewer has no active fraud or peer-review manipulation flags)',
      'Co-Authors with Network Flag (unusual co-authorship topologies)',
      'Co-Authors with Flagged Publications (network contamination level)'
    ],
    keepInMind: [
      'Network indicators describe the co-author network structure; they do not evaluate the scientific quality of their peer reviews directly.',
      'Check whether the reviewer has any prior flags involving "Compromised Peer Review" or "Rogue Editor" networks.',
      'If a reviewer shares co-authors with the submitting author, check for conflicts of interest.'
    ],
    dangerSigns: [
      'Researcher holds an Unusual Network Flag (100x statistical risk of flagged papers)',
      'Affiliated with known paper mill citation rings',
      'Multiple co-authors holding network flags'
    ],
    reassuranceSigns: [
      'Clear, consistent disciplinary publishing history in the exact field of the manuscript',
      'Normal co-author network with high collaboration strength among established scholars',
      '0 flagged publications'
    ],
    technicalCrossReference: 'See: The 6 Indicators Tab (Indicator 4 & Indicator 5)'
  },
  {
    role: 'Editor',
    targetAudience: 'Screening candidates for Editorial Boards, Section Editors, and Special Issue Guest Editors.',
    lookAtFirst: [
      'Flagged Publications (complete history and full metadata breakdown)',
      'Co-Authors with Network Flag & Flagged Publications (evaluating editorial circle integrity)',
      'Unusual Network Flag (vital check against predatory paper mill infiltration)'
    ],
    keepInMind: [
      'Guest editors of Special Issues are historically a prime target for paper mill infiltration.',
      'Treat any highlight as a prompt to review past journal issues they have edited.',
      'Always follow your organization’s or publishing house’s formal governance process.'
    ],
    dangerSigns: [
      'Unusual Network Flag present ("Yes")',
      'High proportion of co-authors (>20%) with flagged publications',
      'History of retractions involving identity theft or compromised peer review'
    ],
    reassuranceSigns: [
      'Long-standing career history with peer-reviewed publications spanning decades',
      'Healthy self-citation rate reflecting sustained sequential scholarship',
      'Clean network graph with no atypical clustering'
    ],
    technicalCrossReference: 'See: The 6 Indicators Tab (Indicator 6) & Taxonomy Tab'
  }
];

export const STORYLANE_DEMOS: StorylaneChapter[] = [
  {
    chapter: 1,
    title: 'Getting Started with Author Check',
    description: 'Walkthrough of the 4-step workflow, interface overview, and navigation fundamentals.',
    url: 'https://app.storylane.io/share/pef17sbcf2g6?chapter=1',
    duration: '~2 mins'
  },
  {
    chapter: 2,
    title: 'Finding a Researcher',
    description: 'How to use Researcher Finder, apply AND filters, search by DOI, and check multiple authors.',
    url: 'https://app.storylane.io/share/pef17sbcf2g6?chapter=2',
    duration: '~2 mins'
  },
  {
    chapter: 3,
    title: 'Reading Indicators & Highlights',
    description: 'Understanding what the orange highlights mean and why output percentile is always grey.',
    url: 'https://app.storylane.io/share/pef17sbcf2g6?chapter=3',
    duration: '~3 mins'
  },
  {
    chapter: 4,
    title: 'Investigate the Details',
    description: 'Clicking flagged publications to view metadata, drilling into self-citations, and sorting co-authors.',
    url: 'https://app.storylane.io/share/pef17sbcf2g6?chapter=4',
    duration: '~3 mins'
  },
  {
    chapter: 5,
    title: 'Exporting Data',
    description: 'Downloading individual tiles and whole researcher reports as PDF or CSV.',
    url: 'https://app.storylane.io/share/pef17sbcf2g6?chapter=5',
    duration: '~1.5 mins'
  },
  {
    chapter: 6,
    title: 'Start from a Dimensions Search',
    description: 'Launching Author Check directly from Researcher filters or Analytical Views in Dimensions.',
    url: 'https://app.storylane.io/share/pef17sbcf2g6?chapter=6',
    duration: '~2 mins'
  }
];

export const USER_GUIDE_FAQS = [
  {
    q: 'What is the limit for drill-downs in Author Check?',
    a: 'Drill-downs are limited to a maximum of 500 results for responsive browser rendering and data processing performance.'
  },
  {
    q: 'How do I clear all filters in the Researcher Finder?',
    a: 'Click the "Reset" link next to "Apply filters". To clear a single filter input, click the small "x" at the end of that specific field.'
  },
  {
    q: 'How do I navigate to Author Check from a standard Dimensions search?',
    a: 'You can do this from two places: 1) Click the Researcher filter in Dimensions, click View More, click the 3-dot menu on any researcher and choose "View in Author Check". 2) In Analytical Views -> Researchers view, click any name and select "View in Author Check".'
  },
  {
    q: 'Can I copy text from within tables or charts?',
    a: 'Due to interactive canvas constraints, click into the table cell and use CTRL+C (or CMD+C on Mac) to copy the full cell text.'
  },
  {
    q: 'Why did a PDF export cut off or have bad page breaks?',
    a: 'Filter by a shorter time range before exporting, export individual tables via their 3-dot menu, or format the PDF print dialog to "Fit to page" instead of standard paper sizes.'
  }
];
