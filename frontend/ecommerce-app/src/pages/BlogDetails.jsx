import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from './Blog';

function BlogDetails() {
    const { id } = useParams();
    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        return (
            <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
                <div className="premium-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <span style={{ fontSize: '3rem' }}>🔍</span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 805, marginTop: '1rem', color: 'var(--text-main)' }}>Article Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>
                        The article you are trying to read does not exist.
                    </p>
                    <Link to="/blog" className="hero-btn" style={{ padding: '0.8rem 2rem', textDecoration: 'none' }}>
                        Return to Blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page-container" style={{ minHeight: '100vh', width: '100%' }}>
            <div style={{ width: '100%', maxWidth: '750px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'left' }}>

                {/* Back Button */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <Link to="/blog" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 650, textDecoration: 'none' }}>
                        ← Back to all Articles
                    </Link>
                </div>

                {/* Article Header block */}
                <header style={{ marginBottom: '2.5rem' }}>
                    <span style={{
                        display: 'inline-block',
                        background: 'rgba(234, 179, 8, 0.12)',
                        border: '1px solid rgba(234, 179, 8, 0.25)',
                        color: '#b45309',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '1rem'
                    }}>
                        {post.category}
                    </span>
                    <h1 className="gradient-title" style={{ fontSize: '2.5rem', lineHeight: '1.2', margin: '0 0 1rem 0', textAlign: 'left' }}>
                        {post.title}
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1rem' }}>
                        <span>Published: <strong>{post.date}</strong></span>
                        <span>•</span>
                        <span>Written by: <strong>{post.author}</strong></span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </header>

                {/* Article Graphics Header */}
                <div style={{
                    width: '100%',
                    height: '300px',
                    background: post.imageBg,
                    borderRadius: '1rem',
                    marginBottom: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem',
                    color: 'white',
                    opacity: 0.95,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
                }}>
                    ⌨️
                </div>

                {/* Article Body */}
                <article
                    className="premium-card blog-content"
                    style={{
                        margin: 0,
                        width: '100%',
                        maxWidth: 'none',
                        padding: '2.5rem 3rem',
                        fontSize: '1.05rem',
                        lineHeight: '1.8',
                        color: 'var(--text-main)'
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share / Footer */}
                <div style={{
                    marginTop: '3rem',
                    padding: '1.5rem',
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Enjoyed this tech guide? Check out more in our <Link to="/blog" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Journal</Link>.
                    </span>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Copied article URL to clipboard!');
                        }}
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            padding: '0.5rem 1rem',
                            borderRadius: '1.5rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-main)',
                            transition: 'all 0.2s'
                        }}
                    >
                        🔗 Copy Article Link
                    </button>
                </div>

            </div>
        </main>
    );
}

export default BlogDetails;
