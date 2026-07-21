import React, { useState } from 'react';

function UploadProduct() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'Audio',
        image: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage('🎉 Product uploaded successfully to CommerceCraft!');
            setFormData({
                title: '',
                price: '',
                category: 'Audio',
                image: '',
                description: ''
            });
        }, 1500);
    };

    return (
        <main className="page-container min-h-screen">
            <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">
                        Seller Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        List your premium gadgets on CommerceCraft and reach thousands of technology enthusiasts.
                    </p>
                </div>

                <div className="upload-grid">
                    {/* Left Form Box */}
                    <div className="premium-card" style={{ margin: '0', width: '100%', maxWidth: 'none' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>List New Product</h2>

                        {successMessage && (
                            <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--accent-light)', fontSize: '0.9rem' }}>
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Nebula Pro Wireless Keyboard"
                                    className="form-input"
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <div className="form-group" style={{ flex: '1 1 200px', marginBottom: '0' }}>
                                    <label className="form-label">Price (USD)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        min="0.01"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="149.99"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group" style={{ flex: '1 1 200px', marginBottom: '0' }}>
                                    <label className="form-label">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="form-input"
                                        style={{ appearance: 'none', backgroundPosition: 'right 1rem center' }}
                                    >
                                        <option value="Audio">Audio</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Wearables">Wearables</option>
                                        <option value="Peripherals">Peripherals</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Product Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the main highlights and tech specs of this device..."
                                    className="form-input"
                                    style={{ resize: 'none' }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="form-button"
                                style={{ opacity: isSubmitting ? 0.7 : 1 }}
                            >
                                {isSubmitting ? 'Uploading to Catalog...' : 'Upload Product'}
                            </button>
                        </form>
                    </div>

                    {/* Right Live-Preview Box */}
                    <div style={{ position: 'sticky', top: '9rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--text-muted)', marginBottom: '1rem' }}>Live Card Preview</h2>
                        <div className="category-card" style={{ textAlign: 'left', padding: '1.5rem', width: '100%', maxWidth: 'none', cursor: 'default' }}>
                            <div style={{ width: '100%', aspectRatio: '1', background: 'rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: '0.8rem', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt={formData.title || 'Product Preview'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400';
                                        }}
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>
                                        <svg style={{ width: '3rem', height: '3rem', margin: '0 auto 0.5rem auto', opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span style={{ fontSize: '0.875rem' }}>Image Preview</span>
                                    </div>
                                )}
                                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(99, 102, 241, 0.9)', color: 'white', fontWeight: 600, fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {formData.category}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'col', gap: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 650, color: 'var(--text-main)', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {formData.title || 'Your Product Title'}
                                </h3>
                                <p style={{ color: 'var(--accent-light)', fontSize: '1.1rem', fontWeight: 600, margin: '0.25rem 0 0.75rem 0' }}>
                                    ${formData.price ? parseFloat(formData.price).toFixed(2) : '0.00'}
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5', background: 'rgba(0, 0, 0, 0.02)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(0, 0, 0, 0.05)', minHeight: '76px', margin: '0' }}>
                                    {formData.description || 'Provide a compelling description of the premium gadget on the left.'}
                                </p>
                                <button className="add-btn" style={{ width: '100%', marginTop: '1rem', cursor: 'not-allowed' }} disabled>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UploadProduct;
