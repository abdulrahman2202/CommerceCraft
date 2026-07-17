/**
 * CommerceCraft Product Domain TypeScript Types
 */

export interface ProductReview {
    id: string;
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
    createdAt: string;
}

export interface VendorInfo {
    id: string;
    storeName: string;
    rating: number;
    productsCount: number;
    bannerImage?: string;
    logoImage?: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number; // Retail MSRP to calculate discount percentages
    category: string;
    tags: string[];
    images: string[];
    rating: number;
    numReviews: number;
    reviews?: ProductReview[];
    vendorId: string;
    vendor?: VendorInfo;
    stockCount: number;
    isFeatured?: boolean;
    createdAt: string;
}
