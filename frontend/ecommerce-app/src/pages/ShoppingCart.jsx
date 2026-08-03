import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function ShoppingCart() {
    const { cart, products, updateCartQuantity, removeFromCart, clearCart } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent
    const [promoFeedback, setPromoFeedback] = useState('');
    const [checkoutStatus, setCheckoutStatus] = useState(false); // true when order placed

    // Hydrate cart data
    const cartItems = cart.map(item => {
        const prod = products.find(p => p.id === item.id);
        return {
            ...item,
            product: prod
        };
    }).filter(item => item.product !== undefined);

    // Calculate financials
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discountAmount = subtotal * (appliedDiscount / 100);
    const discountedSubtotal = subtotal - discountAmount;
    const shipping = subtotal === 0 ? 0 : (discountedSubtotal > 150 ? 0 : 15);
    const tax = discountedSubtotal * 0.08; // 8% tax
    const total = discountedSubtotal + shipping + tax;

    const handleApplyPromo = (e) => {
        e.preventDefault();
        const code = promoCode.toUpperCase().trim();
        if (code === 'TECHNEW15') {
            setAppliedDiscount(15);
            setPromoFeedback('🎉 15% discount applied successfully!');
        } else if (code === 'FREESHIP') {
            setPromoFeedback('🎉 Promo applied! (Not active, shipping is already free for orders over $150)');
        } else {
            setPromoFeedback('❌ Invalid promotional code.');
        }
    };

    const handleCheckout = () => {
        setCheckoutStatus(true);
        setTimeout(() => {
            clearCart();
        }, 100);
    };

    if (checkoutStatus) {
        return (
            <main className="page-container" style={{ minHeight: '80vh' }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '550px',
                    margin: '3rem auto',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    padding: '3rem 2rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>📦</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Outfit' }}>
                        Order Confirmed!
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                        Thank you for shopping on CommerceCraft. Your high-performance gear is being prepared for dispatch. We have sent a receipt to your registered email.
                    </p>
                    <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2.5rem', display: 'inline-block' }}>
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Shopping Cart</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Review your selection before finalizing your tech upgrade.
                    </p>
                </div>

                {cartItems.length === 0 ? (
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
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🛒</span>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            Your shopping cart is currently empty.
                        </p>
                        <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2rem', display: 'inline-block' }}>
                            View All Products
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        gap: '2.5rem'
                    }} className="upload-grid">

                        {/* Left Side: Items List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '1.2rem',
                                    padding: '1.2rem',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.03)',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {/* Thumbnail */}
                                    <div style={{ width: '80px', height: '80px', borderRadius: '0.8rem', overflow: 'hidden', background: 'rgba(0,0,0,0.03)', flexShrink: 0 }}>
                                        <img src={item.product.image} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    {/* Title/Category */}
                                    <div style={{ flex: '1 1 200px' }}>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 650, margin: '0 0 0.25rem 0' }}>
                                            <Link to={`/product/${item.id}`} style={{ color: 'inherit' }}>{item.product.title}</Link>
                                        </h3>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                                            {item.product.category}
                                        </span>
                                    </div>

                                    {/* Price & Quantity Contols */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', minWidth: '70px' }}>
                                            ${item.product.price}
                                        </div>

                                        {/* Counter */}
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '0.6rem', overflow: 'hidden', background: 'white' }}>
                                            <button
                                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                style={{ border: 'none', background: 'transparent', width: '2rem', height: '2rem', cursor: 'pointer', fontWeight: 'bold' }}
                                            >-</button>
                                            <span style={{ width: '2rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                style={{ border: 'none', background: 'transparent', width: '2rem', height: '2rem', cursor: 'pointer', fontWeight: 'bold' }}
                                            >+</button>
                                        </div>

                                        {/* Subtotal of item */}
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', minWidth: '85px', textAlign: 'right' }}>
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>

                                        {/* Delete Action */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                fontSize: '1.2rem',
                                                cursor: 'pointer',
                                                color: '#64748b',
                                                padding: '0.5rem',
                                                transition: 'color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                                            onMouseLeave={(e) => e.target.style.color = '#64748b'}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Side: Invoice Calculator */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'fit-content' }}>
                            <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Order Summary</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                        <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                                    </div>

                                    {appliedDiscount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                                            <span>Discount ({appliedDiscount}%)</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                                        <span style={{ fontWeight: 600 }}>
                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (8%)</span>
                                        <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
                                    </div>
                                    <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                                        <span>Total</span>
                                        <span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Promo Code Box */}
                                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Promo code (e.g. TECHNEW15)"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: '0.6rem 0.8rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            outline: 'none',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                    <button type="submit" style={{
                                        background: 'var(--text-main)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}>Apply</button>
                                </form>

                                {promoFeedback && (
                                    <div style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        color: promoFeedback.startsWith('🎉') ? '#10b981' : '#ef4444',
                                        marginBottom: '1.5rem'
                                    }}>{promoFeedback}</div>
                                )}

                                <Link
                                    to="/checkout"
                                    className="form-button"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        fontWeight: 700,
                                        display: 'block',
                                        textAlign: 'center',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Proceed to Checkout
                                </Link>

                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem', lineHeight: '1.4' }}>
                                    🔒 Safe & Secure Checkout. Free delivery on orders over $150.
                                </p>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </main>
    );
}

export default ShoppingCart;
