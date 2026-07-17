import React from 'react';
import clsx from 'clsx';

export type BadgeColor =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral';

export type BadgeVariant = 'solid' | 'soft' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    /**
     * Visual theme variants
     * @default 'soft'
     */
    variant?: BadgeVariant;
    /**
     * Alert/theme color categories
     * @default 'neutral'
     */
    color?: BadgeColor;
    /**
     * Fully rounded pill layout
     * @default true
     */
    pill?: boolean;
    /**
     * Render leading circular indicator dot
     * @default false
     */
    showDot?: boolean;
}

/**
 * Reusable Badge Component in components/common
 * Implements status pills, product tags, product categories, and order state indicators.
 */
export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'soft',
    color = 'neutral',
    pill = true,
    showDot = false,
    className,
    ...props
}) => {
    return (
        <span
            className={clsx(
                'inline-flex items-center text-xs font-semibold px-2.5 py-0.5 tracking-wide select-none',
                {
                    'rounded-full': pill,
                    'rounded-md': !pill,
                },
                {
                    // --- Solid variants ---
                    'bg-primary-600 text-white': variant === 'solid' && color === 'primary',
                    'bg-secondary-655 text-white bg-secondary-650': variant === 'solid' && color === 'secondary',
                    'bg-accent-600 text-white': variant === 'solid' && color === 'accent',
                    'bg-green-600 text-white': variant === 'solid' && color === 'success',
                    'bg-amber-600 text-white': variant === 'solid' && color === 'warning',
                    'bg-danger-main text-white': variant === 'solid' && color === 'danger',
                    'bg-info-main text-white': variant === 'solid' && color === 'info',
                    'bg-slate-700 text-white dark:bg-slate-300 dark:text-slate-900': variant === 'solid' && color === 'neutral',

                    // --- Soft Tonal variants ---
                    'bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300':
                        variant === 'soft' && color === 'primary',
                    'bg-secondary-50 text-secondary-700 dark:bg-secondary-950/40 dark:text-secondary-300':
                        variant === 'soft' && color === 'secondary',
                    'bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300':
                        variant === 'soft' && color === 'accent',
                    'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300':
                        variant === 'soft' && color === 'success',
                    'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300':
                        variant === 'soft' && color === 'warning',
                    'bg-danger-light text-danger-dark dark:bg-red-950/35 dark:text-danger-light':
                        variant === 'soft' && color === 'danger',
                    'bg-info-light text-info-dark dark:bg-blue-950/35 dark:text-info-light':
                        variant === 'soft' && color === 'info',
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350':
                        variant === 'soft' && color === 'neutral',

                    // --- Outline variants ---
                    'border border-primary-300 text-primary-700 dark:border-primary-800 dark:text-primary-300':
                        variant === 'outline' && color === 'primary',
                    'border border-secondary-300 text-secondary-700 dark:border-secondary-800 dark:text-secondary-300':
                        variant === 'outline' && color === 'secondary',
                    'border border-accent-300 text-accent-700 dark:border-accent-800 dark:text-accent-300':
                        variant === 'outline' && color === 'accent',
                    'border border-green-300 text-green-700 dark:border-green-800 dark:text-green-300':
                        variant === 'outline' && color === 'success',
                    'border border-amber-300 text-amber-600 dark:border-amber-800 dark:text-amber-400':
                        variant === 'outline' && color === 'warning',
                    'border border-red-300 text-danger-main dark:border-red-900/60 dark:text-red-400':
                        variant === 'outline' && color === 'danger',
                    'border border-blue-300 text-info-main dark:border-blue-900/60 dark:text-blue-400':
                        variant === 'outline' && color === 'info',
                    'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-350':
                        variant === 'outline' && color === 'neutral',
                },
                className
            )}
            {...props}
        >
            {showDot && (
                <span
                    className={clsx('h-1.5 w-1.5 rounded-full mr-1.5 shrink-0', {
                        'bg-primary-500': color === 'primary',
                        'bg-secondary-500': color === 'secondary',
                        'bg-accent-500': color === 'accent',
                        'bg-green-500': color === 'success',
                        'bg-amber-500': color === 'warning',
                        'bg-danger-main': color === 'danger',
                        'bg-info-main': color === 'info',
                        'bg-slate-400 dark:bg-slate-500': color === 'neutral',
                        'bg-white': variant === 'solid',
                    })}
                />
            )}
            {children}
        </span>
    );
};

Badge.displayName = 'Badge';
export default Badge;
