"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../config/content";

export const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl md:text-6xl font-outfit font-bold text-foreground mb-12"
                >
                    Build the <span className="text-accent text-glow">Future</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        href={`mailto:${siteConfig.identity.email}`}
                        className="p-8 rounded-3xl glassmorphism flex flex-col items-center justify-center gap-4 group"
                    >
                        <span className="text-muted font-mono text-xs uppercase tracking-widest">Email</span>
                        <span className="text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors font-outfit">{siteConfig.identity.email}</span>
                    </motion.a>

                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        href="#"
                        className="p-8 rounded-3xl glassmorphism flex flex-col items-center justify-center gap-4 group"
                    >
                        <span className="text-muted font-mono text-xs uppercase tracking-widest">Discord</span>
                        <span className="text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors font-outfit">{siteConfig.identity.discord}</span>
                    </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 text-muted font-mono text-[10px] uppercase tracking-[0.5em]"
                >
                    © {new Date().getFullYear()} - {siteConfig.identity.name} Portfolio. All Rights Reserved.
                </motion.div>
            </div>
        </section>
    );
};
