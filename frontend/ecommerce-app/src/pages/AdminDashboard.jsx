import React, { useState, useEffect } from 'react';
import AdminOverview from '../components/admin/AdminOverview';
import AdminUserManager from '../components/admin/AdminUserManager';
import AdminMerchantManager from '../components/admin/AdminMerchantManager';
import AdminOperationsManager from '../components/admin/AdminOperationsManager';
import AdminSystemConfig from '../components/admin/AdminSystemConfig';

function AdminDashboard() {
    const [activeSubTab, setActiveSubTab] = useState('dashboard');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedSellerId, setSelectedSellerId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Scroll to top on navigation tab shifting
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSubTab]);

    // Initial Mock Session State Store
    const [usersList, setUsersList] = useState([
        { id: 'USR-201', name: 'Sophia Chen', email: 'sophia.c@example.com', role: 'Buyer', status: 'Active', joined: '03/12/2026', totalOrders: 5, spent: 789.50 },
        { id: 'USR-202', name: 'Marcus Aurelius', email: 'philosopher@example.com', role: 'Moderator', status: 'Active', joined: '01/29/2026', totalOrders: 1, spent: 125.00 },
        { id: 'USR-203', name: 'Alexis Miller', email: 'alexis.m@example.com', role: 'Seller', status: 'Active', joined: '04/05/2026', totalOrders: 0, spent: 0 },
        { id: 'USR-204', name: 'Zack Peterson', email: 'zpeterson@example.com', role: 'Buyer', status: 'Flagged', joined: '05/18/2026', totalOrders: 12, spent: 1845.00 },
        { id: 'USR-205', name: 'Donald Knuth', email: 'taocp@stanford.edu', role: 'Admin', status: 'Active', joined: '01/01/2026', totalOrders: 0, spent: 0 },
        { id: 'USR-206', name: 'Sylvia Plath', email: 'sylvia@poetry.org', role: 'Buyer', status: 'Suspended', joined: '02/14/2026', totalOrders: 0, spent: 0 }
    ]);

    const [sellersList, setSellersList] = useState([
        { id: 'SEL-881', company: 'CraftLab Sound & Inputs', owner: 'Alexis Miller', email: 'alexis.m@example.com', rating: 4.8, status: 'Verified', productsCount: 9, revenue: 15480.00, signedUp: '04/05/2026' },
        { id: 'SEL-882', company: 'RGB Mechanical Co', owner: 'Ryan Gosling', email: 'rgb.mech@example.com', rating: 4.2, status: 'Pending', productsCount: 4, revenue: 2310.00, signedUp: '06/20/2026' },
        { id: 'SEL-883', company: 'Acoustics Foam Depot', owner: 'Linus Torvalds', email: 'foam@linux.org', rating: 3.9, status: 'Suspended', productsCount: 2, revenue: 450.00, signedUp: '05/12/2026' }
    ]);

    const [productsList, setProductsList] = useState([
        { id: 'PROD-301', name: 'Keychron K2 Mechanical Keyboard', seller: 'CraftLab Sound & Inputs', category: 'Keyboards', brand: 'Keychron', price: 134.99, stock: 45, status: 'Approved', sales: 12 },
        { id: 'PROD-302', name: 'DT 990 Pro Headset (250 Ohm)', seller: 'CraftLab Sound & Inputs', category: 'Headphones', brand: 'Beyerdynamic', price: 174.99, stock: 8, status: 'Approved', sales: 5 },
        { id: 'PROD-303', name: 'Premium Felt Desk Mat', seller: 'CraftLab Sound & Inputs', category: 'Accessories', brand: 'BaseCraft', price: 50.50, stock: 120, status: 'Approved', sales: 42 },
        { id: 'PROD-304', name: 'RGB Cyber Switch Pack x110', seller: 'RGB Mechanical Co', category: 'Keyboards', brand: 'Gateron', price: 65.00, stock: 2, status: 'Pending', sales: 0 },
        { id: 'PROD-305', name: 'Super Thick Dampener Foam', seller: 'Acoustics Foam Depot', category: 'Accessories', brand: 'BaseCraft', price: 15.99, stock: 30, status: 'Suspended', sales: 2 }
    ]);

    const [ordersList, setOrdersList] = useState([
        { id: 'ORD-9883', customer: 'Sophia Chen', seller: 'CraftLab Sound & Inputs', items: ['DT 990 Pro Headset'], total: 174.99, payment: 'Visa', date: '07/28/2026', status: 'Processing', tracking: 'TRK-90812' },
        { id: 'ORD-1225', customer: 'Zack Peterson', seller: 'CraftLab Sound & Inputs', items: ['Keychron K2 Mechanical Keyboard'], total: 134.99, payment: 'Mastercard', date: '07/26/2026', status: 'Shipped', tracking: 'TRK-11252' },
        { id: 'ORD-6671', customer: 'Marcus Aurelius', seller: 'CraftLab Sound & Inputs', items: ['Premium Felt Desk Mat'], total: 50.50, payment: 'PayPal', date: '07/25/2026', status: 'Delivered', tracking: 'TRK-88172' },
        { id: 'ORD-4491', customer: 'Sylvia Plath', seller: 'Acoustics Foam Depot', items: ['Super Thick Dampener Foam'], total: 31.98, payment: 'Amex', date: '07/11/2026', status: 'Cancelled', tracking: '' }
    ]);

    const [categoriesList, setCategoriesList] = useState(['Keyboards', 'Headphones', 'Accessories', 'Deskpads']);
    const [brandsList, setBrandsList] = useState(['Keychron', 'Beyerdynamic', 'BaseCraft', 'Gateron', 'CherryMX']);

    const [reviewsList, setReviewsList] = useState([
        { id: 401, name: 'Sophia Chen', product: 'Keychron K2 Mechanical Keyboard', rating: 5, comment: 'Phenomenal brown switches tactile feedback!', date: '07/28/2026', status: 'Approved' },
        { id: 402, name: 'Zack Peterson', product: 'DT 990 Pro Headset (250 Ohm)', rating: 2, comment: 'Soundstage is incredibly wide, but arrived with box damaged.', date: '07/27/2026', status: 'Flagged' },
        { id: 403, name: 'Marcus Aurelius', product: 'Premium Felt Desk Mat', rating: 4, comment: 'Very aesthetic workspace asset.', date: '07/26/2026', status: 'Approved' }
    ]);

    const [couponsList, setCouponsList] = useState([
        { code: 'CRAFT10', discount: 10, limit: 250, used: 42, expiry: '12/31/2026', status: 'Active' },
        { code: 'ACOUSTICS15', discount: 15, limit: 100, used: 12, expiry: '09/30/2026', status: 'Active' },
        { code: 'WELCOMEBACK', discount: 20, limit: 500, used: 219, expiry: '06/01/2026', status: 'Expired' }
    ]);

    const [bannerConfig, setBannerConfig] = useState({
        title: 'Premium Gadgets & Acoustics Gear',
        subtitle: 'Elevate your workspace with bespoke mechanical keyboard keycaps & soundproof solutions.',
        buttonText: 'Explore Collection',
        linkUrl: '/products',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        active: true
    });

    const [cmsPages, setCmsPages] = useState([
        { id: 'cms-about', title: 'About CommerceCraft', lastUpdated: '06/15/2026', content: 'Our workspace provides custom electronic desktop solutions with verification guarantees...' },
        { id: 'cms-privacy', title: 'Privacy Information Statement', lastUpdated: '02/10/2026', content: 'We hold information secure through encrypted transaction layers...' },
        { id: 'cms-terms', title: 'Terms and Conditions', lastUpdated: '05/20/2026', content: 'Use of the site is governed by strict developer guidelines...' }
    ]);

    const [notificationsList, setNotificationsList] = useState([
        { id: 1, type: 'alert', title: 'High Memory Spike Warning', body: 'Web deployment node peaked at 92% capacity.', time: '07/28/2026 14:22', read: false },
        { id: 2, type: 'seller', title: 'New Merchant Onboard Signup', body: 'RGB Mechanical Co submitted credentials for approval.', time: '07/28/2026 11:05', read: false },
        { id: 3, type: 'report', title: 'Weekly Backup Successful', body: 'Database volume successfully replicated to secondary s3 disk.', time: '07/27/2026 04:00', read: true }
    ]);

    const [paymentsConfig, setPaymentsConfig] = useState({
        gatewayMethod: 'Stripe Direct Connect',
        gatewayStatus: 'Active',
        vatPercentage: 18,
        commissionFeePercentage: 8,
        maintenanceMode: false,
        totalPayoutsReleased: 18270.50
    });

    const [payoutsHistory, setPayoutsHistory] = useState([
        { id: 'PAY-901', seller: 'CraftLab Sound & Inputs', amount: 14500.00, date: '07/20/2026', status: 'Success' },
        { id: 'PAY-902', seller: 'RGB Mechanical Co', amount: 2310.00, date: '07/25/2026', status: 'Success' },
        { id: 'PAY-903', seller: 'Acoustics Foam Depot', amount: 450.00, date: '07/22/2026', status: 'Processing' }
    ]);

    const [rolePermissions, setRolePermissions] = useState([
        { role: 'Admin', code: 'ADM', views: true, usersWrite: true, catalogWrite: true, systemOverride: true },
        { role: 'Moderator', code: 'MOD', views: true, usersWrite: false, catalogWrite: true, systemOverride: false },
        { role: 'Seller', code: 'SEL', views: false, usersWrite: false, catalogWrite: false, systemOverride: false },
        { role: 'Buyer', code: 'BYR', views: false, usersWrite: false, catalogWrite: false, systemOverride: false }
    ]);

    const [activityLogs, setActivityLogs] = useState([
        { id: 'LOG-9001', admin: 'Donald Knuth', action: 'Modified System VAT % configuration', target: 'Settings', time: '07/28/2026 16:32' },
        { id: 'LOG-9002', admin: 'Donald Knuth', action: 'Approved product ID: PROD-302', target: 'DT 990 Pro Headset', time: '07/28/2026 15:45' },
        { id: 'LOG-9003', admin: 'Marcus Aurelius', action: 'Flagged review ID: 402', target: 'Reviews', time: '07/27/2026 12:10' },
        { id: 'LOG-9004', admin: 'System Engine', action: 'Nightly database snapshots created', target: 'Cron Engine', time: '07/27/2026 04:00' }
    ]);

    // Track state activity logging helper
    const addActivityLog = (action, target) => {
        const newLog = {
            id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
            admin: 'Donald Knuth',
            action,
            target,
            time: new Date().toLocaleString()
        };
        setActivityLogs(prev => [newLog, ...prev]);
    };

    // Form settings handler helper
    const handleUpdateSettings = (key, value) => {
        setPaymentsConfig(prev => ({ ...prev, [key]: value }));
        addActivityLog(`Toggled configuration setting: ${key} to ${value}`, 'Settings');
    };

    // Sidebar structure grouped by context
    const sidebarMenu = [
        {
            title: 'Control Core',
            items: [
                { id: 'dashboard', label: 'Overview Panel', icon: '📊' },
                { id: 'analytics', label: 'Analytics Insights', icon: '📈' },
                { id: 'notifications', label: 'System Alerts', icon: '🔔' }
            ]
        },
        {
            title: 'Membership & Stores',
            items: [
                { id: 'users', label: 'Users Account Base', icon: '👥' },
                { id: 'user_details', label: 'User Details View', icon: '👤', hidden: true },
                { id: 'sellers', label: 'Verified Sellers', icon: '🏢' },
                { id: 'seller_details', label: 'Seller Details View', icon: '🏬', hidden: true }
            ]
        },
        {
            title: 'Products & Layouts',
            items: [
                { id: 'products', label: 'Product Auditing', icon: '📦' },
                { id: 'product_details', label: 'Product Details View', icon: '🏷️', hidden: true },
                { id: 'categories', label: 'Core Categories', icon: '🗂️' },
                { id: 'brands', label: 'Platform Brands', icon: '🛡️' }
            ]
        },
        {
            title: 'Customer Operations',
            items: [
                { id: 'orders', label: 'Invoices & Orders', icon: '🛒' },
                { id: 'order_details', label: 'Order Details View', icon: '🧾', hidden: true },
                { id: 'reviews', label: 'Review Moderation', icon: '⭐' },
                { id: 'coupons', label: 'Platform Coupons', icon: '🎫' }
            ]
        },
        {
            title: 'Content & Reports',
            items: [
                { id: 'banners', label: 'Homepage Banners', icon: '🖼️' },
                { id: 'cms', label: 'CMS Page Editor', icon: '📝' },
                { id: 'reports', label: 'Ledger Reports', icon: '📄' }
            ]
        },
        {
            title: 'System & Security',
            items: [
                { id: 'payments', label: 'Payments Gateways', icon: '💰' },
                { id: 'roles', label: 'Roles & Access Matrix', icon: '🔑' },
                { id: 'settings', label: 'System Toggles', icon: '⚙️' },
                { id: 'logs', label: 'Activity Logs Auth', icon: '📜' }
            ]
        }
    ];

    return (
        <main className="page-container seller-layout">
            {/* Sidebar Shell */}
            <aside className="seller-sidebar">
                <div className="premium-card" style={{ margin: 0, padding: '1.5rem 1.25rem', position: 'sticky', top: '8.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(202, 138, 4, 0.25)', boxShadow: '0 8px 32px rgba(202, 138, 4, 0.05)' }}>

                    {/* Admin Header Identity */}
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1rem' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #1f2937, #ca8a04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'white', fontWeight: 800 }}>
                            👑
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.2' }}>Donald Knuth</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>Root Admin Desk</span>
                        </div>
                    </div>

                    {/* Mobile View Navigation Toggle */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="seller-nav-toggle"
                        style={{ padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid var(--accent)', background: 'transparent', cursor: 'pointer', fontWeight: 700 }}
                    >
                        {sidebarCollapsed ? '✕ Close Console Navigation' : '☰ Open Console Navigation'}
                    </button>

                    {/* Left Sidebar Menu List */}
                    <div className={`seller-nav-groups ${sidebarCollapsed ? 'expanded' : 'collapsed'}`} style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '5px' }}>
                        {sidebarMenu.map((group) => (
                            <div key={group.title} style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                                    {group.title}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    {group.items.map((item) => {
                                        // Auto highlight sub-detail pages
                                        const isSelected = activeSubTab === item.id;
                                        if (item.hidden && !isSelected) return null;

                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setActiveSubTab(item.id);
                                                    setSidebarCollapsed(false);
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

            {/* Workspace Render */}
            <section className="seller-workspace" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* 1 & 2: Overview & Analytics */}
                <AdminOverview
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    productsList={productsList}
                    sellersList={sellersList}
                    usersList={usersList}
                    ordersList={ordersList}
                />

                {/* 3 & 4: Users Management tab pages */}
                <AdminUserManager
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    usersList={usersList}
                    setUsersList={setUsersList}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                    ordersList={ordersList}
                    addActivityLog={addActivityLog}
                />

                {/* 5, 6, 7, 8, 9, 10: Merchant / Brands / Catalog */}
                <AdminMerchantManager
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    sellersList={sellersList}
                    setSellersList={setSellersList}
                    selectedSellerId={selectedSellerId}
                    setSelectedSellerId={setSelectedSellerId}
                    productsList={productsList}
                    setProductsList={setProductsList}
                    selectedProductId={selectedProductId}
                    setSelectedProductId={setSelectedProductId}
                    categoriesList={categoriesList}
                    setCategoriesList={setCategoriesList}
                    brandsList={brandsList}
                    setBrandsList={setBrandsList}
                    addActivityLog={addActivityLog}
                />

                {/* 11, 12, 13, 14, 15, 16, 17: Operational tasks */}
                <AdminOperationsManager
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    ordersList={ordersList}
                    setOrdersList={setOrdersList}
                    selectedOrderId={selectedOrderId}
                    setSelectedOrderId={setSelectedOrderId}
                    reviewsList={reviewsList}
                    setReviewsList={setReviewsList}
                    couponsList={couponsList}
                    setCouponsList={setCouponsList}
                    bannerConfig={bannerConfig}
                    setBannerConfig={setBannerConfig}
                    cmsPages={cmsPages}
                    setCmsPages={setCmsPages}
                    addActivityLog={addActivityLog}
                />

                {/* 18, 19, 20, 21, 22: System settings / configs */}
                <AdminSystemConfig
                    activeSubTab={activeSubTab}
                    setActiveSubTab={setActiveSubTab}
                    notificationsList={notificationsList}
                    setNotificationsList={setNotificationsList}
                    paymentsConfig={paymentsConfig}
                    setPaymentsConfig={setPaymentsConfig}
                    payoutsHistory={payoutsHistory}
                    setPayoutsHistory={setPayoutsHistory}
                    rolePermissions={rolePermissions}
                    setRolePermissions={setRolePermissions}
                    activityLogs={activityLogs}
                    handleUpdateSettings={handleUpdateSettings}
                />

            </section>
        </main>
    );
}

export default AdminDashboard;
