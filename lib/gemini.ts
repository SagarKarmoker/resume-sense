import { GoogleGenerativeAI } from "@google/generative-ai";

// Check for required environment variables
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fallback analysis when API quota is exceeded
function generateFallbackAnalysis(text: string) {
    // Basic text analysis
    const wordCount = text.split(/\s+/).length;
    const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
    const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text);
    
    // Comprehensive skill detection
    const technicalSkills = [
        'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'aws', 'docker',
        'kubernetes', 'git', 'html', 'css', 'typescript', 'angular', 'vue.js',
        'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'jenkins',
        'terraform', 'ansible', 'linux', 'windows', 'macos', 'agile', 'scrum'
    ];
    
    const softSkills = [
        'leadership', 'communication', 'teamwork', 'problem solving', 'project management',
        'collaboration', 'time management', 'organization', 'analytical thinking',
        'creativity', 'adaptability', 'customer service', 'mentoring', 'training'
    ];
    
    const businessSkills = [
        'data analysis', 'business intelligence', 'market research', 'strategy',
        'budgeting', 'forecasting', 'risk management', 'quality assurance',
        'compliance', 'regulatory', 'audit', 'reporting', 'presentation'
    ];
    
    const allSkills = [...technicalSkills, ...softSkills, ...businessSkills];
    const foundSkills = allSkills.filter(skill => 
        text.toLowerCase().includes(skill.toLowerCase())
    );
    
    // Generate a comprehensive score
    let score = 30; // Base score
    if (hasEmail) score += 10;
    if (hasPhone) score += 10;
    if (wordCount > 200) score += 15;
    if (wordCount > 500) score += 10;
    if (foundSkills.length > 5) score += 20;
    if (foundSkills.length > 10) score += 15;
    
    // Check for common resume sections
    const hasExperience = /experience|work|employment|job/i.test(text);
    const hasEducation = /education|degree|university|college|school/i.test(text);
    const hasSkills = /skills|technologies|tools/i.test(text);
    
    if (hasExperience) score += 10;
    if (hasEducation) score += 5;
    if (hasSkills) score += 5;
    
    // Determine ATS compatibility
    let atsCompatibility = "Average";
    if (foundSkills.length > 8 && hasExperience && hasEducation) {
        atsCompatibility = "Good";
    } else if (foundSkills.length < 3 || wordCount < 100) {
        atsCompatibility = "Poor";
    }
    
    // Generate relevant tips based on content
    const formattingTips = [];
    if (wordCount < 200) {
        formattingTips.push("Consider adding more detailed descriptions of your experience and achievements.");
    }
    if (foundSkills.length < 5) {
        formattingTips.push("Include more specific technical and soft skills relevant to your target industry.");
    }
    if (!hasExperience) {
        formattingTips.push("Add a work experience section with quantifiable achievements.");
    }
    if (!hasEducation) {
        formattingTips.push("Include your educational background and relevant certifications.");
    }
    
    if (formattingTips.length === 0) {
        formattingTips.push("Your resume has good structure. Consider adding quantifiable achievements to stand out.");
    }
    
    return {
        resumeScore: Math.min(score, 100),
        grammarIssues: ["Analysis limited due to API quota. Please try again later for detailed grammar review."],
        formattingTips: formattingTips,
        keywordsMatched: foundSkills.slice(0, 10), // Limit to top 10
        keywordsMissing: allSkills.filter(skill => !foundSkills.includes(skill)).slice(0, 8),
        atsCompatibility: atsCompatibility,
        aiProvider: "Gemini (Fallback)"
    };
}

export async function analyzeResume(text: string) {
    try {
        // Try different model names in case the API has changed
        let model;
        const modelNames = ["gemini-2.0-flash"];
        
        for (const modelName of modelNames) {
            try {
                model = genAI.getGenerativeModel({ model: modelName });
                // Test if the model works by making a simple call
                await model.generateContent("Hello");
                break;
            } catch (error) {
                continue;
            }
        }
        
        if (!model) {
            return generateFallbackAnalysis(text);
        }

        const prompt = `
You are a professional resume reviewer and ATS (Applicant Tracking System) expert. Analyze the following resume text and provide a comprehensive JSON response.

IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

Analysis Guidelines:
- resumeScore (0-100): Consider content quality, relevance, and completeness
- grammarIssues: List specific grammar, spelling, or punctuation errors
- formattingTips: Provide actionable formatting and structure suggestions
- keywordsMatched: Identify relevant skills, technologies, and keywords found
- keywordsMissing: Suggest important industry-relevant skills that are missing
- atsCompatibility: Assess how well the resume will perform in ATS systems

For PDF content: If the text appears to be extracted from a PDF, focus on the actual content rather than formatting issues that may be due to extraction.

Resume Text:
"""${text}"""
`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const textOutput = response.text();

        try {
            // Clean the response to remove markdown code blocks
            let cleanedOutput = textOutput.trim();
            
            // Remove markdown code blocks if present
            if (cleanedOutput.startsWith('```json')) {
                cleanedOutput = cleanedOutput.replace(/^```json\s*/, '');
            }
            if (cleanedOutput.startsWith('```')) {
                cleanedOutput = cleanedOutput.replace(/^```\s*/, '');
            }
            if (cleanedOutput.endsWith('```')) {
                cleanedOutput = cleanedOutput.replace(/\s*```$/, '');
            }
            
            const json = JSON.parse(cleanedOutput);
            return {
                ...json,
                aiProvider: "Gemini"
            };
        } catch (error) {
            throw new Error("Failed to parse Gemini response: " + textOutput);
        }
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("API_KEY")) {
                throw new Error("Gemini API key is not configured properly");
            } else if (error.message.includes("quota") || error.message.includes("429")) {
                return generateFallbackAnalysis(text);
            } else if (error.message.includes("rate")) {
                return generateFallbackAnalysis(text);
            } else if (error.message.includes("404") || error.message.includes("Not Found")) {
                return generateFallbackAnalysis(text);
            } else if (error.message.includes("403") || error.message.includes("Forbidden")) {
                return generateFallbackAnalysis(text);
            } else {
                return generateFallbackAnalysis(text);
            }
        }
        
        return generateFallbackAnalysis(text);
    }
}
