import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function RecentlyViewed() {
    const { recentlyViewed, products } = useContext(ShopContext);

    // Map IDs to actual product objects in order of viewing
    const viewedProducts = recentlyViewed
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Recently Viewed</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Browse products you have recently inspected during this session.
                    </p>
                </div>

                {viewedProducts.length === 0 ? (
                    <div className="premium-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>👀</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Browsing History is Empty</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                            You haven't viewed any specific device detail files yet.
                        </p>
                        <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2.5rem', display: 'inline-block', textDecoration: 'none' }}>
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
                            {viewedProducts.map((p) => (
                                <div key={p.id} className="product-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%' }}>
                                    <Link to={`/product/${p.id}`} className="product-image" style={{ aspectRatio: '1.1', display: 'flex', overflow: 'hidden' }}>
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '0.8rem',
                                                transition: 'all 0.3s'
                                            }}
                                        />
                                    </Link>
                                    <h4 style={{
                                        fontSize: '0.95rem',
                                        fontWeight: 650,
                                        marginTop: '0.5rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        margin: '0.5rem 0 0.2rem 0'
                                    }}>
                                        <Link to={`/product/${p.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="nav-link">
                                            {p.title}
                                        </Link>
                                    </h4>
                                    <p style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>
                                        ${p.price.toFixed(2)}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                                        <Link
                                            to={`/product/${p.id}`}
                                            className="add-btn"
                                            style={{
                                                flex: 1,
                                                padding: '0.5rem',
                                                fontSize: '0.75rem',
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                                fontWeight: 700
                                            }}
                                        >
                                            View Options
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}

export default RecentlyViewed;
