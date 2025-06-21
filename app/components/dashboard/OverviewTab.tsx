import { FileText, TrendingUp, Target, MessageSquare, Eye, Download } from "lucide-react";
import { ResumeAnalysis } from "./types";
import { getScoreColor, getScoreBgColor } from "./utils";
import StatsCard from "./StatsCard";

interface OverviewTabProps {
  analyses: ResumeAnalysis[];
}

export default function OverviewTab({ analyses }: OverviewTabProps) {
  // Handle case when analyses is undefined or empty
  if (!analyses || analyses.length === 0) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Analyses"
            value={0}
            icon={FileText}
            iconBgColor="bg-gradient-to-r from-blue-600 to-purple-600"
          />
          <StatsCard
            title="Avg Resume Score"
            value={0}
            icon={TrendingUp}
            iconBgColor="bg-gradient-to-r from-green-600 to-emerald-600"
          />
          <StatsCard
            title="Job Matches"
            value={0}
            icon={Target}
            iconBgColor="bg-gradient-to-r from-purple-600 to-pink-600"
          />
          <StatsCard
            title="Suggestions"
            value={0}
            icon={MessageSquare}
            iconBgColor="bg-gradient-to-r from-orange-600 to-red-600"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-slate-600">No analyses found. Upload your first resume to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  const totalAnalyses = analyses.length;
  const avgResumeScore = Math.round(analyses.reduce((acc, analysis) => acc + analysis.resumeScore, 0) / analyses.length);
  const totalJobMatches = analyses.reduce((acc, analysis) => acc + analysis.jobMatches.length, 0);
  const totalSuggestions = analyses.reduce((acc, analysis) => acc + analysis.suggestions.length, 0);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Analyses"
          value={totalAnalyses}
          icon={FileText}
          iconBgColor="bg-gradient-to-r from-blue-600 to-purple-600"
        />
        <StatsCard
          title="Avg Resume Score"
          value={avgResumeScore}
          icon={TrendingUp}
          iconBgColor="bg-gradient-to-r from-green-600 to-emerald-600"
        />
        <StatsCard
          title="Job Matches"
          value={totalJobMatches}
          icon={Target}
          iconBgColor="bg-gradient-to-r from-purple-600 to-pink-600"
        />
        <StatsCard
          title="Suggestions"
          value={totalSuggestions}
          icon={MessageSquare}
          iconBgColor="bg-gradient-to-r from-orange-600 to-red-600"
        />
      </div>

      {/* Recent Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Recent Analysis</h3>
        </div>
        <div className="p-6">
          {analyses[0] && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{analyses[0].fileName}</h4>
                    <p className="text-sm text-slate-600">Analyzed on {analyses[0].uploadDate}</p>
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
                <div className={`p-4 rounded-lg ${getScoreBgColor(analyses[0].resumeScore)}`}>
                  <p className="text-sm font-medium text-slate-600">Resume Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(analyses[0].resumeScore)}`}>
                    {analyses[0].resumeScore}/100
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${getScoreBgColor(analyses[0].grammarScore)}`}>
                  <p className="text-sm font-medium text-slate-600">Grammar</p>
                  <p className={`text-2xl font-bold ${getScoreColor(analyses[0].grammarScore)}`}>
                    {analyses[0].grammarScore}/100
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${getScoreBgColor(analyses[0].atsCompatibility)}`}>
                  <p className="text-sm font-medium text-slate-600">ATS Compatible</p>
                  <p className={`text-2xl font-bold ${getScoreColor(analyses[0].atsCompatibility)}`}>
                    {analyses[0].atsCompatibility}/100
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${getScoreBgColor(analyses[0].skillMatch)}`}>
                  <p className="text-sm font-medium text-slate-600">Skill Match</p>
                  <p className={`text-2xl font-bold ${getScoreColor(analyses[0].skillMatch)}`}>
                    {analyses[0].skillMatch}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 