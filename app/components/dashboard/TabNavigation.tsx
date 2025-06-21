import { BarChart3, FileText, MessageSquare, Target } from "lucide-react";
import { TabItem } from "./types";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analyses', label: 'My Analyses', icon: FileText },
    { id: 'suggestions', label: 'Suggestions', icon: MessageSquare },
    { id: 'job-matches', label: 'Job Matches', icon: Target }
  ];

  return (
    <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-slate-200 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
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
  );
} 