import { FileText, Settings, RefreshCw } from "lucide-react";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function Header({ onRefresh, isRefreshing = false }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <Link href={"/"} className="text-2xl font-bold text-slate-900 hover:cursor-pointer">
              ResumeSense | Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {onRefresh && (
              <button 
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh data"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <Settings className="w-5 h-5" />
            </button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
} 