import React from 'react';

function RefundPolicy() {
    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Refund & Returns Policy</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        14-day stress-free warranty and custom parts terms
                    </p>
                </div>

                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', lineHeight: '1.75' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.75rem' }}>
                        1. 14-Day Return Window
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        We want you to love your typing and sound layout. We accept returns for eligible parts, switches, keycaps, and DIY kits within 14 calendar days of confirmed courier delivery.
                    </p>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        2. Conditions for Custom & Lubed Accessories
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        Because typing setups are highly personal, some components are subject to special return guidelines:
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Lubricated Switches:</strong> Switches that have been manually lubricated by the buyer (using Krytox or other lubricants) are ineligible for refund, as lubrication alters the factory sound profile permanently.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Soldered PCBs:</strong> Motherboards that have been keyswitch soldered cannot be returned unless they contain original tracer faults. Please test your PCB using key-tweezers BEFORE soldering.</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Complete Prebuilt Custom Keyboards:</strong> Prebuilt keyboards assembled by our custom builders are subject to a 10% restocking fee, as they must be disassembled, sound-audited, and deep-cleaned.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        3. Returns Routing Process
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        To launch a return and secure a refund:
                    </p>
                    <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Open a support ticket through our <a href="/contact" style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}>Contact Support</a> form.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Our technician will review the ticket and dispatch an authorized RMA shipment label.</li>
                        <li style={{ marginBottom: '0.5rem' }}>Re-pack items securely (ideally in the original shipping box or timber crate, if applicable) and ship.</li>
                    </ol>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                        4. Refund Approval & Timelines
                    </h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                        Once your return arrives and passes our mechanical integrity check, we will issue a credit to your original method of payment. Please allow 5 - 7 business days for banking institutions to post this credit to your ledger.
                    </p>
                </div>

            </div>
        </main>
    );
}

export default RefundPolicy;
