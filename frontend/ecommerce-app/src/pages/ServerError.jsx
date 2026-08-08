import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ServerError() {
    const navigate = useNavigate();

    return (
        <main className="page-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>

                {/* 500 Card info wrapper */}
                <div className="premium-card" style={{ margin: 0, width: '100%', padding: '3.5rem 2.5rem' }}>
                    <div style={{
                        fontSize: '5rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #ef4444 0%, var(--accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1
                    }}>
                        500
                    </div>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                        Process Collision Detected
                    </h1>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Our central processing array encountered an unexpected runtime fault status. The diagnostic report was instantly compiled for our engineering coordinators.
                    </p>

                    {/* Simulating code log dump */}
                    <div style={{
                        background: 'rgba(0,0,0,0.06)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        color: '#ef4444',
                        textAlign: 'left',
                        marginBottom: '2.5rem',
                        overflowX: 'auto',
                        whiteSpace: 'pre'
                    }}>
                        {`ReferenceError: clientSessionInstance is not defined\n  at processPacketRequest (controller.node.js:104:12)\n  at handleSocketPipe (server.js:42:9)\n  at code: ERR_SYSTEM_PIPELINE_FAULT [500]`}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={() => window.location.reload()}
                            className="hero-btn"
                            style={{
                                padding: '0.8rem 1.8rem',
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            🔄 Reload Page
                        </button>

                        <Link
                            to="/"
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
                            📟 Safety Home
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default ServerError;
