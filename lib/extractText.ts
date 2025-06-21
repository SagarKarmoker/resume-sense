import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

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

export async function extractTextFromS3(fileKey: string, fileType: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey
    })

    const response = await s3Client.send(command);
    const stream = response.Body as Readable;
    const buffer = streamToBuffer(stream);

    if (fileType === "application/pdf") {
        const data = await pdfParse(await buffer);
        return data.text;
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const result = await mammoth.extractRawText({ buffer: await buffer });
        return result.value;
    } else {
        throw new Error("Unsupported file type");
    }
} 