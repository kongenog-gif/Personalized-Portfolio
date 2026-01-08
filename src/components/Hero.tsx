"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/content";
import { SplitText } from "./SplitText";

export const Hero = () => {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6">
            {/* Background Animated Gradients handled by Background component */}

            <div className="text-center">
                <div className="mb-6">
                    <h1 className="text-6xl md:text-9xl font-outfit font-bold tracking-tight text-foreground">
                        <SplitText text={siteConfig.hero.heading.first} />{" "}
                        <span className="text-primary text-glow">
                            <SplitText text={siteConfig.hero.heading.accent} />
                        </span>
                    </h1>
                </div>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted font-inter leading-relaxed mb-10">
                    <SplitText text={siteConfig.hero.subheading} />
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono">
                    {siteConfig.hero.scrollText}
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
                />
            </motion.div>
        </section>
    );
};
