import { extractTextFromS3 } from "@/lib/extractText";
import { analyzeResume } from "@/lib/gemini";
import { getCurrentUserOrThrow } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Get the current user from database
        const user = await getCurrentUserOrThrow();

        const { fileKey, fileType, resumeId } = await req.json();

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

        // Analyze the resume using Gemini
        const analysis = await analyzeResume(text);

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
                ...analysis
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error while analyzing the resume:", error);

        // If we have resumeId, update status to failed
        try {
            const { resumeId } = await req.json();
            if (resumeId) {
                await prisma.resume.update({
                    where: { id: resumeId },
                    data: { status: 'FAILED' }
                });
            }
        } catch (updateError) {
            console.error("Error updating resume status:", updateError);
        }

        return NextResponse.json({
            error: "Error while analyzing the resume"
        }, { status: 500 });
    }
}