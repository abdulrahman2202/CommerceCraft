import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function OrderSuccess() {
    const { orderId } = useParams();
    const { orders } = useContext(ShopContext);

    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return (
            <main className="page-container" style={{ minHeight: '80vh' }}>
                <div className="premium-card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '3rem auto' }}>
                    <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>🔍</span>
                    <h2 className="gradient-title" style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Order Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>We could not retrieve the details for order reference "{orderId}". It may still be processing.</p>
                    <Link to="/orders" className="hero-btn" style={{ padding: '0.8rem 2.5rem', display: 'inline-block' }}>
                        View My Orders
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Success Banner */}
                <div className="premium-card" style={{ textAlign: 'center', padding: '3rem 2rem', margin: '0 0 2.5rem 0', width: '100%', maxWidth: 'none' }}>
                    <div style={{
                        width: '4.5rem',
                        height: '4.5rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        ✓
                    </div>
                    <h1 className="gradient-title" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Order Confirmed!</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                        Thank you for your order, <span style={{ fontWeight: 650, color: 'var(--text-main)' }}>{order.shippingAddress.name}</span>. Your premium gadgets are already being prepared for shipment.
                    </p>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(217, 119, 6, 0.08)',
                        border: '1px solid rgba(217, 119, 6, 0.15)',
                        color: 'var(--accent-light)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        borderRadius: '999px'
                    }}>
                        Reference: {order.id}
                    </div>
                </div>

                <div className="upload-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>

                    {/* Left: Invoice details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Shipping */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                                Shipping Location
                            </h3>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                                <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: '0 0 0.5rem 0' }}>{order.shippingAddress.name}</p>
                                <p style={{ margin: 0 }}>{order.shippingAddress.address}</p>
                                <p style={{ margin: 0 }}>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', marginBottom: 0 }}>
                                    📞 Cell: {order.shippingAddress.phone}
                                </p>
                            </div>
                        </div>

                        {/* Cart Recap */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                                Selected Devices
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {order.items.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', overflow: 'hidden', background: 'rgba(0,0,0,0.03)', shrink: 0 }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.15rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.title}
                                            </h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Qty: {item.quantity} &times; ${item.price}</p>
                                        </div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right: Summary Ledger & Next Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Cost Ledger */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1.2rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                                Billing Invoice
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                    <span style={{ fontWeight: 650 }}>${order.financials.subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                                    <span style={{ fontWeight: 650 }}>
                                        {order.financials.shipping === 0 ? 'FREE' : `$${order.financials.shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Taxes (8%)</span>
                                    <span style={{ fontWeight: 650 }}>${order.financials.tax.toFixed(2)}</span>
                                </div>
                                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                                    <span>Total Paid</span>
                                    <span style={{ color: 'var(--accent)' }}>${order.financials.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation controls */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link
                                to={`/order/${order.id}`}
                                className="hero-btn"
                                style={{ width: '100%', padding: '1rem', color: 'white', textAlign: 'center', textDecoration: 'none', display: 'block', fontWeight: 700 }}
                            >
                                Track Delivery Status
                            </Link>
                            <Link
                                to="/orders"
                                className="add-btn"
                                style={{
                                    width: '100%',
                                    padding: '0.95rem',
                                    borderRadius: '0.75rem',
                                    textAlign: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    textDecoration: 'none',
                                    display: 'block'
                                }}
                            >
                                View Order History
                            </Link>
                            <Link
                                to="/products"
                                style={{
                                    width: '100%',
                                    padding: '0.95rem',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    display: 'block',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                            >
                                Continue Shopping
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default OrderSuccess;
