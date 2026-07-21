import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Home() {
    const { products, addToCart } = useContext(ShopContext);

    // Select first 4 products as "Trending Now"
    const trendingProducts = products.slice(0, 4);

    return (
        <main>
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">New Arrival</div>
                    <h1>The Future of Personal Tech</h1>
                    <p>Elevate your digital lifestyle with our curated collection of premium gadgets. Designed for those who demand excellence.</p>
                    <Link to="/products" className="hero-btn">Explore Collection</Link>
                </div>
            </section>

            <section id="shop" className="products">
                <h2 className="section-title">Trending Now</h2>
                <div className="product-grid">
                    {trendingProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <Link to={`/product/${product.id}`} className="product-image" style={{ display: 'block', cursor: 'pointer' }}>
                                <img src={product.image} alt={product.title} className="placeholder" />
                            </Link>
                            <div className="product-info">
                                <h3 className="product-title">
                                    <Link to={`/product/${product.id}`} style={{ color: 'inherit' }}>{product.title}</Link>
                                </h3>
                                <p className="product-price">${product.price}</p>
                                <button className="add-btn" onClick={() => addToCart(product.id)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;

