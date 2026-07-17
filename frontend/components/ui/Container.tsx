import React from 'react';
import clsx from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    /**
     * Container max-width size presets
     * @default 'default'
     */
    size?: 'narrow' | 'default' | 'wide' | 'fluid';
    /**
     * Render container as a custom HTML tag
     * @default 'div'
     */
    as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
    /**
     * Clean custom className overrides
     */
    className?: string;
}

/**
 * Premium Container Component
 * Handles margins, horizontal gutters, and responsive boundary scales cleanly.
 */
export const Container: React.FC<ContainerProps> = ({
    children,
    size = 'default',
    as: Component = 'div',
    className,
    ...props
}) => {
    return (
        <Component
            className={clsx(
                'mx-auto w-full px-4 sm:px-6 lg:px-8',
                {
                    'max-w-4xl': size === 'narrow',
                    'max-w-7xl': size === 'default',
                    'max-w-[1440px]': size === 'wide',
                    'max-w-none': size === 'fluid',
                },
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

Container.displayName = 'Container';
export default Container;
