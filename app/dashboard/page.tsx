"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { StoolAnalysis } from "@/lib/types";

export default function DashboardPage() {
    const [analysis, setAnalysis] = useState<StoolAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = async (base64Image: string) => {
        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: base64Image }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to analyze image");
            }

            setAnalysis(data.analysis);
        } catch (err: any) {
            console.error("Analysis Error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setAnalysis(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background">
            <Navigation />
            <main className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="space-y-2 text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 text-transparent bg-clip-text animate-gradient bg-300%">
                            Stool Analysis AI
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Advanced AI-powered diagnostics for your digestive health.
                        Secure, private, and instant.
                    </p>
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-8 border border-destructive/20 text-center animate-in zoom-in-95 duration-300">
                        {error}
                    </div>
                )}

                <div className="relative">
                    {!analysis && (
                        <div className="max-w-xl mx-auto transform transition-all duration-500 hover:scale-[1.01]">
                            <ImageUpload onImageSelect={handleImageSelect} isLoading={isLoading} />
                        </div>
                    )}

                    {analysis && (
                        <AnalysisResults analysis={analysis} onReset={handleReset} />
                    )}
                </div>
            </main>
        </div>
    );
}
