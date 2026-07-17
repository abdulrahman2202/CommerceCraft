import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API request delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            const mockUser: User = {
                id: 'usr_mock_123',
                name: email.split('@')[0].toUpperCase(),
                email: email,
                role: email.includes('seller') ? 'seller' : email.includes('admin') ? 'admin' : 'customer',
                createdAt: new Date().toISOString(),
            };

            if (typeof window !== 'undefined') {
                localStorage.setItem('commerce_token', 'mock_jwt_token_payload');
            }

            set({
                user: mockUser,
                token: 'mock_jwt_token_payload',
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Login failed', isLoading: false });
        }
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('commerce_token');
        }
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    clearError: () => set({ error: null }),
}));
