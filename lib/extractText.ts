import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

// Validate required environment variables
if (!process.env.AWS_REGION) {
    throw new Error("AWS_REGION environment variable is required");
}
if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME environment variable is required");
}

const s3Client = new S3Client({ region: process.env.AWS_REGION });

// Alternative: Using AWS SDK's built-in method
async function getS3ObjectAsBuffer(bucket: string, key: string): Promise<Buffer> {
    try {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        const response = await s3Client.send(command);
        
        if (!response.Body) {
            throw new Error("Empty response body from S3");
        }

        // Convert the response body to buffer
        const chunks: Buffer[] = [];
        const reader = response.Body as NodeJS.ReadableStream;
        
        for await (const chunk of reader) {
            chunks.push(Buffer.from(chunk));
        }
        
        return Buffer.concat(chunks);
    } catch (error) {
        throw error;
    }
}

async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        // Direct import instead of dynamic import
        const data = await pdfParse(buffer);
        const text = data.text.trim();

        if (!text || text.length < 10) {
            return "PDF appears to be image-based or contains minimal text. Please upload a text-based PDF or DOCX file.";
        }

        return text;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Invalid PDF")) {
                return "Unable to parse PDF. The file may be corrupted or not a real PDF.";
            } else if (error.message.includes("password")) {
                return "The PDF appears to be password-protected.";
            }
        }
        return "An error occurred while processing the PDF file.";
    }
}

export async function extractTextFromS3(fileKey: string, fileType: string): Promise<string> {
    try {
        // Use the simplified buffer method
        const buffer = await getS3ObjectAsBuffer(process.env.AWS_S3_BUCKET_NAME!, fileKey);

        // File size limit (10MB)
        const MAX_SIZE_MB = 10;
        if (buffer.length > MAX_SIZE_MB * 1024 * 1024) {
            throw new Error("File is too large. Please upload a file under 10MB.");
        }

        let text = "";
        
        if (fileType === "application/pdf" || fileKey.toLowerCase().endsWith('.pdf')) {
            text = await parsePDF(buffer);
        } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                   fileKey.toLowerCase().endsWith('.docx')) {
            try {
                const result = await mammoth.extractRawText({ buffer });

                if (!result.value || result.value.trim().length < 10) {
                    throw new Error("DOCX appears to be empty or contains minimal text.");
                }

                text = result.value.trim();
            } catch (docxError) {
                throw new Error(`Failed to process DOCX: ${docxError instanceof Error ? docxError.message : 'Unknown error'}`);
            }
        } else {
            throw new Error(`Unsupported file type: ${fileType}. Supported types: PDF, DOCX`);
        }

        return text;

    } catch (error) {
        if (error instanceof Error) {
            const msg = error.message;
            
            // S3 specific errors
            if (msg.includes("NoSuchKey") || msg.includes("NotFound")) {
                throw new Error("File not found in S3.");
            } else if (msg.includes("AccessDenied")) {
                throw new Error("Access denied to the S3 file.");
            } else if (msg.includes("InvalidAccessKeyId")) {
                throw new Error("Invalid AWS credentials.");
            } else if (msg.includes("SignatureDoesNotMatch")) {
                throw new Error("AWS signature mismatch.");
            } else if (msg.includes("TimeoutError") || msg.includes("timeout")) {
                throw new Error("Network timeout. Please try again.");
            }

            // Re-throw the original error if it's already a user-friendly message
            throw error;
        }

        throw new Error("An unknown error occurred during text extraction.");
    }
}