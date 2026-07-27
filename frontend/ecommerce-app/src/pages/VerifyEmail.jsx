import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function VerifyEmail() {
    const location = useLocation();

    // Retrieve email from URL search params (e.g. ?email=...)
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email') || 'user@example.com';

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        if (!canResend) return;

        setLoading(true);
        setError('');
        setSuccess('');

        // Simulate sending verification email
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 A fresh routing verification link has been dispatched to your address.');
            setTimer(60);
            setCanResend(false);
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Verify E-mail</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        We sent a verification link to your active communication terminal.
                    </p>
                </div>

                {/* Info Card */}
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem', textAlign: 'center' }}>

                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✉️</div>

                    <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                        Validation gateway link sent to:
                    </p>
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.04)',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '0.75rem',
                        fontSize: '1.05rem',
                        fontWeight: 650,
                        fontFamily: 'monospace',
                        color: 'var(--text-main)',
                        display: 'inline-block',
                        marginBottom: '2rem',
                        wordBreak: 'break-all'
                    }}>
                        {emailParam}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                        Please click the verification link in the e-mail to finalize your account profile. If you did not receive it or it has expired, click below to request another link.
                    </p>

                    {error && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.9rem', textAlign: 'left' }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem', textAlign: 'left' }}>
                            {success}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={handleResend}
                            disabled={!canResend || loading}
                            className="form-button"
                            style={{
                                width: '100%',
                                background: canResend ? 'var(--accent)' : 'rgba(0,0,0,0.06)',
                                border: canResend ? 'none' : '1px solid rgba(0,0,0,0.1)',
                                color: canResend ? 'white' : 'var(--text-muted)',
                                cursor: canResend ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {loading ? 'Sending link...' : canResend ? 'Resend Verification E-mail' : `Resend available in ${timer}s`}
                        </button>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.95rem' }}>
                            <Link to={`/verify-otp?email=${encodeURIComponent(emailParam)}`} style={{ color: 'var(--accent)', fontWeight: 650 }}>
                                Try OTP code Verification &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Link */}
                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Need to register a different email?{' '}
                        <br />
                        <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Create account
                        </Link>
                        {' '}or{' '}
                        <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 700 }}>
                            Sign in
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default VerifyEmail;
