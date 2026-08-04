import React from 'react';

function AdminOverview({ activeSubTab, setActiveSubTab, productsList, sellersList, usersList, ordersList }) {
    if (activeSubTab !== 'dashboard' && activeSubTab !== 'analytics') return null;

    // Derived quick stats calculations
    const totalSales = ordersList.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0);
    const activeUsers = usersList.filter(u => u.status === 'Active').length;
    const activeSellers = sellersList.filter(s => s.status === 'Verified').length;
    const approvedProducts = productsList.filter(p => p.status === 'Approved').length;
    const systemCommission = totalSales * 0.08; // 8% commission

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Dashboard Title & Quick Header */}
            <div>
                <h1 className="gradient-title" style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                    {activeSubTab === 'dashboard' ? 'Administrative Desk' : 'System Performance Insights'}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, textAlign: 'left' }}>
                    {activeSubTab === 'dashboard'
                        ? 'Real-time overview of CommerceCraft core engagement metrics.'
                        : 'Granular statistics covering platform invoices growth, listings auditing, and server telemetry.'}
                </p>
            </div>

            {/* Quick Stats Grid Widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>Platform Gross volume</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                        ${totalSales.toFixed(2)}
                    </h2>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>↑ +14.2% today</span>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>System Commission</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>
                        ${systemCommission.toFixed(2)}
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>8% flat rate ledger cut</span>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>Member Base</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                        {usersList.length} Accounts
                    </h2>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700 }}>{activeUsers} active sessions</span>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>Active Listings</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                        {approvedProducts} Items
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{activeSellers} verified firms</span>
                </div>

            </div>

            {/* Central Dashboard visual cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1.3fr)', gap: '1.5rem', flexWrap: 'wrap' }}>

                {/* SVG Visual Sales Chart Card */}
                <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Transaction Volume Trend Scale</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>July 2026</span>
                    </div>

                    <div style={{ position: 'relative', width: '100%', height: '220px', background: 'rgba(0,0,0,0.01)', borderRadius: '0.5rem', padding: '10px' }}>
                        <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }}>
                            {/* Grid helper lines */}
                            <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(0,0,0,0.05)" strokeDasharray="4 4" />
                            <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(0,0,0,0.05)" strokeDasharray="4 4" />
                            <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(0,0,0,0.05)" strokeDasharray="4 4" />
                            <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(0,0,0,0.15)" />

                            {/* Line graph curve */}
                            <polyline
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points="40,160 100,120 160,110 220,130 280,70 340,90 400,45 460,35"
                            />

                            {/* Points highlighting */}
                            <circle cx="40" cy="160" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="100" cy="120" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="160" cy="110" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="220" cy="130" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="280" cy="70" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="340" cy="90" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="400" cy="45" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />
                            <circle cx="460" cy="35" r="5" fill="var(--text-main)" stroke="var(--accent)" strokeWidth="2" />

                            {/* Label scales */}
                            <text x="40" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/21</text>
                            <text x="100" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/22</text>
                            <text x="160" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/23</text>
                            <text x="220" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/24</text>
                            <text x="280" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/25</text>
                            <text x="340" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/26</text>
                            <text x="400" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">07/27</text>
                            <text x="460" y="195" fontSize="9" fill="var(--text-muted)" textAnchor="middle">Today</text>

                            <text x="25" y="24" fontSize="9" fill="var(--text-muted)" textAnchor="end">$2.0k</text>
                            <text x="25" y="84" fontSize="9" fill="var(--text-muted)" textAnchor="end">$1.0k</text>
                            <text x="25" y="144" fontSize="9" fill="var(--text-muted)" textAnchor="end">$500</text>
                            <text x="25" y="184" fontSize="9" fill="var(--text-muted)" textAnchor="end">$0</text>
                        </svg>
                    </div>
                </div>

                {/* Categories share chart */}
                <div className="premium-card" style={{ margin: 0, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Product Shares by Category</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                                    <span>Mechanical Keyboards</span>
                                    <span>40%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '40%', height: '100%', background: 'var(--accent)' }}></div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                                    <span>Headphones & DACs</span>
                                    <span>20%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '20%', height: '100%', background: '#3b82f6' }}></div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                                    <span>Acoustic Accessories</span>
                                    <span>30%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '30%', height: '100%', background: '#10b981' }}></div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                                    <span>Deskpads & Mats</span>
                                    <span>10%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '10%', height: '100%', background: '#8b5cf6' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Additional details for Analytics tab page */}
            {activeSubTab === 'analytics' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.2rem' }}>Administrative Hub Telemetry</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Console Session SSL:</span>
                                <span style={{ fontWeight: 700, color: '#10b981' }}>Secure 256bit TLS</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Average Server Response:</span>
                                <span style={{ fontWeight: 700 }}>42ms</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Database Query Speed:</span>
                                <span style={{ fontWeight: 700 }}>1.2ms (indexed cache)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Monthly Active Traffic:</span>
                                <span style={{ fontWeight: 700, color: 'var(--accent)' }}>44.9k visitors</span>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.2rem' }}>Sales Share Breakdown</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Seller-fulfilled Sales:</span>
                                <span style={{ fontWeight: 700 }}>$360.48</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Refund/Chargeback Ratio:</span>
                                <span style={{ fontWeight: 700, color: '#ef4444' }}>0.0%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Average Basket Order Item:</span>
                                <span style={{ fontWeight: 700 }}>$130.12</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Coupons Redemptions:</span>
                                <span style={{ fontWeight: 700 }}>54 orders</span>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default AdminOverview;
