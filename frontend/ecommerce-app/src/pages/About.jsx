import React from 'react';

function About() {
    return (
        <main className="page-container min-h-screen">
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                <h1 className="gradient-title">
                    About CommerceCraft
                </h1>

                <div className="premium-card" style={{ maxWidth: '650px', margin: '2rem auto 0 auto', lineHeight: '1.7' }}>
                    <p style={{ marginBottom: '1.25rem' }}>
                        Welcome to CommerceCraft, where premium technology meets elegant design. Our mission is to curate the finest personal tech gadgets that elevate your digital lifestyle.
                    </p>
                    <p>
                        From specialized keyboards to high-fidelity audio equipment, we ensure every product represents the pinnacle of modern engineering.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default About;
