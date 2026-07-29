import React, { useState } from 'react';

function StoreSettingsManager({
    activeSubTab,
    messages,
    setMessages,
    storeProfile,
    setStoreProfile,
    storeSettings,
    setStoreSettings,
    supportTickets,
    setSupportTickets
}) {
    // Message states
    const [selectedThreadUser, setSelectedThreadUser] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');

    // Ticket states
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketCategory, setTicketCategory] = useState('Billing');
    const [ticketMessage, setTicketMessage] = useState('');
    const [ticketSuccess, setTicketSuccess] = useState('');

    // Profile inputs
    const [profileName, setProfileName] = useState(storeProfile.name);
    const [profileBio, setProfileBio] = useState(storeProfile.bio);
    const [profileLogo, setProfileLogo] = useState(storeProfile.logo);
    const [profileBanner, setProfileBanner] = useState(storeProfile.banner);
    const [profileSuccess, setProfileSuccess] = useState('');

    // Settings inputs
    const [shipFee, setShipFee] = useState(storeSettings.shippingFee);
    const [vatCode, setVatCode] = useState(storeSettings.vatRegistration);
    const [payoutFreq, setPayoutFreq] = useState(storeSettings.payoutFrequency);
    const [settingsSuccess, setSettingsSuccess] = useState('');

    // Sub-views
    const handleSendMessage = (userName) => {
        const text = newMessageText.trim();
        if (!text) return;

        setMessages({
            ...messages,
            [userName]: [...(messages[userName] || []), { sender: 'seller', text, time: 'Just now' }]
        });
        setNewMessageText('');
    };

    const handleCreateTicket = (e) => {
        e.preventDefault();
        setTicketSuccess('');

        const sub = ticketSubject.trim();
        const msg = ticketMessage.trim();
        if (!sub || !msg) return;

        const newTicket = {
            id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
            subject: sub,
            category: ticketCategory,
            date: new Date().toLocaleDateString(),
            status: 'Open'
        };

        setSupportTickets([newTicket, ...supportTickets]);
        setTicketSuccess('🎉 Support ticket created successfully! Agents will review shortly.');
        setTicketSubject('');
        setTicketMessage('');
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setProfileSuccess('');

        setStoreProfile({
            name: profileName,
            bio: profileBio,
            logo: profileLogo,
            banner: profileBanner
        });
        setProfileSuccess('🎉 Store branding profiles updated successfully!');
        setTimeout(() => setProfileSuccess(''), 1500);
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setSettingsSuccess('');

        setStoreSettings({
            shippingFee: parseFloat(shipFee),
            vatRegistration: vatCode,
            payoutFrequency: payoutFreq
        });
        setSettingsSuccess('🎉 Local store configurations saved!');
        setTimeout(() => setSettingsSuccess(''), 1500);
    };

    const renderMessages = () => {
        const users = Object.keys(messages);
        const activeUser = selectedThreadUser || users[0];
        const activeThread = messages[activeUser] || [];

        return (
            <div className="premium-card" style={{ margin: 0, padding: '2.5rem', width: '100%', maxWidth: 'none' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>Buyer Communications Inbox</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', height: '500px', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '1rem', overflow: 'hidden', background: 'white' }}>

                    {/* Inbox threads sidebar */}
                    <div style={{ borderRight: '1px solid rgba(0,0,0,0.06)', overflowY: 'auto' }}>
                        {users.map(u => (
                            <div
                                key={u}
                                onClick={() => setSelectedThreadUser(u)}
                                style={{
                                    padding: '1.2rem',
                                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                                    cursor: 'pointer',
                                    fontWeight: activeUser === u ? 700 : 'normal',
                                    background: activeUser === u ? 'rgba(var(--accent-rgb), 0.04)' : 'transparent',
                                    color: 'var(--text-main)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                👤 {u}
                            </div>
                        ))}
                    </div>

                    {/* Thread active chat */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '0' }}>
                        <div style={{ padding: '0.8rem 1.2rem', borderBottom: '1px solid rgba(0,0,0,0.06)', fontWeight: 700, background: 'rgba(0,0,0,0.01)', fontSize: '0.9rem' }}>
                            Thread / {activeUser}
                        </div>

                        <div style={{ flex: '1 1 0%', minHeight: '0', padding: '1.2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: '#fafafa' }}>
                            {activeThread.map((msgItem, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        alignSelf: msgItem.sender === 'seller' ? 'flex-end' : 'flex-start',
                                        maxWidth: '75%',
                                        background: msgItem.sender === 'seller' ? 'var(--accent)' : 'white',
                                        color: msgItem.sender === 'seller' ? 'white' : 'var(--text-main)',
                                        padding: '0.64rem 1rem',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                                        fontSize: '0.85rem',
                                        border: msgItem.sender === 'seller' ? 'none' : '1px solid rgba(0,0,0,0.04)'
                                    }}
                                >
                                    <div>{msgItem.text}</div>
                                    <span style={{ fontSize: '0.65rem', alignSelf: 'flex-end', display: 'block', textTransform: 'uppercase', marginTop: '0.25rem', opacity: 0.7 }}>
                                        {msgItem.time}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '0.8rem 1rem', display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', background: 'white' }}>
                            <input
                                type="text"
                                placeholder={`Write answer description for ${activeUser}...`}
                                value={newMessageText}
                                onChange={e => setNewMessageText(e.target.value)}
                                style={{ flex: 1, padding: '0.5rem 0.8rem', borderRadius: '0.5rem', border: '1px solid rgba(0,0,0,0.08)', fontSize: '0.85rem' }}
                                onKeyDown={e => e.key === 'Enter' && handleSendMessage(activeUser)}
                            />
                            <button
                                onClick={() => handleSendMessage(activeUser)}
                                style={{ border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 650, borderRadius: '0.5rem', padding: '0.5rem 1.25rem', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                                Send
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    const renderStoreProfile = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem', width: '100%', maxWidth: 'none' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Store Brand Profile</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure client-facing storefront banners, bio profiles, and descriptors.</p>

            {profileSuccess && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                    {profileSuccess}
                </div>
            )}

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                    <label className="form-label">Storefront Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={profileName}
                        onChange={e => setProfileName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Storefront bio / description</label>
                    <textarea
                        rows="3"
                        className="form-input"
                        value={profileBio}
                        onChange={e => setProfileBio(e.target.value)}
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="form-label">Logo Image URL</label>
                        <input
                            type="text"
                            className="form-input"
                            value={profileLogo}
                            onChange={e => setProfileLogo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Banner Image URL</label>
                        <input
                            type="text"
                            className="form-input"
                            value={profileBanner}
                            onChange={e => setProfileBanner(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="form-button" style={{ width: 'auto', padding: '0.64rem 1.8rem' }}>
                    Save Branding Configurations
                </button>
            </form>
        </div>
    );

    const renderStoreSettings = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem', width: '100%', maxWidth: 'none' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Store Configurations</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Audit merchant shipping fees, default VAT registrations, and payout frequency rules.</p>

            {settingsSuccess && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                    {settingsSuccess}
                </div>
            )}

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                    <label className="form-label">Default Shipping Fee ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-input"
                        value={shipFee}
                        onChange={e => setShipFee(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">VAT / Corporate TAX Registry Code</label>
                    <input
                        type="text"
                        className="form-input"
                        value={vatCode}
                        onChange={e => setVatCode(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Default Payout Frequency</label>
                    <select
                        className="form-input"
                        value={payoutFreq}
                        onChange={e => setPayoutFreq(e.target.value)}
                        style={{ padding: '0.6rem' }}
                    >
                        <option value="Weekly">Weekly Transfers</option>
                        <option value="Bi-Weekly">Bi-Weekly Transfers</option>
                        <option value="Monthly">Monthly Transfers</option>
                        <option value="Manual">Manual Request Only</option>
                    </select>
                </div>

                <button type="submit" className="form-button" style={{ width: 'auto', padding: '0.64rem 1.8rem' }}>
                    Save Configurations
                </button>
            </form>
        </div>
    );

    const renderSellerSupport = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

                {/* Tickets form */}
                <div className="premium-card" style={{ margin: 0, padding: '2.5rem', width: '100%', maxWidth: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Open Merchant Support Case</h3>

                    {ticketSuccess && (
                        <div style={{ marginBottom: '1.2rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.85rem' }}>
                            {ticketSuccess}
                        </div>
                    )}

                    <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                placeholder="E.g. Bank payout delay"
                                value={ticketSubject}
                                onChange={e => setTicketSubject(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                value={ticketCategory}
                                onChange={e => setTicketCategory(e.target.value)}
                                style={{ padding: '0.6rem' }}
                            >
                                <option value="Billing">Billing & Payouts</option>
                                <option value="Inventory">Inventory Sync</option>
                                <option value="Acc-Policy">Account & Policy</option>
                                <option value="Tech-Issues">Technical Issues</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Inquiry Message</label>
                            <textarea
                                rows="3"
                                placeholder="State your support request in detail..."
                                value={ticketMessage}
                                onChange={e => setTicketMessage(e.target.value)}
                                className="form-input"
                                style={{ resize: 'vertical' }}
                                required
                            />
                        </div>

                        <button type="submit" className="form-button">
                            Submit Support Ticket
                        </button>
                    </form>
                </div>

                {/* Open support tickets list */}
                <div className="premium-card" style={{ margin: 0, padding: '2.5rem', width: '100%', maxWidth: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Open Support Cases</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {supportTickets.map(t => (
                            <div
                                key={t.id}
                                style={{
                                    padding: '1rem',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    background: 'rgba(255,255,255,0.4)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 650, fontSize: '0.9rem' }}>{t.subject}</div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.id} | {t.date} | Category: {t.category}</span>
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '0.5rem',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981'
                                }}>{t.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Support FAQs */}
            <div className="premium-card" style={{ margin: 0, padding: '2.5rem', width: '100%', maxWidth: 'none' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.9rem' }}>
                    <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Q: When are payout transfers completed?</div>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>A: Once requested, bank transfers are reviewed and processed within 2-3 business days.</p>
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Q: How do I configure low-stock push triggers?</div>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>A: If item stock drops to or below 5 units, a depletion push flag is automatically triggered in the inventory panel.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const allowed = ['messages', 'store_profile', 'store_settings', 'seller_support'];
    if (!allowed.includes(activeSubTab)) return null;

    switch (activeSubTab) {
        case 'messages':
            return renderMessages();
        case 'store_profile':
            return renderStoreProfile();
        case 'store_settings':
            return renderStoreSettings();
        case 'seller_support':
            return renderSellerSupport();
        default:
            return null;
    }
}

export default StoreSettingsManager;
