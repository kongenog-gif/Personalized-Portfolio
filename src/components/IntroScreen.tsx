"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

export const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(() => {
                        setShow(false);
                        onComplete();
                    }, 500);
                },
            });

            // Initial state
            gsap.set(textRef.current, { opacity: 0, y: 20, letterSpacing: "1em" });

            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                letterSpacing: "0.2em",
                duration: 2,
                ease: "power4.out",
            })
                .to(textRef.current, {
                    opacity: 0,
                    y: -20,
                    letterSpacing: "0.3em",
                    duration: 1,
                    ease: "power4.in",
                    delay: 1,
                })
                .to(containerRef.current, {
                    backgroundColor: "#000000",
                    duration: 0.5,
                });
        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    ref={containerRef}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <div
                        ref={textRef}
                        className="text-4xl md:text-7xl font-outfit font-bold tracking-[0.5em] text-white uppercase"
                    >
                        Conqueror
                    </div>

                    {/* Subtle noise/grain effect */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
