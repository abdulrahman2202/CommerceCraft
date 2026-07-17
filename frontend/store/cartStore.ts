import { create } from 'zustand';
import { OrderItem } from '@/types/order';

interface CartState {
    items: OrderItem[];
    subtotal: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;

    // Actions
    addItem: (item: Omit<OrderItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const TAX_RATE = 0.08; // 8% sales tax
const FREE_SHIPPING_THRESHOLD = 150.0;
const FLAT_SHIPPING_FEE = 15.0;

const calculateTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingPrice = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
    const taxPrice = subtotal * TAX_RATE;
    const totalPrice = subtotal + shippingPrice + taxPrice;

    return {
        subtotal,
        shippingPrice,
        taxPrice,
        totalPrice,
    };
};

export const useCartStore = create<CartState>((set) => ({
    items: [],
    subtotal: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,

    addItem: (newItem) =>
        set((state) => {
            const quantityToAdd = newItem.quantity ?? 1;
            const existingItemIndex = state.items.findIndex(
                (item) => item.productId === newItem.productId
            );

            let updatedItems: OrderItem[];
            if (existingItemIndex > -1) {
                updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += quantityToAdd;
            } else {
                updatedItems = [
                    ...state.items,
                    { ...newItem, quantity: quantityToAdd } as OrderItem,
                ];
            }

            return {
                items: updatedItems,
                ...calculateTotals(updatedItems),
            };
        }),

    removeItem: (productId) =>
        set((state) => {
            const updatedItems = state.items.filter((item) => item.productId !== productId);
            return {
                items: updatedItems,
                ...calculateTotals(updatedItems),
            };
        }),

    updateQuantity: (productId, quantity) =>
        set((state) => {
            if (quantity <= 0) {
                // Remove item on non-positive entry
                const updatedItems = state.items.filter((item) => item.productId !== productId);
                return {
                    items: updatedItems,
                    ...calculateTotals(updatedItems),
                };
            }

            const updatedItems = state.items.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            );

            return {
                items: updatedItems,
                ...calculateTotals(updatedItems),
            };
        }),

    clearCart: () =>
        set({
            items: [],
            subtotal: 0,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: 0,
        }),
}));
