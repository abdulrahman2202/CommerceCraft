import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TwoFactorAuth() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [useBackup, setUseBackup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const cleanedCode = code.trim();
        if (!cleanedCode) {
            setError(useBackup ? 'Please input a valid backup configuration key.' : 'Please provide authorization token code.');
            return;
        }

        setLoading(true);

        // Simulate 2FA validation
        setTimeout(() => {
            setLoading(false);
            if (cleanedCode === '000000') {
                setError('Invalid authentication token code. Please try again.');
            } else {
                setSuccess('🎉 2FA Authentication verified! Access granted...');
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
                    <h1 className="gradient-title">Two-Factor Authentication</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Your configuration is protected by secondary access challenges.
                    </p>
                </div>

                {/* Form Card */}
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>

                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1.5rem' }}>🛡️</div>

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

                        {!useBackup ? (
                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label className="form-label">Authenticator Token Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter 6-digit code"
                                    maxLength="6"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                    className="form-input"
                                    style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '1.25rem' }}
                                    disabled={loading || !!success}
                                />
                                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                                    Open the authenticator application on your device to view the code.
                                </span>
                            </div>
                        ) : (
                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label className="form-label">8-Digit Backup recovery Key</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="XXXX-XXXX"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="form-input"
                                    style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}
                                    disabled={loading || !!success}
                                />
                                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                                    Input one of the one-time backup keys downloaded during system setup.
                                </span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="form-button"
                            disabled={loading || !!success}
                        >
                            {loading ? 'Authenticating Access...' : 'Verify Authority'}
                        </button>
                    </form>

                    {/* Toggle between backup and main code */}
                    <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
                        <button
                            type="button"
                            onClick={() => {
                                setUseBackup(!useBackup);
                                setCode('');
                                setError('');
                            }}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--accent)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {useBackup ? 'Use authenticator app code' : 'Unlock using a backup key code'}
                        </button>
                    </div>

                    {/* Back to Login link */}
                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                            &larr; Back to sign in
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default TwoFactorAuth;
