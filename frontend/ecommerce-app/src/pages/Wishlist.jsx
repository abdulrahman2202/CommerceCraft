import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Wishlist() {
    const { wishlist, products, toggleWishlist, addToCart } = useContext(ShopContext);

    // Map wishlist IDs to actual product objects
    const wishlistItems = products.filter(p => wishlist.includes(p.id));

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Your Wishlist</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        A curated gallery of devices you are currently eyeing.
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '1.2rem',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🤍</span>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            Your wishlist is currently empty.
                        </p>
                        <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2rem', display: 'inline-block' }}>
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {wishlistItems.map(item => (
                            <div key={item.id} className="product-card" style={{ height: '100%', justifyContent: 'space-between' }}>

                                {/* Image and category badge */}
                                <div style={{ position: 'relative' }}>
                                    <Link to={`/product/${item.id}`} className="product-image" style={{ width: '100%', display: 'flex', cursor: 'pointer' }}>
                                        <img src={item.image} alt={item.title} className="placeholder" />
                                    </Link>
                                    <span style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        left: '0.5rem',
                                        background: 'rgba(255,255,255,0.85)',
                                        color: 'var(--text-main)',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '0.4rem',
                                    }}>{item.category}</span>
                                </div>

                                <div className="product-info" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', padding: '0.5rem 0 0 0' }}>
                                    <div>
                                        <h3 className="product-title" style={{ minHeight: '2.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            <Link to={`/product/${item.id}`} style={{ color: 'inherit' }}>{item.title}</Link>
                                        </h3>
                                        <p className="product-price" style={{ fontSize: '1.2rem', marginBottom: '1.2rem' }}>${item.price}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                        <button
                                            className="add-btn"
                                            style={{ background: 'var(--text-main)', color: 'white', borderColor: 'var(--text-main)' }}
                                            onClick={() => addToCart(item.id)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => toggleWishlist(item.id)}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                borderRadius: '0.8rem',
                                                padding: '0.6rem',
                                                color: '#ef4444',
                                                fontWeight: 650,
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = 'rgba(239, 68, 68, 0.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'transparent';
                                            }}
                                        >
                                            💔 Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Wishlist;
