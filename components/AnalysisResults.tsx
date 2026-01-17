import React from "react";
import { Card } from "@/components/ui/card";
import {
    Check,
    AlertCircle,
    Activity,
    Droplets,
    Shapes,
    Eye,
    Scale,
    AlertTriangle,
    RotateCcw,
    HeartPulse,
    Sparkles
} from "lucide-react";
import { StoolAnalysis } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
    analysis: StoolAnalysis;
    onReset: () => void;
}

const metricIcons: Record<string, React.ElementType> = {
    color: Eye,
    consistency: Droplets,
    shape: Shapes,
    health_score: HeartPulse,
};

const metricColorMap: Record<string, string> = {
    color: "from-amber-500/20 to-orange-500/20 text-orange-700 dark:text-orange-300",
    consistency: "from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300",
    shape: "from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300",
    health_score: "from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300",
};

function MetricCard({ name, value, icon: Icon, className }: { name: string; value: string | number; icon: React.ElementType, className?: string }) {
    const colorClass = metricColorMap[name] || "from-gray-500/20 to-gray-500/20";

    return (
        <Card className={cn(
            "relative overflow-hidden group border-0 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
            "bg-white/50 dark:bg-black/40 backdrop-blur-md",
            className
        )}>
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity", colorClass)} />

            <div className="relative p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground opacity-90">
                        {name.replace("_", " ")}
                    </span>
                    <div className="p-2 rounded-full bg-white/30 dark:bg-black/20 backdrop-blur-sm">
                        <Icon className="h-5 w-5 opacity-80" />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {value}
                        {name === "health_score" && <span className="text-lg text-muted-foreground font-normal ml-1">/10</span>}
                    </h3>
                </div>
            </div>
        </Card>
    );
}

export function AnalysisResults({ analysis, onReset }: Props) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/40 dark:bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        Analysis Complete
                    </h2>
                    <p className="text-muted-foreground">AI has processed your sample successfully.</p>
                </div>
                <Button onClick={onReset} size="lg" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                    <RotateCcw className="h-4 w-4" />
                    Analyze Another
                </Button>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <MetricCard
                    name="health_score"
                    value={analysis.health_score}
                    icon={metricIcons.health_score}
                    className="md:col-span-2 md:row-span-2 lg:col-span-1 lg:row-span-1"
                />
                <MetricCard name="color" value={analysis.color} icon={metricIcons.color} />
                <MetricCard name="consistency" value={analysis.consistency} icon={metricIcons.consistency} />
                <MetricCard name="shape" value={analysis.shape} icon={metricIcons.shape} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Concerns Section */}
                {analysis.concerns && analysis.concerns.length > 0 && (
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 overflow-hidden">
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-6 w-6" />
                                <h2 className="text-xl font-bold">Areas of Concern</h2>
                            </div>
                            <div className="space-y-3">
                                {analysis.concerns.map((concern, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-black/20 backdrop-blur-sm border border-red-100 dark:border-red-900/30 transition-transform hover:translate-x-1"
                                    >
                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-red-500" />
                                        <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">{concern}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Recommendations Section */}
                <Card className={cn(
                    "border-0 shadow-xl bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 overflow-hidden",
                    (!analysis.concerns || analysis.concerns.length === 0) && "lg:col-span-2"
                )}>
                    <div className="p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                            <Activity className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Recommendations</h2>
                        </div>
                        <div className="space-y-3">
                            {analysis.recommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-black/20 backdrop-blur-sm border border-green-100 dark:border-green-900/30 transition-transform hover:translate-x-1"
                                >
                                    <div className="mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
