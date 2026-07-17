'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    /**
     * Hover micro-interaction type
     * @default 'none'
     */
    hoverEffect?: 'none' | 'lift' | 'glow' | 'zoom';
    /**
     * Glow shadow intensity color
     * @default 'none'
     */
    glowColor?: 'primary' | 'secondary' | 'accent' | 'none';
    /**
     * Outer border opacity settings
     * @default 'default'
     */
    borderIntensity?: 'none' | 'soft' | 'default' | 'strong';
    className?: string;
}

/**
 * Premium GlassCard Component
 * Implements high-end backdrop-filter blur, customizable neon rings, and custom motion frames. Placed in components/ui.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    hoverEffect = 'none',
    glowColor = 'none',
    borderIntensity = 'default',
    className,
    ...props
}) => {
    const cardClasses = clsx(
        // Base Glassmorphism Styles
        'rounded-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-md',
        // Glass Background (adaptive theme)
        'bg-white/40 dark:bg-slate-900/60',
        {
            // Border intensities
            'border-0': borderIntensity === 'none',
            'border border-white/10 dark:border-slate-800/20': borderIntensity === 'soft',
            'border border-white/20 dark:border-slate-800/40': borderIntensity === 'default',
            'border border-white/40 dark:border-slate-700/60': borderIntensity === 'strong',

            // Static Gloss glow drops
            'neon-glow-primary': glowColor === 'primary',
            'neon-glow-accent': glowColor === 'accent',
            'shadow-[0_0_15px_rgba(34,197,94,0.15)]': glowColor === 'secondary',
            'shadow-glass-card': glowColor === 'none',

            // Hover lifts
            'hover:shadow-premium-xl': hoverEffect === 'lift',
            'hover:bg-white/50 dark:hover:bg-slate-900/70': hoverEffect !== 'none',
        },
        className
    );

    // Animation values for hover actions
    const hoverAnimations = {
        none: {},
        lift: { y: -6 },
        zoom: { scale: 1.02 },
        glow: {
            shadow: glowColor === 'primary'
                ? '0 0 25px rgba(14, 165, 233, 0.45)'
                : glowColor === 'accent'
                    ? '0 0 25px rgba(168, 85, 247, 0.45)'
                    : '0 0 25px rgba(255, 255, 255, 0.1)'
        }
    };

    return (
        <motion.div
            className={cardClasses}
            whileHover={hoverEffect !== 'none' ? hoverAnimations[hoverEffect] : undefined}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            {...props}
        >
            {/* Background decoration highlight overlay */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/5 to-white/10 dark:from-white/0 dark:via-white/2 dark:to-white/5" />

            {/* Card Content container */}
            <div className="relative z-10 p-6">
                {children}
            </div>
        </motion.div>
    );
};

GlassCard.displayName = 'GlassCard';
export default GlassCard;
