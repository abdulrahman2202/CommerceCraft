import React from 'react';

function PrivacyPolicy() {
    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Privacy Policy</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Effective Date: August 6, 2026 | Version 1.2
                    </p>
                </div>

                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', lineHeight: '1.75' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        At CommerceCraft, accessible from commercecraft.io, one of our main priorities is the privacy of our visitors and registered users. This Privacy Policy document outlines the types of information we collect, record, and how we utilize it.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        1. Information We Collect
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        If you create an account, purchase custom acoustics equipment, or request seller authorization, we may collect the following data:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Personal Identification:</strong> Name, physical shipping address, email address, password hashes, and phone numbers.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Transaction details:</strong> Billing addresses, purchase logs, cart state logs, wishlist items, and payment gateway references (we do not store raw credit card details directly).</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Seller Data:</strong> For creators listing custom hardware, we collect store names, bank account routing keys for payout synchronization, and detailed inventory metrics.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        2. How We Use Your Data
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        We process your information in pursuit of our legitimate commercial interest, including:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Ensuring double-encrypted checkouts and processing orders successfully.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Synchronizing seller dashboards and routing buyer shipping coordinates to independent merchant curators.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Conducting security audits on multi-factor authentication (MFA) requests.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        3. Sharing Ledger with Third-Party Sellers
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        CommerceCraft is a multi-vendor platform. When you buy custom mechanical switches or prebuilt plates directly from a verified seller, your name and physical delivery address are shared with that specific vendor solely for shipping fulfillment and hardware warranty support. Sellers are contractually prohibited from using your contact info for unrelated marketing.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        4. Security Standards
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        We implement transport layer security (HTTPS) and encrypt all cookies, authentication tokens, and user credentials. All database backups are stored behind robust firewall networks with limited administrative access.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        5. Contacting Our Data Officer
                    </h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        If you have any questions, wish to export your profile records, or request complete account erasure, contact our data team at <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>privacy@commercecraft.io</span>.
                    </p>
                </div>

            </div>
        </main>
    );
}

export default PrivacyPolicy;
