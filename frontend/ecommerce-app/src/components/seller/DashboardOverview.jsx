import React from 'react';

function DashboardOverview({ activeSubTab, notifications, setNotifications, orders }) {
    // Basic stats calculations
    const totalSales = orders.reduce((sum, o) => o.status === 'Completed' || o.status === 'Shipped' ? sum + o.total : sum, 0);
    const activeOrderCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

    const renderDashboard = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stat Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Sales</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>${totalSales.toLocaleString()}</div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem', fontWeight: 600 }}>&uarr; 12.4% vs last month</div>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Active Orders</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{activeOrderCount}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Requires shipping fulfillment</div>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Store views</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ec4899' }}>9,842</div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem', fontWeight: 600 }}>&uarr; 8.2% new visitors</div>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Conversion Rate</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>2.45%</div>
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: 600 }}>&darr; 0.3% checkout drops</div>
                </div>
            </div>

            {/* Simulated mini chart & Quick Orders Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Custom SVG Sales Chart */}
                <div className="premium-card" style={{ margin: 0, padding: '1.8rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Weekly Revenue Trend</h3>
                    <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                        <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            {/* Gridlines */}
                            <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(0,0,0,0.05)" strokeDasharray="4" />
                            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(0,0,0,0.05)" strokeDasharray="4" />
                            <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(0,0,0,0.05)" strokeDasharray="4" />

                            {/* Gradient Fill */}
                            <path d="M 0 150 Q 80 40 160 110 T 320 50 T 480 30 L 485 150 Z" fill="url(#chartGrad)" />

                            {/* Chart Line */}
                            <path d="M 0 150 Q 80 40 160 110 T 320 50 T 480 30" fill="none" stroke="var(--accent)" strokeWidth="3" />

                            {/* Hotspots */}
                            <circle cx="160" cy="110" r="5" fill="white" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="320" cy="50" r="5" fill="white" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="480" cy="30" r="5" fill="white" stroke="var(--accent)" strokeWidth="2" />
                        </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                        <span>Sun</span>
                    </div>
                </div>

                {/* Quick Orders List */}
                <div className="premium-card" style={{ margin: 0, padding: '1.8rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Recent Orders</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {orders.slice(0, 3).map(order => (
                            <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <div>
                                    <div style={{ fontWeight: 650, fontSize: '0.9rem', color: 'var(--text-main)' }}>{order.customer}</div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.id} | {order.date}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>${order.total}</div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: 700,
                                        background: order.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: order.status === 'Completed' ? '#10b981' : '#f59e0b',
                                        display: 'inline-block'
                                    }}>{order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Detailed Analytics</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Audit merchant traffic conversion rates and customer demographics trends.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.5rem' }}>Sales Distribution by Category</h3>
                    {/* Visual custom progress bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                <span>Mechanical Keyboards</span>
                                <span>58%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '58%', height: '100%', background: 'var(--accent)' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                <span>Audiophile Headphones</span>
                                <span>27%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '27%', height: '100%', background: '#10b981' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                <span>Deskpads & Accessories</span>
                                <span>15%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '15%', height: '100%', background: '#f59e0b' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.5rem' }}>User Source Channels</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                <span>Organic Search Queries</span>
                                <span>42%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '42%', height: '100%', background: '#ec4899' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                <span>Direct Traffic URL</span>
                                <span>35%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '35%', height: '100%', background: '#6366f1' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                <span>Social Communities (Reddit)</span>
                                <span>23%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '23%', height: '100%', background: '#14b8a6' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>System Alerts</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time updates regarding product sales, payout reviews, and client inquiries.</p>
                </div>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                        style={{ border: 'none', background: 'transparent', color: 'var(--accent)', fontWeight: 650, cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                        Mark all read
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                        <span>Empty inbox. All alerts reviewed.</span>
                    </div>
                ) : (
                    notifications.map(n => (
                        <div
                            key={n.id}
                            style={{
                                display: 'flex',
                                gap: '1.2rem',
                                padding: '1.2rem',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(0,0,0,0.05)',
                                background: n.read ? 'rgba(255,255,255,0.4)' : 'rgba(var(--accent-rgb), 0.04)',
                                position: 'relative'
                            }}
                        >
                            {!n.read && (
                                <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', position: 'absolute', top: '1.5rem', right: '1.5rem' }} />
                            )}
                            <div style={{ fontSize: '1.5rem' }}>
                                {n.type === 'order' && '🛒'}
                                {n.type === 'stock' && '⚠️'}
                                {n.type === 'payout' && '💰'}
                                {n.type === 'support' && '🙋'}
                            </div>
                            <div>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 650, fontSize: '0.95rem', color: 'var(--text-main)' }}>{n.title}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{n.body}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const allowed = ['dashboard', 'analytics', 'notifications'];
    if (!allowed.includes(activeSubTab)) return null;

    switch (activeSubTab) {
        case 'dashboard':
            return renderDashboard();
        case 'analytics':
            return renderAnalytics();
        case 'notifications':
            return renderNotifications();
        default:
            return null;
    }
}

export default DashboardOverview;
