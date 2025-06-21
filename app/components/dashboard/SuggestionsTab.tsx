import { FileText, CheckCircle } from "lucide-react";
import { ResumeAnalysis } from "./types";

interface SuggestionsTabProps {
  analyses: ResumeAnalysis[];
}

export default function SuggestionsTab({ analyses }: SuggestionsTabProps) {
  if (!analyses || analyses.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Improvement Suggestions</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-slate-600">No suggestions available. Upload your first resume to get personalized suggestions!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Improvement Suggestions</h2>
      
      {analyses.map((analysis) => (
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
  );
} 