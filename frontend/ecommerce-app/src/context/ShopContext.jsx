import React, { createContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
    // Products State (Load from localStorage if exists, else load INITIAL_PRODUCTS)
    const [products, setProducts] = useState(() => {
        const stored = localStorage.getItem('commerce_products');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored products", e);
            }
        }
        return INITIAL_PRODUCTS;
    });

    // Cart State: Array of { id, quantity }
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('commerce_cart');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored cart", e);
            }
        }
        return [];
    });

    // Wishlist State: Array of IDs
    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('commerce_wishlist');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored wishlist", e);
            }
        }
        return [];
    });

    // Search Query State
    const [searchQuery, setSearchQuery] = useState('');

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem('commerce_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('commerce_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('commerce_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Cart Interactions
    const addToCart = (productId, quantity = 1) => {
        const id = Number(productId);
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.id === id);
            if (existingIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { id, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        const id = Number(productId);
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateCartQuantity = (productId, quantity) => {
        const id = Number(productId);
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item => item.id === id ? { ...item, quantity: Number(quantity) } : item)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    // Wishlist Interactions
    const toggleWishlist = (productId) => {
        const id = Number(productId);
        setWishlist(prevWishlist => {
            if (prevWishlist.includes(id)) {
                return prevWishlist.filter(item => item !== id);
            } else {
                return [...prevWishlist, id];
            }
        });
    };

    // Add dynamically uploaded products
    const addProduct = (productData) => {
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            title: productData.title,
            price: parseFloat(productData.price) || 0,
            category: productData.category,
            image: productData.image || 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400',
            description: productData.description || '',
            rating: 4.5,
            reviewCount: 1,
            specs: {
                "Connectivity": "Wireless / USB-C",
                "Warranty": "1 Year Store Warranty",
                "Weight": "N/A"
            },
            features: [
                "Newly Listed Creator Gadget",
                "CommerceCraft Certified Seller Item"
            ]
        };

        setProducts(prevProducts => [newProduct, ...prevProducts]);
        return newProduct;
    };

    // Derived counts
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    const value = {
        products,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        cartCount,
        wishlistCount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        addProduct
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
