import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SellerLogin() {
    const navigate = useNavigate();
    const [merchantId, setMerchantId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!merchantId.trim() || !email.trim() || !password.trim()) {
            setError('Please complete all merchant login credentials.');
            return;
        }

        setLoading(true);

        // Simulate seller login
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Merchant credentials verified! Opening corporate inventory cockpit...');

            // Redirect user or simulate dashboard loading after 1.5 seconds
            setTimeout(() => {
                navigate('/seller-dashboard');
            }, 1500);
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: '1rem',
                        color: '#10b981',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Merchant Hub
                    </div>
                    <h1 className="gradient-title">Seller Login</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Manage corporate device inventories & acoustic hardware catalog drops.
                    </p>
                </div>

                {/* Form Card */}
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>

                    {error && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label className="form-label">Merchant Identifier (ID)</label>
                            <input
                                type="text"
                                required
                                placeholder="E.g. MC-8921-20X"
                                value={merchantId}
                                onChange={(e) => setMerchantId(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Registered E-mail</label>
                            <input
                                type="email"
                                required
                                placeholder="partners@corporate.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label">Access Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            style={{
                                background: '#10b981',
                                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)'
                            }}
                            disabled={loading || !!success}
                            onMouseEnter={(e) => e.target.style.background = '#059669'}
                            onMouseLeave={(e) => e.target.style.background = '#10b981'}
                        >
                            {loading ? 'Authenticating Merchant...' : 'Access Merchant Portal'}
                        </button>
                    </form>

                    {/* Redirection options */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div>
                            Seeking standard buyer services?{' '}
                            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                                Sign in as Buyer
                            </Link>
                        </div>
                        <div>
                            Want to join the merchant network?{' '}
                            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                                Apply now
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default SellerLogin;
