import { ResumeAnalysis } from "./types";

export const mockAnalyses: ResumeAnalysis[] = [
  {
    id: '1',
    fileName: 'Software_Engineer_Resume.pdf',
    uploadDate: '2024-01-15',
    resumeScore: 87,
    grammarScore: 92,
    atsCompatibility: 89,
    skillMatch: 94,
    keywords: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    suggestions: [
      'Add more quantifiable achievements to your experience section',
      'Include specific metrics for project impact',
      'Consider adding a skills section with technical keywords'
    ],
    jobMatches: ['Senior Software Engineer', 'Full Stack Developer', 'React Developer'],
    status: 'completed'
  },
  {
    id: '2',
    fileName: 'Marketing_Manager_Resume.docx',
    uploadDate: '2024-01-10',
    resumeScore: 76,
    grammarScore: 88,
    atsCompatibility: 82,
    skillMatch: 79,
    keywords: ['Digital Marketing', 'SEO', 'Google Analytics', 'Campaign Management'],
    suggestions: [
      'Improve action verbs in your bullet points',
      'Add more specific campaign results and metrics',
      'Include relevant certifications'
    ],
    jobMatches: ['Marketing Manager', 'Digital Marketing Specialist', 'Campaign Manager'],
    status: 'completed'
  }
]; 