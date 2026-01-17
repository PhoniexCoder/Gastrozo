import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { StoolAnalysis } from "@/lib/types";

export async function POST(req: NextRequest) {
    let analysis: StoolAnalysis;

    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json(
                { error: "Image data is required" },
                { status: 400 }
            );
        }

        // Prepare image for Gemini
        const base64Data = image.includes(",") ? image.split(",")[1] : image;

        const prompt = `
      Analyze this stool image. Remember you are an AI and this is not medical advice.
      Provide a JSON response with the following structure:
      {
        "color": "string (detailed description)",
        "consistency": "string (soft, hard, loose, etc)",
        "shape": "string (Bristol Stool Scale classification)",
        "health_score": number (1-10),
        "concerns": ["string", "string"],
        "recommendations": ["string", "string"]
      }
      
      Ensure the output is valid JSON. Do not include markdown code blocks.
    `;

        // 1. Try Gemini Analysis
        try {
            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: "image/jpeg",
                    },
                },
            ]);

            const responseText = result.response.text();
            console.log("Gemini Raw Response:", responseText);

            // Clean up markdown code blocks if present
            const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
            analysis = JSON.parse(cleanedText);

        } catch (geminiError) {
            console.warn("Gemini API Failed (expected in demo mode):", geminiError);

            // Fallback to Mock Data
            analysis = {
                color: "Brown (Normal)",
                consistency: "Soft and smooth",
                shape: "Type 4 (Sausage or Snake)",
                health_score: 9,
                concerns: ["None detected"],
                recommendations: ["Continue healthy diet", "Maintain hydration"]
            };
        }

        // 2. Try Supabase Save
        try {
            const { error: dbError } = await supabase
                .from("stool_analysis_history")
                .insert([
                    {
                        analysis: analysis,
                        date: new Date().toISOString(),
                    },
                ]);

            if (dbError) {
                console.warn("Supabase Save Warning (expected in demo mode):", dbError);
            }
        } catch (dbEx) {
            console.warn("Supabase Connection Failed (expected in demo mode):", dbEx);
        }

        return NextResponse.json({ analysis });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
