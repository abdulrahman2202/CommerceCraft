import React, { useState, useEffect } from 'react';

function ProductsManager({
    activeSubTab,
    setActiveSubTab,
    products,
    setProducts,
    categoriesList,
    setCategoriesList,
    selectedProductId,
    setSelectedProductId
}) {
    // Local form states
    const [editMode, setEditMode] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const [formValues, setFormValues] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
        description: '',
        brand: '',
        features: ''
    });

    const [newCategoryName, setNewCategoryName] = useState('');

    // Prepopulate form on editing
    useEffect(() => {
        if (activeSubTab === 'edit_product' && selectedProductId) {
            const product = products.find(p => p.id === selectedProductId);
            if (product) {
                setFormValues({
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    image: product.image || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
                    description: product.description || 'Premium acoustics device.',
                    brand: product.brand || 'CommerceCraft Premium',
                    features: (product.features || []).join('\n')
                });
            }
        } else if (activeSubTab === 'add_product') {
            setFormValues({
                name: '',
                category: categoriesList[0] || 'Keyboards',
                price: '',
                stock: '',
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
                description: '',
                brand: '',
                features: ''
            });
        }
        setFormError('');
        setFormSuccess('');
    }, [activeSubTab, selectedProductId, products, categoriesList]);

    // Handle Form submissions
    const handleProductSubmit = (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        const { name, category, price, stock, description, image, brand, features } = formValues;

        if (!name.trim() || !price || !stock) {
            setFormError('Please supply product name, price, and initial stock quantities.');
            return;
        }

        const priceNum = parseFloat(price);
        const stockNum = parseInt(stock, 10);

        if (isNaN(priceNum) || priceNum <= 0) {
            setFormError('Price must be a valid positive number.');
            return;
        }
        if (isNaN(stockNum) || stockNum < 0) {
            setFormError('Stock level cannot be negative.');
            return;
        }

        const featuresArray = features ? features.split('\n').filter(f => f.trim() !== '') : [];

        if (activeSubTab === 'add_product') {
            const newProduct = {
                id: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
                name,
                category,
                price: priceNum,
                stock: stockNum,
                image,
                description,
                brand: brand || 'Generic',
                features: featuresArray,
                rating: 5,
                reviews: 0
            };
            setProducts([newProduct, ...products]);
            setFormSuccess('🎉 New product successfully cataloged!');
            setTimeout(() => {
                setActiveSubTab('products');
            }, 1200);
        } else {
            setProducts(products.map(p => {
                if (p.id === selectedProductId) {
                    return {
                        ...p,
                        name,
                        category,
                        price: priceNum,
                        stock: stockNum,
                        image,
                        description,
                        brand: brand || 'Generic',
                        features: featuresArray
                    };
                }
                return p;
            }));
            setFormSuccess('🎉 Product configuration updated!');
            setTimeout(() => {
                setActiveSubTab('products');
            }, 1200);
        }
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm(`Are you sure you want to delete ${productId}?`)) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleQuickStockUpdate = (productId, newStock) => {
        const val = parseInt(newStock, 10);
        if (isNaN(val) || val < 0) return;
        setProducts(products.map(p => p.id === productId ? { ...p, stock: val } : p));
    };

    const handleCreateCategory = (e) => {
        e.preventDefault();
        const cat = newCategoryName.trim();
        if (!cat) return;
        if (categoriesList.some(c => c.toLowerCase() === cat.toLowerCase())) {
            alert('Category already exists!');
            return;
        }
        setCategoriesList([...categoriesList, cat]);
        setNewCategoryName('');
    };

    const selectedProduct = products.find(p => p.id === selectedProductId);

    // Sub-views
    const renderProductsList = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Store Products</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage catalog inventory listing configuration settings details.</p>
                </div>
                <button
                    onClick={() => setActiveSubTab('add_product')}
                    className="form-button"
                    style={{ width: 'auto', padding: '0.6rem 1.5rem', background: 'var(--accent)' }}
                >
                    + Add New Product
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Preview</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Product Details</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Price</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Stock</th>
                            <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <img src={p.image} alt={p.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <div style={{ fontWeight: 650 }}>{p.name}</div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.id}</span>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{p.category}</td>
                                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>${p.price}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <span style={{
                                        color: p.stock <= 5 ? '#ef4444' : 'inherit',
                                        fontWeight: p.stock <= 5 ? 700 : 'normal'
                                    }}>
                                        {p.stock} units
                                    </span>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button onClick={() => { setSelectedProductId(p.id); setActiveSubTab('product_details'); }} style={{ border: 'none', background: 'rgba(0,0,0,0.04)', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>View</button>
                                        <button onClick={() => { setSelectedProductId(p.id); setActiveSubTab('edit_product'); }} style={{ border: 'none', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
                                        <button onClick={() => handleDeleteProduct(p.id)} style={{ border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderProductDetails = () => {
        if (!selectedProduct) return <div style={{ padding: '2rem' }}>Product not found.</div>;
        return (
            <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
                <button onClick={() => setActiveSubTab('products')} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 650, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    &larr; Back to Products List
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
                    <div>
                        <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.06)' }} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{selectedProduct.category}</span>
                            <span style={{ background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-muted)', padding: '0.15rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{selectedProduct.brand}</span>
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{selectedProduct.name}</h2>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>UUID Identifier: {selectedProduct.id}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '1.5rem' }}>${selectedProduct.price}</div>

                        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>Description</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{selectedProduct.description}</p>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>Key Features</h4>
                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                {(selectedProduct.features || []).map((f, idx) => (
                                    <li key={idx}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderProductForm = () => {
        const isEdit = activeSubTab === 'edit_product';
        return (
            <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
                <button onClick={() => setActiveSubTab('products')} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 650, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    &larr; Cancel Editor
                </button>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{isEdit ? `Edit Product / ${selectedProductId}` : 'Add New Product'}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure details and parameters to catalog layout settings.</p>

                {formError && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.9rem' }}>
                        {formError}
                    </div>
                )}

                {formSuccess && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                        {formSuccess}
                    </div>
                )}

                <form onSubmit={handleProductSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formValues.name}
                                onChange={e => setFormValues({ ...formValues, name: e.target.value })}
                                placeholder="E.g. Craft60 Mechanical Keyboard"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                value={formValues.category}
                                onChange={e => setFormValues({ ...formValues, category: e.target.value })}
                                style={{ padding: '0.6rem' }}
                            >
                                {categoriesList.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Retail Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-input"
                                value={formValues.price}
                                onChange={e => setFormValues({ ...formValues, price: e.target.value })}
                                placeholder="199.99"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Initial Stock Level</label>
                            <input
                                type="number"
                                className="form-input"
                                value={formValues.stock}
                                onChange={e => setFormValues({ ...formValues, stock: e.target.value })}
                                placeholder="20"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Brand</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formValues.brand}
                                onChange={e => setFormValues({ ...formValues, brand: e.target.value })}
                                placeholder="E.g. CraftLab Acoustics"
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Display Image URL</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formValues.image}
                            onChange={e => setFormValues({ ...formValues, image: e.target.value })}
                            placeholder="Link to hosted image asset"
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Product Description</label>
                        <textarea
                            rows="4"
                            className="form-input"
                            value={formValues.description}
                            onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                            placeholder="Write comprehensive product summary here..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                        <label className="form-label">Product Specifications (One per line)</label>
                        <textarea
                            rows="4"
                            className="form-input"
                            value={formValues.features}
                            onChange={e => setFormValues({ ...formValues, features: e.target.value })}
                            placeholder="Hotswappable switches&#10;RGB backlight profile&#10;Gasket mount configuration"
                            style={{ resize: 'vertical', fontFamily: 'monospace' }}
                        />
                    </div>

                    <button type="submit" className="form-button">
                        {isEdit ? 'Save Changes' : 'Publish Product Listing'}
                    </button>
                </form>
            </div>
        );
    };

    const renderInventory = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Stock Inventory Control</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure depletion zones, rapid restock, and manual inventory overrides.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {products.map(p => (
                    <div
                        key={p.id}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.25rem',
                            border: '1px solid rgba(0,0,0,0.05)',
                            background: p.stock <= 5 ? 'rgba(239, 68, 68, 0.03)' : 'rgba(255,255,255,0.4)',
                            borderRadius: '0.75rem',
                            gap: '1rem'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '0.35rem' }} />
                            <div>
                                <div style={{ fontWeight: 650, fontSize: '0.95rem' }}>{p.name}</div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.id} | Category: {p.category}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {p.stock <= 5 && (
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 750,
                                    color: '#ef4444',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '0.5rem'
                                }}>
                                    ⚠️ LOW STOCK ALERT
                                </span>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Adjust Stock:</span>
                                <input
                                    type="number"
                                    value={p.stock}
                                    min="0"
                                    onChange={e => handleQuickStockUpdate(p.id, e.target.value)}
                                    style={{
                                        width: '4.5rem',
                                        padding: '0.35rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        textAlign: 'center',
                                        fontSize: '0.9rem',
                                        fontWeight: 650
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCategories = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Seller Product Categories</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Establish custom navigation categories to segment hardware lines.</p>

            <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    required
                    placeholder="New category name (e.g. Ergonomic Rests)"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    style={{ flex: 1 }}
                    className="form-input"
                />
                <button type="submit" className="form-button" style={{ width: 'auto', padding: '0.6rem 1.5rem', background: 'var(--text-main)', color: 'white' }}>
                    Create Category
                </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {categoriesList.map(cat => {
                    const count = products.filter(p => p.category === cat).length;
                    return (
                        <div
                            key={cat}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.5rem',
                                border: '1px solid rgba(0,0,0,0.05)',
                                background: 'rgba(255,255,255,0.4)',
                                borderRadius: '0.75rem'
                            }}
                        >
                            <span style={{ fontWeight: 650, color: 'var(--text-main)' }}>{cat}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                {count} {count === 1 ? 'Product' : 'Products'} active
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    switch (activeSubTab) {
        case 'products':
            return renderProductsList();
        case 'product_details':
            return renderProductDetails();
        case 'add_product':
        case 'edit_product':
            return renderProductForm();
        case 'inventory':
            return renderInventory();
        case 'categories':
            return renderCategories();
        default:
            return renderProductsList();
    }
}

export default ProductsManager;
