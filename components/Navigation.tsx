"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity,
    History,
    HelpCircle,
    Sun,
    Moon,
    Menu,
} from "lucide-react";

interface NavItem {
    icon: React.ElementType;
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { icon: Activity, label: "Analysis", path: "/dashboard" }, // Changed to /dashboard
    { icon: History, label: "History", path: "/history" },
    { icon: HelpCircle, label: "Help", path: "/help" },
];

export function Navigation() {
    const pathname = usePathname();
    // Simplified theme toggle for now (could be extended with next-themes)
    const [theme, setTheme] = React.useState("light");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                            GastroZO
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                variant={pathname === item.path ? "default" : "ghost"}
                                className={`gap-2 transition-all duration-300 ${pathname === item.path ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                                asChild
                            >
                                <Link href={item.path}>
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            {theme === "light" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                variant={pathname === item.path ? "default" : "ghost"}
                                className={`w-full justify-start gap-2 ${pathname === item.path ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                                asChild
                            >
                                <Link href={item.path}>
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
