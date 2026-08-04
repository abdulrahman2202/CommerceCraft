import React, { useState } from 'react';

function AdminMerchantManager({
    activeSubTab,
    setActiveSubTab,
    sellersList,
    setSellersList,
    selectedSellerId,
    setSelectedSellerId,
    productsList,
    setProductsList,
    selectedProductId,
    setSelectedProductId,
    categoriesList,
    setCategoriesList,
    brandsList,
    setBrandsList,
    addActivityLog
}) {
    // Return early if not targeting merchant/catalog tabs
    const validTabs = ['sellers', 'seller_details', 'products', 'product_details', 'categories', 'brands'];
    if (!validTabs.includes(activeSubTab)) return null;

    const selectedSeller = sellersList.find(s => s.id === selectedSellerId) || sellersList[0];
    const selectedProduct = productsList.find(p => p.id === selectedProductId) || productsList[0];

    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');

    // Toggle seller status
    const handleToggleSellerStatus = (sellerId) => {
        setSellersList(prev => prev.map(s => {
            if (s.id === sellerId) {
                const nextStatus = s.status === 'Verified' ? 'Suspended' : 'Verified';
                addActivityLog(`Modified verification credentials for seller ${s.company} to ${nextStatus}`, 'Sellers');
                return { ...s, status: nextStatus };
            }
            return s;
        }));
    };

    // Modify product status
    const handleChangeProductStatus = (productId, nextStatus) => {
        setProductsList(prev => prev.map(p => {
            if (p.id === productId) {
                addActivityLog(`Audited product status of ${p.name} to ${nextStatus}`, 'Products');
                return { ...p, status: nextStatus };
            }
            return p;
        }));
    };

    // Add category function
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        const trimmed = newCategory.trim();
        if (categoriesList.includes(trimmed)) return;
        setCategoriesList(prev => [...prev, trimmed]);
        addActivityLog(`Registered new category descriptor: ${trimmed}`, 'Categories');
        setNewCategory('');
    };

    // Add brand function
    const handleAddBrand = (e) => {
        e.preventDefault();
        if (!newBrand.trim()) return;
        const trimmed = newBrand.trim();
        if (brandsList.includes(trimmed)) return;
        setBrandsList(prev => [...prev, trimmed]);
        addActivityLog(`Registered new trademark brand key: ${trimmed}`, 'Brands');
        setNewBrand('');
    };

    return (
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* 1. Sellers List View */}
            {activeSubTab === 'sellers' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Corporate Merchants Database</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Onboarded companies supplying mechanical input controls and hardware.</p>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0.75rem 1rem' }}>Merchant ID</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Trading Title</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Owner</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Active Listings</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellersList.map((sel) => (
                                    <tr key={sel.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={{ padding: '1.05rem 1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{sel.id}</td>
                                        <td style={{ padding: '1.05rem 1rem', fontWeight: 650 }}>{sel.company}</td>
                                        <td style={{ padding: '1.05rem 1rem', color: 'var(--text-muted)' }}>{sel.owner}</td>
                                        <td style={{ padding: '1.05rem 1rem', fontWeight: 700 }}>⭐ {sel.rating}</td>
                                        <td style={{ padding: '1.05rem 1rem' }}>{sel.productsCount} items</td>
                                        <td style={{ padding: '1.05rem 1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                background: sel.status === 'Verified' ? 'rgba(16, 185, 129, 0.1)' : sel.status === 'Suspended' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: sel.status === 'Verified' ? '#10b981' : sel.status === 'Suspended' ? '#ef4444' : '#f59e0b',
                                                border: '1px solid currentColor'
                                            }}>
                                                {sel.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.05rem 1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => {
                                                    setSelectedSellerId(sel.id);
                                                    setActiveSubTab('seller_details');
                                                }}
                                                className="add-btn"
                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                                            >
                                                Inspect details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 2. Seller Details View */}
            {activeSubTab === 'seller_details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <button
                        onClick={() => setActiveSubTab('sellers')}
                        className="add-btn"
                        style={{ padding: '0.5rem 1rem', width: 'fit-content', border: '1px solid var(--text-muted)', color: 'var(--text-muted)' }}
                    >
                        &larr; Return to Merchants Index
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                        {/* Summary side panel */}
                        <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                {selectedSeller.company}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.85rem' }}>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Merchant ID</span>
                                    <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{selectedSeller.id}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Representing Owner</span>
                                    <span style={{ fontWeight: 650 }}>{selectedSeller.owner} ({selectedSeller.email})</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Joined Partner Program</span>
                                    <span style={{ fontWeight: 600 }}>{selectedSeller.signedUp}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Catalog Share Size</span>
                                    <span style={{ fontWeight: 700 }}>{selectedSeller.productsCount} listings approved</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Sales Volume Ledger</span>
                                    <span style={{ fontWeight: 800, color: 'var(--accent)' }}>${selectedSeller.revenue.toFixed(2)} USD</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions and listing audits */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.2rem' }}>Merchant Moderation shell</h3>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            Toggle trading rights. Suspending a firm hides its catalog products from buyer listing indexes.
                                        </p>
                                        <button
                                            onClick={() => handleToggleSellerStatus(selectedSeller.id)}
                                            className="form-button"
                                            style={{
                                                padding: '0.7rem 1.5rem',
                                                background: selectedSeller.status === 'Verified' ? '#ef4444' : '#10b981',
                                                color: 'white',
                                                width: 'auto',
                                                fontWeight: 800
                                            }}
                                        >
                                            {selectedSeller.status === 'Verified' ? '⛔ Suspend Corporate Rights' : '⚡ Approve Merchant License'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* 3. Products List View */}
            {activeSubTab === 'products' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Audit Product catalog</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Review custom keyboards, audio reference transducers, dampener acoustics assets.</p>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0.75rem 1rem' }}>Catalog SKU</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Product Name</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Supplier</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Unit Price</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Quantity Stock</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Audited status</th>
                                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsList.map((prod) => (
                                    <tr key={prod.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{prod.id}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{prod.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{prod.seller}</td>
                                        <td style={{ padding: '1rem' }}>{prod.category}</td>
                                        <td style={{ padding: '1rem', fontWeight: 700 }}>${prod.price.toFixed(2)}</td>
                                        <td style={{ padding: '1rem' }}>{prod.stock} left</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                background: prod.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : prod.status === 'Suspended' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: prod.status === 'Approved' ? '#10b981' : prod.status === 'Suspended' ? '#ef4444' : '#f59e0b'
                                            }}>{prod.status}</span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => {
                                                    setSelectedProductId(prod.id);
                                                    setActiveSubTab('product_details');
                                                }}
                                                className="add-btn"
                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                                            >
                                                Audit Spec
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 4. Product Details View */}
            {activeSubTab === 'product_details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <button
                        onClick={() => setActiveSubTab('products')}
                        className="add-btn"
                        style={{ padding: '0.5rem 1rem', width: 'fit-content', border: '1px solid var(--text-muted)', color: 'var(--text-muted)' }}
                    >
                        &larr; Return to Catalog
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                        <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                Technical Specifications
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Catalog SKU</span>
                                    <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{selectedProduct.id}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Item Name</span>
                                    <span style={{ fontWeight: 650 }}>{selectedProduct.name}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Trademark Brand</span>
                                    <span style={{ fontWeight: 600 }}>{selectedProduct.brand}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Listed Category</span>
                                    <span>{selectedProduct.category}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Valuation cost</span>
                                    <span style={{ fontWeight: 750 }}>${selectedProduct.price.toFixed(2)} USD</span>
                                </div>
                            </div>
                        </div>

                        <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 750, marginBottom: '1.5rem' }}>Catalog Compliance Decisions</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Modify Compliance status</label>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                        <button
                                            onClick={() => handleChangeProductStatus(selectedProduct.id, 'Approved')}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.4rem',
                                                border: 'none',
                                                background: selectedProduct.status === 'Approved' ? '#10b981' : 'rgba(0,0,0,0.05)',
                                                color: selectedProduct.status === 'Approved' ? 'white' : 'var(--text-main)',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ✓ Approve Listing
                                        </button>
                                        <button
                                            onClick={() => handleChangeProductStatus(selectedProduct.id, 'Pending')}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.4rem',
                                                border: 'none',
                                                background: selectedProduct.status === 'Pending' ? '#f59e0b' : 'rgba(0,0,0,0.05)',
                                                color: selectedProduct.status === 'Pending' ? 'white' : 'var(--text-main)',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ⏳ Hold Pending Check
                                        </button>
                                        <button
                                            onClick={() => handleChangeProductStatus(selectedProduct.id, 'Suspended')}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.4rem',
                                                border: 'none',
                                                background: selectedProduct.status === 'Suspended' ? '#ef4444' : 'rgba(0,0,0,0.05)',
                                                color: selectedProduct.status === 'Suspended' ? 'white' : 'var(--text-main)',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            🚫 Suspend Listings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* 5. Categories Management */}
            {activeSubTab === 'categories' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Registered Categories</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {categoriesList.map((cat, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.5rem',
                                        background: 'rgba(255,255,255,0.4)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        fontWeight: 650,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span>{cat}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Index ID: #{idx + 10}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Register Category</h3>
                        <form onSubmit={handleAddCategory}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="form-label">Category Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Mechanical switch caps"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="form-input"
                                />
                            </div>
                            <button type="submit" className="form-button" style={{ background: 'var(--text-main)', color: 'white' }}>
                                Commit New Category
                            </button>
                        </form>
                    </div>

                </div>
            )}

            {/* 6. Brands Management */}
            {activeSubTab === 'brands' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Registered Trademark Brands</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {brandsList.map((brand, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '0.5rem',
                                        background: 'rgba(255,255,255,0.65)',
                                        border: '1px solid rgba(202, 138, 4, 0.2)',
                                        fontWeight: 650,
                                        fontSize: '0.85rem',
                                        color: 'var(--text-main)'
                                    }}
                                >
                                    🛡️ {brand}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Register Manufacturer Brand</h3>
                        <form onSubmit={handleAddBrand}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="form-label">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Glorious Gaming"
                                    value={newBrand}
                                    onChange={(e) => setNewBrand(e.target.value)}
                                    className="form-input"
                                />
                            </div>
                            <button type="submit" className="form-button" style={{ background: 'var(--text-main)', color: 'white' }}>
                                Commit New Brand
                            </button>
                        </form>
                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminMerchantManager;
