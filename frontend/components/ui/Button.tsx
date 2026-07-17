import React, { forwardRef } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

/**
 * Premium Reusable Button Component
 * Supports custom themes, sizes, loaders, and side icons. Placed in components/ui.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            type = 'button',
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                className={clsx(
                    // Base Styles
                    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 select-none',
                    (disabled || isLoading) ? 'cursor-not-allowed' : 'cursor-pointer',
                    {
                        // Variants List
                        'bg-primary-600 hover:bg-primary-700 text-white shadow-premium-sm focus:ring-primary-500':
                            variant === 'primary',
                        'bg-secondary-600 hover:bg-secondary-700 text-white shadow-premium-sm focus:ring-secondary-500':
                            variant === 'secondary',
                        'bg-accent-600 hover:bg-accent-700 text-white shadow-premium-sm focus:ring-accent-500':
                            variant === 'accent',
                        'border hover:bg-background-theme text-foreground-theme focus:ring-primary-500':
                            variant === 'outline',
                        'hover:bg-background-theme text-foreground-theme focus:ring-primary-500':
                            variant === 'ghost',
                        'glass-effect hover:bg-white/50 text-foreground-theme shadow-glass focus:ring-primary-500':
                            variant === 'glass',

                        // Sizes List
                        'px-3 py-1.5 text-xs rounded-md': size === 'sm',
                        'px-4 py-2 text-sm rounded-lg': size === 'md',
                        'px-6 py-3 text-base rounded-xl': size === 'lg',

                        'w-full': fullWidth,
                    },
                    className
                )}
                {...props}
            >
                {/* Loading Spinner */}
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}

                {/* Left Hand Icon */}
                {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}

                {/* Button Content */}
                <span>{children}</span>

                {/* Right Hand Icon */}
                {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;
