import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="page-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>

                {/* 404 Symbol Card */}
                <div className="premium-card" style={{ margin: 0, width: '100%', padding: '3.5rem 2.5rem' }}>
                    <div style={{
                        fontSize: '5rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1
                    }}>
                        404
                    </div>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                        Lost in the Matrix
                    </h1>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                        The page or technology spec you are looking for does not exist, has been relocated, or is currently undergoing an acoustics sweep.
                    </p>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link
                            to="/"
                            className="hero-btn"
                            style={{
                                padding: '0.8rem 1.8rem',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            📟 Access Home
                        </Link>

                        <Link
                            to="/products"
                            style={{
                                padding: '0.8rem 1.8rem',
                                fontSize: '0.9rem',
                                border: '1px solid var(--accent)',
                                background: 'transparent',
                                color: 'var(--accent)',
                                borderRadius: '2rem',
                                fontWeight: 650,
                                textDecoration: 'none',
                                display: 'inline-block',
                                transition: 'all 0.3s'
                            }}
                            className="add-btn"
                        >
                            🛒 Browse Products
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default NotFound;
