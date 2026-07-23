import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function MyOrders() {
    const { orders } = useContext(ShopContext);

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Order History</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Review tracking progress and details of your high-performance hardware orders.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="premium-card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '0 auto' }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>📦</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>No Orders Found</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>You have not completed any purchases on CommerceCraft yet.</p>
                        <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2.5rem', display: 'inline-block', textDecoration: 'none' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {orders.map((order) => {
                            const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0);

                            // Determine status color badge
                            let badgeBg = "rgba(217, 119, 6, 0.08)";
                            let badgeBorder = "rgba(217, 119, 6, 0.15)";
                            let badgeColor = "var(--accent-light)";

                            if (order.status === 'Shipped') {
                                badgeBg = "rgba(59, 130, 246, 0.08)";
                                badgeBorder = "rgba(59, 130, 246, 0.15)";
                                badgeColor = "#3b82f6";
                            }
                            if (order.status === 'Delivered') {
                                badgeBg = "rgba(16, 185, 129, 0.08)";
                                badgeBorder = "rgba(16, 185, 129, 0.15)";
                                badgeColor = "#10b981";
                            }

                            return (
                                <div
                                    key={order.id}
                                    className="premium-card"
                                    style={{
                                        margin: 0,
                                        width: '100%',
                                        maxWidth: 'none',
                                        padding: '1.5rem 2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'between',
                                        flexWrap: 'wrap',
                                        gap: '1.5rem'
                                    }}
                                >
                                    {/* Order Info */}
                                    <div style={{ flex: 1, minWidth: '220px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
                                                {order.id}
                                            </span>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                padding: '0.2rem 0.6rem',
                                                background: badgeBg,
                                                border: `1px solid ${badgeBorder}`,
                                                color: badgeColor,
                                                borderRadius: '999px'
                                            }}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                            <span>Date: <strong style={{ color: 'var(--text-main)' }}>{order.date}</strong></span>
                                            <span>Items: <strong style={{ color: 'var(--text-main)' }}>{totalQty}</strong></span>
                                        </div>
                                    </div>

                                    {/* Order Cost & Action */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2rem',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        minWidth: '220px',
                                        width: 'auto'
                                    }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>Total</span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>
                                                ${order.financials.total.toFixed(2)}
                                            </span>
                                        </div>
                                        <Link
                                            to={`/order/${order.id}`}
                                            className="add-btn"
                                            style={{
                                                padding: '0.6rem 1.5rem',
                                                borderRadius: '0.6rem',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                textDecoration: 'none',
                                                display: 'inline-block'
                                            }}
                                        >
                                            View Details
                                        </Link>
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

export default MyOrders;
