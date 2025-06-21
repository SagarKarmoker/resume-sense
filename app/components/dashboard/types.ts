export interface ResumeAnalysis {
  id: string;
  fileName: string;
  uploadDate: string;
  resumeScore: number;
  grammarScore: number;
  atsCompatibility: number;
  skillMatch: number;
  keywords: string[];
  suggestions: string[];
  jobMatches: string[];
  status: 'completed' | 'processing' | 'failed';
}

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
} 