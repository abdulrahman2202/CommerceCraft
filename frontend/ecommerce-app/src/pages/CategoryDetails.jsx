import React, { useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function CategoryDetails() {
    const { name } = useParams();
    const { products, addToCart, wishlist, toggleWishlist } = useContext(ShopContext);

    const categoryProducts = useMemo(() => {
        return products.filter(p => p.category.toLowerCase() === name.toLowerCase());
    }, [products, name]);

    // Simple display metadata for category
    const meta = useMemo(() => {
        const lower = name.toLowerCase();
        if (lower === 'audio') return { icon: '🎧', description: 'Studio equipment, immersive headphones, and compact buds.' };
        if (lower === 'gaming') return { icon: '🎮', description: 'Precision input devices, wide monitors, and spatial setups.' };
        if (lower === 'wearables') return { icon: '⌚', description: 'Intelligent biometric logs and elegant sports tracking.' };
        if (lower === 'peripherals') return { icon: '🔌', description: 'Productivity accelerators and workflow enhancements.' };
        return { icon: '📦', description: 'State of the art technical innovations.' };
    }, [name]);

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Back Link */}
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/categories" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} className="nav-link">
                        ← Back to Categories
                    </Link>
                </div>

                {/* Cover Header */}
                <div style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--glass-border)',
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    marginBottom: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)'
                }}>
                    <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1rem' }}>{meta.icon}</span>
                    <h1 className="gradient-title" style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>{name} Collection</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        {meta.description}
                    </p>
                </div>

                {/* Category Count */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                    Showing {categoryProducts.length} devices in {name}
                </p>

                {/* Grid */}
                {categoryProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', margin: '4rem auto' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No products listed in this category yet.</p>
                        <Link to="/upload" className="hero-btn" style={{ padding: '0.8rem 2rem', marginTop: '1rem', display: 'inline-block' }}>List a Product</Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                        gap: '2rem'
                    }}>
                        {categoryProducts.map(product => {
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
            </div>
        </main>
    );
}

export default CategoryDetails;
