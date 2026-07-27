import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ChangePassword() {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!currentPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
            setError('Please complete all form fields.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('Account credentials mismatch: New passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters in length.');
            return;
        }

        setLoading(true);

        // Simulate password modification
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Password modified successfully! Returning to profile dashboard...');

            // Redirect back to profile page after 1.5 seconds
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        }, 1200);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Change Password</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Modify current credentials to preserve configuration security.
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
                            <label className="form-label">Current Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="form-input"
                                disabled={loading || !!success}
                            />
                        </div>

                        <button
                            type="submit"
                            className="form-button"
                            disabled={loading || !!success}
                        >
                            {loading ? 'Modifying Password...' : 'Modify Credentials'}
                        </button>
                    </form>

                    {/* Return link */}
                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Link to="/profile" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                            &larr; Return to dashboard
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default ChangePassword;
