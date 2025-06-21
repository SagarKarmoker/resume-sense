import { FileText, Eye, Download, Trash2, Search, Filter, Play } from "lucide-react";
import { ResumeAnalysis } from "./types";
import { getScoreColor } from "./utils";
import Link from "next/link";
import { useState, useMemo } from "react";

interface AnalysesTabProps {
  analyses: ResumeAnalysis[];
  onRunAnalysis?: (resumeId: string, fileKey: string, fileType: string) => void;
}

export default function AnalysesTab({ analyses, onRunAnalysis }: AnalysesTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter analyses based on search term and status
  const filteredAnalyses = useMemo(() => {
    return analyses.filter(analysis => {
      const matchesSearch = analysis.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || analysis.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [analyses, searchTerm, statusFilter]);

  if (!analyses || analyses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">My Resume Analyses</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-slate-600">No analyses found. Upload your first resume to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Resume Analyses</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {filteredAnalyses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-slate-600">No analyses match your search criteria.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAnalyses.map((analysis) => (
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
                  {analysis.isFallback && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Fallback
                    </span>
                  )}
                  {analysis.status === 'completed' && (
                    <Link 
                      href={`/resume?id=${analysis.id}`}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  )}
                  {analysis.status === 'failed' && onRunAnalysis && (
                    <button 
                      onClick={() => onRunAnalysis(analysis.id, analysis.fileKey || '', analysis.fileType || '')}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Run Analysis"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  {analysis.status === 'completed' && analysis.isFallback && onRunAnalysis && (
                    <button 
                      onClick={() => onRunAnalysis(analysis.id, analysis.fileKey || '', analysis.fileType || '')}
                      className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                      title="Retry AI Analysis"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {analysis.status === 'completed' ? (
                <>
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
                    <Link 
                      href={`/resume?id=${analysis.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      View Full Analysis →
                    </Link>
                  </div>
                </>
              ) : analysis.status === 'processing' ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">Analyzing resume...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">Analysis failed. Click the play button to try again.</p>
                  {onRunAnalysis && (
                    <button 
                      onClick={() => onRunAnalysis(analysis.id, analysis.fileKey || '', analysis.fileType || '')}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Analysis
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}