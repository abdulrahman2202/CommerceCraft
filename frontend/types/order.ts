import { UserAddress } from './user';

/**
 * CommerceCraft Order Domain TypeScript Types
 */

export interface OrderItem {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    vendorId: string;
}

export interface OrderPaymentInfo {
    method: 'card' | 'paypal' | 'cod';
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
}

export type OrderShippingStatus =
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface OrderShippingInfo {
    address: UserAddress;
    status: OrderShippingStatus;
    trackingNumber?: string;
    carrier?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    payment: OrderPaymentInfo;
    shipping: OrderShippingInfo;
    subtotal: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    createdAt: string;
}
