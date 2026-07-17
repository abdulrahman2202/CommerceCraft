'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { fadeIn } from '@/utils/framer-variants';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    /**
     * Tiny badge / text above the primary title
     */
    categoryBadge?: string;
    /**
     * Title text alignment layout
     * @default 'center'
     */
    align?: 'left' | 'center' | 'right';
    /**
     * Draw animated accent highlight underline
     * @default true
     */
    showUnderline?: boolean;
}

/**
 * Premium SectionTitle Component
 * Used to define margins, categories, descriptions, and premium reveal dividers in grids. Placed in components/ui.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    categoryBadge,
    align = 'center',
    showUnderline = true,
    className,
    ...props
}) => {
    return (
        <div
            className={clsx(
                'mb-10 md:mb-14 flex flex-col',
                {
                    'items-start text-left': align === 'left',
                    'items-center text-center': align === 'center',
                    'items-end text-right': align === 'right',
                },
                className
            )}
            {...props}
        >
            {/* Category Subhead */}
            {categoryBadge && (
                <motion.span
                    className="text-xs md:text-sm font-semibold tracking-widest text-primary-500 uppercase mb-2 inline-block"
                    variants={fadeIn('down', 'spring', 0.1, 0.5)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-10px' }}
                >
                    {categoryBadge}
                </motion.span>
            )}

            {/* Main Title text */}
            <motion.h2
                className="text-2xl md:text-4xl font-extrabold text-foreground-theme tracking-tight"
                variants={fadeIn('up', 'spring', 0.2, 0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20px' }}
            >
                {title}
            </motion.h2>

            {/* Animated accent highlight underline */}
            {showUnderline && (
                <motion.div
                    className="mt-3.5 h-1 rounded-full bg-gradient-premium select-none"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    style={{ transformOrigin: align }}
                />
            )}

            {/* Optional Description / Subtitle */}
            {subtitle && (
                <motion.p
                    className="mt-4 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
                    variants={fadeIn('up', 'spring', 0.3, 0.6)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-10px' }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

SectionTitle.displayName = 'SectionTitle';
export default SectionTitle;
