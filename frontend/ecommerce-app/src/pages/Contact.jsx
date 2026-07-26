import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

function Contact() {
    const { userProfile } = useContext(ShopContext);

    // Form states
    const [name, setName] = useState(userProfile?.name || '');
    const [email, setEmail] = useState(userProfile?.email || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            setError('Please complete all form fields.');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate network API callback
        setTimeout(() => {
            setLoading(false);
            setSuccess('🎉 Thank you! Your support ticket has been received. Our team will contact you at ' + email + ' shortly.');
            setSubject('');
            setMessage('');
            setTimeout(() => setSuccess(''), 5000);
        }, 1500);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Contact Us</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Have questions or technical issues? Send our engineering support team a message.
                    </p>
                </div>

                {/* Form card wrapper */}
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>
                        Submit Support Ticket
                    </h2>

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

                        {/* Name and Email side-by-side row */}
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="form-group">
                            <label className="form-label">Ticket Subject</label>
                            <input
                                type="text"
                                required
                                placeholder="E.g. Hardware warranty request, Order tracking delay"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="form-input"
                                disabled={loading}
                            />
                        </div>

                        {/* Message body */}
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label className="form-label">Details / Message</label>
                            <textarea
                                required
                                placeholder="Please describe the issue or question in detail..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="form-input"
                                rows="5"
                                style={{ resize: 'vertical', minHeight: '100px' }}
                                disabled={loading}
                            />
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
                            disabled={loading}
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
                                    Submitting Ticket...
                                </>
                            ) : (
                                'Submit Ticket File'
                            )}
                        </button>
                    </form>
                </div>

                {/* Additional details */}
                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }} className="upload-grid">
                    <div className="premium-card" style={{ flex: 1, padding: '1.5rem', margin: 0 }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>📞 Direct Hotline</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>+1 (555) CREATOR-HD</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mon - Fri | 9 AM - 6 PM PST</p>
                    </div>
                    <div className="premium-card" style={{ flex: 1, padding: '1.5rem', margin: 0 }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>✉️ Support Email</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>support@commercecraft.io</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--accent-light)', fontWeight: 600 }}>Response within 24 Hours guarantee</p>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Contact;
