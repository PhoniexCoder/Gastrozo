"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AnalysisResults } from "@/components/AnalysisResults";
import { HistoryEntry } from "@/lib/types";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("/api/history");
                if (!response.ok) {
                    throw new Error("Failed to fetch history");
                }
                const data = await response.json();
                setHistory(data.entries);
            } catch (err) {
                console.error("History Error:", err);
                setError("Failed to load history.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/20">
            <Navigation />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                        Your Analysis History
                    </span>
                </h1>

                {isLoading && (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200 text-center">
                        {error}
                    </div>
                )}

                {!isLoading && !error && history.length === 0 && (
                    <div className="text-center text-muted-foreground p-12 bg-card rounded-lg border border-border/50">
                        <p>No analysis history found.</p>
                    </div>
                )}

                <div className="space-y-12">
                    {history.map((entry) => (
                        <div key={entry.id} className="border-b border-border/40 pb-12 last:border-0">
                            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{format(new Date(entry.date), "PPP p")}</span>
                            </div>
                            <AnalysisResults
                                analysis={entry.analysis}
                                onReset={() => { }} // No reset needed for history items
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
