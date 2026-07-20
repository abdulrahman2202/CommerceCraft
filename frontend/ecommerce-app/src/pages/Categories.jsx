import React from 'react';

function Categories() {
    return (
        <main className="page-container min-h-screen">
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
                <h1 className="gradient-title">
                    Our Categories
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Explore our premium selection categorized for your convenience.
                </p>

                <div className="categories-grid">
                    {['Audio', 'Gaming', 'Wearables', 'Peripherals'].map((cat, idx) => (
                        <div key={idx} className="category-card">
                            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
                                {cat}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Categories;
