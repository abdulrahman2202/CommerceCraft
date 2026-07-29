import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import DashboardOverview from '../components/seller/DashboardOverview';
import ProductsManager from '../components/seller/ProductsManager';
import OrdersManager from '../components/seller/OrdersManager';
import FinancialsManager from '../components/seller/FinancialsManager';
import StoreSettingsManager from '../components/seller/StoreSettingsManager';

function SellerDashboard() {
    const { products, setProducts } = useContext(ShopContext);
    const [activeSubTab, setActiveSubTab] = useState('dashboard');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    // Scroll to top of section/viewport when active tab shifts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSubTab]);

    // Initial Shareable States (Mock Data)

    const [orders, setOrders] = useState([
        { id: 'ORD-9883', customer: 'Alice Smith', date: '7/28/2026', total: 174.99, status: 'Processing', items: ['DT 990 Pro Headset'] },
        { id: 'ORD-1225', customer: 'Bob Jones', date: '7/26/2026', total: 134.99, status: 'Completed', items: ['Keychron K2 Mechanical Keyboard'] },
        { id: 'ORD-6671', customer: 'Charlie Brown', date: '7/25/2026', total: 50.50, status: 'Pending', items: ['Premium Felt Desk Mat'] }
    ]);

    const [categoriesList, setCategoriesList] = useState(['Keyboards', 'Headphones', 'Accessories', 'Deskpads']);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'order', title: 'New Customer Order', body: 'ORD-9883 requires fulfillment.', time: '10m ago', read: false },
        { id: 2, type: 'stock', title: 'Low Stock Threshold Warning', body: 'DT 990 Pro Headset has depleted below 5 units.', time: '2h ago', read: false },
        { id: 3, type: 'payout', title: 'Payout Request Released', body: 'Your payout of $1,250.00 is now cleared.', time: '1d ago', read: true }
    ]);

    const [reviews, setReviews] = useState([
        { id: 101, name: 'Dave Miller', product: 'Keychron K2 Mechanical Keyboard', rating: 5, comment: 'Phenomenal brown switches tactile feedback!' },
        { id: 102, name: 'Elena Rostova', product: 'DT 990 Pro Headset', rating: 4, comment: 'Soundstage is incredibly wide, but requires a dedicated DAC/Amp.' }
    ]);

    const [coupons, setCoupons] = useState([
        { code: 'CRAFT10', discount: 10, limit: 250, used: 42, status: 'Active' },
        { code: 'ACOUSTICS15', discount: 15, limit: 100, used: 12, status: 'Active' }
    ]);

    const [transactions, setTransactions] = useState([
        { id: 'TXN-908122', date: '7/28/2026', type: 'Order Payment', amount: 159.99, status: 'Completed' },
        { id: 'TXN-492100', date: '7/27/2026', type: 'Payout Transfer', amount: -650.00, status: 'Completed' },
        { id: 'TXN-388277', date: '7/26/2026', type: 'Order Payment', amount: 119.99, status: 'Completed' }
    ]);

    const [payoutBalance, setPayoutBalance] = useState(849.50);

    const [messages, setMessages] = useState({
        'Alice Smith': [
            { sender: 'client', text: 'Hi! Is the DT990 headset 250ohm version?', time: '10:15 AM' },
            { sender: 'seller', text: 'Yes, it is the 250 Ohm reference version.', time: '10:18 AM' },
            { sender: 'client', text: 'Perfect. I will place an order now.', time: '10:20 AM' }
        ],
        'Bob Jones': [
            { sender: 'client', text: 'When will my brown switch keyboard ship?', time: 'Yesterday' },
            { sender: 'seller', text: 'It has been dispatched! tracking details ORD-1225.', time: 'Yesterday' }
        ]
    });

    const [storeProfile, setStoreProfile] = useState({
        name: 'CraftLab Sound & Inputs',
        bio: 'Bespoke mechanical layouts, high-fidelity transcription units, and premium acoustics desktop assets.',
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=150&q=80',
        banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    });

    const [storeSettings, setStoreSettings] = useState({
        shippingFee: 15.00,
        vatRegistration: 'GB-908-11A',
        payoutFrequency: 'Weekly'
    });

    const [supportTickets, setSupportTickets] = useState([
        { id: 'TCK-8092', subject: 'Payout delays to standard bank', category: 'Billing', date: '7/20/2026', status: 'Closed' }
    ]);

    // Derived Customer List from orders list
    const customers = [
        { name: 'Alice Smith', email: 'alice@example.com', ordersCount: 1, totalSpent: 174.99, lastOrder: '7/28/2026' },
        { name: 'Bob Jones', email: 'bob@example.com', ordersCount: 1, totalSpent: 134.99, lastOrder: '7/26/2026' },
        { name: 'Charlie Brown', email: 'charlie@example.com', ordersCount: 1, totalSpent: 50.50, lastOrder: '7/25/2026' }
    ];

    // Navigation Category groups
    const menuGroups = [
        {
            title: 'Overview',
            items: [
                { id: 'dashboard', label: 'Dashboard Main', icon: '📊' },
                { id: 'analytics', label: 'Analytics performance', icon: '📈' },
                { id: 'notifications', label: 'Alert Center', icon: '🔔' }
            ]
        },
        {
            title: 'Product Catalog',
            items: [
                { id: 'products', label: 'Store Products', icon: '📦' },
                { id: 'add_product', label: 'Add New Product', icon: '➕' },
                { id: 'inventory', label: 'Inventory counts', icon: '⚙️' },
                { id: 'categories', label: 'Custom Categories', icon: '🗂️' }
            ]
        },
        {
            title: 'Sales & Feedbacks',
            items: [
                { id: 'orders', label: 'Active Invoices', icon: '🛒' },
                { id: 'customers', label: 'Client Profiles', icon: '👤' },
                { id: 'reviews', label: 'Customer Reviews', icon: '⭐' }
            ]
        },
        {
            title: 'Financial Balance',
            items: [
                { id: 'coupons', label: 'Discount Coupons', icon: '🎫' },
                { id: 'payouts', label: 'Request Payout', icon: '💰' },
                { id: 'transactions', label: 'Ledger Audit', icon: '🧾' }
            ]
        },
        {
            title: 'Store Settings',
            items: [
                { id: 'messages', label: 'Inbox Messages', icon: '✉️' },
                { id: 'store_profile', label: 'Store Branding', icon: '🏢' },
                { id: 'store_settings', label: 'Configurations', icon: '🔧' },
                { id: 'seller_support', label: 'Seller Support Help', icon: '🙋' }
            ]
        }
    ];

    return (
        <main className="page-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', textAlign: 'left', minHeight: '100vh', width: '100%', gap: '2rem', padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto', flexWrap: 'wrap' }}>

            {/* Sidebar Navigation */}
            <aside style={{ flex: '0 0 260px', minWidth: '260px' }}>
                <div className="premium-card" style={{ margin: 0, padding: '1.5rem 1.25rem', position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Brand Banner */}
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1rem' }}>
                        <img src={storeProfile.logo} alt={storeProfile.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.2' }}>{storeProfile.name}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Merchant Panel</span>
                        </div>
                    </div>

                    {/* Sell Button Action */}
                    <button
                        onClick={() => {
                            setActiveSubTab('add_product');
                            setSelectedProductId(null);
                            setSelectedOrderId(null);
                        }}
                        className="form-button"
                        style={{
                            margin: '0',
                            padding: '0.64rem 1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#10b981',
                            fontWeight: 800,
                            borderRadius: '0.5rem',
                            fontSize: '0.85rem',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                            transition: 'all 0.2s'
                        }}
                    >
                        ➕ Sell a Product
                    </button>

                    {/* Nav Categories */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {menuGroups.map(group => (
                            <div key={group.title}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                                    {group.title}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    {group.items.map(item => {
                                        const isSelected = activeSubTab === item.id ||
                                            (item.id === 'products' && activeSubTab === 'product_details') ||
                                            (item.id === 'add_product' && activeSubTab === 'edit_product') ||
                                            (item.id === 'orders' && activeSubTab === 'order_details');

                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setActiveSubTab(item.id);
                                                    setSelectedProductId(null);
                                                    setSelectedOrderId(null);
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    padding: '0.5rem 0.75rem',
                                                    border: 'none',
                                                    background: isSelected ? 'var(--accent)' : 'transparent',
                                                    color: isSelected ? 'white' : 'var(--text-main)',
                                                    borderRadius: '0.5rem',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: isSelected ? 700 : 'normal',
                                                    transition: 'all 0.15s'
                                                }}
                                            >
                                                <span>{item.icon}</span>
                                                <span style={{ flex: 1 }}>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </aside>

            {/* Workspace View switcher */}
            <section style={{ flex: '1 1 800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <DashboardOverview
                    activeSubTab={activeSubTab}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    orders={orders}
                />

                <ProductsManager
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    products={products}
                    setProducts={setProducts}
                    categoriesList={categoriesList}
                    setCategoriesList={setCategoriesList}
                    selectedProductId={selectedProductId}
                    setSelectedProductId={setSelectedProductId}
                />

                <OrdersManager
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    orders={orders}
                    setOrders={setOrders}
                    selectedOrderId={selectedOrderId}
                    setSelectedOrderId={setSelectedOrderId}
                    reviews={reviews}
                    setReviews={setReviews}
                    customers={customers}
                />

                <FinancialsManager
                    activeSubTab={activeSubTab}
                    coupons={coupons}
                    setCoupons={setCoupons}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    payoutBalance={payoutBalance}
                    setPayoutBalance={setPayoutBalance}
                />

                <StoreSettingsManager
                    activeSubTab={activeSubTab}
                    messages={messages}
                    setMessages={setMessages}
                    storeProfile={storeProfile}
                    setStoreProfile={setStoreProfile}
                    storeSettings={storeSettings}
                    setStoreSettings={setStoreSettings}
                    supportTickets={supportTickets}
                    setSupportTickets={setSupportTickets}
                />
            </section>

        </main>
    );
}

export default SellerDashboard;
