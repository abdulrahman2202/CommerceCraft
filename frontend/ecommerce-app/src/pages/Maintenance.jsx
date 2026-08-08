import React from 'react';

function Maintenance() {
    return (
        <main className="page-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>

                {/* Maintenance Shell */}
                <div className="premium-card" style={{ margin: 0, width: '100%', padding: '4rem 2.5rem' }}>
                    <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem', animation: 'pulse 2s infinite' }}>
                        ⚙️
                    </div>

                    <h1 className="gradient-title" style={{ fontSize: '2rem', lineHeight: '1.2', margin: '0 0 1rem 0', display: 'inline-block' }}>
                        Acoustic Calibrations in Progress
                    </h1>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                        CommerceCraft arrays are currently offline undergoing routine soldering inspections, switch lubing cycles, and central database tuning sweeps.
                    </p>

                    {/* Progress Bar Widget */}
                    <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 650 }}>
                            <span>Re-aligning Keyboard Registries</span>
                            <span>95% Completed</span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: 'rgba(0,0,0,0.06)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <div style={{
                                width: '95%',
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)',
                                borderRadius: '4px',
                                boxShadow: '0 0 8px var(--accent-glow)'
                            }} />
                        </div>
                    </div>

                    {/* Notifications warning */}
                    <div style={{
                        borderRadius: '0.75rem',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        padding: '1.2rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-main)',
                        lineHeight: '1.5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        justifyContent: 'center'
                    }}>
                        📧 Need support? Reach out direct at <strong style={{ color: 'var(--accent)' }}>operations@commercecraft.io</strong>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default Maintenance;
