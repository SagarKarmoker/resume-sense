import { prisma } from '@/lib/prisma';
import { getCurrentUserOrThrow } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/resumes - Get all resumes for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUserOrThrow();

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      include: {
        analyses: true,
        matches: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}

// POST /api/resumes - Create a new resume record for the authenticated user
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUserOrThrow();
    const body = await req.json();
    const { fileName, fileKey, fileSize, fileType } = body;

    if (!fileName || !fileKey || !fileSize || !fileType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        fileName,
        fileKey,
        fileSize,
        fileType,
        status: 'PENDING',
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 });
  }
} 