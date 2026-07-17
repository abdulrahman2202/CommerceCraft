/**
 * CommerceCraft Reusable Utility Helper Functions
 */

/**
 * Truncate long strings with trailing ellipses
 */
export const truncateString = (text: string, maxLength = 100): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate URL safe slug from text strings
 */
export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]/g, '') // Remove all non-word chars
        .replace(/--+/g, '-'); // Replace multiple - with single -
};

/**
 * Basic throttle execution bounds helper
 */
export const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

/**
 * Generate unique temporary ID for objects
 */
export const generateTempId = (prefix = 'temp'): string => {
    return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
};
