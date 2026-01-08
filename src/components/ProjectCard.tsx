"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    image?: string;
}

export const ProjectCard = ({ title, description, tags, link, github, image }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative rounded-2xl overflow-hidden glassmorphism h-[450px] transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)]"
        >
            {/* Background Image with Cinematic Overlay */}
            {image && (
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
            )}

            {!image && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10 group-hover:scale-110 transition-transform duration-700"></div>
            )}

            <div className="p-8 h-full flex flex-col justify-end relative z-10">
                <div className="mb-4">
                    <div className="flex gap-2 mb-4">
                        {tags.map((tag) => (
                            <span key={tag} className="text-[10px] uppercase tracking-tighter px-2 py-1 rounded-full border border-foreground/10 text-muted font-mono bg-background/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-3xl font-outfit font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="flex gap-4">
                    {link && (
                        <a href={link} target="_blank" className="p-2 rounded-full bg-foreground/5 hover:bg-primary transition-colors text-foreground group-hover:text-white shadow-lg">
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                    {github && (
                        <a href={github} target="_blank" className="p-2 rounded-full bg-foreground/5 hover:bg-primary transition-colors text-foreground group-hover:text-white shadow-lg">
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            {/* Premium Hover Light Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-primary/10 via-transparent to-accent/5"></div>
            <div className="absolute -inset-px rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>
    );
};
