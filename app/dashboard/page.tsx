"use client";

import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { 
  Upload, 
  FileText, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  BarChart3,
  MessageSquare,
  Briefcase,
  Settings
} from "lucide-react";

interface ResumeAnalysis {
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock data for demonstration
  const mockAnalyses: ResumeAnalysis[] = [
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">ResumeSense | Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
              </button>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Resume</h2>
            <p className="text-slate-600 mb-6">Get AI-powered analysis and insights to improve your resume</p>
            
            {isUploading ? (
              <div className="max-w-md mx-auto">
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-600">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <label className="block w-full p-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 mb-1">
                      <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-slate-500">PDF or DOCX files only</p>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-slate-200 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'analyses', label: 'My Analyses', icon: FileText },
            { id: 'suggestions', label: 'Suggestions', icon: MessageSquare },
            { id: 'job-matches', label: 'Job Matches', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Analyses</p>
                    <p className="text-2xl font-bold text-slate-900">{mockAnalyses.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Resume Score</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {Math.round(mockAnalyses.reduce((acc, analysis) => acc + analysis.resumeScore, 0) / mockAnalyses.length)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Job Matches</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {mockAnalyses.reduce((acc, analysis) => acc + analysis.jobMatches.length, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Suggestions</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {mockAnalyses.reduce((acc, analysis) => acc + analysis.suggestions.length, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Recent Analysis</h3>
              </div>
              <div className="p-6">
                {mockAnalyses[0] && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{mockAnalyses[0].fileName}</h4>
                          <p className="text-sm text-slate-600">Analyzed on {mockAnalyses[0].uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Score Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`p-4 rounded-lg ${getScoreBgColor(mockAnalyses[0].resumeScore)}`}>
                        <p className="text-sm font-medium text-slate-600">Resume Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(mockAnalyses[0].resumeScore)}`}>
                          {mockAnalyses[0].resumeScore}/100
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${getScoreBgColor(mockAnalyses[0].grammarScore)}`}>
                        <p className="text-sm font-medium text-slate-600">Grammar</p>
                        <p className={`text-2xl font-bold ${getScoreColor(mockAnalyses[0].grammarScore)}`}>
                          {mockAnalyses[0].grammarScore}/100
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${getScoreBgColor(mockAnalyses[0].atsCompatibility)}`}>
                        <p className="text-sm font-medium text-slate-600">ATS Compatible</p>
                        <p className={`text-2xl font-bold ${getScoreColor(mockAnalyses[0].atsCompatibility)}`}>
                          {mockAnalyses[0].atsCompatibility}/100
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${getScoreBgColor(mockAnalyses[0].skillMatch)}`}>
                        <p className="text-sm font-medium text-slate-600">Skill Match</p>
                        <p className={`text-2xl font-bold ${getScoreColor(mockAnalyses[0].skillMatch)}`}>
                          {mockAnalyses[0].skillMatch}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analyses Tab */}
        {activeTab === 'analyses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">My Resume Analyses</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search analyses..."
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {mockAnalyses.map((analysis) => (
                <div key={analysis.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{analysis.fileName}</h3>
                        <p className="text-sm text-slate-600">Uploaded on {analysis.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                        analysis.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.status}
                      </span>
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">Resume Score</p>
                      <p className={`text-xl font-bold ${getScoreColor(analysis.resumeScore)}`}>
                        {analysis.resumeScore}/100
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">Grammar</p>
                      <p className={`text-xl font-bold ${getScoreColor(analysis.grammarScore)}`}>
                        {analysis.grammarScore}/100
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">ATS Compatible</p>
                      <p className={`text-xl font-bold ${getScoreColor(analysis.atsCompatibility)}`}>
                        {analysis.atsCompatibility}/100
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">Skill Match</p>
                      <p className={`text-xl font-bold ${getScoreColor(analysis.skillMatch)}`}>
                        {analysis.skillMatch}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-4">
                      <span>{analysis.keywords.length} keywords found</span>
                      <span>{analysis.suggestions.length} suggestions</span>
                      <span>{analysis.jobMatches.length} job matches</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                      View Full Analysis →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Improvement Suggestions</h2>
            
            {mockAnalyses.map((analysis) => (
              <div key={analysis.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{analysis.fileName}</h3>
                    <p className="text-sm text-slate-600">Resume Score: {analysis.resumeScore}/100</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-900">{suggestion}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                            Apply Suggestion
                          </button>
                          <button className="text-sm text-slate-600 hover:text-slate-700 cursor-pointer">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Matches Tab */}
        {activeTab === 'job-matches' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Job Role Matches</h2>
            
            {mockAnalyses.map((analysis) => (
              <div key={analysis.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{analysis.fileName}</h3>
                    <p className="text-sm text-slate-600">Skill Match: {analysis.skillMatch}%</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {analysis.jobMatches.map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{job}</h4>
                          <p className="text-sm text-slate-600">High compatibility match</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-medium">
                          {Math.round(analysis.skillMatch - (index * 5))}% match
                        </span>
                        <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                          <Search className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2">Top Keywords Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
