import { create } from 'zustand';
import { Product } from '@/types/product';

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
    filters: {
        category: string;
        sortBy: string;
        searchQuery: string;
    };

    // Actions
    fetchProducts: () => Promise<void>;
    fetchProductBySlug: (slug: string) => Promise<void>;
    setFilter: (key: 'category' | 'sortBy' | 'searchQuery', value: string) => void;
    clearFilters: () => void;
}

// Generate premium mock product array for demo representation
const MOCK_PRODUCTS: Product[] = [
    {
        id: 'prod_1',
        title: 'Minimalist Leather Backpack',
        slug: 'minimalist-leather-backpack',
        description: 'An executive grade full grain hand-crafted leather carryall featuring laptop slots and waterproof inner linings.',
        price: 185.00,
        compareAtPrice: 240.00,
        category: 'bags',
        tags: ['leather', 'travel', 'premium'],
        images: ['/images/products/backpack-1.jpg'],
        rating: 4.8,
        numReviews: 24,
        vendorId: 'vendor_1',
        stockCount: 15,
        isFeatured: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'prod_2',
        title: 'ANC Noise Cancelling Headphones',
        slug: 'anc-noise-cancelling-headphones',
        description: 'Experience professional acoustics with responsive noise decoupling filters, comfortable memory foam cushions, and 45h runtime.',
        price: 299.00,
        category: 'electronics',
        tags: ['audio', 'wireless', 'ANC'],
        images: ['/images/products/headphones-1.jpg'],
        rating: 4.6,
        numReviews: 18,
        vendorId: 'vendor_2',
        stockCount: 3,
        isFeatured: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'prod_3',
        title: 'Titanium Modular Wristwatch',
        slug: 'titanium-modular-wristwatch',
        description: 'Durable custom mechanical watch constructed on grade-5 aerospace brushed titanium with auto-winding precision calibration.',
        price: 495.00,
        compareAtPrice: 550.00,
        category: 'accessories',
        tags: ['watch', 'titanium', 'luxury'],
        images: ['/images/products/watch-1.jpg'],
        rating: 4.9,
        numReviews: 42,
        vendorId: 'vendor_1',
        stockCount: 8,
        isFeatured: true,
        createdAt: new Date().toISOString(),
    }
];

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    filters: {
        category: 'all',
        sortBy: 'default',
        searchQuery: '',
    },

    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API query delay
            await new Promise((resolve) => setTimeout(resolve, 600));

            const { category, searchQuery, sortBy } = get().filters;
            let filtered = [...MOCK_PRODUCTS];

            // Handle category filtering
            if (category !== 'all') {
                filtered = filtered.filter((p) => p.category === category);
            }

            // Handle query matching
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                filtered = filtered.filter(
                    (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
                );
            }

            // Handle sorting matching
            if (sortBy === 'price-low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'rating') {
                filtered.sort((a, b) => b.rating - a.rating);
            }

            set({ products: filtered, isLoading: false });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Error occurred fetching products', isLoading: false });
        }
    },

    fetchProductBySlug: async (slug: string) => {
        set({ isLoading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 400));
            const match = MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
            set({ selectedProduct: match, isLoading: false });
        } catch {
            set({ error: 'Search fails', isLoading: false });
        }
    },

    setFilter: (key, value) => {
        set((state) => ({
            filters: {
                ...state.filters,
                [key]: value,
            },
        }));
        // Re-trigger product listing fetch
        get().fetchProducts();
    },

    clearFilters: () => {
        set({
            filters: {
                category: 'all',
                sortBy: 'default',
                searchQuery: '',
            },
        });
        get().fetchProducts();
    },
}));
