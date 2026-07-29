import React, { useState } from 'react';

function FinancialsManager({
    activeSubTab,
    coupons,
    setCoupons,
    transactions,
    setTransactions,
    payoutBalance,
    setPayoutBalance
}) {
    // Coupon form states
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState('');
    const [couponLimit, setCouponLimit] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [couponError, setCouponError] = useState('');

    // Payout states
    const [payoutAmount, setPayoutAmount] = useState('');
    const [accountNumber, setAccountNumber] = useState('Ending in 8091');
    const [payoutSuccess, setPayoutSuccess] = useState('');
    const [payoutError, setPayoutError] = useState('');

    const handleCreateCoupon = (e) => {
        e.preventDefault();
        setCouponSuccess('');
        setCouponError('');

        const code = couponCode.trim().toUpperCase();
        const disc = parseFloat(couponDiscount);
        const lim = parseInt(couponLimit, 10);

        if (!code || isNaN(disc) || isNaN(lim)) {
            setCouponError('Please supply all required discount configurations.');
            return;
        }

        if (disc <= 0 || disc > 100) {
            setCouponError('Discount percentage must be between 1% and 100%.');
            return;
        }

        if (lim <= 0) {
            setCouponError('Usage limits must be at least 1.');
            return;
        }

        const newCoupon = {
            code,
            discount: disc,
            limit: lim,
            used: 0,
            status: 'Active'
        };

        setCoupons([newCoupon, ...coupons]);
        setCouponSuccess('🎉 Discount coupon successfully configured!');
        setCouponCode('');
        setCouponDiscount('');
        setCouponLimit('');
    };

    const handlePayoutRequest = (e) => {
        e.preventDefault();
        setPayoutSuccess('');
        setPayoutError('');

        const amt = parseFloat(payoutAmount);
        if (isNaN(amt) || amt <= 0) {
            setPayoutError('Please input a valid payout amount.');
            return;
        }

        if (amt > payoutBalance) {
            setPayoutError('Payout exceeds active account reserves.');
            return;
        }

        setPayoutBalance(prev => prev - amt);

        // Add a payout transaction
        const newTransaction = {
            id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            date: new Date().toLocaleDateString(),
            type: 'Payout Transfer',
            amount: -amt,
            status: 'Processing'
        };

        setTransactions([newTransaction, ...transactions]);
        setPayoutSuccess('🎉 Payout transfer request initiated successfully!');
        setPayoutAmount('');
    };

    const renderCoupons = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Discount Control Panel</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Generate markdown, percent ratios, and usage limits campaigns.</p>

            <form onSubmit={handleCreateCoupon} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Coupon Code</label>
                    <input
                        type="text"
                        placeholder="E.g. ACC-25-KEYS"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Discount (%)</label>
                    <input
                        type="number"
                        placeholder="25"
                        value={couponDiscount}
                        onChange={e => setCouponDiscount(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Usage Limit</label>
                    <input
                        type="number"
                        placeholder="100"
                        value={couponLimit}
                        onChange={e => setCouponLimit(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button type="submit" className="form-button" style={{ padding: '0.64rem 1rem' }}>
                        Generate Coupon
                    </button>
                </div>
            </form>

            {couponError && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.9rem' }}>
                    {couponError}
                </div>
            )}

            {couponSuccess && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.9rem' }}>
                    {couponSuccess}
                </div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Coupon Code</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Discount Ratio</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Usage Meter</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Campaign Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(c => (
                            <tr key={c.code} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem' }}>
                                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>{c.code}</td>
                                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent)', fontWeight: 650 }}>{c.discount}% OFF</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{c.used} / {c.limit} used</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: 700,
                                        background: c.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.06)',
                                        color: c.status === 'Active' ? '#10b981' : 'var(--text-muted)'
                                    }}>{c.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderPayouts = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Balance Summary Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Available Account Reserves</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)' }}>${payoutBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem', marginBottom: 0 }}>This is processed sales revenue currently cleared for payouts.</p>
                </div>

                <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 750, marginBottom: '1.25rem' }}>Trigger Funds Transfer</h3>
                    <form onSubmit={handlePayoutRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Amount to transfer ($)"
                                value={payoutAmount}
                                onChange={e => setPayoutAmount(e.target.value)}
                                className="form-input"
                                style={{ flex: 1, marginBottom: 0 }}
                                required
                            />
                            <button type="submit" className="form-button" style={{ width: 'auto', padding: '0.64rem 1.25rem' }}>
                                Transfer
                            </button>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Funds will routing into your linked bank account: <b>{accountNumber}</b>.
                        </span>
                    </form>

                    {payoutError && (
                        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8rem' }}>
                            {payoutError}
                        </div>
                    )}

                    {payoutSuccess && (
                        <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem' }}>
                            {payoutSuccess}
                        </div>
                    )}
                </div>
            </div>

            {/* Payout History */}
            <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Payout Activity Log</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '400px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                                <th style={{ padding: '0.75rem 0.5rem' }}>Destination</th>
                                <th style={{ padding: '0.75rem 0.5rem' }}>Amount</th>
                                <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.filter(t => t.type === 'Payout Transfer').map(t => (
                                <tr key={t.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem' }}>
                                    <td style={{ padding: '0.75rem 0.5rem' }}>{t.date}</td>
                                    <td style={{ padding: '0.75rem 0.5rem' }}>{accountNumber}</td>
                                    <td style={{ padding: '0.75rem 0.5rem', color: '#ef4444', fontWeight: 650 }}>-${Math.abs(t.amount)}</td>
                                    <td style={{ padding: '0.75rem 0.5rem' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: 700,
                                            background: t.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 193, 7, 0.15)',
                                            color: t.status === 'Completed' ? '#10b981' : '#f59e0b'
                                        }}>{t.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderTransactions = () => (
        <div className="premium-card" style={{ margin: 0, padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Payment Transactions Ledger</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Comprehensive record of cash receipts, refunds, and transfer logs.</p>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Transaction UUID</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Type</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Amount</th>
                            <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 650 }}>{t.id}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{t.date}</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>{t.type}</td>
                                <td style={{
                                    padding: '0.75rem 0.5rem',
                                    fontWeight: 700,
                                    color: t.amount > 0 ? '#10b981' : '#ef4444'
                                }}>
                                    {t.amount > 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: 700,
                                        background: t.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: t.status === 'Completed' ? '#10b981' : '#f59e0b'
                                    }}>{t.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const allowed = ['coupons', 'payouts', 'transactions'];
    if (!allowed.includes(activeSubTab)) return null;

    switch (activeSubTab) {
        case 'coupons':
            return renderCoupons();
        case 'payouts':
            return renderPayouts();
        case 'transactions':
            return renderTransactions();
        default:
            return null;
    }
}

export default FinancialsManager;
