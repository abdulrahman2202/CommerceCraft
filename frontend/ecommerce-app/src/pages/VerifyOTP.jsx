import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email') || 'user@example.com';
    const isRecoveryFlow = queryParams.get('flow') === 'recovery';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

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

    const handleOtpChange = (value, index) => {
        // Only allow digit
        if (value !== '' && !/^[0-9]$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Autofocus next input
        if (value !== '' && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Backspace to previous input
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (!/^\d{6}$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        setOtp(newOtp);
        inputRefs[5].current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const otpCode = otp.join('');
        if (otpCode.length < 6) {
            setError('Please enter the complete 6-digit OTP code.');
            return;
        }

        setLoading(true);

        // Simulate verifying OTP code
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 OTP Code Verified!');

            // Redirect based on routing flows after 1.2 seconds
            setTimeout(() => {
                if (isRecoveryFlow) {
                    navigate('/reset-password');
                } else {
                    navigate('/login');
                }
            }, 1200);
        }, 1200);
    };

    const handleResend = () => {
        if (!canResend) return;

        setLoading(true);
        setError('');
        setSuccess('');

        // Simulate sending verification code
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 A fresh 6-digit verification code has been dispatched.');
            setOtp(['', '', '', '', '', '']);
            setTimer(60);
            setCanResend(false);
            inputRefs[0].current.focus();
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Verify OTP</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Input the 6-digit authentication token dispatched to:
                    </p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 650, marginTop: '0.25rem' }}>
                        {emailParam}
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

                        {/* OTP Input Grid */}
                        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={inputRefs[idx]}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    onPaste={idx === 0 ? handlePaste : undefined}
                                    style={{
                                        width: '3.2rem',
                                        height: '3.5rem',
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        background: 'rgba(255, 255, 255, 0.65)',
                                        border: '1px solid rgba(0, 0, 0, 0.08)',
                                        borderRadius: '0.75rem',
                                        outline: 'none',
                                        color: 'var(--text-main)',
                                        boxShadow: digit ? '0 0 8px var(--accent-glow)' : 'none',
                                        borderColor: digit ? 'var(--accent)' : 'rgba(0, 0, 0, 0.08)'
                                    }}
                                    disabled={loading || !!success}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            style={{ marginBottom: '1.5rem' }}
                            disabled={loading || !!success}
                        >
                            {loading ? 'Validating Token...' : 'Verify OTP Code'}
                        </button>
                    </form>

                    {/* Resend Logic */}
                    <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Didn't receive the OTP? </span>
                        <button
                            onClick={handleResend}
                            disabled={!canResend || loading}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: canResend ? 'var(--accent)' : 'var(--text-muted)',
                                fontWeight: 700,
                                cursor: canResend ? 'pointer' : 'not-allowed',
                                textDecoration: canResend ? 'underline' : 'none',
                                padding: 0
                            }}
                        >
                            {canResend ? 'Resend code' : `Resend in ${timer}s`}
                        </button>
                    </div>

                    {/* Back to Login link */}
                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                            &larr; Back to sign in portal
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default VerifyOTP;
