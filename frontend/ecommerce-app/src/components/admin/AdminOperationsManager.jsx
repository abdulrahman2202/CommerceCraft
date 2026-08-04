import React, { useState } from 'react';

function AdminOperationsManager({
    activeSubTab,
    setActiveSubTab,
    ordersList,
    setOrdersList,
    selectedOrderId,
    setSelectedOrderId,
    reviewsList,
    setReviewsList,
    couponsList,
    setCouponsList,
    bannerConfig,
    setBannerConfig,
    cmsPages,
    setCmsPages,
    addActivityLog
}) {
    // Return early if not targeting operations tabs
    const validTabs = ['orders', 'order_details', 'reviews', 'coupons', 'banners', 'cms', 'reports'];
    if (!validTabs.includes(activeSubTab)) return null;

    const selectedOrder = ordersList.find(o => o.id === selectedOrderId) || ordersList[0];

    const [newCoupon, setNewCoupon] = useState({ code: '', discount: 15, limit: 100, expiry: '12/31/2026' });
    const [selectedCmsId, setSelectedCmsId] = useState(cmsPages[0]?.id || '');
    const [cmsContent, setCmsContent] = useState(cmsPages[0]?.content || '');

    // Handle order status override
    const handleUpdateOrderStatus = (orderId, nextStatus) => {
        setOrdersList(prev => prev.map(o => {
            if (o.id === orderId) {
                addActivityLog(`Audited invoice status of order ${orderId} to ${nextStatus}`, 'Orders');
                return { ...o, status: nextStatus };
            }
            return o;
        }));
    };

    // Review moderation approval / flagging
    const handleToggleReviewStatus = (reviewId, nextStatus) => {
        setReviewsList(prev => prev.map(r => {
            if (r.id === reviewId) {
                addActivityLog(`Reviewed status of feedback comment ID ${reviewId} to ${nextStatus}`, 'Reviews');
                return { ...r, status: nextStatus };
            }
            return r;
        }));
    };

    // Review moderation deletion
    const handleDeleteReview = (reviewId) => {
        setReviewsList(prev => prev.filter(r => r.id !== reviewId));
        addActivityLog(`Moderated and deleted review feedback comment ID ${reviewId}`, 'Reviews');
    };

    // Add promo code
    const handleAddCoupon = (e) => {
        e.preventDefault();
        if (!newCoupon.code.trim()) return;
        const codeUpper = newCoupon.code.trim().toUpperCase();
        if (couponsList.some(c => c.code === codeUpper)) return;

        const couponItem = {
            code: codeUpper,
            discount: Number(newCoupon.discount),
            limit: Number(newCoupon.limit),
            used: 0,
            expiry: newCoupon.expiry,
            status: 'Active'
        };

        setCouponsList(prev => [couponItem, ...prev]);
        addActivityLog(`Created promo discount coupon code: ${codeUpper}`, 'Coupons');
        setNewCoupon({ code: '', discount: 15, limit: 100, expiry: '12/31/2026' });
    };

    // Save banner configuration details
    const handleSaveBanner = (e) => {
        e.preventDefault();
        addActivityLog(`Modified homepage advertising layout banner settings`, 'Banners');
        alert('🎉 Banners configurations registered in live layouts cache!');
    };

    // Save CMS content changes
    const handleSaveCms = (e) => {
        e.preventDefault();
        setCmsPages(prev => prev.map(p => {
            if (p.id === selectedCmsId) {
                return { ...p, content: cmsContent, lastUpdated: new Date().toLocaleDateString() };
            }
            return p;
        }));
        addActivityLog(`Modified Content Management documents: ${selectedCmsId}`, 'CMS');
        alert('🎉 CMS Markdown cached successfully.');
    };

    // Mock reports downloader
    const handleDownloadReport = (format) => {
        addActivityLog(`Generated system financials analysis in ${format} format`, 'Reports');
        alert(`🎉 Generating platform report audit. File downloaded as CommerceCraft_Audit.${format}`);
    };

    return (
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* 1. Orders Index */}
            {activeSubTab === 'orders' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Platform Financial Invoices</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Review customer shipping logistics status, payment tracking references, invoices total costs.</p>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0.75rem 1rem' }}>Order ID</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Shopper Client</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Items List</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Total cost</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Gateway Method</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Checkout Date</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Fulfillment stage</th>
                                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((ord) => (
                                    <tr key={ord.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={{ padding: '1.05rem 1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{ord.id}</td>
                                        <td style={{ padding: '1.05rem 1rem', fontWeight: 650 }}>{ord.customer}</td>
                                        <td style={{ padding: '1.05rem 1rem', color: 'var(--text-muted)' }}>{ord.items.join(', ')}</td>
                                        <td style={{ padding: '1.05rem 1rem', fontWeight: 750 }}>${ord.total.toFixed(2)}</td>
                                        <td style={{ padding: '1.05rem 1rem' }}>💳 {ord.payment}</td>
                                        <td style={{ padding: '1.05rem 1rem' }}>{ord.date}</td>
                                        <td style={{ padding: '1.05rem 1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                background: ord.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : ord.status === 'Shipped' ? 'rgba(59, 130, 246, 0.1)' : ord.status === 'Processing' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: ord.status === 'Delivered' ? '#10b981' : ord.status === 'Shipped' ? '#3b82f6' : ord.status === 'Processing' ? '#f59e0b' : '#ef4444',
                                                border: '1px solid currentColor'
                                            }}>{ord.status}</span>
                                        </td>
                                        <td style={{ padding: '1.05rem 1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => {
                                                    setSelectedOrderId(ord.id);
                                                    setActiveSubTab('order_details');
                                                }}
                                                className="add-btn"
                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                                            >
                                                Invoice Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 2. Order Details */}
            {activeSubTab === 'order_details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <button
                        onClick={() => setActiveSubTab('orders')}
                        className="add-btn"
                        style={{ padding: '0.5rem 1rem', width: 'fit-content', border: '1px solid var(--text-muted)', color: 'var(--text-muted)' }}
                    >
                        &larr; Return to Invoices Index
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                        <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                Customer Order Breakdown ({selectedOrder.id})
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Client Account Name</span>
                                    <span style={{ fontWeight: 650 }}>{selectedOrder.customer}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Purchased Item List</span>
                                    <span style={{ fontWeight: 'bold' }}>{selectedOrder.items.join(', ')}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Gateway Reference</span>
                                    <span>{selectedOrder.payment} - Transaction Verified</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Shipment Carrier Tracking ID</span>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{selectedOrder.tracking || 'Pending Registration'}</span>
                                </div>
                                <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Valuation charges</span>
                                    <span style={{ fontWeight: 850, fontSize: '1.1rem', color: 'var(--accent)' }}>${selectedOrder.total.toFixed(2)} USD</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Actions */}
                        <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 750, marginBottom: '1.2rem' }}>Modify Fulfillment Status</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Change Logistics State</label>
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                                        className="form-input"
                                        style={{ padding: '0.6rem' }}
                                    >
                                        <option value="Processing">Processing Stage</option>
                                        <option value="Shipped">Dispatched / Shipped</option>
                                        <option value="Delivered">Delivered Successfully</option>
                                        <option value="Cancelled">Cancelled Invoice</option>
                                    </select>
                                </div>

                                {selectedOrder.status === 'Shipped' && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <label className="form-label" style={{ fontSize: '0.7rem' }}>Tracking ID</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={selectedOrder.tracking || 'TRK-908122'}
                                            style={{ padding: '0.5rem', fontFamily: 'monospace' }}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setOrdersList(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, tracking: val } : o));
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* 3. Review Moderation */}
            {activeSubTab === 'reviews' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Moderation Desk - User Reviews</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Review, audit, approve or flag reviews posted for keyboard hardware and transcripts.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {reviewsList.map((rev) => (
                            <div
                                key={rev.id}
                                style={{
                                    padding: '1.2rem',
                                    borderRadius: '0.8rem',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    background: 'rgba(255,255,255,0.4)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '1.5rem'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>{rev.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                                        <span style={{
                                            padding: '0.1rem 0.4rem',
                                            borderRadius: '0.2rem',
                                            fontSize: '0.65rem',
                                            fontWeight: 800,
                                            background: rev.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: rev.status === 'Approved' ? '#10b981' : '#ef4444'
                                        }}>{rev.status}</span>
                                    </div>
                                    <span style={{ color: 'var(--accent)', fontWeight: 700, display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                        {'⭐'.repeat(rev.rating)} | {rev.product}
                                    </span>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', fontStyle: 'italic' }}>
                                        "{rev.comment}"
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {rev.status !== 'Approved' && (
                                        <button
                                            onClick={() => handleToggleReviewStatus(rev.id, 'Approved')}
                                            className="form-button"
                                            style={{ padding: '0.35rem 0.75rem', width: 'auto', background: '#10b981', color: 'white', fontSize: '0.75rem' }}
                                        >
                                            Approve Review
                                        </button>
                                    )}
                                    {rev.status !== 'Flagged' && (
                                        <button
                                            onClick={() => handleToggleReviewStatus(rev.id, 'Flagged')}
                                            className="form-button"
                                            style={{ padding: '0.35rem 0.75rem', width: 'auto', background: '#f59e0b', color: 'white', fontSize: '0.75rem' }}
                                        >
                                            Flag Abuse
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteReview(rev.id)}
                                        className="form-button"
                                        style={{ padding: '0.35rem 0.75rem', width: 'auto', background: '#ef4444', color: 'white', fontSize: '0.75rem' }}
                                    >
                                        Delete Post
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. Promotional Coupons */}
            {activeSubTab === 'coupons' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)', gap: '1.5rem', flexWrap: 'wrap' }}>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Active Promo discount codes</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {couponsList.map((cp) => (
                                <div
                                    key={cp.code}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.64rem',
                                        background: 'rgba(255,255,255,0.4)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--accent)' }}>{cp.code}</span>
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expires: {cp.expiry} | Limit: {cp.used}/{cp.limit} uses</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontWeight: 800, display: 'block' }}>{cp.discount}% DISCOUNT</span>
                                        <span style={{
                                            fontSize: '0.65rem',
                                            fontWeight: 700,
                                            color: cp.status === 'Active' ? '#10b981' : '#ef4444'
                                        }}>{cp.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Generate Coupon</h3>

                        <form onSubmit={handleAddCoupon}>
                            <div className="form-group">
                                <label className="form-label">Discount Coupon Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. LABOFFER"
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                                    <label className="form-label">Discount Percentage</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        max="100"
                                        value={newCoupon.discount}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                                    <label className="form-label">Usage limit count</label>
                                    <input
                                        type="number"
                                        required
                                        min="5"
                                        value={newCoupon.limit}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, limit: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="form-button" style={{ background: 'var(--text-main)', color: 'white' }}>
                                Generate Promo rules
                            </button>
                        </form>
                    </div>

                </div>
            )}

            {/* 5. Banner Management */}
            {activeSubTab === 'banners' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Marketing & Banner Configurations</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Configure advertising headers and active splash screens for landing pages.</p>
                    </div>

                    <form onSubmit={handleSaveBanner} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>
                            <div className="form-group">
                                <label className="form-label">Main Heading text</label>
                                <input
                                    type="text"
                                    required
                                    value={bannerConfig.title}
                                    onChange={(e) => setBannerConfig({ ...bannerConfig, title: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description sub-text</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={bannerConfig.subtitle}
                                    onChange={(e) => setBannerConfig({ ...bannerConfig, subtitle: e.target.value })}
                                    className="form-input"
                                    style={{ fontFamily: 'inherit', resize: 'vertical' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                                    <label className="form-label">Action Link Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={bannerConfig.linkUrl}
                                        onChange={(e) => setBannerConfig({ ...bannerConfig, linkUrl: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                                    <label className="form-label">Action text</label>
                                    <input
                                        type="text"
                                        required
                                        value={bannerConfig.buttonText}
                                        onChange={(e) => setBannerConfig({ ...bannerConfig, buttonText: e.target.value })}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="form-button" style={{ background: '#10b981', color: 'white', fontWeight: 800 }}>
                                Update Advertising Layout
                            </button>
                        </div>

                        <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>Homepage layout preview</span>
                            <div style={{
                                position: 'relative',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                aspectRatio: '16/10',
                                border: '1px solid var(--accent)',
                                background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${bannerConfig.imageUrl}) center/cover`
                            }}>
                                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: 'white' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800 }}>{bannerConfig.title}</h4>
                                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.75rem', opacity: 0.85 }}>{bannerConfig.subtitle}</p>
                                    <span style={{ padding: '0.4rem 1rem', borderRadius: '2rem', background: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700 }}>{bannerConfig.buttonText}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* 6. CMS Editing */}
            {activeSubTab === 'cms' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Content Management System (CMS)</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Edit landing page declarations, legal notices, help FAQ templates.</p>
                    </div>

                    <form onSubmit={handleSaveCms} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 200px' }}>
                                <label className="form-label">Select Document Page</label>
                                <select
                                    value={selectedCmsId}
                                    onChange={(e) => {
                                        const docId = e.target.value;
                                        setSelectedCmsId(docId);
                                        const found = cmsPages.find(p => p.id === docId);
                                        setCmsContent(found ? found.content : '');
                                    }}
                                    className="form-input"
                                    style={{ padding: '0.6rem' }}
                                >
                                    {cmsPages.map(p => (
                                        <option key={p.id} value={p.id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'flex-end' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Last Modified: {cmsPages.find(p => p.id === selectedCmsId)?.lastUpdated}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Document Content</label>
                            <textarea
                                required
                                rows="12"
                                value={cmsContent}
                                onChange={(e) => setCmsContent(e.target.value)}
                                className="form-input"
                                style={{ fontFamily: 'monospace', fontSize: '0.9rem', resize: 'vertical' }}
                            />
                        </div>

                        <button type="submit" className="form-button" style={{ background: 'var(--text-main)', color: 'white' }}>
                            Save CMS Document Markdown
                        </button>
                    </form>
                </div>
            )}

            {/* 7. Reports Download */}
            {activeSubTab === 'reports' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Ledger Analytics Reports</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>On-demand query compilation filters. Export data directly into CSV or JSON formats.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>

                        <div style={{ padding: '1.5rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>📊</div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Financial ledger spreadsheet</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>All orders, system commissions cuts, refunded entries, and payout transaction details.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                <button onClick={() => handleDownloadReport('CSV')} className="add-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Export CSV</button>
                                <button onClick={() => handleDownloadReport('JSON')} className="add-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: 'var(--text-main)', color: 'var(--text-main)' }}>Export JSON</button>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>📦</div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Catalog Inventory audits</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Supplier names, categories volumes, active catalog items with quantity status counts.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                <button onClick={() => handleDownloadReport('CSV')} className="add-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Export CSV</button>
                                <button onClick={() => handleDownloadReport('JSON')} className="add-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: 'var(--text-main)', color: 'var(--text-main)' }}>Export JSON</button>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>👥</div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Shoppers & Users Database</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Customer names profiles, email addresses, order histories, registration dates, active permissions.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                <button onClick={() => handleDownloadReport('CSV')} className="add-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Export CSV</button>
                                <button onClick={() => handleDownloadReport('JSON')} className="add-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderColor: 'var(--text-main)', color: 'var(--text-main)' }}>Export JSON</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminOperationsManager;
