import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Checkout() {
    const { cart, products, placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    // Hydrate cart data
    const cartItems = cart.map(item => {
        const prod = products.find(p => p.id === item.id);
        return {
            ...item,
            product: prod
        };
    }).filter(item => item.product !== undefined);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 150 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        cardNum: '',
        expiry: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const nextErrors = {};
        if (!form.name.trim()) nextErrors.name = 'Full Name is required';
        if (!form.email.trim()) nextErrors.email = 'Email address is required';
        if (!form.address.trim()) nextErrors.address = 'Shipping Address is required';
        if (!form.city.trim()) nextErrors.city = 'City is required';
        if (!form.zip.trim()) nextErrors.zip = 'Zip code is required';
        if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
        if (!form.cardNum.trim()) nextErrors.cardNum = 'Card details are required';
        if (!form.expiry.trim()) nextErrors.expiry = 'Expiry date is required';
        if (!form.cvv.trim()) nextErrors.cvv = 'CVV code is required';
        return nextErrors;
    };

    const handleConfirmCheckout = (e) => {
        e.preventDefault();
        const validate = validateForm();
        if (Object.keys(validate).length > 0) {
            setErrors(validate);
            return;
        }

        // Compile orderDetails to placeOrder context
        const orderData = {
            items: cartItems.map(item => ({
                id: item.product.id,
                title: item.product.title,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity
            })),
            shippingAddress: {
                name: form.name,
                email: form.email,
                address: form.address,
                city: form.city,
                zip: form.zip,
                phone: form.phone
            },
            subtotal,
            discount: 0,
            shipping,
            tax,
            total
        };

        const finalOrder = placeOrder(orderData);
        navigate(`/order-success/${finalOrder.id}`);
    };

    const handleSimulateFailure = (e) => {
        e.preventDefault();
        navigate('/order-failed');
    };

    if (cartItems.length === 0) {
        return (
            <main className="page-container" style={{ minHeight: '80vh' }}>
                <div className="premium-card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '3rem auto' }}>
                    <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>🛒</span>
                    <h2 className="gradient-title" style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Checkout is Empty</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem' }}>Looks like you do not have items in your shopping cart to complete checkout.</p>
                    <Link to="/products" className="hero-btn" style={{ padding: '0.8rem 2.5rem', display: 'inline-block' }}>
                        Explore Store Devices
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>
                <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h1 className="gradient-title">Secure Checkout</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Provide your delivery details to finalize your premium hardware purchase.
                    </p>
                </div>

                <div className="upload-grid">
                    {/* Left Panel: Checkout Forms */}
                    <form onSubmit={handleConfirmCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Section 1: Customer Details */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>1. Delivery Address</h2>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="form-input"
                                    />
                                    {errors.name && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.name}</span>}
                                </div>
                                <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="form-input"
                                    />
                                    {errors.email && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={form.address}
                                    onChange={handleInputChange}
                                    placeholder="123 Creator Lane, Apt 4B"
                                    className="form-input"
                                />
                                {errors.address && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.address}</span>}
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <div className="form-group" style={{ flex: '2 1 200px', marginBottom: 0 }}>
                                    <label className="form-label">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={form.city}
                                        onChange={handleInputChange}
                                        placeholder="San Francisco"
                                        className="form-input"
                                    />
                                    {errors.city && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.city}</span>}
                                </div>
                                <div className="form-group" style={{ flex: '1 1 120px', marginBottom: 0 }}>
                                    <label className="form-label">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        required
                                        value={form.zip}
                                        onChange={handleInputChange}
                                        placeholder="94103"
                                        className="form-input"
                                    />
                                    {errors.zip && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.zip}</span>}
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 019-2834"
                                    className="form-input"
                                />
                                {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.phone}</span>}
                            </div>
                        </div>

                        {/* Section 2: Payment Parameters */}
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.5rem' }}>2. Payment Details</h2>

                            <div className="form-group">
                                <label className="form-label">Credit Card Number</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        name="cardNum"
                                        required
                                        value={form.cardNum}
                                        onChange={handleInputChange}
                                        placeholder="4111 2222 3333 4444"
                                        className="form-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>💳</span>
                                </div>
                                {errors.cardNum && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.cardNum}</span>}
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 0 }}>
                                <div className="form-group" style={{ flex: '1 1 150px', marginBottom: 0 }}>
                                    <label className="form-label">Exp Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        required
                                        value={form.expiry}
                                        onChange={handleInputChange}
                                        placeholder="MM / YY"
                                        className="form-input"
                                    />
                                    {errors.expiry && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.expiry}</span>}
                                </div>
                                <div className="form-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
                                    <label className="form-label">CVV Code</label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        required
                                        value={form.cvv}
                                        onChange={handleInputChange}
                                        placeholder="***"
                                        maxLength="4"
                                        className="form-input"
                                    />
                                    {errors.cvv && <span style={{ color: '#ef4444', fontSize: '0.80rem', marginTop: '0.35rem', display: 'block' }}>{errors.cvv}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                type="submit"
                                className="form-button"
                                style={{ width: '100%', padding: '1rem' }}
                            >
                                Pay and Confirm
                            </button>
                            <button
                                type="button"
                                onClick={handleSimulateFailure}
                                style={{
                                    width: '100%',
                                    padding: '0.9rem',
                                    border: '1px solid #ef4444',
                                    color: '#ef4444',
                                    borderRadius: '0.75rem',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#ef4444';
                                    e.target.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#ef4444';
                                }}
                            >
                                Simulate Payment Failure
                            </button>
                        </div>
                    </form>

                    {/* Right Panel: Invoice Summary */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="premium-card" style={{ margin: 0, width: '100%', maxWidth: 'none', padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Order Summary</h2>

                            {/* Itemized list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '300px', paddingRight: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1.5rem' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', overflow: 'hidden', background: 'rgba(0,0,0,0.03)', shrink: 0 }}>
                                            <img src={item.product.image} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.15rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.product.title}
                                            </h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>Qty: {item.quantity} &times; ${item.product.price}</p>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Calculations */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                    <span style={{ fontWeight: 650 }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                                    <span style={{ fontWeight: 650 }}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (8%)</span>
                                    <span style={{ fontWeight: 650 }}>${tax.toFixed(2)}</span>
                                </div>
                                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                                    <span>Total</span>
                                    <span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;
