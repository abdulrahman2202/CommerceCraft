import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Please input all registration parameters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Account credentials mismatch: Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Security criteria failed: Password must be at least 6 characters.');
            return;
        }

        if (!agreeTerms) {
            setError('You must accept the terms of service to proceed.');
            return;
        }

        setLoading(true);

        // Simulate signup request
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Account credentials registered successfully! We sent an address verification link.');

            // Redirect user to verify e-mail page after 1.5 seconds
            setTimeout(() => {
                navigate('/verify-email?email=' + encodeURIComponent(email));
            }, 1500);
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Create Account</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Gain access to store configurations & creator hardware.
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
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="E.g. David Miller"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-input"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="david@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                disabled={loading}
                            />
                        </div>

                        {/* Password Grid */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <div className="form-group" style={{ flex: '1 1 200px' }}>
                                <label className="form-label">Password</label>
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
                            <div className="form-group" style={{ flex: '1 1 200px' }}>
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    style={{ accentColor: 'var(--accent)', marginTop: '0.2rem' }}
                                />
                                <span>
                                    I certify that I accept the{' '}
                                    <span style={{ color: 'var(--accent)', fontWeight: 650 }}>Terms and Conditions</span>
                                    {' '}and{' '}
                                    <span style={{ color: 'var(--accent)', fontWeight: 650 }}>Privacy Policy</span>.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            disabled={loading || !!success}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    {/* Redirection Link */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Already registered?{' '}
                        <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Sign in instead
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Register;
