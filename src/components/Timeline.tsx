"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../config/content";

export const Timeline = () => {
    return (
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-foreground/10 before:to-transparent">
            {siteConfig.timeline.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                    {/* Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:scale-125 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                    </div>

                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl glassmorphism group-hover:border-primary/50 transition-colors">
                        <time className="font-mono text-xs text-primary mb-1 inline-block">{item.year}</time>
                        <h4 className="text-xl font-outfit font-bold text-foreground mb-2">{item.title}</h4>
                        <p className="text-muted text-sm">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
