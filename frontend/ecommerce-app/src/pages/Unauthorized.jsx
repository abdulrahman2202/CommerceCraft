import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
    return (
        <main className="page-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>

                {/* 401 Card Block */}
                <div className="premium-card" style={{ margin: 0, width: '100%', padding: '3.5rem 2.5rem' }}>
                    <div style={{
                        fontSize: '5rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, var(--accent) 0%, #10b981 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1
                    }}>
                        401
                    </div>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                        Session Identity Required
                    </h1>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                        To access this dashboard endpoint, the security framework requires you to establish your profile active session tokens.
                    </p>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link
                            to="/login"
                            className="hero-btn"
                            style={{
                                padding: '0.8rem 1.8rem',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            🔑 Establish Session (Login)
                        </Link>

                        <Link
                            to="/register"
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
                            🖋️ Create Account
                        </Link>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                            &larr; Back to Catalog Home
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Unauthorized;
