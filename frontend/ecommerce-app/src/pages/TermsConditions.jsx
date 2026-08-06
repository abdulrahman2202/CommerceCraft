import React from 'react';

function TermsConditions() {
    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <span className="hero-badge" style={{ fontSize: '0.75rem' }}>Ecosystem Protocol</span>
                    <h1 className="gradient-title" style={{ marginTop: '0.5rem' }}>Terms & Conditions</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Last Updated: August 6, 2026
                    </p>
                </div>

                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', lineHeight: '1.75' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Welcome to CommerceCraft. By accessing our platform, registering an account, purchasing specialized custom technology, or engaging with our seller network, you agree to be bound by the following terms and guidelines.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        1. Account Integrity
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        To access certain features including the Cart checkout, Wishlist syncing, or the Seller Portal, users must create a profile. You are responsible for preserving credentials confidentiality. We reserve the right to suspend accounts providing fraudulent verification information.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        2. Marketplace Conduct & Custom Orders
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        CommerceCraft serves as a premium interface connecting mechanical keyboard and components builders with clients. Buyers acknowledge that customized hardware builds (e.g. hand-soldered, hand-lubricated switches) may exhibit micro-structural variations, which do not constitute manufacturing defects.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        3. Pricing & Shipping Coordinates
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        Prices are determined dynamically by independent seller inventories. Buyers agree to cover designated taxes, local customs duty, and shipping expenses listed during checkout. Inaccurate shipping information causing package failure will be subject to redirection storage fees.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        4. Intellectual Property
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        The design components, custom graphics, firmware configuration bundles, names, logos, and custom sound tests featured on CommerceCraft are properties of their respective owners. Users may not scrape products lists or reproduce brand designs without concrete written authorization.
                    </p>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        5. Revisions of Terms
                    </h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        We reserve the right to update these terms at any given time. If you continue using the site post-updates, it signals your implicit agreement to the corrected terms.
                    </p>
                </div>

            </div>
        </main>
    );
}

export default TermsConditions;
