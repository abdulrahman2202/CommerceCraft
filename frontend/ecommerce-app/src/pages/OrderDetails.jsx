import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function OrderDetails() {
    const { orderId } = useParams();
    const { orders } = useContext(ShopContext);

    // Local order state for instant simulator values
    const [localOrder, setLocalOrder] = useState(null);

    useEffect(() => {
        const found = orders.find(o => o.id === orderId);
        if (found) {
            setLocalOrder(found);
        }
    }, [orders, orderId]);

    if (!localOrder) {
        return (
            <main className="page-container" style={{ minHeight: '85vh' }}>
                <div className="premium-card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '3rem auto' }}>
                    <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>🔍</span>
                    <h2 className="gradient-title" style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Order Details Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>Could not load the specifications for order reference "{orderId}".</p>
                    <Link to="/orders" className="hero-btn" style={{ padding: '0.8rem 2.5rem', display: 'inline-block', textDecoration: 'none' }}>
                        Back to History
                    </Link>
                </div>
            </main>
        );
    }

    const { id, date, status, items, shippingAddress, financials } = localOrder;

    const handleProgressStatus = () => {
        let nextStatus = 'Processing';
        if (status === 'Processing') nextStatus = 'Shipped';
        else if (status === 'Shipped') nextStatus = 'Delivered';
        else nextStatus = 'Processing';

        setLocalOrder(prev => ({
            ...prev,
            status: nextStatus
        }));

        try {
            const rawOrders = localStorage.getItem('commerce_orders');
            if (rawOrders) {
                const parsed = JSON.parse(rawOrders);
                const edited = parsed.map(o => o.id === id ? { ...o, status: nextStatus } : o);
                localStorage.setItem('commerce_orders', JSON.stringify(edited));
            }
        } catch (e) {
            console.error("Failed to update status in localStorage", e);
        }
    };

    const steps = ['Ordered', 'Processing', 'Shipped', 'Delivered'];

    const getStatusIndex = () => {
        if (status === 'Processing') return 1;
        if (status === 'Shipped') return 2;
        if (status === 'Delivered') return 3;
        return 0;
    };
    const activeIndex = getStatusIndex();

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Back button */}
                <Link
                    to="/orders"
                    style={{
                        textDecoration: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    &larr; Back to Order History
                </Link>

                {/* Cover Header */}
                <div className="premium-card" style={{ margin: '0 0 2rem 0', width: '100%', maxWidth: 'none', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>Order: {id}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
                            Placed on <span style={{ fontWeight: 650, color: 'var(--text-main)' }}>{date}</span>
                        </p>
                    </div>
                    {/* Status Badge & Simulator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            padding: '0.3rem 0.8rem',
                            background: 'rgba(217, 119, 6, 0.08)',
                            border: '1px solid rgba(217, 119, 6, 0.15)',
                            color: 'var(--accent-light)',
                            borderRadius: '999px'
                        }}>
                            Status: {status}
                        </span>

                        <button
                            onClick={handleProgressStatus}
                            className="add-btn"
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                border: '1px dashed var(--accent)',
                                background: 'transparent'
                            }}
                        >
                            ⚙ Simulate Step
                        </button>
                    </div>
                </div>

                {/* Timeline Tracking Section */}
                <div className="premium-card" style={{ margin: '0 0 2rem 0', width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <h3 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                        Delivery Milestone Tracking
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                        {steps.map((step, idx) => {
                            const isCompleted = idx <= activeIndex;
                            const isActive = idx === activeIndex;

                            return (
                                <div key={idx} style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                                    {/* Bullet point */}
                                    <div style={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        borderRadius: '50%',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        marginBottom: '0.75rem',
                                        transition: 'all 0.3s',
                                        background: isActive
                                            ? 'var(--accent)'
                                            : isCompleted
                                                ? 'var(--text-main)'
                                                : 'white',
                                        color: isCompleted ? 'white' : 'var(--text-muted)',
                                        boxShadow: isActive ? '0 0 12px var(--accent-glow)' : 'none'
                                    }}>
                                        {isCompleted ? '✓' : idx + 1}
                                    </div>

                                    {/* Step names */}
                                    <div>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 0.15rem 0', color: isCompleted ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                            {step}
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                            {idx === 0 && 'Confirmed'}
                                            {idx === 1 && 'Warehouse'}
                                            {idx === 2 && 'In Transit'}
                                            {idx === 3 && 'To Mailbox'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Columns */}
                <div className="upload-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>

                    {/* Left: Items list */}
                    <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1.2rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                            Item Details
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderBottom: idx < items.length - 1 ? '1px solid rgba(0,0,0,0.03)' : 'none', paddingBottom: idx < items.length - 1 ? '1.2rem' : 0 }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', overflow: 'hidden', background: 'rgba(0,0,0,0.03)', shrink: 0 }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 0.15rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {item.title}
                                        </h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>${item.price} &times; {item.quantity}</p>
                                    </div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Client Details & Charges */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Customer Info */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                                Recipient Information
                            </h3>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                                <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: '0 0 0.5rem 0' }}>{shippingAddress.name}</p>
                                <p style={{ margin: 0 }}>{shippingAddress.address}</p>
                                <p style={{ margin: 0 }}>{shippingAddress.city}, {shippingAddress.zip}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', marginBottom: 0 }}>
                                    ✉ {shippingAddress.email}
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                                    📞 {shippingAddress.phone}
                                </p>
                            </div>
                        </div>

                        {/* Charges Ledger */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '1.2rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                                Ledger Breakdown
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                    <span style={{ fontWeight: 650 }}>${financials.subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                                    <span style={{ fontWeight: 650 }}>
                                        {financials.shipping === 0 ? 'FREE' : `$${financials.shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Taxes (8%)</span>
                                    <span style={{ fontWeight: 650 }}>${financials.tax.toFixed(2)}</span>
                                </div>
                                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                                    <span>Grand Total</span>
                                    <span style={{ color: 'var(--accent)' }}>${financials.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default OrderDetails;
