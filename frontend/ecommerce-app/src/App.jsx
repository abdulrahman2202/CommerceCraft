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
import './index.css';

function AppContent() {
    const { cartCount, wishlistCount, setSearchQuery } = useContext(ShopContext);
    const [localSearch, setLocalSearch] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearch.trim());
        navigate('/search');
    };

    return (
        <>
            <header className="header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: '1' }}>
                    <div className="brand" style={{ flexShrink: 0 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>CommerceCraft</Link>
                    </div>
                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
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

                <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/products" className="nav-link" style={{ marginLeft: '1rem' }}>Shop All</Link>
                    <Link to="/categories" className="nav-link">Categories</Link>
                    <Link to="/orders" className="nav-link">My Orders</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/upload" className="nav-link highlight-sell" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Sell Device</Link>
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '2rem' }}>
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

                    <Link to="/profile" className="cart-btn" style={{ textDecoration: 'none' }}>
                        <span>👤 Profile</span>
                    </Link>
                </div>
            </header>

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
            </Routes>

            <footer className="footer">
                <p>&copy; 2026 CommerceCraft. Designed with premium aesthetics.</p>
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

