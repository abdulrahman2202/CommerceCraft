import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Profile() {
    const {
        userProfile,
        savedAddresses,
        savedPayments,
        notificationRules,
        updateProfile,
        addAddress,
        removeAddress,
        addPayment,
        removePayment,
        updateNotifications
    } = useContext(ShopContext);

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile'); // profile, edit, addresses, payments, notifications

    // Form inputs state
    const [editForm, setEditForm] = useState({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone
    });
    const [profileSuccess, setProfileSuccess] = useState('');

    const [addressForm, setAddressForm] = useState({
        label: '',
        name: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });
    const [addressSuccess, setAddressSuccess] = useState('');

    const [paymentForm, setPaymentForm] = useState({
        label: '',
        name: '',
        cardNum: '',
        expiry: '',
        type: 'Visa'
    });
    const [paymentSuccess, setPaymentSuccess] = useState('');

    // Handlers
    const handleLogout = () => {
        navigate('/');
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateProfile(editForm);
        setProfileSuccess('🎉 Profile settings updated successfully!');
        setTimeout(() => setProfileSuccess(''), 3000);
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        addAddress(addressForm);
        setAddressSuccess('🎉 Delivery address added successfully!');
        setAddressForm({
            label: '',
            name: '',
            address: '',
            city: '',
            zip: '',
            phone: ''
        });
        setTimeout(() => setAddressSuccess(''), 3000);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        // Mask card number for security (only show last 4 details)
        const trimmed = paymentForm.cardNum.replace(/\s+/g, '');
        const lastFour = trimmed.slice(-4) || '1111';
        const masked = `•••• •••• •••• ${lastFour}`;

        addPayment({
            label: paymentForm.label,
            name: paymentForm.name,
            cardNum: masked,
            expiry: paymentForm.expiry,
            type: paymentForm.type
        });

        setPaymentSuccess('🎉 Card details registered successfully!');
        setPaymentForm({
            label: '',
            name: '',
            cardNum: '',
            expiry: '',
            type: 'Visa'
        });
        setTimeout(() => setPaymentSuccess(''), 3000);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header title */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Customer Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Modify your account preferences, saved billing configurations, and notifications settings.
                    </p>
                </div>

                {/* Dashboard layout wrapper */}
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', width: '100%' }}>

                    {/* Left sidebar nav panel */}
                    <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

                        {/* Profile Header box item */}
                        <div className="premium-card" style={{ margin: '0 0 1rem 0', width: '100%', maxWidth: 'none', padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                background: 'var(--accent)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.6rem',
                                fontWeight: 800,
                                margin: '0 auto 1rem auto'
                            }}>
                                {userProfile.avatar}
                            </div>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.15rem 0' }}>{userProfile.name}</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>{userProfile.email}</p>
                        </div>

                        {/* Navigation link buttons */}
                        <button
                            onClick={() => setActiveTab('profile')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.85rem 1.2rem',
                                background: activeTab === 'profile' ? 'var(--accent)' : 'var(--glass-bg)',
                                border: `1px solid ${activeTab === 'profile' ? 'var(--accent)' : 'var(--glass-border)'}`,
                                color: activeTab === 'profile' ? 'white' : 'var(--text-main)',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'profile' ? 700 : 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                boxShadow: activeTab === 'profile' ? '0 0 10px var(--accent-glow)' : 'none'
                            }}
                        >
                            👤 Profile Overview
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('edit');
                                setEditForm({
                                    name: userProfile.name,
                                    email: userProfile.email,
                                    phone: userProfile.phone
                                });
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.85rem 1.2rem',
                                background: activeTab === 'edit' ? 'var(--accent)' : 'var(--glass-bg)',
                                border: `1px solid ${activeTab === 'edit' ? 'var(--accent)' : 'var(--glass-border)'}`,
                                color: activeTab === 'edit' ? 'white' : 'var(--text-main)',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'edit' ? 700 : 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                boxShadow: activeTab === 'edit' ? '0 0 10px var(--accent-glow)' : 'none'
                            }}
                        >
                            ✏️ Edit Profile Info
                        </button>
                        <button
                            onClick={() => setActiveTab('addresses')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.85rem 1.2rem',
                                background: activeTab === 'addresses' ? 'var(--accent)' : 'var(--glass-bg)',
                                border: `1px solid ${activeTab === 'addresses' ? 'var(--accent)' : 'var(--glass-border)'}`,
                                color: activeTab === 'addresses' ? 'white' : 'var(--text-main)',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'addresses' ? 700 : 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                boxShadow: activeTab === 'addresses' ? '0 0 10px var(--accent-glow)' : 'none'
                            }}
                        >
                            📍 Saved Addresses
                        </button>
                        <button
                            onClick={() => setActiveTab('payments')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.85rem 1.2rem',
                                background: activeTab === 'payments' ? 'var(--accent)' : 'var(--glass-bg)',
                                border: `1px solid ${activeTab === 'payments' ? 'var(--accent)' : 'var(--glass-border)'}`,
                                color: activeTab === 'payments' ? 'white' : 'var(--text-main)',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'payments' ? 700 : 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                boxShadow: activeTab === 'payments' ? '0 0 10px var(--accent-glow)' : 'none'
                            }}
                        >
                            💳 Saved Payments
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.85rem 1.2rem',
                                background: activeTab === 'notifications' ? 'var(--accent)' : 'var(--glass-bg)',
                                border: `1px solid ${activeTab === 'notifications' ? 'var(--accent)' : 'var(--glass-border)'}`,
                                color: activeTab === 'notifications' ? 'white' : 'var(--text-main)',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'notifications' ? 700 : 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                boxShadow: activeTab === 'notifications' ? '0 0 10px var(--accent-glow)' : 'none'
                            }}
                        >
                            🔔 Notifications Feed
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.85rem 1.2rem',
                                background: 'transparent',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#ef4444',
                                borderRadius: '0.75rem',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                marginTop: '1rem',
                                width: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ef4444';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                        >
                            🚪 Sign Out of Account
                        </button>
                    </div>

                    {/* Right active content block */}
                    <div style={{ flex: '3 1 500px' }}>

                        {/* Tab 1: Profile View */}
                        {activeTab === 'profile' && (
                            <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>Account Details</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Official Name</span>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 650, color: 'var(--text-main)' }}>{userProfile.name}</span>
                                    </div>
                                    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Email Endpoint</span>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 650, color: 'var(--text-main)' }}>{userProfile.email}</span>
                                    </div>
                                    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Telephone Contact</span>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 650, color: 'var(--text-main)' }}>{userProfile.phone || 'Not Provided'}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setActiveTab('edit');
                                        setEditForm({
                                            name: userProfile.name,
                                            email: userProfile.email,
                                            phone: userProfile.phone
                                        });
                                    }}
                                    className="add-btn"
                                    style={{ marginTop: '2.5rem', padding: '0.75rem 2rem' }}
                                >
                                    Modify Contact Details &rarr;
                                </button>
                            </div>
                        )}

                        {/* Tab 2: Edit Profile */}
                        {activeTab === 'edit' && (
                            <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>Edit Personal File</h2>

                                {profileSuccess && (
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                                        {profileSuccess}
                                    </div>
                                )}

                                <form onSubmit={handleProfileSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Full Account Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Active Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                                        <label className="form-label">Contact Cellphone</label>
                                        <input
                                            type="text"
                                            required
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="submit" className="form-button" style={{ flex: 1 }}>
                                            Save Updates
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('profile')}
                                            className="add-btn"
                                            style={{ flex: 1, padding: '0.95rem' }}
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Tab 3: Saved Addresses */}
                        {activeTab === 'addresses' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                {/* Addresses List */}
                                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Saved Shipping Locations</h2>

                                    {savedAddresses.length === 0 ? (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>No delivery locations saved yet.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {savedAddresses.map((addr) => (
                                                <div
                                                    key={addr.id}
                                                    style={{
                                                        padding: '1.2rem',
                                                        borderRadius: '0.8rem',
                                                        border: '1px solid rgba(0,0,0,0.05)',
                                                        background: 'rgba(255,255,255,0.4)',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        gap: '1rem'
                                                    }}
                                                >
                                                    <div>
                                                        <span style={{
                                                            fontSize: '0.65rem',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            fontWeight: 800,
                                                            background: 'rgba(217, 119, 6, 0.08)',
                                                            border: '1px solid rgba(217, 119, 6, 0.15)',
                                                            color: 'var(--accent-light)',
                                                            padding: '0.15rem 0.5rem',
                                                            borderRadius: '0.35rem',
                                                            display: 'inline-block',
                                                            marginBottom: '0.5rem'
                                                        }}>
                                                            {addr.label}
                                                        </span>
                                                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{addr.name}</h4>
                                                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{addr.address}</p>
                                                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{addr.city}, {addr.zip}</p>
                                                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>📞 {addr.phone}</p>
                                                    </div>

                                                    <button
                                                        onClick={() => removeAddress(addr.id)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ef4444',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            padding: '0.2rem 0.6rem'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Add Address Form */}
                                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>Add New Location</h2>

                                    {addressSuccess && (
                                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                                            {addressSuccess}
                                        </div>
                                    )}

                                    <form onSubmit={handleAddressSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Location Label (e.g. Office, Home)</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="My Studio"
                                                value={addressForm.label}
                                                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Recipient Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                value={addressForm.name}
                                                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Street Address</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="100 Innovation road"
                                                value={addressForm.address}
                                                onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>
                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                            <div className="form-group" style={{ flex: '2 1 200px', marginBottom: 0 }}>
                                                <label className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="San Jose"
                                                    value={addressForm.city}
                                                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group" style={{ flex: '1 1 120px', marginBottom: 0 }}>
                                                <label className="form-label">Zip Code</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="95112"
                                                    value={addressForm.zip}
                                                    onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                                            <label className="form-label">Recipient Phone</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="+1 (555) 304-2900"
                                                value={addressForm.phone}
                                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>

                                        <button type="submit" className="form-button">
                                            Save Address
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Tab 4: Payment Methods */}
                        {activeTab === 'payments' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                {/* Payments List */}
                                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Saved Credit Cards</h2>

                                    {savedPayments.length === 0 ? (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>No card methods registered yet.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {savedPayments.map((card) => (
                                                <div
                                                    key={card.id}
                                                    style={{
                                                        padding: '1.2rem',
                                                        borderRadius: '0.8rem',
                                                        border: '1px solid rgba(0,0,0,0.05)',
                                                        background: 'rgba(255,255,255,0.4)',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        gap: '1rem'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', items: 'center', gap: '1.5rem' }}>
                                                        <div style={{ fontSize: '1.8rem' }}>💳</div>
                                                        <div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.15rem' }}>
                                                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{card.label}</h4>
                                                                <span style={{
                                                                    fontSize: '0.6rem',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.5px',
                                                                    fontWeight: 800,
                                                                    color: 'var(--text-muted)',
                                                                    background: 'rgba(0,0,0,0.05)',
                                                                    padding: '0.05rem 0.4rem',
                                                                    borderRadius: '0.2rem'
                                                                }}>{card.type}</span>
                                                            </div>
                                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', fontFamily: 'monospace' }}>
                                                                {card.cardNum}
                                                            </p>
                                                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                                Holder: {card.name} | Expiry: {card.expiry}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => removePayment(card.id)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ef4444',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            padding: '0.2rem 0.6rem'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Add Payment Form */}
                                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>Add Credit Card</h2>

                                    {paymentSuccess && (
                                        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                                            {paymentSuccess}
                                        </div>
                                    )}

                                    <form onSubmit={handlePaymentSubmit}>
                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                            <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
                                                <label className="form-label">Card Label (e.g. Personal Visa)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Office Mastercard"
                                                    value={paymentForm.label}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, label: e.target.value })}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
                                                <label className="form-label">Issuer Network Type</label>
                                                <select
                                                    value={paymentForm.type}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value })}
                                                    className="form-input"
                                                    style={{ height: '100%', maxHeight: '45px' }}
                                                >
                                                    <option value="Visa">Visa</option>
                                                    <option value="Mastercard">Mastercard</option>
                                                    <option value="Amex">American Express</option>
                                                    <option value="Discover">Discover</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Cardholder Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                value={paymentForm.name}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                                                className="form-input"
                                            />
                                        </div>

                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                            <div className="form-group" style={{ flex: '2 1 200px', marginBottom: 0 }}>
                                                <label className="form-label">Card Number</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="4111 2222 3333 4444"
                                                    value={paymentForm.cardNum}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, cardNum: e.target.value })}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group" style={{ flex: '1 1 120px', marginBottom: 0 }}>
                                                <label className="form-label">Expiry MM / YY</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="12 / 28"
                                                    value={paymentForm.expiry}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="form-button">
                                            Save Payment Method
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Tab 5: Notifications */}
                        {activeTab === 'notifications' && (
                            <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2.5rem' }}>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>Notification Preferences</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                                    Control which email feeds and updates system settings are active for your account.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                    {/* Order Status updates */}
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1.2rem',
                                        padding: '1rem',
                                        borderRadius: '0.8rem',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        background: 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={notificationRules.orderUpdates}
                                            onChange={(e) => updateNotifications('orderUpdates', e.target.checked)}
                                            style={{
                                                marginTop: '0.25rem',
                                                accentColor: 'var(--accent)',
                                                width: '1.1rem',
                                                height: '1.1rem',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                                Order Status Alerts
                                            </span>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                                Receive real-time progress update emails about your delivery milestones, tracking parameters and gateways status invoices. (Recommended)
                                            </span>
                                        </div>
                                    </label>

                                    {/* Promo weekly offers */}
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1.2rem',
                                        padding: '1rem',
                                        borderRadius: '0.8rem',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        background: 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={notificationRules.weeklyDeals}
                                            onChange={(e) => updateNotifications('weeklyDeals', e.target.checked)}
                                            style={{
                                                marginTop: '0.25rem',
                                                accentColor: 'var(--accent)',
                                                width: '1.1rem',
                                                height: '1.1rem',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                                Weekly Gadget Highlights
                                            </span>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                                Receive discount codes, premium hardware feature highlights, and announcements of upcoming electronic device drops.
                                            </span>
                                        </div>
                                    </label>

                                    {/* Security alerts */}
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1.2rem',
                                        padding: '1rem',
                                        borderRadius: '0.8rem',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        background: 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={notificationRules.securityAlerts}
                                            onChange={(e) => updateNotifications('securityAlerts', e.target.checked)}
                                            style={{
                                                marginTop: '0.25rem',
                                                accentColor: 'var(--accent)',
                                                width: '1.1rem',
                                                height: '1.1rem',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                                Critical Security Notifications
                                            </span>
                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                                Get notified immediately about login alerts, payment security events, addresses changes, or profile detail modifications.
                                            </span>
                                        </div>
                                    </label>

                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </main>
    );
}

export default Profile;
