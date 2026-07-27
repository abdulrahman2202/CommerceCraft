import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!password.trim() || !confirmPassword.trim()) {
            setError('Please complete all form fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Account credentials mismatch: Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Passwords must be at least 6 characters in length.');
            return;
        }

        setLoading(true);

        // Simulate password updating
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Password reset successfully! Redirecting to login portal...');

            // Redirect to Login portal after 1.5 seconds
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '485px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Reset Password</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Set a secure access password for your CommerceCraft profile.
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
                            <label className="form-label">New Password</label>
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
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            disabled={loading || !!success}
                        >
                            {loading ? 'Updating Credentials...' : 'Save New Password'}
                        </button>
                    </form>

                    {/* Navigation Link */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Return to{' '}
                        <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Sign in
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default ResetPassword;
