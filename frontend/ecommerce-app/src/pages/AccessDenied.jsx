import React from 'react';
import { Link } from 'react-router-dom';

function AccessDenied() {
    return (
        <main className="page-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>

                {/* 403 Card Block */}
                <div className="premium-card" style={{ margin: 0, width: '100%', padding: '3.5rem 2.5rem' }}>
                    <div style={{
                        fontSize: '5rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #b45309 0%, #ef4444 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1
                    }}>
                        403
                    </div>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                        Clearance Failure
                    </h1>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Your session profile parameters do not hold access authorization codes needed to read this system endpoint.
                    </p>

                    {/* Simulating security log block */}
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        color: '#ef4444',
                        textAlign: 'left',
                        marginBottom: '2.5rem'
                    }}>
                        <strong>🔒 SECURITY ALERTER SYSTEM:</strong> USER_UNAUTHORIZED_ROLE<br />
                        <strong>RESOURCE:</strong> SECURE_ADMIN_WORKSPACE_NODE_A<br />
                        <strong>SESSION STATUS:</strong> TOKEN_VALIDATED_INSUFFICIENT_SECURITY_CLEARANCE (LEVEL_BLOCK_0)
                    </div>

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
                            to="/login"
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
                            👤 Authenticate Roles
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default AccessDenied;
