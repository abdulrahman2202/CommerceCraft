import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [securityPin, setSecurityPin] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!adminId.trim() || !password.trim() || !securityPin.trim()) {
            setError('Please supply all administrative credentials.');
            return;
        }

        setLoading(true);

        // Simulate admin validation
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Administrative authority approved. Loading terminal workspace...');

            // Redirect or load dashboard
            setTimeout(() => {
                navigate('/admin-dashboard');
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
                        background: 'rgba(31, 41, 55, 0.1)',
                        border: '1px solid rgba(31, 41, 55, 0.25)',
                        borderRadius: '1rem',
                        color: 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Console access
                    </div>
                    <h1 className="gradient-title">Admin Login</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Establish restricted administration console links.
                    </p>
                </div>

                {/* Form Card */}
                <div className="premium-card" style={{
                    margin: 0,
                    width: '100%',
                    maxWidth: 'none',
                    padding: '2.5rem',
                    background: 'rgba(31, 41, 55, 0.05)',
                    border: '1px solid rgba(31, 41, 55, 0.15)'
                }}>

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
                            <label className="form-label" style={{ color: 'var(--text-main)' }}>Admin ID</label>
                            <input
                                type="text"
                                required
                                placeholder="ADM-992-CC"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'var(--text-main)' }}>Console Password</label>
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

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label" style={{ color: 'var(--text-main)' }}>Security PIN</label>
                            <input
                                type="password"
                                required
                                placeholder="••••"
                                maxLength="4"
                                value={securityPin}
                                onChange={(e) => setSecurityPin(e.target.value.replace(/\D/g, ''))}
                                className="form-input"
                                style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '1.15rem' }}
                                disabled={loading || !!success}
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            style={{
                                background: 'var(--text-main)',
                                color: 'white',
                                boxShadow: '0 4px 20px rgba(31, 41, 55, 0.2)'
                            }}
                            disabled={loading || !!success}
                            onMouseEnter={(e) => e.target.style.background = '#111827'}
                            onMouseLeave={(e) => e.target.style.background = 'var(--text-main)'}
                        >
                            {loading ? 'Initializing Console Session...' : 'Open Administrative Shell'}
                        </button>
                    </form>

                    {/* Return link */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            &larr; Standard Buyer Login
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default AdminLogin;
