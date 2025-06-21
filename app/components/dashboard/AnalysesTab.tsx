import { FileText, Eye, Download, Trash2, Search, Filter } from "lucide-react";
import { ResumeAnalysis } from "./types";
import { getScoreColor } from "./utils";

interface AnalysesTabProps {
  analyses: ResumeAnalysis[];
}

export default function AnalysesTab({ analyses }: AnalysesTabProps) {
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
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {analyses.map((analysis) => (
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
  );
} 