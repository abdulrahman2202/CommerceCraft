import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim()) {
            setError('Please provide your registered email profile.');
            return;
        }

        setLoading(true);

        // Simulate sending password recovery links
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Password recovery OTP code has been dispatched. Check your inbox!');

            // Redirect to OTP verification page after 1.5 seconds
            setTimeout(() => {
                navigate(`/verify-otp?email=${encodeURIComponent(email)}&flow=recovery`);
            }, 1500);
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Recover Password</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Type your registered e-mail address and we will dispatch a verification key.
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

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label">Account E-mail</label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            disabled={loading || !!success}
                        >
                            {loading ? 'Dispatched Request...' : 'Send Recovery OTP'}
                        </button>
                    </form>

                    {/* Navigation Link */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Remember credentials?{' '}
                        <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Sign in
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default ForgotPassword;
