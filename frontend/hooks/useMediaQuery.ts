'use client';

import { useState, useEffect } from 'react';

/**
 * Reusable Media Query Match Hook
 * @param query CSS media query expression (e.g. '(min-width: 768px)')
 * @returns Boolean representing media query condition state
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Escape on SSR environment context
        if (typeof window === 'undefined') return;

        const mediaList = window.matchMedia(query);

        // Set initial configuration asynchronously to avoid synchronous setState cascading render warning
        const timer = setTimeout(() => {
            setMatches(mediaList.matches);
        }, 0);

        // Modern matchMedia change handler
        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaList.addEventListener('change', listener);

        return () => {
            clearTimeout(timer);
            mediaList.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;
