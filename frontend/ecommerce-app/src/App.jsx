import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import About from './pages/About';
import UploadProduct from './pages/UploadProduct';
import './index.css';

function App() {
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <>
            <header className="header">
                <div className="brand">
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>CommerceCraft</Link>
                </div>
                <nav className="nav-links">
                    <Link to="/" className="nav-link">Shop</Link>
                    <Link to="/categories" className="nav-link">Categories</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/upload" className="nav-link highlight-sell" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Sell Device</Link>
                </nav>
                <button className="cart-btn">
                    <span>🛒 Cart</span>
                    {cartCount > 0 && <span style={{ background: 'white', color: 'black', borderRadius: '50%', padding: '0 6px', fontSize: '0.8rem' }}>{cartCount}</span>}
                </button>
            </header>

            <Routes>
                <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/upload" element={<UploadProduct />} />
            </Routes>

            <footer className="footer">
                <p>&copy; 2026 CommerceCraft. Designed with premium aesthetics.</p>
            </footer>
        </>
    );
}

export default App;
