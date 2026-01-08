"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Magnetic = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;
        setPosition({ x: x * 0.4, y: y * 0.4 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mousemove", handleMouseMove as any);
            node.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                node.removeEventListener("mousemove", handleMouseMove as any);
                node.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};
