import React from 'react';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    /**
     * Render custom React icon component
     */
    icon?: React.ReactNode;
    /**
     * Action button CTA text label
     */
    actionText?: string;
    /**
     * Click handler for CTA Action
     */
    onActionClick?: () => void;
    /**
     * Option to render a custom React element as CTA
     */
    actionElement?: React.ReactNode;
    /**
     * Show decorative background glass ring
     * @default true
     */
    showGlowRing?: boolean;
}

/**
 * Reusable EmptyState Component in components/common/
 * Displays neat centered layouts for empty carts, wishlist misses, search results, and database clean slates.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    actionText,
    onActionClick,
    actionElement,
    showGlowRing = true,
    className,
    ...props
}) => {
    return (
        <div
            className={clsx(
                'flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl border border-dashed relative overflow-hidden bg-white/10 dark:bg-slate-900/5 backdrop-blur-sm w-full max-w-lg mx-auto',
                className
            )}
            {...props}
        >
            {showGlowRing && (
                <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-primary-500/5 blur-2xl pointer-events-none select-none" />
            )}
            {showGlowRing && (
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-accent-500/5 blur-2xl pointer-events-none select-none" />
            )}

            {/* Decorative Icon Wrapper */}
            {icon && (
                <div className="relative mb-5 flex items-center justify-center p-4.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 shadow-premium-sm border border-border/30 animate-float">
                    <div className="text-3xl shrink-0">{icon}</div>
                </div>
            )}

            <h3 className="text-lg font-bold text-foreground-theme tracking-tight">
                {title}
            </h3>

            {description && (
                <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                    {description}
                </p>
            )}

            {(actionText || actionElement) && (
                <div className="mt-7 z-10">
                    {actionElement ? (
                        actionElement
                    ) : (
                        <Button variant="outline" size="sm" onClick={onActionClick}>
                            {actionText}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

EmptyState.displayName = 'EmptyState';
export default EmptyState;
