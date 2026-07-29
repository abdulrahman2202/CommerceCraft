import React, { useState } from 'react';

function OrdersManager({
    activeSubTab,
    setActiveSubTab,
    orders,
    setOrders,
    selectedOrderId,
    setSelectedOrderId,
    reviews,
    setReviews,
    customers
}) {
    const [reviewReplies, setReviewReplies] = useState({});
    const [replyText, setReplyText] = useState({});

    // Details of selected order
    const selectedOrder = orders.find(o => o.id === selectedOrderId);

    const handleOrderStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const handlePostReviewReply = (reviewId) => {
        const text = replyText[reviewId]?.trim();
        if (!text) return;

        setReviewReplies({ ...reviewReplies, [reviewId]: text });
        setReplyText({ ...replyText, [reviewId]: '' });
    };

    const renderOrdersList = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Active Client Invoices</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Track buyer payments, shipments fulfillment, and details status logs.</p>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Order UUID</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Customer</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Value</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Fulfillment</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 650 }}>{o.id}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{o.customer}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{o.date}</td>
                                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 650 }}>${o.total}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <select
                                        value={o.status}
                                        onChange={(e) => handleOrderStatusChange(o.id, e.target.value)}
                                        style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid rgba(0,0,0,0.06)',
                                            fontSize: '0.8rem',
                                            fontWeight: 650,
                                            background: o.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : o.status === 'Pending' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: o.status === 'Completed' ? '#10b981' : o.status === 'Pending' ? '#ef4444' : '#f59e0b',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                                    <button
                                        onClick={() => { setSelectedOrderId(o.id); setActiveSubTab('order_details'); }}
                                        style={{
                                            border: 'none',
                                            background: 'rgba(0,0,0,0.04)',
                                            padding: '0.4rem 0.75rem',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderOrderDetails = () => {
        if (!selectedOrder) return <div style={{ padding: '2rem' }}>Order details not found.</div>;
        return (
            <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
                <button onClick={() => setActiveSubTab('orders')} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 650, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    &larr; Return to Orders
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Invoice: {selectedOrder.id}</h2>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Created on: {selectedOrder.date}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            background: selectedOrder.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: selectedOrder.status === 'Completed' ? '#10b981' : '#f59e0b'
                        }}>
                            {selectedOrder.status}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Delivery Address</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                            {selectedOrder.customer}<br />
                            7921 Acoustic Station Blvd, Terminal #4A<br />
                            Silicon Valley, CA 94025<br />
                            United States
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Billing Information</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                            Method: Card Terminal Verification (Visa ending in 9081)<br />
                            VAT Code: 99-880-Z<br />
                            Status: Paid & Settled
                        </p>
                    </div>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 750, marginBottom: '1rem' }}>Items Bought</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    {selectedOrder.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item}</span>
                            <span style={{ color: 'var(--text-muted)', fontWeight: 650 }}>x1 Unit</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                            <span>Subtotal:</span>
                            <span>${(selectedOrder.total - 15).toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                            <span>Shipping fee:</span>
                            <span>$15.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 750, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.5rem', color: 'var(--text-main)', fontSize: '1.05rem' }}>
                            <span>Total Invoice:</span>
                            <span>${selectedOrder.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderCustomers = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Client Directory</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Audit buyer profiles lifetime transactions value metrics (LTV).</p>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Customer Profile</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Total Orders</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Lifetime LTV</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Last Order Date</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c.email} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <div style={{ fontWeight: 650 }}>{c.name}</div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.email}</span>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{c.ordersCount} purchase transactions</td>
                                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 650 }}>${c.totalSpent}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{c.lastOrder}</td>
                                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                                    <a
                                        href={`mailto:${c.email}`}
                                        style={{
                                            textDecoration: 'none',
                                            background: 'rgba(0,0,0,0.04)',
                                            padding: '0.4rem 0.75rem',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.8rem',
                                            color: 'var(--text-main)',
                                            fontWeight: 600
                                        }}
                                    >
                                        Send Mail
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderReviews = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Store Product Reviews</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Review average star ratings, customer feedbacks, and write answers.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {reviews.map(r => (
                    <div
                        key={r.id}
                        style={{
                            padding: '1.25rem',
                            border: '1px solid rgba(0,0,0,0.05)',
                            background: 'rgba(255,255,255,0.4)',
                            borderRadius: '0.75rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <span style={{ fontWeight: 650, fontSize: '0.95rem' }}>{r.name}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>on {r.product}</span>
                            </div>
                            <div style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: 700 }}>
                                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                            </div>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem 0', lineHeight: '1.5' }}>
                            "{r.comment}"
                        </p>

                        {/* Reply block */}
                        {reviewReplies[r.id] ? (
                            <div style={{ background: 'rgba(0,0,0,0.02)', padding: '0.75rem 1rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--accent)', fontSize: '0.85rem' }}>
                                <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Your Response:</span>
                                <span style={{ color: 'var(--text-muted)' }}>{reviewReplies[r.id]}</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Write response copy..."
                                    value={replyText[r.id] || ''}
                                    onChange={(e) => setReplyText({ ...replyText, [r.id]: e.target.value })}
                                    style={{ flex: 1, padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.08)' }}
                                />
                                <button
                                    onClick={() => handlePostReviewReply(r.id)}
                                    style={{
                                        border: 'none',
                                        background: 'var(--text-main)',
                                        color: 'white',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Reply
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const allowed = ['orders', 'order_details', 'customers', 'reviews'];
    if (!allowed.includes(activeSubTab)) return null;

    switch (activeSubTab) {
        case 'orders':
            return renderOrdersList();
        case 'order_details':
            return renderOrderDetails();
        case 'customers':
            return renderCustomers();
        case 'reviews':
            return renderReviews();
        default:
            return null;
    }
}

export default OrdersManager;
