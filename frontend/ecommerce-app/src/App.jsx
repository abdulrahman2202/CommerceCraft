import React, { useState } from 'react';
import './index.css';

const MOCK_PRODUCTS = [
    { id: 1, title: 'Nebula Pro Keyboard', price: 149.99, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Void Noise-Cancelling Headphones', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'Aether Smartwatch', price: 199.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400' },
    { id: 4, title: 'Quantum Gaming Mouse', price: 89.99, image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&q=80&w=400' },
];

function App() {
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <>
            <header className="header">
                <div className="brand">CommerceCraft</div>
                <nav className="nav-links">
                    <a href="#" className="nav-link">Shop</a>
                    <a href="#" className="nav-link">Categories</a>
                    <a href="#" className="nav-link">About</a>
                </nav>
                <button className="cart-btn">
                    <span>🛒 Cart</span>
                    {cartCount > 0 && <span style={{ background: 'white', color: 'black', borderRadius: '50%', padding: '0 6px', fontSize: '0.8rem' }}>{cartCount}</span>}
                </button>
            </header>

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <div className="hero-badge">New Arrival</div>
                        <h1>The Future of Personal Tech</h1>
                        <p>Elevate your digital lifestyle with our curated collection of premium gadgets. Designed for those who demand excellence.</p>
                        <a href="#shop" className="hero-btn">Explore Collection</a>
                    </div>
                </section>

                <section id="shop" className="products">
                    <h2 className="section-title">Trending Now</h2>
                    <div className="product-grid">
                        {MOCK_PRODUCTS.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.image} alt={product.title} className="placeholder" />
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-price">${product.price}</p>
                                    <button className="add-btn" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; 2026 CommerceCraft. Designed with premium aesthetics.</p>
            </footer>
        </>
    );
}

export default App;
