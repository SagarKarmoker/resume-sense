import { prisma } from '@/lib/prisma';
import { getCurrentUserOrThrow } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUserOrThrow();

    // Fetch all resumes with their latest analysis for the user
    const resumes = await prisma.resume.findMany({
      where: {
        userId: user.id
      },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        matches: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform the data to match the expected format
    const dashboardData = resumes.map(resume => {
      const latestAnalysis = resume.analyses[0];
      
      return {
        id: resume.id,
        fileName: resume.fileName,
        uploadDate: resume.createdAt.toISOString(),
        resumeScore: latestAnalysis?.score || 0,
        grammarScore: latestAnalysis?.result?.grammarScore || 0,
        atsCompatibility: latestAnalysis?.result?.atsCompatibility || 'Unknown',
        skillMatch: latestAnalysis?.result?.keywordsMatched?.length || 0,
        keywords: latestAnalysis?.result?.keywordsMatched || [],
        suggestions: [
          ...(latestAnalysis?.result?.grammarIssues || []),
          ...(latestAnalysis?.result?.formattingTips || [])
        ],
        jobMatches: resume.matches.map(match => match.jobTitle),
        status: resume.status.toLowerCase() as 'completed' | 'processing' | 'failed',
        fileKey: resume.fileKey,
        fileType: resume.fileType
      };
    });

    // Calculate dashboard statistics
    const stats = {
      totalResumes: resumes.length,
      completedAnalyses: resumes.filter(r => r.status === 'COMPLETED').length,
      processingAnalyses: resumes.filter(r => r.status === 'PROCESSING').length,
      failedAnalyses: resumes.filter(r => r.status === 'FAILED').length,
      totalJobMatches: resumes.reduce((acc, r) => acc + r.matches.length, 0),
      averageScore: dashboardData.length > 0 
        ? Math.round(dashboardData.reduce((acc, d) => acc + d.resumeScore, 0) / dashboardData.length)
        : 0
    };

    return NextResponse.json({
      resumes: dashboardData,
      stats
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 