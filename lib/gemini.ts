import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey || "placeholder");

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
