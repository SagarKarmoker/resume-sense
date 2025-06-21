"use client";

import React, { useState, useEffect } from 'react';
import {
    Header,
    ResumeUpload,
    TabNavigation,
    OverviewTab,
    AnalysesTab,
    SuggestionsTab,
    JobMatchesTab
} from '../components/dashboard';
import { ResumeAnalysis } from '../components/dashboard/types';
import axios from 'axios';

interface DashboardStats {
    totalResumes: number;
    completedAnalyses: number;
    processingAnalyses: number;
    failedAnalyses: number;
    totalJobMatches: number;
    averageScore: number;
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadStep, setUploadStep] = useState<string>('');

    // Fetch dashboard data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get('/api/dashboard');
            setAnalyses(response.data.resumes);
            setStats(response.data.stats);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data');
            setAnalyses([]);
            setStats(null);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchDashboardData();
        setRefreshing(false);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            setUploadProgress(0);
            setUploadStep('Preparing upload...');

            // Simulate upload progress with detailed steps
            const steps = [
                { progress: 10, step: 'Validating file...' },
                { progress: 25, step: 'Generating upload URL...' },
                { progress: 50, step: 'Uploading to cloud...' },
                { progress: 75, step: 'Processing file...' },
                { progress: 90, step: 'Finalizing...' }
            ];

            let currentStep = 0;
            const interval = setInterval(() => {
                if (currentStep < steps.length) {
                    setUploadProgress(steps[currentStep].progress);
                    setUploadStep(steps[currentStep].step);
                    currentStep++;
                } else {
                    clearInterval(interval);
                }
            }, 800);

            try {
                // Get upload URL
                setUploadStep('Getting upload URL...');
                const uploadResponse = await axios.post('/api/upload', {
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                });

                // Upload file to S3
                setUploadStep('Uploading to cloud storage...');
                const upload = await axios.put(uploadResponse.data.uploadUrl, file, {
                    headers: {
                        'Content-Type': file.type,
                    },
                });

                if (upload.status !== 200) {
                    throw new Error("Failed to upload file");
                }

                // Complete the progress
                setUploadProgress(100);
                setUploadStep('Upload completed!');
                
                // Refresh dashboard data to show new resume
                setTimeout(async () => {
                    setIsUploading(false);
                    setUploadProgress(0);
                    setUploadStep('');
                    await fetchDashboardData();
                }, 1500);

            } catch (error) {
                console.error('Upload failed:', error);
                setIsUploading(false);
                setUploadProgress(0);
                setUploadStep('');
                setError('Failed to upload file. Please try again.');
            }
        }
    };

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleAnalysisRequest = async (resumeId: string, fileKey: string, fileType: string) => {
        try {
            setError(null);
            
            // Update the resume status to processing
            setAnalyses(prev => prev.map(analysis => 
                analysis.id === resumeId 
                    ? { ...analysis, status: 'processing' as const }
                    : analysis
            ));

            // Start analysis
            const response = await axios.post('/api/analyze', {
                resumeId,
                fileKey,
                fileType
            });

            if (response.data.success) {
                // Refresh dashboard data to show updated analysis
                await fetchDashboardData();
            } else {
                throw new Error('Analysis failed');
            }
        } catch (err) {
            console.error('Analysis failed:', err);
            setError('Failed to analyze resume. Please try again.');
            
            // Reset status on error
            setAnalyses(prev => prev.map(analysis => 
                analysis.id === resumeId 
                    ? { ...analysis, status: 'failed' as const }
                    : analysis
            ));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 animate-pulse">Loading Dashboard</h2>
                            <p className="text-gray-600">Fetching your resume analyses...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header onRefresh={handleRefresh} isRefreshing={refreshing} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-down">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={() => setError(null)}
                                    className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Progress Overlay */}
                {isUploading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
                            <div className="relative mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Uploading Resume</h3>
                            <p className="text-gray-600 mb-4">{uploadStep}</p>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            
                            <div className="text-sm text-gray-500">{uploadProgress}% Complete</div>
                            
                            {/* Upload Steps */}
                            <div className="mt-6 space-y-2 text-left">
                                <div className="flex items-center justify-between text-sm">
                                    <span>File validation</span>
                                    <div className={`w-4 h-4 rounded-full ${uploadProgress >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Upload preparation</span>
                                    <div className={`w-4 h-4 rounded-full ${uploadProgress >= 25 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Cloud upload</span>
                                    <div className={`w-4 h-4 rounded-full ${uploadProgress >= 50 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Processing</span>
                                    <div className={`w-4 h-4 rounded-full ${uploadProgress >= 75 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Finalization</span>
                                    <div className={`w-4 h-4 rounded-full ${uploadProgress >= 90 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                    <OverviewTab analyses={analyses} stats={stats || undefined} />
                )}

                {activeTab === 'analyses' && (
                    <AnalysesTab analyses={analyses} onRunAnalysis={handleAnalysisRequest} />
                )}

                {activeTab === 'suggestions' && (
                    <SuggestionsTab analyses={analyses} />
                )}

                {activeTab === 'job-matches' && (
                    <JobMatchesTab analyses={analyses} />
                )}

                {/* Empty State */}
                {analyses.length === 0 && !loading && (
                    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Resumes Yet</h3>
                        <p className="text-slate-600 mb-6">
                            Upload your first resume to get started with AI-powered analysis and insights.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={() => document.getElementById('file-upload')?.click()}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                            >
                                Upload Resume
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out forwards;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
