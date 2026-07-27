import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Login() {
    const { updateProfile } = useContext(ShopContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim() || !password.trim()) {
            setError('Please provide both email and password.');
            return;
        }

        setLoading(true);

        // Simulate network roundtrip and validation
        setTimeout(() => {
            setLoading(false);
            if (password.length < 6) {
                setError('Invalid authentication credentials. Please try again.');
            } else {
                setSuccess('🎉 Successfully logged in! Redirecting to dashboard...');
                // Extract name prefix from email
                const rawName = email.split('@')[0];
                const cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
                updateProfile({
                    name: cleanName,
                    email: email,
                    phone: '+1 (555) 234-5678'
                });

                // Redirect user to profile route after 1.5 seconds
                setTimeout(() => {
                    navigate('/profile');
                }, 1500);
            }
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Accurate hardware configurations & high-grade acoustics.
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
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label className="form-label">Password</label>
                                <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 650 }}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                disabled={loading}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{ accentColor: 'var(--accent)' }}
                                />
                                Keep me logged in
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem'
                            }}
                            disabled={loading || !!success}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner" style={{
                                        width: '1rem',
                                        height: '1rem',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        animation: 'spin 0.8s linear infinite'
                                    }}></span>
                                    Verifying...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Registration redirection link */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        New to CommerceCraft?{' '}
                        <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Create account
                        </Link>
                    </div>

                </div>

                {/* Seller & Admin alternate entrances */}
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Link to="/seller-login" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                        Merchant/Seller login
                    </Link>
                    <span>•</span>
                    <Link to="/admin-login" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                        Administrator gateway
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default Login;
