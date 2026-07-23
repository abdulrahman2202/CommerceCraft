import React from 'react';
import { Link } from 'react-router-dom';

function OrderFailed() {
    return (
        <main className="page-container" style={{ minHeight: '80vh' }}>
            <div className="premium-card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '3rem auto', maxWidth: '550px' }}>
                {/* Red warning ring icon */}
                <div style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: '0 auto 1.5rem auto'
                }}>
                    ✗
                </div>

                <h1 className="gradient-title" style={{
                    fontSize: '2.3rem',
                    margin: '0 0 0.5rem 0',
                    background: 'linear-gradient(135deg, #111827 30%, #ef4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Transaction Decided
                </h1>

                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    Your simulated payment failed to authorize. The transaction was declined by the simulated card gateway. No funds were captured.
                </p>

                {/* Diagnostic box */}
                <div style={{
                    textAlign: 'left',
                    background: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '0.8rem',
                    padding: '1rem 1.2rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2rem',
                    fontFamily: 'monospace'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Status Code:</span>
                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>402 PAYMENT_REQUIRED</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Diagnostic Message:</span>
                        <span style={{ color: 'var(--text-main)' }}>CARD_INSUFFICIENT_FUNDS</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Gateway Ref:</span>
                        <span style={{ color: 'var(--text-main)' }}>CC-SIM-SECURE-DECA</span>
                    </div>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link
                        to="/checkout"
                        className="hero-btn"
                        style={{ width: '100%', padding: '1rem', color: 'white', textAlign: 'center', textDecoration: 'none', display: 'block', fontWeight: 700 }}
                    >
                        Try Again (Secure Checkout)
                    </Link>
                    <Link
                        to="/cart"
                        className="add-btn"
                        style={{
                            width: '100%',
                            padding: '0.95rem',
                            borderRadius: '0.75rem',
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            textDecoration: 'none',
                            display: 'block'
                        }}
                    >
                        Return to Shopping Cart
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default OrderFailed;
