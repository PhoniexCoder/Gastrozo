import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("start_date");
        const endDate = searchParams.get("end_date");

        let query = supabase
            .from("stool_analysis_history")
            .select("*")
            .order("date", { ascending: false });

        if (startDate) {
            query = query.gte("date", startDate);
        }

        if (endDate) {
            query = query.lte("date", endDate);
        }

        const { data, error } = await query;

        if (error) {
            console.warn("Supabase Error - Returning Mock Data:", error);
            // Mock data for demonstration purposes when DB is not connected
            const mockHistory = [
                {
                    id: "mock-1",
                    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                    analysis: {
                        consistency: "Type 4",
                        shape: "Smooth, soft sausage",
                        color: "Brown",
                        health_score: 9,
                        concerns: [],
                        recommendations: ["Maintain current diet", "Stay hydrated"]
                    }
                },
                {
                    id: "mock-2",
                    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
                    analysis: {
                        consistency: "Type 2",
                        shape: "Lumpy, sausage-like",
                        color: "Dark Brown",
                        health_score: 6,
                        concerns: ["Mild constipation", "Low fiber indicators"],
                        recommendations: ["Increase fiber intake", "Drink more water", "Exercise daily"]
                    }
                }
            ];
            return NextResponse.json({ entries: mockHistory });
        }

        // Map Supabase structure to our app structure if needed
        // Assuming Supabase table 'stool_analysis_history' has columns 'id', 'date', 'analysis' (jsonb)
        const historyEntries = data.map((entry) => ({
            id: entry.id,
            date: entry.date,
            analysis: entry.analysis,
        }));

        return NextResponse.json({ entries: historyEntries });
    } catch (error) {
        console.error("API Error - Returning Mock Data:", error);

        // Mock data for demonstration purposes when DB is not connected
        const mockHistory = [
            {
                id: "mock-1",
                date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                analysis: {
                    consistency: "Type 4",
                    shape: "Smooth, soft sausage",
                    color: "Brown",
                    health_score: 9,
                    concerns: [],
                    recommendations: ["Maintain current diet", "Stay hydrated"]
                }
            },
            {
                id: "mock-2",
                date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
                analysis: {
                    consistency: "Type 2",
                    shape: "Lumpy, sausage-like",
                    color: "Dark Brown",
                    health_score: 6,
                    concerns: ["Mild constipation", "Low fiber indicators"],
                    recommendations: ["Increase fiber intake", "Drink more water", "Exercise daily"]
                }
            }
        ];

        return NextResponse.json({ entries: mockHistory });
    }
}
