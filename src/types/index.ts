export type VerificationStatus = 'verified' | 'needs-verification';

export type SectionId =
  | 'hero'
  | 'independence'
  | 'archive'
  | 'socialism'
  | 'conditions'
  | 'debate'
  | 'limitations'
  | 'conclusion'
  | 'sources';

export interface SourceReference {
  id: string;
  type:
    | 'textbook'
    | 'ho-chi-minh-complete-works'
    | 'historical-document'
    | 'academic-source'
    | 'other';
  title: string;
  author?: string;
  year?: number;
  volume?: string;
  pages?: string;
  publisher?: string;
  documentName?: string;
  url?: string;
  verificationStatus: VerificationStatus;
  note?: string;
}

export interface HistoricalImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  year?: string;
  sourceName: string;
  sourceUrl: string;
  relatedEvidenceIds: string[];
  category?: 'independence' | 'socialism' | 'heritage' | 'document';
  aspectRatio?: string;
}

export interface Evidence {
  id: string;
  title: string;
  quote?: string;
  summary: string;
  details?: string[];
  analysis: string;
  sourceIds: string[];
  imageIds: string[];
  verificationStatus: VerificationStatus;
}

export interface Argument {
  id: string;
  sectionId: string;
  order: number;
  title: string;
  statement: string;
  displayStatement: string;
  evidenceIds: string[];
  analysis: string;
  displayAnalysis: string;
  linkBack?: string;
}

export interface Debate {
  id: string;
  counterArgument: string;
  evidenceIds: string[];
  analysis: string;
  rebuttal: string;
}

export interface Limitation {
  id: string;
  title: string;
  statement: string;
  evidenceIds: string[];
  analysis: string;
}

export interface PresentationSection {
  id: SectionId;
  slug: string;
  order: number;
  title: string;
  subtitle?: string;
  argumentIds: string[];
  imageIds: string[];
  presentationDuration: number;
}

export interface GuaranteeCondition {
  id: string;
  order: number;
  title: string;
  summary: string;
  analysis: string;
  evidenceIds: string[];
}

export interface PresenterState {
  isActive: boolean;
  isPlaying: boolean;
  currentSectionId: SectionId;
  timeRemaining: number;
  progressPercent: number;
}
