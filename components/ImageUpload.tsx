"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, X, Scan, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    onImageSelect: (base64Image: string) => void;
    isLoading: boolean;
}

export function ImageUpload({ onImageSelect, isLoading }: Props) {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreviewUrl(base64String);
            onImageSelect(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const clearImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        setPreviewUrl(null);
    };

    return (
        <Card
            className={cn(
                "relative overflow-hidden transition-all duration-500",
                "bg-white/40 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-2xl",
                isDragging ? "ring-2 ring-primary scale-[1.02] bg-primary/5" : "hover:border-primary/50",
                isLoading && "opacity-90 pointer-events-none"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="p-8 md:p-12 flex flex-col items-center justify-center gap-6 min-h-[400px]">
                {/* Background decorative elements */}
                <div className="absolute inset-0 z-0 opacity-50 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="relative z-10 w-full max-w-sm mx-auto">
                    {previewUrl ? (
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />

                            {/* Scanning Animation Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 z-20">
                                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                                    <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md border border-white/10">
                                            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                                            <span className="text-sm font-medium animate-pulse">Analyzing Stool Structure...</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isLoading && (
                                <button
                                    onClick={clearImage}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className={cn(
                            "w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-300 group cursor-pointer",
                            isDragging
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/20 hover:border-primary/50 hover:bg-white/50 dark:hover:bg-white/5"
                        )}>
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Scan className="w-10 h-10 text-primary/80 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-center space-y-2 px-6">
                                <h3 className="text-xl font-bold text-foreground">
                                    {isDragging ? "Drop to Analyze" : "Upload Image"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Drag & drop or click to select a clear photo
                                </p>
                            </div>
                            <div className="absolute inset-0">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full h-full opacity-0 cursor-pointer"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {!previewUrl && (
                    <div className="flex gap-4 items-center text-xs text-muted-foreground z-10">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border">
                            <ImageIcon className="w-3 h-3" /> JPG, PNG
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border">
                            <Scan className="w-3 h-3" /> AI Analysis
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
}
