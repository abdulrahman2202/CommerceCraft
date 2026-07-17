import { Variants } from 'framer-motion';

/**
 * Reusable Framer Motion animation variants
 */

// Stagger parent container for list sequences
export const staggerContainer = (
    staggerChildren = 0.1,
    delayChildren = 0
): Variants => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

// Universal Fade In animation variant generator
export const fadeIn = (
    direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
    type: 'tween' | 'spring' | 'inertia' = 'tween',
    delay = 0,
    duration = 0.5
): Variants => {
    return {
        hidden: {
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                delay,
                duration,
                ease: [0.25, 0.25, 0.25, 0.75], // Smooth cubic transition
            },
        },
    };
};

export const scaleUp = (delay = 0, duration = 0.4): Variants => ({
    hidden: {
        scale: 0.95,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'tween',
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo
        },
    },
});

// Accessibly styled Modal animations
export const modalVariants: Record<'backdrop' | 'content', Variants> = {
    backdrop: {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3, delay: 0.1 }
        }
    },
    content: {
        hidden: {
            scale: 0.93,
            y: 20,
            opacity: 0
        },
        show: {
            scale: 1,
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 350
            }
        },
        exit: {
            scale: 0.95,
            y: 15,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: 'easeIn'
            }
        }
    }
};

// Tooltip/Dropdown popovers
export const popoverVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: -5,
    },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -5,
        transition: {
            duration: 0.15,
        },
    },
};

// Multi-step form/tab sliding panel animations
export const tabPaneVariants: Variants = {
    hidden: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    }),
};
