import React from 'react';

function ShippingPolicy() {
    const shippingTiers = [
        { name: 'Standard Insured Economy', cost: '$4.99', duration: '5 - 10 Business Days', details: 'Delivered via local post. Package tracking provided.' },
        { name: 'Enthusiast Air Express (DHL/FedEx)', cost: '$14.99', duration: '2 - 4 Business Days', details: 'Recommended for delicate audio plates.' },
        { name: 'White-Glove Wood-Crate Courier', cost: '$29.99', duration: '3 - 5 Business Days', details: 'Shipped in custom shockproof wooden build boxes.' }
    ];

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Shipping Policy</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Fulfillment, protective crates, and global transit guidelines
                    </p>
                </div>

                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', lineHeight: '1.75' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem' }}>
                        1. Handcraft & Assembly Lead Times
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        CommerceCraft aggregates listings from both commercial manufacturers and independent custom builders. Because many items—such as hand-lubricated linear switches, soldered mechanical PCBs, and custom artisan wrist rests—are built to order, please note our typical preparation windows:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>In-Stock Parts & Accessories:</strong> Dispatched within 24 - 48 Hours.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Prebuilt Custom Keyboards:</strong> Require 3 - 6 business days for assembly, stabilization tuning, and sound signature validation tests.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem' }}>
                        2. Shipping Tiers & Estimates
                    </h2>
                    <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)' }}>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Tier name</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Cost</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Estimated Transit</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Optimal Use Case</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shippingTiers.map((tier, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600 }}>{tier.name}</td>
                                        <td style={{ padding: '0.85rem 0.5rem', color: 'var(--accent)' }}>{tier.cost}</td>
                                        <td style={{ padding: '0.85rem 0.5rem' }}>{tier.duration}</td>
                                        <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-muted)' }}>{tier.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2.5rem', marginBottom: '0.75rem' }}>
                        3. Custom Timber Crate Couriers
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        To guarantee high-end keyboards reach clients without structural warping or micro-scratches on polished brass weights, orders using White-Glove Shipping are encased in customized, shockproof wooden blocks. We ship these with dampening humidity packs to align with ambient metal requirements.
                    </p>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        4. Address Verification & Missing Deliveries
                    </h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        If a parcel tracker reports "Delivered" but you cannot locate your crate, contact our support portal within 7 days. We insure all Developer and White-Glove dispatches up to $1,500, but cannot cover packages lost due to buyer address entry errors.
                    </p>
                </div>

            </div>
        </main>
    );
}

export default ShippingPolicy;
