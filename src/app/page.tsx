"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "../config/content";
import { IntroScreen } from "@/components/IntroScreen";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Background } from "@/components/Background";
import { motion } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowIntro(!hasSeenIntro);
  }, []);

  if (showIntro === null) return <div className="min-h-screen bg-background" />;

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Background />
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      {(!showIntro || sessionStorage.getItem("hasSeenIntro")) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Navbar />

          <Hero />

          <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">Selected Projects</span>
                <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white">Digital <span className="opacity-50">Impact</span></h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteConfig.projects.map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          </section>

          <section id="growth" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">Evolution</span>
                <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white">Experience <span className="opacity-50">Timeline</span></h2>
              </div>
              <Timeline />
            </div>
          </section>

          <Contact />
        </motion.div>
      )}
    </main>
  );
}
