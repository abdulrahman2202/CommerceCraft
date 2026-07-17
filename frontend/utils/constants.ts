/**
 * CommerceCraft Core Theme Constants
 * Unified design system values matching our Tailwind configurations.
 */

export const COLORS = {
    // Brand Colors
    primary: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C4A6E',
        glow: 'rgba(14, 165, 233, 0.15)',
    },
    secondary: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
    },
    accent: {
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#A855F7',
        600: '#9333EA',
        700: '#7E22CE',
        800: '#6B21A8',
        900: '#581C87',
    },
    // Functional Colors
    success: {
        light: '#DEF7EC',
        main: '#31C48D',
        dark: '#03543F',
    },
    warning: {
        light: '#FDF6B2',
        main: '#F39C12',
        dark: '#7E3AF2',
    },
    danger: {
        light: '#FDE8E8',
        main: '#F05252',
        dark: '#9B1C1C',
    },
    info: {
        light: '#E1EFFE',
        main: '#3F83F8',
        dark: '#1E429F',
    },
    // Neutral Colors (Dark/Light setup)
    neutral: {
        white: '#FFFFFF',
        black: '#000000',
        slate: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
            950: '#020617',
        },
    },
    // Semantic Backgrounds
    light: {
        background: '#F8FAFC',
        foreground: '#0F172A',
        card: '#FFFFFF',
        border: '#E2E8F0',
    },
    dark: {
        background: '#0B0F19',
        foreground: '#F8FAFC',
        card: '#131926',
        border: '#1E293B',
    },
};

export const SPACING = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
    '5xl': '64px',
    '6xl': '96px',
    '7xl': '128px',
};

export const BORDER_RADIUS = {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '32px',
    full: '9999px',
};

export const SHADOWS = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Premium Neon glow drops
    primaryGlow: '0 0 15px rgba(14, 165, 233, 0.35)',
    accentGlow: '0 0 15px rgba(168, 85, 247, 0.35)',
    successGlow: '0 0 15px rgba(49, 196, 141, 0.35)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
};

export const TRANSITIONS = {
    duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
    },
    timing: {
        ease: 'ease',
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Snappy bounce
    },
};

export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};
