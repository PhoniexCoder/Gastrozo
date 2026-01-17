import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, Brain, Shield, AlertTriangle, ArrowRight, CheckCircle2, FileText, Database, Lock } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background">
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Brain className="h-4 w-4" />
                <span className="text-sm font-semibold tracking-wide">AI x MedTech: Startup Hackathon & Cohort 2025</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-transparent bg-clip-text animate-gradient bg-300% pb-2">
                GastroZO
              </h1>

              <p className="text-2xl md:text-3xl font-medium text-muted-foreground">
                AI-assisted Stool Characterization and Gut Risk Triage
              </p>

              <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                A research-oriented AI clinical decision support (CDS) prototype designed to standardize stool characterization and output interpretable triage risk levels for safer telemedicine follow-ups.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button asChild size="lg" className="h-14 px-8 text-lg gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  <Link href="/dashboard">
                    Start AI Analysis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
                  <Link href="#problem">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
        </section>

        {/* Problem Statement Section */}
        <section id="problem" className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">The Problem: Unreliable Remote Triage</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Gastrointestinal symptoms contribute significantly to outpatient consultations, but remote triage fails due to subjective reporting. Patients describe samples vaguely ("loose", "hard"), creating clinical uncertainty and delayed escalation of red flags.
                </p>
                <ul className="space-y-4">
                  {[
                    "Subjective and inconsistent descriptions",
                    "Low compliance with manual diaries",
                    "Lack of standardization in telemedicine",
                    "Delayed escalation of red flags"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-border flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <Activity className="h-16 w-16 text-muted-foreground/40 mx-auto" />
                  <p className="text-muted-foreground text-sm">Visualization: Gaps in Current Practice</p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-left opacity-70">
                    <div className="bg-background/50 p-2 rounded">Subjective Inputs</div>
                    <div className="bg-background/50 p-2 rounded">Inconsistent Triage</div>
                    <div className="bg-background/50 p-2 rounded">Delayed Care</div>
                    <div className="bg-background/50 p-2 rounded">Patient Anxiety</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Solution: GastroZO</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transforming unstructured stool images and symptoms into standardized, decision-ready clinical triage reports.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900">
                <CardHeader>
                  <Database className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Standardized Characterization</CardTitle>
                  <CardDescription>
                    Outputs clinical-grade profiles: Bristol Type (1-7), color class, and abnormality flags.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-900">
                <CardHeader>
                  <Brain className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Multi-Modal Risk Stratification</CardTitle>
                  <CardDescription>
                    Combines visual patterns with symptom severity for a unified risk score (Green/Amber/Red).
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-cyan-50/50 dark:bg-cyan-950/10 border-cyan-100 dark:border-cyan-900">
                <CardHeader>
                  <FileText className="h-8 w-8 text-cyan-600 mb-2" />
                  <CardTitle>Clinician-First Summary</CardTitle>
                  <CardDescription>
                    Generates structured reports for rapid decision-making, not just raw predictions.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">End-to-End Workflow</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                { step: "01", title: "Patient Input", desc: "Image + Symptoms" },
                { step: "02", title: "Quality Gate", desc: "Blur & Privacy Check" },
                { step: "03", title: "AI Inference", desc: "Classification & Flags" },
                { step: "04", title: "Risk Engine", desc: "Green / Amber / Red" },
                { step: "05", title: "Clinician View", desc: "Structured Summary" },
              ].map((item, index) => (
                <div key={index} className="relative z-10">
                  <div className="bg-background border border-border p-6 rounded-xl hover:shadow-lg transition-shadow text-center h-full flex flex-col items-center justify-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-1/2 w-full h-[2px] bg-border -z-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation & Safety Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Key Innovations</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Triage-Ready Outputs</h3>
                      <p className="text-muted-foreground">Focuses on actionable risk levels (Green/Amber/Red) rather than just raw data.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Safety Guardrails</h3>
                      <p className="text-muted-foreground">Low-quality images are rejected. Uncertain predictions trigger conservative guidance.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Privacy-by-Design</h3>
                      <p className="text-muted-foreground">Metadata stripping (EXIF removal) and secure storage from day one.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Risk Stratification Logic</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <span>Routine Monitoring</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 text-sm font-bold">GREEN</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <span>Consultation Recommended</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold">AMBER</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <span>Urgent Attention</span>
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-bold">RED</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate-400 italic">
                  *GastroZO assists triage but does not replace clinical diagnosis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5 border-t border-primary/10">
          <div className="container px-4 mx-auto text-center max-w-3xl space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to standardize your gut health triage?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the MVP prototype designed for the 2025 AI x MedTech Hackathon.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-lg gap-2">
              <Link href="/dashboard">
                Try the Prototype
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 GastroZO. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-70">Research Prototype - Not for medical diagnostic use without clinical oversight.</p>
        </div>
      </footer>
    </div>
  );
}
