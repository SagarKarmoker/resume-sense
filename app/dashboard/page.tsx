"use client";

import React, { useState } from 'react';
import {
  Header,
  ResumeUpload,
  TabNavigation,
  OverviewTab,
  AnalysesTab,
  SuggestionsTab,
  JobMatchesTab,
  mockAnalyses
} from '../components/dashboard';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fallback for mockAnalyses in case it's undefined
  const analyses = mockAnalyses || [];

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResumeUpload
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          onFileUpload={handleFileUpload}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab analyses={analyses} />
        )}

        {activeTab === 'analyses' && (
          <AnalysesTab analyses={analyses} />
        )}

        {activeTab === 'suggestions' && (
          <SuggestionsTab analyses={analyses} />
        )}

        {activeTab === 'job-matches' && (
          <JobMatchesTab analyses={analyses} />
        )}
      </main>
    </div>
  );
}
