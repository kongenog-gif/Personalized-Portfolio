"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Command, Github as GithubIcon, Twitter, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";
import { siteConfig } from "../config/content";
import { Magnetic } from "./Magnetic";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
        document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);

        const newTheme = theme === "dark" ? "light" : "dark";

        // This is a high-end implementation of the 'Theme Wipe'
        if (!document.startViewTransition) {
            setTheme(newTheme);
            document.documentElement.classList.toggle("get-light");
            document.documentElement.classList.toggle("get-dark");
            return;
        }

        document.startViewTransition(() => {
            setTheme(newTheme);
            document.documentElement.classList.toggle("light");
            document.documentElement.classList.toggle("dark");
        });
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4",
            isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-3" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Magnetic>
                        <a href="#" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                                <Command className="w-5 h-5" />
                            </div>
                            <span className="font-outfit font-bold text-xl tracking-tighter text-foreground">
                                {siteConfig.identity.logoText}
                            </span>
                        </a>
                    </Magnetic>

                    {/* Status Indicator */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/5 bg-foreground/[0.02]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] uppercase tracking-widest text-muted font-mono font-medium">
                            {siteConfig.identity.status}
                        </span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8 border-r border-foreground/10 pr-8">
                        {Object.keys(siteConfig.sections).map((key, i) => (
                            <Magnetic key={key}>
                                <motion.a
                                    href={`#${key}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-xs font-medium text-muted hover:text-primary transition-colors uppercase tracking-[0.2em] px-2 py-1"
                                >
                                    {(siteConfig.sections as any)[key].label}
                                </motion.a>
                            </Magnetic>
                        ))}
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-4 text-muted">
                            <Magnetic>
                                <a href={siteConfig.identity.socials.github} target="_blank" className="hover:text-foreground transition-colors">
                                    <GithubIcon className="w-4 h-4" />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href={siteConfig.identity.socials.linkedin} target="_blank" className="hover:text-foreground transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </Magnetic>
                        </div>

                        <Magnetic>
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors text-foreground"
                            >
                                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                        </Magnetic>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-foreground/5 text-foreground"
                    >
                        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-foreground"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pt-4 border-t border-foreground/5"
                    >
                        <div className="flex flex-col gap-4 pb-4">
                            {Object.keys(siteConfig.sections).map((key) => (
                                <a
                                    key={key}
                                    href={`#${key}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-foreground px-2 py-1"
                                >
                                    {(siteConfig.sections as any)[key].label}
                                </a>
                            ))}
                            <div className="flex items-center gap-6 px-2 mt-4 pt-4 border-t border-foreground/5 text-muted">
                                <a href={siteConfig.identity.socials.github} target="_blank" className="hover:text-foreground">
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                                <a href={siteConfig.identity.socials.linkedin} target="_blank" className="hover:text-foreground">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
