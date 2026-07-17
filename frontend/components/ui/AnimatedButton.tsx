'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './Button';
import { gsapMagneticEffect } from '@/utils/gsap-animations';

export interface AnimatedButtonProps extends ButtonProps {
    /**
     * Hover micro-interaction type
     * @default 'scale'
     */
    animationType?: 'none' | 'scale' | 'magnetic' | 'shine';
    /**
     * Magnetic force parameter (only applies if animationType is 'magnetic')
     * @default 0.25
     */
    magneticStrength?: number;
}

/**
 * AnimatedButton UI Component
 * Integrates Framer Motion tap/hover scale and GSAP client-side cursor magnet pull effects.
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    children,
    animationType = 'scale',
    magneticStrength = 0.25,
    className,
    ...props
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Initialize GSAP Magnetic Cursor Effect
    useEffect(() => {
        if (animationType !== 'magnetic' || !containerRef.current) return;

        const cleanup = gsapMagneticEffect(containerRef.current, magneticStrength);
        return () => {
            if (cleanup) cleanup();
        };
    }, [animationType, magneticStrength]);

    // If magnetic, wrap in outer magnet container
    if (animationType === 'magnetic') {
        return (
            <div
                ref={containerRef}
                className="inline-block transition-transform duration-100 ease-out"
                style={{ willChange: 'transform' }}
            >
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button ref={buttonRef} className={className} {...props}>
                        {children}
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Handle standard Framer Motion animations
    return (
        <motion.div
            className="inline-block"
            whileHover={animationType === 'scale' ? { scale: 1.04, y: -2 } : {}}
            whileTap={animationType === 'scale' ? { scale: 0.96, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
            <Button
                ref={buttonRef}
                className={
                    animationType === 'shine'
                        ? 'shine-container hover-lift'
                        : className
                }
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    );
};

AnimatedButton.displayName = 'AnimatedButton';
export default AnimatedButton;
