import React from 'react';

function About() {
    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
                    <span className="hero-badge">Engineering Modern Interaction</span>
                    <h1 className="gradient-title" style={{ marginTop: '0.5rem' }}>We Craft Perfect Gear</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        CommerceCraft is a state-of-the-art tech ecosystem catering to enthusiasts who value aesthetics, hardware acoustics, and custom input tactile perfection.
                    </p>
                </div>

                {/* Core Philosophy Card */}
                <div className="premium-card" style={{ margin: '0 0 3rem 0', width: '100%', maxWidth: 'none' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
                        Our Philosophy
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                        We believe that the tools you handle daily should not just be functional—they should be a natural extension of your creative thoughts. CommerceCraft was founded in 2024 by engineers and musicians who shared a common frustration with cheap, hollow plastic peripherals. We set out to build and curate keyboards, accessories, and audio setups crafted from aircraft-grade aluminum, brass, and premium sound-absorbing composites.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8' }}>
                        Every product listing on our platform undergoes a strict acoustics and latency audit. Whether you are a software developer drafting your next codebase, a composer mapping virtual instruments, or a gamer seeking frame-accurate input, our gear guarantees unmatched feedback.
                    </p>
                </div>

                {/* Responsive 3-Column Highlights Grid */}
                <div className="categories-grid" style={{ margin: '0 0 4rem 0', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div className="category-card" style={{ padding: '2rem', textAlign: 'left' }}>
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🎹</span>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'var(--text-main)' }}>Custom Acoustics</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                            We calibrate sound dampening paths, offering distinct resonance stages: from the quiet, deep "thock" to crisp, tactile mechanical responsiveness.
                        </p>
                    </div>

                    <div className="category-card" style={{ padding: '2rem', textAlign: 'left' }}>
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🔬</span>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'var(--text-main)' }}>Hand-Inspected</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                            Every order is hand-assembled, lubricated, and sound-checked. Verified batches receive a signed physical Certificate of Acoustics.
                        </p>
                    </div>

                    <div className="category-card" style={{ padding: '2rem', textAlign: 'left' }}>
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🛡️</span>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'var(--text-main)' }}>Enthusiast Support</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                            Buy with confidence. Enjoy life-time support on switches, custom firmware troubleshooting, and detailed setup schematics.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', textAlign: 'center' }}>
                        Crafted by Experts
                    </h2>
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                        Meet the engineering minds behind CommerceCraft's strict hardware standards.
                    </p>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div className="premium-card" style={{ flex: '1 1 280px', margin: 0, padding: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white' }}>
                                👨‍💻
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Marcus Thorne</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Founder & Firmware Lead</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                                Keyboard enthusiast and embedded systems engineer. Designed the low-latency QMK-compatible controllers powering our top-tier boards.
                            </p>
                        </div>

                        <div className="premium-card" style={{ flex: '1 1 280px', margin: 0, padding: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white' }}>
                                👩‍🎨
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Evelyn Zhao</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Industrial Designer</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                                Obsessed with bezel ratios, structural integrity, and ergonomic curve models. Evelyn crafts our premium housings from monolithic aluminum billets.
                            </p>
                        </div>

                        <div className="premium-card" style={{ flex: '1 1 280px', margin: 0, padding: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white' }}>
                                🔊
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Julian Vance</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Acoustic Architect</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                                Former recording studio mixer. Julian curates custom plate layouts, gasket structural mounts, and case sound absorption foam density.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default About;
