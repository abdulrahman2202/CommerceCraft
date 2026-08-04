import React, { useState } from 'react';

function AdminSystemConfig({
    activeSubTab,
    setActiveSubTab,
    notificationsList,
    setNotificationsList,
    paymentsConfig,
    setPaymentsConfig,
    payoutsHistory,
    setPayoutsHistory,
    rolePermissions,
    setRolePermissions,
    activityLogs,
    handleUpdateSettings
}) {
    // Return early if not targeting settings/system tabs
    const validTabs = ['notifications', 'payments', 'roles', 'settings', 'logs'];
    if (!validTabs.includes(activeSubTab)) return null;

    const [newNotify, setNewNotify] = useState({ title: '', body: '', type: 'alert' });
    const [searchLog, setSearchLog] = useState('');

    // Send platform broadcast notification
    const handleBroadcastAlert = (e) => {
        e.preventDefault();
        if (!newNotify.title.trim() || !newNotify.body.trim()) return;

        const noticeObj = {
            id: notificationsList.length + 1,
            type: newNotify.type,
            title: newNotify.title.trim(),
            body: newNotify.body.trim(),
            time: new Date().toLocaleString(),
            read: false
        };

        setNotificationsList(prev => [noticeObj, ...prev]);
        alert('🎉 System Notice broadcast active in client layout banners!');
        setNewNotify({ title: '', body: '', type: 'alert' });
    };

    // Filter activity logs by text
    const filteredLogs = activityLogs.filter(log =>
        log.admin.toLowerCase().includes(searchLog.toLowerCase()) ||
        log.action.toLowerCase().includes(searchLog.toLowerCase()) ||
        log.target.toLowerCase().includes(searchLog.toLowerCase())
    );

    // Toggle access capability checkboxes
    const handleToggleCapability = (index, capability) => {
        setRolePermissions(prev => prev.map((roleObj, idx) => {
            if (idx === index) {
                return { ...roleObj, [capability]: !roleObj[capability] };
            }
            return roleObj;
        }));
    };

    return (
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* 1. Notifications Page */}
            {activeSubTab === 'notifications' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.95fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>System Alerts Feed Log</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '420px', overflowY: 'auto' }}>
                            {notificationsList.map((ann) => (
                                <div
                                    key={ann.id}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.64rem',
                                        background: ann.read ? 'rgba(255,255,255,0.25)' : 'rgba(234, 179, 8, 0.05)',
                                        border: `1px solid ${ann.read ? 'rgba(0,0,0,0.05)' : 'rgba(234,179,8,0.2)'}`,
                                        position: 'relative'
                                    }}
                                >
                                    {!ann.read && (
                                        <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '8px', height: '8px', borderRadius: '5%', background: 'var(--accent)' }}></span>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '1.1rem' }}>{ann.type === 'alert' ? '⚠️' : ann.type === 'seller' ? '🏢' : '📄'}</span>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{ann.title}</h4>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ann.body}</p>
                                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Sent: {ann.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Broadcast admin Message</h3>
                        <form onSubmit={handleBroadcastAlert}>
                            <div className="form-group">
                                <label className="form-label">Alert Severity Type</label>
                                <select
                                    value={newNotify.type}
                                    onChange={(e) => setNewNotify({ ...newNotify, type: e.target.value })}
                                    className="form-input"
                                    style={{ padding: '0.6rem' }}
                                >
                                    <option value="alert">System Alert Notice</option>
                                    <option value="seller">Seller Signup Broadcast</option>
                                    <option value="report">Telemetry Teleprompt</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Notice Header</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Server maintenance scheduled"
                                    value={newNotify.title}
                                    onChange={(e) => setNewNotify({ ...newNotify, title: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="form-label">Detailed Message</label>
                                <textarea
                                    required
                                    rows="3"
                                    placeholder="e.g. All gateway routes will be paused tonight at 04:00 GMT..."
                                    value={newNotify.body}
                                    onChange={(e) => setNewNotify({ ...newNotify, body: e.target.value })}
                                    className="form-input"
                                    style={{ fontFamily: 'inherit', resize: 'vertical' }}
                                />
                            </div>
                            <button type="submit" className="form-button" style={{ background: 'var(--text-main)', color: 'white' }}>
                                Broadcast live Notification
                            </button>
                        </form>
                    </div>

                </div>
            )}

            {/* 2. Payments & Gateway Settings */}
            {activeSubTab === 'payments' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)', gap: '1.5rem', flexWrap: 'wrap' }}>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Payout Commission Logs</h3>

                        <div style={{ overflowX: 'auto', width: '100%' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Payout ID</th>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Seller Company</th>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Transferred</th>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Time</th>
                                        <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payoutsHistory.map(pay => (
                                        <tr key={pay.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                            <td style={{ padding: '0.75rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{pay.id}</td>
                                            <td style={{ padding: '0.75rem', fontWeight: 600 }}>{pay.seller}</td>
                                            <td style={{ padding: '0.75rem', fontWeight: 700 }}>${pay.amount.toFixed(2)}</td>
                                            <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{pay.date}</td>
                                            <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                                <span style={{
                                                    fontSize: '0.65rem',
                                                    fontWeight: 800,
                                                    padding: '0.15rem 0.4rem',
                                                    borderRadius: '0.2rem',
                                                    background: pay.status === 'Success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                    color: pay.status === 'Success' ? '#10b981' : '#f59e0b'
                                                }}>{pay.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.2rem' }}>Payment Gateway config</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Active Payment Router</span>
                                <span style={{ fontWeight: 700 }}>{paymentsConfig.gatewayMethod}</span>
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>API Endpoint Status</span>
                                <span style={{ fontWeight: 800, color: '#10b981' }}>CONNECTED / {paymentsConfig.gatewayStatus}</span>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                                <label className="form-label" style={{ fontSize: '0.75rem' }}>Modify Provider Method</label>
                                <select
                                    value={paymentsConfig.gatewayMethod}
                                    onChange={(e) => setPaymentsConfig(prev => ({ ...prev, gatewayMethod: e.target.value }))}
                                    className="form-input"
                                    style={{ padding: '0.6rem', marginTop: '0.25rem' }}
                                >
                                    <option value="Stripe Direct Connect">Stripe Direct Connect</option>
                                    <option value="PayPal Standard business">PayPal Business Standard</option>
                                    <option value="Authorize.net API Integration">Authorize.net API Integration</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* 3. Roles and Permissions Matrix */}
            {activeSubTab === 'roles' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Role Access Privileges Matrix</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Configure CRUD permissions for administrative accounts, moderators, merchants, and buyers.</p>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0.75rem 1rem' }}>User Role Class</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Identifier</th>
                                    <th style={{ padding: '0.75rem 1rem', textAnchor: 'middle' }}>View Console Analytics</th>
                                    <th style={{ padding: '0.75rem 1rem', textAnchor: 'middle' }}>Write/Block Accounts</th>
                                    <th style={{ padding: '0.75rem 1rem', textAnchor: 'middle' }}>Write Catalog Products</th>
                                    <th style={{ padding: '0.75rem 1rem', textAnchor: 'middle' }}>Override System Configs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rolePermissions.map((priv, idx) => (
                                    <tr key={priv.role} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{priv.role}</td>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{priv.code}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={priv.views}
                                                onChange={() => handleToggleCapability(idx, 'views')}
                                                style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--accent)' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={priv.usersWrite}
                                                onChange={() => handleToggleCapability(idx, 'usersWrite')}
                                                style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--accent)' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={priv.catalogWrite}
                                                onChange={() => handleToggleCapability(idx, 'catalogWrite')}
                                                style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--accent)' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={priv.systemOverride}
                                                onChange={() => handleToggleCapability(idx, 'systemOverride')}
                                                style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--accent)' }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 4. Core System Toggles */}
            {activeSubTab === 'settings' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Core System Configurations</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Configure flat commission percentage fees, system triggers, maintenance switches.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                        <div>
                            <div className="form-group">
                                <label className="form-label">System Platform Cut Fee %</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={paymentsConfig.commissionFeePercentage}
                                    onChange={(e) => handleUpdateSettings('commissionFeePercentage', Number(e.target.value))}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="form-label">Standard Value-added Tax %</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="35"
                                    value={paymentsConfig.vatPercentage}
                                    onChange={(e) => handleUpdateSettings('vatPercentage', Number(e.target.value))}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div>
                            <span className="form-label" style={{ marginBottom: '0.8rem', display: 'block' }}>System Modes switches</span>

                            <label style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                padding: '1rem',
                                borderRadius: '0.8rem',
                                border: '1px solid rgba(0,0,0,0.05)',
                                background: paymentsConfig.maintenanceMode ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.4)',
                                cursor: 'pointer',
                                marginBottom: '1rem'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={paymentsConfig.maintenanceMode}
                                    onChange={(e) => handleUpdateSettings('maintenanceMode', e.target.checked)}
                                    style={{ marginTop: '0.2rem', width: '1.1rem', height: '1.1rem', accentColor: '#ef4444' }}
                                />
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: paymentsConfig.maintenanceMode ? '#ef4444' : 'var(--text-main)' }}>
                                        Platform Maintenance Mode
                                    </span>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                        Lock buyer checkouts and display security notice message.
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. Secure Activity Logs */}
            {activeSubTab === 'logs' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Security Audit Activity Logs</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Crypto-hash verified log tracking of admin changes, elevated accesses, toggled configs.</p>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="🔍 Search Audit logs..."
                                value={searchLog}
                                onChange={(e) => setSearchLog(e.target.value)}
                                className="form-input"
                                style={{ width: '220px', padding: '0.5rem 1rem 0.5rem 1rem', borderRadius: '1.5rem', fontSize: '0.8rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0.64rem' }}>Log Reference ID</th>
                                    <th style={{ padding: '0.64rem' }}>Operator Identity</th>
                                    <th style={{ padding: '0.64rem' }}>Action Executed</th>
                                    <th style={{ padding: '0.64rem' }}>Audit Target Area</th>
                                    <th style={{ padding: '0.64rem', textAlign: 'right' }}>Log Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                                        <td style={{ padding: '0.75rem 0.64rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{log.id}</td>
                                        <td style={{ padding: '0.75rem 0.64rem', fontWeight: 650 }}>👤 {log.admin}</td>
                                        <td style={{ padding: '0.75rem 0.64rem' }}>{log.action}</td>
                                        <td style={{ padding: '0.75rem 0.64rem', color: 'var(--accent)', fontWeight: 650 }}>{log.target}</td>
                                        <td style={{ padding: '0.75rem 0.64rem', textAlign: 'right', color: 'var(--text-muted)' }}>{log.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminSystemConfig;
