import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function ProductsListing() {
    const { products, addToCart, wishlist, toggleWishlist } = useContext(ShopContext);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');

    // Get list of unique categories
    const categoriesList = useMemo(() => {
        return ['All', ...new Set(products.map(p => p.category))];
    }, [products]);

    // Filter and Sort products
    const processedProducts = useMemo(() => {
        let list = [...products];

        // 1. Filter
        if (selectedCategory !== 'All') {
            list = list.filter(p => p.category === selectedCategory);
        }

        // 2. Sort
        if (sortBy === 'price-low') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            list.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            list.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'title') {
            list.sort((a, b) => a.title.localeCompare(b.title));
        }

        return list;
    }, [products, selectedCategory, sortBy]);

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">All Premium Tech</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Browse our master collection of state-of-the-art consumer technology.
                    </p>
                </div>

                {/* Filters & Sorting Panel */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--glass-border)',
                    padding: '1rem 1.5rem',
                    borderRadius: '1.2rem',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)'
                }}>
                    {/* Category Filter Pills */}
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {categoriesList.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '0.5rem 1.2rem',
                                    borderRadius: '1.5rem',
                                    border: '1px solid',
                                    borderColor: selectedCategory === cat ? 'var(--accent)' : 'rgba(0,0,0,0.08)',
                                    background: selectedCategory === cat ? 'var(--accent)' : 'transparent',
                                    color: selectedCategory === cat ? '#white' : 'var(--text-muted)',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontSize: '0.875rem'
                                }}
                                className={selectedCategory === cat ? '' : 'nav-link'}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.8rem',
                                border: '1px solid rgba(0,0,0,0.08)',
                                background: 'white',
                                color: 'var(--text-main)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="title">Name: A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Products Count Info */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                    Showing {processedProducts.length} premium products
                </p>

                {/* Products Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                    gap: '2rem'
                }}>
                    {processedProducts.map(product => {
                        const inWishlist = wishlist.includes(product.id);
                        return (
                            <div key={product.id} className="product-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                                {/* Wishlist toggle badge */}
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '2rem',
                                        height: '2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        zIndex: 2,
                                        fontSize: '1rem',
                                        color: inWishlist ? '#ef4444' : '#cbcbcb',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    {inWishlist ? '❤️' : '🤍'}
                                </button>

                                <div style={{ position: 'relative' }}>
                                    <Link to={`/product/${product.id}`} className="product-image" style={{ width: '100%', display: 'flex', cursor: 'pointer' }}>
                                        <img src={product.image} alt={product.title} className="placeholder" />
                                    </Link>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0.5rem',
                                        left: '0.5rem',
                                        background: 'rgba(255,255,255,0.85)',
                                        backdropFilter: 'blur(4px)',
                                        color: 'var(--text-main)',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '0.5rem',
                                        pointerEvents: 'none'
                                    }}>
                                        ⭐ {product.rating}
                                    </div>
                                </div>

                                <div className="product-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', padding: '0.5rem 0 0 0' }}>
                                    <div>
                                        <h3 className="product-title" style={{ minHeight: '2.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            <Link to={`/product/${product.id}`} style={{ color: 'inherit' }}>{product.title}</Link>
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {product.description}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="product-price" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>${product.price}</p>
                                        <button className="add-btn" onClick={() => addToCart(product.id)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default ProductsListing;
