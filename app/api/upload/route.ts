import { prisma } from '@/lib/prisma';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';
import { getCurrentUserOrThrow } from '@/lib/auth';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: Request) {
    try {
        // Get the current user from database (this will create user if doesn't exist)
        const user = await getCurrentUserOrThrow();

        const { fileName, fileType, fileSize } = await req.json();
        const key = nanoid()

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        })

        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600
        })

        // save into db using the actual database user.id
        const response = await prisma.resume.create({
            data: {
                userId: user.id, // Use the database user.id, not clerkId
                fileName,
                fileKey: key,
                fileUrl: signedUrl,
                fileSize: fileSize,
                fileType
            }
        })

        if (!response.id) {
            return Response.json({
                error: "Failed to store in DB"
            }, {
                status: 400
            })
        }

        return Response.json({
            uploadUrl: signedUrl,
            key
        }, {
            status: 200
        })

    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return Response.json({ error: 'Failed to generate upload URL' }, { status: 500 });
    }
}