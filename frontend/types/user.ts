/**
 * CommerceCraft User Domain TypeScript Types
 */

export type UserRole = 'customer' | 'seller' | 'admin';

export interface UserAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    address?: UserAddress;
    createdAt: string;
}

export interface AuthSession {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
