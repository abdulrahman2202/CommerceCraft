import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES_DATA = [
    { name: 'Audio', description: 'Studio-grade monitors, noise-cancelling headphones, and wireless earbuds.', icon: '🎧' },
    { name: 'Gaming', description: 'Mechanical keyboards, lightweight mice, curved monitors, and gamer gear.', icon: '🎮' },
    { name: 'Wearables', description: 'Smart sportwatches, fitness trackers, health rings, and haptic glasses.', icon: '⌚' },
    { name: 'Peripherals', description: 'High-performance hubs, 4K webcams, ergonomic mice, and studio lights.', icon: '🔌' }
];

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

                <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                    {CATEGORIES_DATA.map((cat, idx) => (
                        <Link
                            to={`/category/${cat.name}`}
                            key={idx}
                            className="category-card"
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                color: 'inherit'
                            }}
                        >
                            <span style={{ fontSize: '3rem' }}>{cat.icon}</span>
                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                                {cat.name}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                                {cat.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Categories;

