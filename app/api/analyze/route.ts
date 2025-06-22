import { extractTextFromS3 } from "@/lib/extractText";
import { analyzeResume } from "@/lib/gemini";
import { analyzeResumeWithOpenAI } from "@/lib/openai";
import { getCurrentUserOrThrow } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let resumeId: string | null = null;
    
    try {
        // Get the current user from database
        const user = await getCurrentUserOrThrow();

        const { fileKey, fileType, resumeId: reqResumeId } = await req.json();
        resumeId = reqResumeId;

        if (!fileKey || !fileType || !resumeId) {
            return NextResponse.json({
                error: "Missing required fields: fileKey, fileType, resumeId"
            }, { status: 400 });
        }

        // Verify the resume belongs to the user
        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId: user.id
            }
        });

        if (!resume) {
            return NextResponse.json({
                error: "Resume not found or access denied"
            }, { status: 404 });
        }

        // Update resume status to processing
        await prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'PROCESSING' }
        });

        // Extract text from the uploaded file
        const text = await extractTextFromS3(fileKey, fileType);

        // Try Gemini first, then OpenAI as fallback
        let analysis;
        let aiProvider = "Unknown";
        let isFallback = false;

        try {
            analysis = await analyzeResume(text);
            aiProvider = analysis.aiProvider || "Gemini";
        } catch {
            try {
                analysis = await analyzeResumeWithOpenAI(text);
                aiProvider = analysis.aiProvider || "OpenAI";
                isFallback = true;
            } catch {
                analysis = await analyzeResume(text); // This will use Gemini fallback
                aiProvider = analysis.aiProvider || "Gemini (Fallback)";
                isFallback = true;
            }
        }

        // Check if this was a fallback analysis
        const isFallbackAnalysis = isFallback || 
            (analysis.grammarIssues && 
             analysis.grammarIssues.some((issue: string) => 
                issue.includes("Analysis limited due to API quota") ||
                issue.includes("API unavailability")
             ));

        // Add metadata to the analysis result
        analysis.metadata = {
            isFallback: isFallbackAnalysis,
            aiProvider: aiProvider,
            message: isFallbackAnalysis 
                ? `Analysis completed using ${aiProvider} due to API limitations`
                : `Analysis completed using ${aiProvider}`
        };

        // Save the analysis to database
        const savedAnalysis = await prisma.analysis.create({
            data: {
                resumeId: resumeId,
                userId: user.id,
                type: 'OVERALL_ASSESSMENT',
                result: analysis,
                score: analysis.resumeScore || 0,
                status: 'COMPLETED'
            }
        });

        // Update resume status to completed
        await prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'COMPLETED' }
        });

        return NextResponse.json({
            success: true,
            analysis: {
                id: savedAnalysis.id,
                ...analysis,
                isFallback: isFallbackAnalysis,
                aiProvider: aiProvider
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error while analyzing the resume:", error);

        // Update resume status to failed if we have the resumeId
        if (resumeId) {
            try {
                await prisma.resume.update({
                    where: { id: resumeId },
                    data: { status: 'FAILED' }
                });
                console.log("Updated resume status to FAILED for resumeId:", resumeId);
            } catch (updateError) {
                console.error("Error updating resume status:", updateError);
            }
        }

        // Return a more specific error message
        let errorMessage = "Error while analyzing the resume";
        
        if (error instanceof Error) {
            if (error.message.includes("GEMINI_API_KEY") || error.message.includes("AIMLAPI_KEY")) {
                errorMessage = "AI analysis service is not configured";
            } else if (error.message.includes("AWS")) {
                errorMessage = "File storage service error";
            } else if (error.message.includes("Failed to parse")) {
                errorMessage = "AI analysis failed to generate proper response";
            } else {
                errorMessage = error.message;
            }
        }

        return NextResponse.json({
            error: errorMessage
        }, { status: 500 });
    }
}