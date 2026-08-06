import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const BLOG_POSTS = [
    {
        id: 'keyboard-sound-science',
        title: 'The Science of Keyboard Sound: Foam, Brass, and Tape Mods',
        excerpt: 'Understand how material physics, plate resonance, and case dampening shape the acoustic resonance of your mechanical keyboard layout.',
        category: 'Acoustics',
        author: 'Julian Vance',
        date: 'August 1, 2026',
        readTime: '6 min read',
        imageBg: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
        content: `
            <p>Every mechanical keyboard sound starts with a collision: the switch stem hitting the housing base (bottom-out), and flying back to hit the top housing on rebound. But the sound you actually hear is formed by the layout, case material, switches plate, and workspace surface.</p>
            <h3>1. The Resonance Chamber</h3>
            <p>Plastic and aluminum housings behave as sound chambers. The hollower your board interior, the higher the amplification of mid-range mechanical scratchiness. This is what enthusiasts call the "hollow sound". Modern boards combat this using pre-cut Poron case foams, silicone dampeners, and switch pads.</p>
            <h3>2. Plates Matter</h3>
            <p>The switches plate is a major resonance dampening element. Brass and steel plates yield a stiff, high-pitched "clack" because they absorb little energy. Flex-cut polycarbonate and FR4 plates bend under pressure, offering a softer typing feeling and a deep, acoustic pitch (or "thock").</p>
            <h3>3. Simple Tuning Mods</h3>
            <p>If you want to tune your typing profile without buying new parts, consider the Tempest Tape Mod. By applying 2-3 layers of painters tape to the back of your PCB trace lines, you filter out high frequencies, acting as an acoustic low-pass filter to deepen the pitch.</p>
        `
    },
    {
        id: 'switches-comparison-guide',
        title: 'Linear vs. Tactile Switches: Finding Your Perfect Typing Balance',
        excerpt: 'An exhaustive comparison of switch operations, spring weights, and actuation curves to elevate your input accuracy and comfort.',
        category: 'Switches',
        author: 'Marcus Thorne',
        date: 'July 24, 2026',
        readTime: '5 min read',
        imageBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
        content: `
            <p>Choosing the correct switch is the single most important decision in designing a custom keyboard layout. Let's break down the mechanics of today's popular switch types: Linear and Tactile.</p>
            <h3>Linear: The Smooth Glide</h3>
            <p>Linear switches have a smooth, consistent keypress feel from top to bottom. There is no physical bump or click when the switch activates. Linear switches are loved by gamers for their speed, and by typing sound enthusiasts because lubed linears yield the cleanest sound signatures.</p>
            <h3>Tactile: The Tactility Curve</h3>
            <p>Tactile switches have a physical bump in the middle of their travel path. This bump indicates the exact actuation point, allowing you to type without needing to "bottom-out" (press the switch all the way down). This is ideal for programmers and writers who prefer physical typing feedback.</p>
            <h3>Spring Weight Decisions</h3>
            <p>Spring weight affects fatigue. Standard switches range between 55g and 67g bottom-out force. Lighter weights (35g-45g) speed up gaming interactions but lead to accidental double presses, while heavier springs (70g-80g) decrease typos but can cause finger fatigue over long coding sessions.</p>
        `
    },
    {
        id: 'desk-setup-aesthetics',
        title: 'Desk Aesthetics: How to Coordinate Mats, Cables, and Lighting',
        excerpt: 'Transform your desktop workspace into a high-fidelity visual haven using color theories, cord layouts, and balanced illumination.',
        category: 'Workspace',
        author: 'Evelyn Zhao',
        date: 'June 18, 2026',
        readTime: '4 min read',
        imageBg: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
        content: `
            <p>A high-performance typing workspace is more than just a keyboard. A cohesive desk layout minimizes visual clutter, increases creative focus, and complements your desk design language.</p>
            <h3>Coordinate Textures and Colors</h3>
            <p>Avoid buying mismatched neon accessories. Pick a base theme: clean minimalist light, premium dark mahogany, or mid-century modern earth tones. Coordinate your desk mat with your keyboard layout colors. Felt mats offer natural texturing, but stitched desk mats provide superior mouse sliding tracks.</p>
            <h3>Custom Coiled Cables</h3>
            <p>Ditch the cheap rubber cords. Double-sleeved paracord cables with gold-plated aviator connectors look beautiful and keep your cable line neat. Position the coil parallel to your keyboard header border for a symmetric view.</p>
            <h3>Bias Lighting Layouts</h3>
            <p>Harsh overhead lights cause monitor glare. Try installing warm LED bias light strips behind your screen and addition of a dimmable desk monitor bar. This projects light downward to illuminate your keycaps without washing out display pixels.</p>
        `
    }
];

function Blog() {
    const [selectedCat, setSelectedCat] = useState('All');
    const categories = ['All', 'Acoustics', 'Switches', 'Workspace'];

    const filteredPosts = selectedCat === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === selectedCat);

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Header */}
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span className="hero-badge">CommerceCraft Journal</span>
                    <h1 className="gradient-title" style={{ marginTop: '0.5rem' }}>Tech & Acoustics Blog</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        In-depth research guides, switch audits, mods tutorials, and layout aesthetics reviews written by engineers.
                    </p>
                </div>

                {/* Category Filtering */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCat(cat)}
                            style={{
                                padding: '0.5rem 1.1rem',
                                borderRadius: '1.5rem',
                                border: '1px solid ' + (selectedCat === cat ? 'var(--accent)' : 'var(--glass-border)'),
                                background: selectedCat === cat ? 'var(--accent)' : 'var(--glass-bg)',
                                color: selectedCat === cat ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            className="product-card"
                            style={{
                                padding: 0,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            {/* Graphic Header Block representing the article image */}
                            <div style={{
                                width: '100%',
                                height: '180px',
                                background: post.imageBg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <span style={{ fontSize: '3rem', opacity: 0.8 }}>📖</span>
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    background: 'rgba(255,255,255,0.9)',
                                    color: 'var(--text-main)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    {post.category}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>

                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                                    <Link to={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="nav-link">
                                        {post.title}
                                    </Link>
                                </h2>

                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {post.excerpt}
                                </p>

                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By <strong>{post.author}</strong></span>
                                    <Link
                                        to={`/blog/${post.id}`}
                                        style={{
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            color: 'var(--accent)',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}
                                        className="nav-link"
                                    >
                                        Read Article →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </main>
    );
}

export default Blog;
