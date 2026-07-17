import React from 'react';
import clsx from 'clsx';

export type LoaderType = 'spinner' | 'dots' | 'page' | 'skeleton';
export type SkeletonVariant = 'text' | 'card' | 'product' | 'table';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Style type of indicator to represent
     * @default 'spinner'
     */
    type?: LoaderType;
    /**
     * Sizing scale for circle spinner / dots
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Brand coloring override
     * @default 'primary'
     */
    color?: 'primary' | 'secondary' | 'accent' | 'muted';
    /**
     * Preset templates for the skeleton skeleton animation
     * @default 'card'
     */
    skeletonVariant?: SkeletonVariant;
    /**
     * Number of items to render in skeleton stack
     * @default 1
     */
    count?: number;
}

/**
 * Reusable Loader Component in components/common/
 * Encapsulates spinners, full page loading overlays, and dynamic skeleton loader templates.
 */
export const Loader: React.FC<LoaderProps> = ({
    type = 'spinner',
    size = 'md',
    color = 'primary',
    skeletonVariant = 'card',
    count = 1,
    className,
    ...props
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-3',
        lg: 'h-12 w-12 border-4',
    };

    const dotSizeClasses = {
        sm: 'h-1.5 w-1.5',
        md: 'h-2.5 w-2.5',
        lg: 'h-3.5 w-3.5',
    };

    const colorClasses = {
        primary: 'border-primary-500 text-primary-500 bg-primary-500',
        secondary: 'border-secondary-500 text-secondary-500 bg-secondary-500',
        accent: 'border-accent-500 text-accent-500 bg-accent-500',
        muted: 'border-slate-350 text-slate-350 bg-slate-350 dark:border-slate-650',
    };

    if (type === 'spinner') {
        return (
            <div className={clsx('flex items-center justify-center', className)} {...props}>
                <div
                    className={clsx(
                        'animate-spin rounded-full border-t-transparent',
                        sizeClasses[size],
                        colorClasses[color].split(' ')[0]
                    )}
                />
            </div>
        );
    }

    if (type === 'dots') {
        return (
            <div
                className={clsx('flex items-center justify-center gap-1.5', className)}
                {...props}
            >
                <div
                    className={clsx(
                        'rounded-full animate-bounce [animation-delay:-0.3s]',
                        dotSizeClasses[size],
                        colorClasses[color].split(' ')[2]
                    )}
                />
                <div
                    className={clsx(
                        'rounded-full animate-bounce [animation-delay:-0.15s]',
                        dotSizeClasses[size],
                        colorClasses[color].split(' ')[2]
                    )}
                />
                <div
                    className={clsx(
                        'rounded-full animate-bounce',
                        dotSizeClasses[size],
                        colorClasses[color].split(' ')[2]
                    )}
                />
            </div>
        );
    }

    if (type === 'page') {
        return (
            <div
                className={clsx(
                    'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-theme/80 backdrop-blur-md',
                    className
                )}
                {...props}
            >
                <div className="relative flex flex-col items-center gap-4">
                    <div
                        className={clsx(
                            'animate-spin rounded-full border-t-transparent',
                            sizeClasses.lg,
                            colorClasses[color].split(' ')[0]
                        )}
                    />
                    <span className="text-sm font-semibold tracking-widest uppercase text-slate-500 animate-pulse">
                        Loading CommerceCraft...
                    </span>
                </div>
            </div>
        );
    }

    if (type === 'skeleton') {
        const list = Array.from({ length: count });

        return (
            <div className={clsx('w-full flex flex-col gap-4', className)} {...props}>
                {list.map((_, index) => (
                    <div
                        key={index}
                        className="w-full animate-pulse flex flex-col"
                    >
                        {skeletonVariant === 'text' && (
                            <div className="space-y-2.5 w-full">
                                <div className="h-4.5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                                <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                            </div>
                        )}

                        {skeletonVariant === 'card' && (
                            <div className="flex gap-4 p-4 border rounded-xl w-full">
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                                <div className="flex-1 space-y-2.5">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                                </div>
                            </div>
                        )}

                        {skeletonVariant === 'product' && (
                            <div className="flex flex-col gap-3 p-3 border rounded-2xl w-full">
                                <div className="aspect-square w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mt-2" />
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                                <div className="flex justify-between items-center mt-2.5">
                                    <div className="h-5 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
                                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3" />
                                </div>
                            </div>
                        )}

                        {skeletonVariant === 'table' && (
                            <div className="w-full flex items-center justify-between py-3 border-b">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/5" />
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
                                <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded w-12" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

Loader.displayName = 'Loader';
export default Loader;
