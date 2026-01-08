"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll();

    // Transform scroll progress into background color shifts or particle density later
    const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.2]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 60;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                else if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                else if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(139, 92, 246, 0.3)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => init();
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
            {/* Texture Overlay (Noise) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-50">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Dynamic Gradients */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background to-accent/5"
            />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-40 mix-blend-screen"
            />

            {/* Solar Nebula - Animated Blobs for Light Mode */}
            <div className="absolute inset-0 hidden light:block">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[var(--nebula-purple)] rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[var(--nebula-blue)] rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-[var(--nebula-pink)] rounded-full blur-[120px]"
                />
            </div>

            {/* Solaris 3D Perspective Grid */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
                <div className="absolute inset-0 [perspective:1000px]">
                    <div
                        className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom"
                        style={{
                            backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                            maskImage: 'linear-gradient(to top, black, transparent)',
                        }}
                    />
                </div>
            </div>

            {/* Dark Mode Nebulas */}
            <div className="absolute inset-0 block light:hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_60%)]" />
            </div>
        </div>
    );
};
