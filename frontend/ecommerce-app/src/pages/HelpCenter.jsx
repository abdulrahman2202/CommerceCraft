import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ_DATA = [
    {
        id: 1,
        category: 'orders',
        q: 'How can I trace my package delivery route?',
        a: 'Navigate to "My Orders" in the utility bar, click "View Details" on the relevant card, and you will see a detailed real-time milestones timeline tracking your parcel\'s progress.'
    },
    {
        id: 2,
        category: 'orders',
        q: 'Am I allowed to change my delivery address after placing an order?',
        a: 'Since we process orders immediately using express fulfillment lanes, address changes are only possible within 30 minutes of order placement. Please contact support via our Contact Page urgently.'
    },
    {
        id: 3,
        category: 'payments',
        q: 'Which cards and networks do you accept?',
        a: 'We support Visa, Mastercard, American Express, and Discover networks. All payments are verified locally and simulated securely with client-side token mocks.'
    },
    {
        id: 4,
        category: 'hardware',
        q: 'What are CommerceCraft warranty parameters?',
        a: 'All electronics sold carry a 1-Year Store Warranty by default. This covers factory mechanical failures or connectivity faults. Physical damage is not covered under our policy.'
    },
    {
        id: 5,
        category: 'hardware',
        q: 'What is your return & restocking policy?',
        a: 'We offer a 30-day money-back guarantee. If you are not satisfied, return the device in its custom brand-box packaging. A standard 10% premium restocking fee is applied for open-box tech.'
    },
    {
        id: 6,
        category: 'account',
        q: 'How do I add a new payment card or delivery location address?',
        a: 'Go to your "My Account" dashboard by clicking the profile icon next to the cart, select either "Saved Addresses" or "Saved Payments" in the sidebar, fill out the form parameters, and press Save.'
    }
];

function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, orders, payments, hardware, account
    const [openFaq, setOpenFaq] = useState(null);

    // Toggle FAQ accordion
    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    // Filter FAQs
    const filteredFaqs = FAQ_DATA.filter((faq) => {
        const matchesTab = activeTab === 'all' || faq.category === activeTab;
        const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Help Center</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Browse helpful tutorials, policies, and frequently asked diagnostic questions.
                    </p>
                </div>

                {/* FAQ Search bar */}
                <div className="premium-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Search FAQ keywords (e.g. 'warranty', 'delivery', 'card')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem 1rem 2.8rem',
                                borderRadius: '0.8rem',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.65)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                boxSizing: 'border-box'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', opacity: 0.5 }}>🔍</span>
                    </div>
                </div>

                {/* FAQ Categorization Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {['all', 'orders', 'payments', 'hardware', 'account'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setOpenFaq(null);
                            }}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '999px',
                                border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--glass-border)'}`,
                                background: activeTab === tab ? 'var(--accent)' : 'var(--glass-bg)',
                                color: activeTab === tab ? 'white' : 'var(--text-main)',
                                cursor: 'pointer',
                                fontWeight: activeTab === tab ? 700 : 500,
                                textTransform: 'capitalize',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab === 'all' ? 'All Questions' : tab}
                        </button>
                    ))}
                </div>

                {/* Accordion FAQ Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                    {filteredFaqs.length === 0 ? (
                        <div className="premium-card" style={{ padding: '3rem', textAlign: 'center', margin: 0 }}>
                            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>💡</span>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>No matching FAQ answers found for "{searchQuery}".</p>
                        </div>
                    ) : (
                        filteredFaqs.map((faq) => {
                            const isOpen = openFaq === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className="premium-card"
                                    style={{
                                        margin: 0,
                                        width: '100%',
                                        maxWidth: 'none',
                                        padding: '1.2rem 1.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        background: isOpen ? 'rgba(255,255,255,0.85)' : 'var(--glass-bg)'
                                    }}
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>
                                            {faq.q}
                                        </h3>
                                        <span style={{ fontSize: '1.2rem', color: 'var(--accent)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                                            ▼
                                        </span>
                                    </div>

                                    {/* Accordion Slide block */}
                                    <div style={{
                                        maxHeight: isOpen ? '500px' : '0',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease-in-out',
                                        opacity: isOpen ? 1 : 0,
                                        marginTop: isOpen ? '1rem' : 0
                                    }}>
                                        <p style={{
                                            margin: 0,
                                            paddingTop: '0.5rem',
                                            borderTop: '1px solid rgba(0,0,0,0.05)',
                                            color: 'var(--text-muted)',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.6',
                                            cursor: 'default'
                                        }} onClick={(e) => e.stopPropagation()}>
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Sticky Contact Prompt */}
                <div className="premium-card" style={{ padding: '2rem', textAlign: 'center', marginTop: '2rem', margin: 0, width: '100%', maxWidth: 'none' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Still need support?</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        If you cannot find details about your specific situation above, you can submit a support ticket directly.
                    </p>
                    <Link to="/contact" className="hero-btn" style={{ padding: '0.65rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
                        Submit Support Ticket &rarr;
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default HelpCenter;
