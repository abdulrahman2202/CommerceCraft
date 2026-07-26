import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        products,
        addToCart,
        wishlist,
        toggleWishlist,
        userProfile,
        addToRecentlyViewed,
        reviews,
        addProductReview
    } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    // Find product
    const product = products.find(p => p.id === Number(id));

    // Scroll to top and add to recently viewed when product ID changes
    useEffect(() => {
        if (product) {
            addToRecentlyViewed(product.id);
        }
        window.scrollTo(0, 0);
        setQuantity(1);
    }, [id, product]);

    if (!product) {
        return (
            <main className="page-container" style={{ minHeight: '80vh' }}>
                <div style={{ textAlign: 'center', margin: '4rem auto' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Device Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The product you are trying to view does not exist in our catalog.</p>
                    <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2rem' }}>Back to Shop</Link>
                </div>
            </main>
        );
    }

    // Get related products (same category, excluding current)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const inWishlist = wishlist.includes(product.id);

    const handleQuantityChange = (val) => {
        if (val < 1) return;
        setQuantity(val);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        padding: 0
                    }}
                    className="nav-link"
                >
                    ← Back to Previous
                </button>

                {/* Details layout splits in 2 columns (responsive) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '3rem',
                    marginBottom: '4rem'
                }} className="upload-grid">

                    {/* Left Column: Image Box */}
                    <div style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '1.5rem',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        aspectRatio: '1',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)',
                        maxWidth: '420px',
                        width: '100%',
                        justifySelf: 'center'
                    }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '1rem',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </div>

                    {/* Right Column: Information Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
                        {/* Category tag */}
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(234, 179, 8, 0.12)',
                            color: 'var(--accent)',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            padding: '0.35rem 0.8rem',
                            borderRadius: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1rem',
                            width: 'fit-content'
                        }}>{product.category}</span>

                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: '1.2', color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'Outfit' }}>
                            {product.title}
                        </h1>

                        {/* Customer Ratings */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <div style={{ color: 'var(--accent-light)', fontSize: '1.1rem' }}>
                                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                            </div>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                {product.rating} ({product.reviewCount} customer reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>
                            ${product.price}
                        </div>

                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                            {product.description}
                        </p>

                        {/* Action Panel: Cart Controls & Wishlist */}
                        <div style={{
                            background: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            padding: '1rem 1.2rem',
                            borderRadius: '1.2rem',
                            marginBottom: '2rem',
                            maxWidth: '450px',
                            width: '100%',
                            alignSelf: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                {/* Quantity Adjuster */}
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '0.8rem', overflow: 'hidden', background: 'white' }}>
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        style={{ border: 'none', background: 'transparent', width: '2.2rem', height: '2.2rem', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                                    >-</button>
                                    <span style={{ width: '2rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: 600 }}>{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        style={{ border: 'none', background: 'transparent', width: '2.2rem', height: '2.2rem', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}
                                    >+</button>
                                </div>

                                {/* Cart CTA */}
                                <button
                                    onClick={() => {
                                        addToCart(product.id, quantity);
                                        // add simple feedback
                                        alert(`Added ${quantity} item(s) to your cart!`);
                                    }}
                                    className="add-btn"
                                    style={{ flex: '1', minWidth: '130px', background: 'var(--accent)', color: 'white', border: 'none', padding: '0.8rem' }}
                                >
                                    Add to Cart
                                </button>

                                {/* Wishlist toggle */}
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    style={{
                                        border: '1px solid var(--glass-border)',
                                        background: 'white',
                                        borderRadius: '0.8rem',
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        color: inWishlist ? '#ef4444' : '#64748b'
                                    }}
                                >
                                    {inWishlist ? '❤️' : '🤍'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.08)', margin: '3rem 0' }} />

                {/* Additional Spec Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', margin: '3rem 0' }} className="upload-grid">
                    {/* System Specifications */}
                    <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem' }}>Device Specifications</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                            <tbody>
                                {Object.entries(product.specs || {}).map(([key, val], idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '0.8rem 0.5rem 0.8rem 0', fontWeight: 600, color: 'var(--text-muted)', width: '35%' }}>{key}</td>
                                        <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-main)' }}>{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Features list */}
                    <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem' }}>Key Features</h3>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            {(product.features || []).map((feat, idx) => (
                                <li key={idx} style={{ marginBottom: '0.6rem' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.08)', margin: '3rem 0' }} />

                {/* Interactive Reviews Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', margin: '3rem 0' }} className="upload-grid">

                    {/* Reviews List */}
                    <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                            Customer Reviews ({reviews.filter(r => r.productId === product.id).length})
                        </h3>

                        {reviews.filter(r => r.productId === product.id).length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                                No reviews registered for this device yet. Be the first to share your experience!
                            </p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {reviews.filter(r => r.productId === product.id).map((rev) => (
                                    <div key={rev.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1.2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{rev.name}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                                        </div>
                                        <div style={{ color: '#fbbf24', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                                            {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{rev.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Write a Review Form */}
                    <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.2rem' }}>Add a Review</h3>
                        <ReviewForm productId={product.id} addProductReview={addProductReview} defaultName={userProfile?.name || ''} />
                    </div>

                </div>

                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.08)', margin: '3rem 0' }} />

                {/* Related Products Carousel */}
                {relatedProducts.length > 0 && (
                    <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>You May Also Like</h2>
                        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                            {relatedProducts.map(p => (
                                <div key={p.id} className="product-card" style={{ padding: '1rem', gap: '0.5rem' }}>
                                    <Link to={`/product/${p.id}`} className="product-image" style={{ aspectRatio: '1.1', display: 'flex', overflow: 'hidden' }}>
                                        <img src={p.image} alt={p.title} className="placeholder" style={{ objectFit: 'cover' }} />
                                    </Link>
                                    <h4 style={{
                                        fontSize: '0.95rem',
                                        fontWeight: 650,
                                        marginTop: '0.5rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        <Link to={`/product/${p.id}`} style={{ color: 'inherit' }}>{p.title}</Link>
                                    </h4>
                                    <p style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>${p.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

function ReviewForm({ productId, addProductReview, defaultName }) {
    const [name, setName] = useState(defaultName || '');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please provide a name.');
            return;
        }
        if (!comment.trim()) {
            setError('Please write a review comment.');
            return;
        }
        setError('');
        addProductReview(productId, { name, rating, comment });
        setSuccess('🎉 Review posted successfully! Thank you.');
        setComment('');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.85rem' }}>
                    {error}
                </div>
            )}
            {success && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.85rem' }}>
                    {success}
                </div>
            )}

            <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                    type="text"
                    required
                    placeholder="E.g. Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Rating (1 to 5 Stars)</label>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.5rem', margin: '0.5rem 0' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: star <= rating ? '#fbbf24' : '#d1d5db',
                                padding: 0
                            }}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Review Comment</label>
                <textarea
                    required
                    placeholder="Share your thoughts about this high-performance device..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-input"
                    rows="4"
                    style={{ resize: 'vertical', minHeight: '80px' }}
                />
            </div>

            <button type="submit" className="form-button" style={{ width: '100%' }}>
                Submit Review
            </button>
        </form>
    );
}

export default ProductDetails;
