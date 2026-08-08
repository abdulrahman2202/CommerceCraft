import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SellerRegister() {
    const navigate = useNavigate();

    // Registration Form Fields
    const [storeName, setStoreName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [merchantIdChoice, setMerchantIdChoice] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!storeName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
            setError('Please complete all merchant registry details.');
            return;
        }

        setLoading(true);

        // Simulate Seller Account Creation
        setTimeout(() => {
            setLoading(false);

            // Auto generate Merchant ID if choice is blank
            const finalId = merchantIdChoice.trim() || `MC-${Math.floor(1000 + Math.random() * 9000)}-20X`;
            setSuccess(`🎉 Application registered! Your generated Merchant ID is ${finalId}. Redirecting to Login...`);

            // Redirect back to seller login page after 2 seconds
            setTimeout(() => {
                navigate('/seller-login');
            }, 2000);
        }, 1500);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Section */}
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
                    <h1 className="gradient-title">Register as Seller</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Enroll in the CommerceCraft merchant circle to list hardware solutions.
                    </p>
                </div>

                {/* Registration Card */}
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
                            <label className="form-label">Brand / Store Name</label>
                            <input
                                type="text"
                                required
                                placeholder="E.g. MechKeys Studios"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Corporate Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="info@yourbrand.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Contact Telephone</label>
                            <input
                                type="text"
                                required
                                placeholder="E.g. +1 (555) 234-8920"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Preferred Merchant ID (Optional)</label>
                            <input
                                type="text"
                                placeholder="E.g. MK-7712 (Leaves blank for auto-generation)"
                                value={merchantIdChoice}
                                onChange={(e) => setMerchantIdChoice(e.target.value)}
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
                            {loading ? 'Creating Merchant Account...' : 'Submit Application Portal'}
                        </button>
                    </form>

                    {/* Navigation pathways redirects */}
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div>
                            Already registered as Merchant?{' '}
                            <Link to="/seller-login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                                Sign In
                            </Link>
                        </div>
                        <div>
                            Seeking standard buyer account?{' '}
                            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                                Standard Register
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default SellerRegister;
