import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeResume(text: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a professional resume reviewer. Analyze the following resume text and provide a JSON response with:
- resumeScore (0–100)
- grammarIssues (list of grammar problems)
- formattingTips (list of formatting suggestions)
- keywordsMatched (based on common job skills)
- keywordsMissing (important job-related skills not found)
- atsCompatibility (Good / Average / Poor)

Resume Text:
"""${text}"""
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const textOutput = response.text();

    try {
        const json = JSON.parse(textOutput);
        return json;
    } catch (error) {
        console.log("error while getting text: ", error);
        throw new Error("Failed to parse Gemini response: " + textOutput);
    }
}
