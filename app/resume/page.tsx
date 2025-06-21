"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Download, 
  Share2, 
  Star,
  Clock,
  Calendar,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

interface AnalysisResult {
  id: string;
  resumeScore: number;
  grammarIssues: string[];
  formattingTips: string[];
  keywordsMatched: string[];
  keywordsMissing: string[];
  atsCompatibility: string;
}

interface ResumeData {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: string;
  createdAt: string;
  analyses: AnalysisResult[];
}

export default function ResumeAnalysisReport() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get('id');
  
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showKeywords, setShowKeywords] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/resumes/${resumeId}`);
      setResume(response.data);
      
      if (response.data.analyses && response.data.analyses.length > 0) {
        setAnalysis(response.data.analyses[0]);
      }
    } catch (err) {
      console.error('Error fetching resume data:', err);
      setError('Failed to load resume analysis');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getATSColor = (compatibility: string) => {
    switch (compatibility.toLowerCase()) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis report...</p>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Report</h2>
          <p className="text-gray-600 mb-4">{error || 'Resume not found'}</p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Resume Analysis Report</h1>
                <p className="text-sm text-slate-600">{resume.fileName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resume Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">File Name</p>
                <p className="font-medium text-slate-900">{resume.fileName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Upload Date</p>
                <p className="font-medium text-slate-900">{formatDate(resume.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">File Size</p>
                <p className="font-medium text-slate-900">{formatFileSize(resume.fileSize)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  resume.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  resume.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {resume.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {analysis ? (
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Overall Analysis</h2>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-slate-600">AI-Powered Analysis</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-6 rounded-lg border-2 ${getScoreBgColor(analysis.resumeScore)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-6 h-6 text-slate-600" />
                    <span className="text-sm font-medium text-slate-600">Resume Score</span>
                  </div>
                  <p className={`text-3xl font-bold ${getScoreColor(analysis.resumeScore)}`}>
                    {analysis.resumeScore}/100
                  </p>
                </div>
                
                <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">ATS Compatibility</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getATSColor(analysis.atsCompatibility)}`}>
                    {analysis.atsCompatibility}
                  </span>
                </div>
                
                <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Keywords Matched</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    {analysis.keywordsMatched.length}
                  </p>
                </div>
                
                <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Issues Found</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {analysis.grammarIssues.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Keywords Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Keywords Analysis</h2>
                <button 
                  onClick={() => setShowKeywords(!showKeywords)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  {showKeywords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {showKeywords ? 'Hide' : 'Show'} Keywords
                  </span>
                </button>
              </div>
              
              {showKeywords && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Keywords Found ({analysis.keywordsMatched.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordsMatched.map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Missing Keywords ({analysis.keywordsMissing.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordsMissing.map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Improvement Suggestions</h2>
                <button 
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  {showSuggestions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {showSuggestions ? 'Hide' : 'Show'} Suggestions
                  </span>
                </button>
              </div>
              
              {showSuggestions && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Grammar Issues ({analysis.grammarIssues.length})
                    </h3>
                    <div className="space-y-3">
                      {analysis.grammarIssues.map((issue, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-800 text-sm">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Formatting Tips ({analysis.formattingTips.length})
                    </h3>
                    <div className="space-y-3">
                      {analysis.formattingTips.map((tip, index) => (
                        <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-blue-800 text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Next Steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Download Report</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share Analysis</span>
                </button>
                <Link 
                  href="/dashboard"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Analysis Available</h2>
            <p className="text-slate-600 mb-6">
             {`This resume hasn't been analyzed yet. Please run an analysis to see detailed insights.`}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Run Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
