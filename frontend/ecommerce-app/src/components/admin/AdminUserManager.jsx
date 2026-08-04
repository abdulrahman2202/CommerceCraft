import React, { useState } from 'react';

function AdminUserManager({ activeSubTab, setActiveSubTab, usersList, setUsersList, selectedUserId, setSelectedUserId, ordersList, addActivityLog }) {
    if (activeSubTab !== 'users' && activeSubTab !== 'user_details') return null;

    const selectedUser = usersList.find(u => u.id === selectedUserId) || usersList[0];

    // Handle blocking / unblocking user
    const handleToggleStatus = (userId) => {
        setUsersList(prev => prev.map(u => {
            if (u.id === userId) {
                const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
                addActivityLog(`Toggled status of user ${u.name} (ID: ${userId}) to ${nextStatus}`, 'Users');
                return { ...u, status: nextStatus };
            }
            return u;
        }));
    };

    // Handle modifying user role
    const handleChangeRole = (userId, newRole) => {
        setUsersList(prev => prev.map(u => {
            if (u.id === userId) {
                addActivityLog(`Elevated role of user ${u.name} (ID: ${userId}) to ${newRole}`, 'Users');
                return { ...u, role: newRole };
            }
            return u;
        }));
    };

    // Filter orders matching this customer name
    const userOrders = ordersList.filter(o => o.customer === selectedUser.name);

    return (
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* View: User Account List Index */}
            {activeSubTab === 'users' && (
                <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Database Registration Base</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Review registered shoppers, moderators, and active security privileges.</p>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0.75rem 1rem' }}>User ID</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Full Name</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Email</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Authority Privilege</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Session status</th>
                                    <th style={{ padding: '0.75rem 1rem' }}>Created</th>
                                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map((user) => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)', hover: { background: 'rgba(0,0,0,0.02)' } }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{user.id}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>{user.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                background: user.role === 'Admin' ? 'rgba(239, 68, 68, 0.1)' : user.role === 'Moderator' ? 'rgba(59, 130, 246, 0.1)' : user.role === 'Seller' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.05)',
                                                color: user.role === 'Admin' ? '#ef4444' : user.role === 'Moderator' ? '#3b82f6' : user.role === 'Seller' ? '#10b981' : 'var(--text-muted)',
                                                border: '1px solid currentColor'
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                background: user.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : user.status === 'Suspended' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: user.status === 'Active' ? '#10b981' : user.status === 'Suspended' ? '#ef4444' : '#f59e0b'
                                            }}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.joined}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => {
                                                    setSelectedUserId(user.id);
                                                    setActiveSubTab('user_details');
                                                }}
                                                className="add-btn"
                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'transparent' }}
                                            >
                                                View details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* View: User Details Profile Panel */}
            {activeSubTab === 'user_details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <button
                        onClick={() => setActiveSubTab('users')}
                        className="add-btn"
                        style={{ padding: '0.5rem 1rem', width: 'fit-content', border: '1px solid var(--text-muted)', color: 'var(--text-muted)' }}
                    >
                        &larr; Return to Registrations Index
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '1.5rem', flexWrap: 'wrap' }}>

                        {/* Profile Info Details Card */}
                        <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                            <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '4.5rem',
                                    height: '4.5rem',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem',
                                    fontWeight: 800,
                                    margin: '0 auto 1rem auto'
                                }}>
                                    👤
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{selectedUser.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0.15rem 0 0 0' }}>Registered {selectedUser.joined}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Registry Identifier</span>
                                    <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{selectedUser.id}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Communication Endpoint</span>
                                    <span style={{ fontWeight: 600 }}>{selectedUser.email}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Platform Privileges</span>
                                    <span style={{ fontWeight: 650 }}>{selectedUser.role}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Session Audits status</span>
                                    <span style={{ fontWeight: 650, color: selectedUser.status === 'Active' ? '#10b981' : '#ef4444' }}>{selectedUser.status}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Purchases Total Ledger</span>
                                    <span style={{ fontWeight: 700 }}>{selectedUser.totalOrders} Invoices (${selectedUser.spent.toFixed(2)})</span>
                                </div>
                            </div>
                        </div>

                        {/* Controls & Operations Card */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>console Authority Moderations</h3>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ flex: '1 1 200px' }}>
                                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Change Account Role</label>
                                        <select
                                            value={selectedUser.role}
                                            onChange={(e) => handleChangeRole(selectedUser.id, e.target.value)}
                                            className="form-input"
                                            style={{ padding: '0.6rem' }}
                                        >
                                            <option value="Buyer">Buyer Role</option>
                                            <option value="Seller">Seller Role</option>
                                            <option value="Moderator">Moderator Access</option>
                                            <option value="Admin">System Admin Privilege</option>
                                        </select>
                                    </div>
                                    <div style={{ flex: '1 1 150px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={() => handleToggleStatus(selectedUser.id)}
                                            className="form-button"
                                            style={{
                                                padding: '0.75rem',
                                                background: selectedUser.status === 'Active' ? '#ef4444' : '#10b981',
                                                color: 'white',
                                                fontWeight: 800,
                                                fontSize: '0.8rem',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                border: 'none'
                                            }}
                                        >
                                            {selectedUser.status === 'Active' ? '⛔ Suspend Session Link' : '⚡ Activate Shell Token'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Invoices by User list */}
                            <div className="premium-card" style={{ margin: 0, padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Authorized Invoices Logs</h3>

                                {userOrders.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>No payment ledger transactions registered for this user.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {userOrders.map((ord) => (
                                            <div
                                                key={ord.id}
                                                style={{
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '0.5rem',
                                                    border: '1px solid rgba(0,0,0,0.05)',
                                                    background: 'rgba(255,255,255,0.4)',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <div>
                                                    <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{ord.id}</span>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.75rem' }}>{ord.date}</span>
                                                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Items: {ord.items.join(', ')}</span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontWeight: 800, display: 'block', fontSize: '0.85rem' }}>${ord.total.toFixed(2)}</span>
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        color: ord.status === 'Delivered' ? '#10b981' : ord.status === 'Shipped' ? '#3b82f6' : ord.status === 'Processing' ? '#f59e0b' : '#ef4444',
                                                        fontWeight: 700
                                                    }}>{ord.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminUserManager;
