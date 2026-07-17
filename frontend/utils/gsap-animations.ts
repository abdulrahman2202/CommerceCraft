import { gsap } from 'gsap';

/**
 * Reusable client-side GSAP animations
 * Safe for Next.js SSR environment
 */

// Helper to check if execution is on the client side
const isClient = () => typeof window !== 'undefined';

/**
 * Magnetic button cursor tracking interaction
 * @param element Target element container
 * @param strength Movement strength scaling factor (default 0.3)
 */
export const gsapMagneticEffect = (
    element: HTMLElement | null,
    strength = 0.3
): (() => void) | undefined => {
    if (!isClient() || !element) return;

    const onMouseMove = (e: MouseEvent) => {
        const boundBox = element.getBoundingClientRect();
        const halfWidth = boundBox.width / 2;
        const halfHeight = boundBox.height / 2;
        // Calculate distance from center of the button
        const x = e.clientX - (boundBox.left + halfWidth);
        const y = e.clientY - (boundBox.top + halfHeight);

        // Animate coordinates using GSAP
        gsap.to(element, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const onMouseLeave = () => {
        // Reset to initial coordinates
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    // Return cleanup function
    return () => {
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
    };
};

/**
 * Basic Fade and Translate reveal animation
 */
export const gsapFadeIn = (
    element: HTMLElement | string | null,
    options: {
        y?: number;
        x?: number;
        duration?: number;
        delay?: number;
        opacity?: number;
        ease?: string;
    } = {}
) => {
    if (!isClient() || !element) return;
    const { y = 30, x = 0, duration = 0.8, delay = 0, opacity = 0, ease = 'power3.out' } = options;

    return gsap.from(element, {
        y,
        x,
        opacity,
        duration,
        delay,
        ease,
    });
};

/**
 * Stagger elements fade-in-up transition utility
 */
export const gsapStaggerFade = (
    elements: HTMLElement[] | string | null,
    options: {
        stagger?: number;
        y?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
) => {
    if (!isClient() || !elements) return;
    const { stagger = 0.1, y = 35, duration = 0.8, delay = 0, ease = 'power3.out' } = options;

    return gsap.from(elements, {
        opacity: 0,
        y,
        stagger,
        duration,
        delay,
        ease,
    });
};

/**
 * Text reveal animation (simulate split-type text entries)
 * Note: For production, requires SplitText (GSAP Club) or splits characters manually.
 * This helper exposes basic clip-path sliding reveals.
 */
export const gsapTextReveal = (
    element: HTMLElement | string | null,
    options: {
        duration?: number;
        delay?: number;
        direction?: 'up' | 'down';
    } = {}
) => {
    if (!isClient() || !element) return;
    const { duration = 1, delay = 0, direction = 'up' } = options;

    const yVal = direction === 'up' ? '100%' : '-100%';

    // Uses wrapper clipping structure
    return gsap.fromTo(
        element,
        {
            y: yVal,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        {
            y: '0%',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration,
            delay,
            ease: 'power4.out',
        }
    );
};
