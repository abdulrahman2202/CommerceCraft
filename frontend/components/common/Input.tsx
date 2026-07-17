import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: string;
    /**
     * Use CSS-only floating peer labels
     * @default false
     */
    floating?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    /**
     * Visual theme variants
     * @default 'outline'
     */
    variant?: 'outline' | 'filled' | 'glass';
}

/**
 * Reusable Stateful Input Component
 * Implements accessible validation states, floating labels, side decorations, and standard refs.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            helperText,
            error,
            floating = false,
            leftIcon,
            rightIcon,
            variant = 'outline',
            id: customId,
            disabled,
            placeholder,
            ...props
        },
        ref
    ) => {
        const internalId = useId();
        const inputId = customId || internalId;
        const resolvedPlaceholder = floating ? ' ' : placeholder;

        return (
            <div className="w-full flex flex-col gap-1.5 align-start text-left">
                {!floating && label && (
                    <label
                        htmlFor={inputId}
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none"
                    >
                        {label}
                    </label>
                )}

                <div className="relative w-full flex items-center">
                    {leftIcon && (
                        <div className="absolute left-3.5 text-slate-400 pointer-events-none select-none flex items-center justify-center">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        id={inputId}
                        ref={ref}
                        disabled={disabled}
                        placeholder={resolvedPlaceholder}
                        className={clsx(
                            'peer w-full text-sm rounded-lg transition-all duration-200 outline-none focus:ring-2 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
                            {
                                'pl-10': leftIcon,
                                'pl-4.5': !leftIcon,
                                'pr-10': rightIcon,
                                'pr-4.5': !rightIcon,
                            },
                            {
                                'pt-6 pb-2': floating,
                                'py-3': !floating,
                            },
                            {
                                'border bg-white dark:bg-slate-950 focus:border-primary-500 focus:ring-primary-500/20 text-foreground-theme':
                                    variant === 'outline' && !error,
                                'border-0 bg-slate-100 dark:bg-slate-900/60 focus:ring-primary-500/20 text-foreground-theme':
                                    variant === 'filled' && !error,
                                'focus:bg-white dark:focus:bg-slate-950':
                                    variant === 'filled' && !error,
                                'glass-effect focus:bg-white/60 dark:focus:bg-slate-900/80 focus:ring-primary-500/20 text-foreground-theme':
                                    variant === 'glass' && !error,
                            },
                            {
                                'border border-danger-main bg-danger-light/10 dark:bg-danger-dark/10 focus:ring-danger-main/20 text-danger-main':
                                    !!error,
                            },
                            className
                        )}
                        {...props}
                    />

                    {floating && label && (
                        <label
                            htmlFor={inputId}
                            className={clsx(
                                'absolute pointer-events-none select-none tracking-wide text-xs transition-all duration-205 origin-left text-slate-400 font-medium -translate-y-2.5 scale-85',
                                {
                                    'left-10': leftIcon,
                                    'left-4.5': !leftIcon,
                                    'peer-[:placeholder-shown:not(:focus)]:translate-y-[9px]': leftIcon,
                                    'peer-[:placeholder-shown:not(:focus)]:translate-y-2': !leftIcon,
                                    'peer-[:placeholder-shown:not(:focus)]:scale-100': true,
                                    'peer-[:placeholder-shown:not(:focus)]:text-sm': true,
                                    'peer-focus:text-primary-500': !error,
                                    'peer-focus:text-danger-main': !!error,
                                }
                            )}
                        >
                            {label}
                        </label>
                    )}

                    {rightIcon && (
                        <div className="absolute right-3.5 text-slate-400 pointer-events-none select-none flex items-center justify-center">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {error ? (
                    <span className="text-xs font-medium text-danger-main tracking-wide">
                        {error}
                    </span>
                ) : helperText ? (
                    <span className="text-xs text-slate-400 tracking-wide">
                        {helperText}
                    </span>
                ) : null}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
