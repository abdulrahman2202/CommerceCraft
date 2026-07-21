import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function SearchResults() {
    const { products, searchQuery, setSearchQuery, addToCart, wishlist, toggleWishlist } = useContext(ShopContext);
    const [localQuery, setLocalQuery] = useState(searchQuery);

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const term = searchQuery.toLowerCase().trim();
        return products.filter(
            p => p.title.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
        );
    }, [products, searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localQuery.trim());
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                <h1 className="gradient-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Search Catalog</h1>

                {/* Search Bar in Page */}
                <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.8rem' }}>
                        <input
                            type="text"
                            placeholder="Search title, category, specs..."
                            value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.85rem 1.25rem',
                                borderRadius: '0.8rem',
                                border: '1px solid rgba(0,0,0,0.08)',
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                borderImageSource: 'inherit',
                                outline: 'none',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                            className="form-input"
                        />
                        <button type="submit" className="hero-btn" style={{
                            padding: '0.85rem 2rem',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            borderRadius: '0.8rem'
                        }}>Search</button>
                    </form>
                </div>

                {searchQuery ? (
                    <>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                            Search Results for &ldquo;<span style={{ color: 'var(--accent)' }}>{searchQuery}</span>&rdquo;
                        </h2>

                        {filteredProducts.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '1.2rem',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)'
                            }}>
                                <svg style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem auto', opacity: 0.3 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                                    We couldn't find any products matching your query.
                                </p>
                                <button onClick={() => { setSearchQuery(''); setLocalQuery(''); }} style={{
                                    border: '1px solid var(--accent)',
                                    background: 'transparent',
                                    color: 'var(--accent)',
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}>Clear Search</button>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                                gap: '2rem'
                            }}>
                                {filteredProducts.map(product => {
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
                                                    color: inWishlist ? '#ef4444' : '#cbcbcb'
                                                }}
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
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '4rem 0' }}>
                        <p style={{ fontSize: '1.1rem' }}>Enter a keyword above to find premium consumer devices in our master catalog.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default SearchResults;
