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

    // Orders State: Array of orderObjects
    const [orders, setOrders] = useState(() => {
        const stored = localStorage.getItem('commerce_orders');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored orders", e);
            }
        }
        return [];
    });

    // Profile State
    const [userProfile, setUserProfile] = useState(() => {
        const stored = localStorage.getItem('commerce_profile');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored profile", e);
            }
        }
        return { name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 019-2834', avatar: 'JD' };
    });

    // Saved Addresses State
    const [savedAddresses, setSavedAddresses] = useState(() => {
        const stored = localStorage.getItem('commerce_addresses');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored addresses", e);
            }
        }
        return [
            { id: 1, label: 'Default Home', name: 'John Doe', address: '123 Creator Lane, Apt 4B', city: 'San Francisco', zip: '94103', phone: '+1 (555) 019-2834' }
        ];
    });

    // Saved Payment Methods State
    const [savedPayments, setSavedPayments] = useState(() => {
        const stored = localStorage.getItem('commerce_payments');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored payments", e);
            }
        }
        return [
            { id: 1, label: 'Primary Card', name: 'John Doe', cardNum: '•••• •••• •••• 4111', expiry: '12/28', type: 'Visa' }
        ];
    });

    // Notification Settings State
    const [notificationRules, setNotificationRules] = useState(() => {
        const stored = localStorage.getItem('commerce_notifications');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored notifications", e);
            }
        }
        return { orderUpdates: true, weeklyDeals: false, securityAlerts: true };
    });

    // Recently Viewed State: Array of IDs (capped at 6)
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const stored = localStorage.getItem('commerce_recently_viewed');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored recently viewed products", e);
            }
        }
        return [];
    });

    // Reviews State: Array of review objects
    const [reviews, setReviews] = useState(() => {
        const stored = localStorage.getItem('commerce_reviews');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored reviews", e);
            }
        }
        return [
            { id: 1, productId: 1, name: 'Ava R.', rating: 5, comment: 'Phenomenal tactile layout! The RGB light customization profiles are absolutely gorgeous. Best mechanical keyboard I have ever handled.', date: '7/22/2026' },
            { id: 2, productId: 1, name: 'Marcus L.', rating: 4, comment: 'High grade construction materials. Key presses sound very clean. Only critique is lack of detailed battery indicators.', date: '7/23/2026' },
            { id: 3, productId: 2, name: 'Gavin D.', rating: 5, comment: 'Incredible acoustic range! Active Noise Cancelling isolates sound perfectly in loud office settings. Worth every penny.', date: '7/21/2026' },
            { id: 4, productId: 3, name: 'Elena S.', rating: 5, comment: 'Sleek dark finish matches my professional desk setup perfectly. The charging stand is very convenient.', date: '7/19/2026' }
        ];
    });

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

    useEffect(() => {
        localStorage.setItem('commerce_orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('commerce_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('commerce_addresses', JSON.stringify(savedAddresses));
    }, [savedAddresses]);

    useEffect(() => {
        localStorage.setItem('commerce_payments', JSON.stringify(savedPayments));
    }, [savedPayments]);

    useEffect(() => {
        localStorage.setItem('commerce_notifications', JSON.stringify(notificationRules));
    }, [notificationRules]);

    useEffect(() => {
        localStorage.setItem('commerce_recently_viewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    useEffect(() => {
        localStorage.setItem('commerce_reviews', JSON.stringify(reviews));
    }, [reviews]);

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

    const placeOrder = (orderDetails) => {
        const dateObj = new Date();
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const randomHex = Math.floor(1000 + Math.random() * 9000);
        const orderId = `CC-${year}${month}${day}-${randomHex}`;

        const newOrder = {
            id: orderId,
            date: dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Processing',
            items: orderDetails.items,
            shippingAddress: orderDetails.shippingAddress,
            financials: {
                subtotal: orderDetails.subtotal,
                discount: orderDetails.discount,
                shipping: orderDetails.shipping,
                tax: orderDetails.tax,
                total: orderDetails.total
            }
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder;
    };

    // Derived counts
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    // Profile actions
    const updateProfile = (profileData) => {
        setUserProfile(prev => {
            const initials = profileData.name ? profileData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'JD';
            return {
                ...prev,
                ...profileData,
                avatar: initials || 'JD'
            };
        });
    };

    const addAddress = (addressObj) => {
        setSavedAddresses(prev => [
            ...prev,
            {
                id: prev.length > 0 ? Math.max(...prev.map(a => a.id)) + 1 : 1,
                ...addressObj
            }
        ]);
    };

    const removeAddress = (addressId) => {
        setSavedAddresses(prev => prev.filter(a => a.id !== addressId));
    };

    const addPayment = (paymentObj) => {
        setSavedPayments(prev => [
            ...prev,
            {
                id: prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1,
                ...paymentObj
            }
        ]);
    };

    const removePayment = (paymentId) => {
        setSavedPayments(prev => prev.filter(p => p.id !== paymentId));
    };

    const updateNotifications = (settingKey, value) => {
        setNotificationRules(prev => ({
            ...prev,
            [settingKey]: value
        }));
    };

    const addToRecentlyViewed = (productId) => {
        const id = Number(productId);
        setRecentlyViewed(prev => {
            const filtered = prev.filter(pId => pId !== id);
            return [id, ...filtered].slice(0, 6);
        });
    };

    const addProductReview = (productId, reviewData) => {
        const id = Number(productId);
        const newReview = {
            id: Date.now(),
            productId: id,
            name: reviewData.name,
            rating: Number(reviewData.rating) || 5,
            comment: reviewData.comment || '',
            date: new Date().toLocaleDateString()
        };

        setReviews(prev => [newReview, ...prev]);

        // Dynamically recalculate average rating and reviewCount for products catalog
        setProducts(prevProducts => prevProducts.map(p => {
            if (p.id === id) {
                const nextReviewCount = (p.reviewCount || 0) + 1;
                const currentRating = p.rating || 4.5;
                const nextRating = Number(((currentRating * (nextReviewCount - 1) + Number(reviewData.rating)) / nextReviewCount).toFixed(1));
                return {
                    ...p,
                    reviewCount: nextReviewCount,
                    rating: nextRating
                };
            }
            return p;
        }));
    };

    const value = {
        products,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        orders,
        placeOrder,
        cartCount,
        wishlistCount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        addProduct,
        userProfile,
        savedAddresses,
        savedPayments,
        notificationRules,
        updateProfile,
        addAddress,
        removeAddress,
        addPayment,
        removePayment,
        updateNotifications,
        recentlyViewed,
        reviews,
        addToRecentlyViewed,
        addProductReview
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
