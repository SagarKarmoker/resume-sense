import { FileText, Briefcase, Search } from "lucide-react";
import { ResumeAnalysis } from "./types";

interface JobMatchesTabProps {
  analyses: ResumeAnalysis[];
}

export default function JobMatchesTab({ analyses }: JobMatchesTabProps) {
  if (!analyses || analyses.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Job Role Matches</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-slate-600">No job matches available. Upload your first resume to see matching job roles!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Job Role Matches</h2>
      
      {analyses.map((analysis) => (
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
  );
} 