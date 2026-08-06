import React, { useState } from 'react';

function FAQ() {
    const categories = ['General', 'Hardware tuning', 'Shipping & Returns', 'Seller Portal'];

    const faqData = [
        {
            category: 'General',
            question: 'What makes CommerceCraft different from typical tech shops?',
            answer: 'CommerceCraft is a curated hub focused specifically on premium typing mechanics, custom acoustics, and verified high-fidelity peripherals. We audit every listing for latency, case design, and sound profiles so you get exactly what you need.'
        },
        {
            category: 'General',
            question: 'Can anyone sell custom mechanical keyboards on CommerceCraft?',
            answer: 'Yes! Certified custom builders can apply. Our engineering team reviews sample builds for solder quality, stabilization alignment, and acoustic integrity before authorizing dashboard seller privileges.'
        },
        {
            category: 'Hardware tuning',
            question: 'What is the differences between Linear, Tactile, and Clicky switches?',
            answer: 'Linear switches offer a smooth, silent keypress without tactile feedback. Tactile switches feature a physical bump during actuation for precise typing. Clicky switches deliver both a physical bump and a crisp audible sound. You can explore sound profiles on our category pages.'
        },
        {
            category: 'Hardware tuning',
            question: 'What does "Lubing switches" do, and is it necessary?',
            answer: 'Lubricating switch sliders and internal springs using Krytox composite decreases friction. It eliminates mechanical scratchiness and high-pitch metallic resonance, giving key presses a deep, buttery acoustic profile.'
        },
        {
            category: 'Shipping & Returns',
            question: 'How long does my custom keyboard order take to reach me?',
            answer: 'Typically, items are hand-tuned and sound validated within 3 to 6 business days. Express shipping takes an additional 2 to 4 days. Full crates take 3 to 5 business days using our White-Glove service.'
        },
        {
            category: 'Shipping & Returns',
            question: 'Can I return custom-lubricated switches or soldered plates?',
            answer: 'Because custom-soldering and manual lubrication alter the physical state of components permanently, we cannot accept returns on soldered PCBs or switches lubed by the customer. Please review our Refund Policy page for full details.'
        },
        {
            category: 'Seller Portal',
            question: 'How are seller payments processed and secured?',
            answer: 'CommerceCraft integrates multi-vendor dashboard controls. Payments from buyers are placed in a secure vault during the build phase. Once the tracking courier logs a "Delivered" scan, the escrow fund is credited to the seller balance.'
        }
    ];

    const [activeTab, setActiveTab] = useState('General');
    const [openIndex, setOpenIndex] = useState(null);

    const filteredFaq = faqData.filter(item => item.category === activeTab);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Frequently Asked Questions</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Find answers about typing acoustics, shipment containers, and vendor tools
                    </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveTab(cat); setOpenIndex(null); }}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '1.5rem',
                                border: '1px solid ' + (activeTab === cat ? 'var(--accent)' : 'var(--glass-border)'),
                                background: activeTab === cat ? 'var(--accent)' : 'var(--glass-bg)',
                                color: activeTab === cat ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 650,
                                transition: 'all 0.2s',
                                boxShadow: activeTab === cat ? '0 4px 12px var(--accent-glow)' : 'none'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredFaq.length > 0 ? (
                        filteredFaq.map((item, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="premium-card"
                                    style={{
                                        margin: 0,
                                        width: '100%',
                                        maxWidth: 'none',
                                        padding: '1.5rem 2rem',
                                        cursor: 'pointer',
                                        borderColor: isOpen ? 'rgba(202, 138, 4, 0.3)' : 'var(--glass-border)',
                                        boxShadow: isOpen ? '0 10px 25px rgba(234, 179, 8, 0.05)' : 'none',
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-main)', paddingRight: '1rem' }}>
                                            {item.question}
                                        </h3>
                                        <span style={{ fontSize: '1.25rem', color: 'var(--accent)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                                            ＋
                                        </span>
                                    </div>

                                    {isOpen && (
                                        <div style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '1rem', cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No questions in this category yet.</p>
                    )}
                </div>

            </div>
        </main>
    );
}

export default FAQ;
