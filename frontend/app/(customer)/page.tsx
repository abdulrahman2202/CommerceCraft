import React from 'react';
import Navbar from '@/components/navbar/Navbar';

export default function CustomerHome() {
    return (
        <main className="relative min-h-screen bg-background-theme text-foreground-theme flex flex-col justify-between overflow-hidden">
            {/* Premium Sticky Navigation */}
            <Navbar />

            {/* Temporary Placeholder Section */}
            <section className="flex-1 flex flex-col items-center justify-center px-4 relative">
                {/* Visual Glow Ambient Background Deco */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] bg-linear-to-tr from-primary-500/10 to-accent-500/10 rounded-full blur-3xl opacity-60 pointer-events-none" />

                <div className="text-center relative z-10 space-y-6 max-w-2xl">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                        <span className="block mb-2">CommerceCraft</span>
                        <span className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-primary-500 via-primary-600 to-accent-600 bg-clip-text -webkit-background-clip-text text-transparent uppercase tracking-widest block mt-4">
                            Premium Multi Vendor Marketplace
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto">
                        Experience buying and selling redefined. Built for seamless transactions and next-generation storefronts.
                    </p>
                </div>
            </section>
        </main>
    );
}
