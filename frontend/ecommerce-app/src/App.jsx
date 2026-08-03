import React, { useContext, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShopContextProvider, ShopContext } from './context/ShopContext';
import Home from './pages/Home';
import ProductsListing from './pages/ProductsListing';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';
import ShoppingCart from './pages/ShoppingCart';
import About from './pages/About';
import UploadProduct from './pages/UploadProduct';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailed from './pages/OrderFailed';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import RecentlyViewed from './pages/RecentlyViewed';
import HelpCenter from './pages/HelpCenter';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import VerifyOTP from './pages/VerifyOTP';
import TwoFactorAuth from './pages/TwoFactorAuth';
import ChangePassword from './pages/ChangePassword';
import SellerDashboard from './pages/SellerDashboard';
import SellerLogin from './pages/SellerLogin';
import AdminLogin from './pages/AdminLogin';
import './index.css';


function AppContent() {
    const { cartCount, wishlistCount, setSearchQuery } = useContext(ShopContext);
    const [localSearch, setLocalSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearch.trim());
        setMobileMenuOpen(false);
        navigate('/search');
    };

    return (
        <>
            <header className="header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: '1' }}>
                    <div className="brand" style={{ flexShrink: 0 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>CommerceCraft</Link>
                    </div>
                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="desktop-only" style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
                        <input
                            type="text"
                            placeholder="Search premium gadgets..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem 1rem 0.5rem 2.2rem',
                                borderRadius: '1.5rem',
                                border: '1px solid rgba(0,0,0,0.08)',
                                backgroundColor: 'rgba(255,255,255,0.65)',
                                outline: 'none',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s',
                            }}
                            className="search-input-header"
                        />
                        <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </form>
                </div>

                <nav className="nav-links desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/products" className="nav-link" style={{ marginLeft: '1rem' }}>Shop All</Link>
                    <Link to="/categories" className="nav-link">Categories</Link>
                    <Link to="/orders" className="nav-link">My Orders</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </nav>

                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '2rem' }}>
                    <Link to="/wishlist" className="cart-btn" style={{ textDecoration: 'none' }}>
                        <span>❤️ Wishlist</span>
                        {wishlistCount > 0 && (
                            <span style={{ background: 'var(--accent)', color: 'white', borderRadius: '50%', padding: '0 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="cart-btn" style={{ textDecoration: 'none' }}>
                        <span>🛒 Cart</span>
                        {cartCount > 0 && (
                            <span style={{ background: 'var(--text-main)', color: 'white', borderRadius: '50%', padding: '0 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/login" className="cart-btn" style={{ textDecoration: 'none' }}>
                        <span>🔑 Sign In</span>
                    </Link>

                    <Link to="/profile" className="cart-btn" style={{ textDecoration: 'none' }}>
                        <span>👤 Profile</span>
                    </Link>
                </div>

                {/* Hamburger Toggler for Mobile */}
                <button
                    className={`hamburger-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className="hamburger-line line-1"></span>
                    <span className="hamburger-line line-2"></span>
                    <span className="hamburger-line line-3"></span>
                </button>
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
                    <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
                        {/* Search Bar inside drawer */}
                        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.65rem 1rem 0.65rem 2.2rem',
                                    borderRadius: '1.5rem',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    backgroundColor: 'white',
                                    outline: 'none',
                                    fontSize: '0.9rem',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        </form>

                        <div className="mobile-drawer-links">
                            <Link to="/products" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Shop All</Link>
                            <Link to="/categories" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
                            <Link to="/orders" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                            <Link to="/about" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                            <Link to="/seller-dashboard" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Sell on Craft</Link>
                        </div>

                        <div className="mobile-drawer-actions">
                            <Link to="/wishlist" className="cart-btn" style={{ textDecoration: 'none', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                                <span>❤️ Wishlist</span>
                                {wishlistCount > 0 && (
                                    <span style={{ background: 'var(--accent)', color: 'white', borderRadius: '50%', padding: '0 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <Link to="/cart" className="cart-btn" style={{ textDecoration: 'none', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                                <span>🛒 Cart</span>
                                {cartCount > 0 && (
                                    <span style={{ background: 'var(--text-main)', color: 'white', borderRadius: '50%', padding: '0 6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <Link to="/login" className="cart-btn" style={{ textDecoration: 'none', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                                <span>🔑 Sign In</span>
                            </Link>

                            <Link to="/profile" className="cart-btn" style={{ textDecoration: 'none', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                                <span>👤 Profile</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsListing />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:name" element={<CategoryDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/about" element={<About />} />
                <Route path="/upload" element={<UploadProduct />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/order-failed" element={<OrderFailed />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recently-viewed" element={<RecentlyViewed />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/contact" element={<Contact />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/two-factor" element={<TwoFactorAuth />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/seller-login" element={<SellerLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
            </Routes>

            <footer className="footer" style={{ borderTop: '1px solid var(--glass-border)', background: 'var(--glass-bg)', padding: '3.5rem 1.5rem', marginTop: '6rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between' }}>
                    <div style={{ flex: '1 1 250px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>CommerceCraft</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                            State-of-the-art e-commerce gateway offering premium, verified hardware, custom mechanical input layouts, and acoustics solutions.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-light)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shop & Browse</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                                <li><Link to="/products" className="nav-link" style={{ padding: 0 }}>All Gadgets</Link></li>
                                <li><Link to="/categories" className="nav-link" style={{ padding: 0 }}>Categories</Link></li>
                                <li><Link to="/recently-viewed" className="nav-link" style={{ padding: 0 }}>Recently Viewed</Link></li>
                                <li><Link to="/seller-dashboard" className="nav-link" style={{ padding: 0 }}>Sell</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-light)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Support Hub</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                                <li><Link to="/help" className="nav-link" style={{ padding: 0 }}>Help Center FAQs</Link></li>
                                <li><Link to="/contact" className="nav-link" style={{ padding: 0 }}>Contact Support</Link></li>
                                <li><Link to="/about" className="nav-link" style={{ padding: 0 }}>About Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-light)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                                <li><Link to="/profile" className="nav-link" style={{ padding: 0 }}>My Account</Link></li>
                                <li><Link to="/orders" className="nav-link" style={{ padding: 0 }}>Order History</Link></li>
                                <li><Link to="/login" className="nav-link" style={{ padding: 0 }}>Sign In</Link></li>
                                <li><Link to="/register" className="nav-link" style={{ padding: 0 }}>Register</Link></li>
                                <li><Link to="/change-password" className="nav-link" style={{ padding: 0 }}>Change Password</Link></li>
                                <li><Link to="/two-factor" className="nav-link" style={{ padding: 0 }}>Two-Factor Auth</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: '1100px', margin: '2.5rem auto 0 auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>&copy; {new Date().getFullYear()} CommerceCraft. Designed with premium aesthetics.</span>
                    <span>Safe & Secure Checkouts guaranteed</span>
                </div>
            </footer>
        </>
    );
}

function App() {
    return (
        <ShopContextProvider>
            <AppContent />
        </ShopContextProvider>
    );
}

export default App;

