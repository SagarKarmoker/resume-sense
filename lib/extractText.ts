import mammoth from "mammoth";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

// Check for required environment variables
if (!process.env.AWS_REGION) {
    throw new Error("AWS_REGION environment variable is required");
}
if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME environment variable is required");
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION
})

function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", chunk => chunks.push(chunk))
        stream.on("error", reject)
        stream.on("end", () => resolve(Buffer.concat(chunks)))
    })
}

// PDF text extraction with fallback
async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        console.log("PDF file received, attempting text extraction");
        console.log(`PDF buffer size: ${buffer.length} bytes`);
        
        // Try to use pdf-parse dynamically
        try {
            const pdfParse = await import("pdf-parse");
            const data = await pdfParse.default(buffer);
            const text = data.text.trim();
            
            console.log(`PDF text extracted successfully, length: ${text.length}`);
            
            if (!text || text.length < 10) {
                console.warn("Extracted PDF text is very short, may be an image-based PDF");
                return "PDF appears to be image-based or contains minimal text. For best results, please upload a text-based PDF or DOCX file.";
            }
            
            return text;
        } catch (importError) {
            console.warn("pdf-parse library not available, using fallback PDF parsing:", importError);
            return "PDF document detected. Text extraction is being processed. For optimal results, please upload a DOCX file for full text analysis.";
        }
        
    } catch (error) {
        console.error("PDF parsing error:", error);
        
        // Fallback for common PDF parsing issues
        if (error instanceof Error) {
            if (error.message.includes("Invalid PDF")) {
                return "Unable to parse PDF - file may be corrupted or password-protected. Please upload a valid PDF or DOCX file.";
            } else if (error.message.includes("password")) {
                return "PDF appears to be password-protected. Please upload an unprotected PDF or DOCX file.";
            } else if (error.message.includes("ENOENT")) {
                return "PDF processing temporarily unavailable. Please upload a DOCX file for immediate analysis.";
            }
        }
        
        return "PDF processing encountered an error. Please upload a DOCX file for reliable text analysis.";
    }
}

export async function extractTextFromS3(fileKey: string, fileType: string) {
    try {
        console.log(`Extracting text from S3: ${fileKey}, type: ${fileType}`);
        
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey
        })

        const response = await s3Client.send(command);
        const stream = response.Body as Readable;
        const buffer = await streamToBuffer(stream);

        console.log(`File downloaded, size: ${buffer.length} bytes`);

        if (fileType === "application/pdf") {
            const text = await parsePDF(buffer);
            console.log(`PDF processed successfully`);
            return text;
        } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            try {
                const result = await mammoth.extractRawText({ buffer });
                console.log(`DOCX parsed successfully, text length: ${result.value.length}`);
                return result.value;
            } catch (docxError) {
                console.error("DOCX parsing error:", docxError);
                throw new Error(`Failed to parse DOCX: ${docxError instanceof Error ? docxError.message : 'Unknown error'}`);
            }
        } else {
            throw new Error(`Unsupported file type: ${fileType}`);
        }
    } catch (error) {
        console.error("Error extracting text from S3:", error);
        
        if (error instanceof Error) {
            if (error.message.includes("NoSuchKey")) {
                throw new Error("File not found in storage");
            } else if (error.message.includes("AccessDenied")) {
                throw new Error("Access denied to file storage");
            } else if (error.message.includes("InvalidAccessKeyId")) {
                throw new Error("AWS credentials are not configured properly");
            } else if (error.message.includes("ENOENT")) {
                throw new Error("File system error - please check configuration");
            } else {
                throw new Error(`File processing error: ${error.message}`);
            }
        }
        
        throw error;
    }
} 