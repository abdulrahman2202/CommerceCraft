'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiLayers, FiMonitor, FiShoppingBag, FiTruck, FiSmile, FiTrendingUp } from 'react-icons/fi';

interface LinkItem {
    label: string;
    href: string;
}

const CATEGORIES = [
    { name: 'Electronics & Tech', icon: <FiMonitor className="w-4 h-4" />, desc: 'Laptops, smartphones, accessories.' },
    { name: 'Fashion & Apparel', icon: <FiShoppingBag className="w-4 h-4" />, desc: 'Clothing, footwear, watches.' },
    { name: 'Home & Living', icon: <FiTruck className="w-4 h-4" />, desc: 'Furniture, decor, kitchen.' },
    { name: 'Beauty & Wellness', icon: <FiSmile className="w-4 h-4" />, desc: 'Skincare, makeup, vitamins.' },
    { name: 'Trending Now', icon: <FiTrendingUp className="w-4 h-4" />, desc: 'Best selling and newly launched.' },
];

const LINKS: LinkItem[] = [
    { label: 'Shop', href: '/shop' },
    { label: 'Deals', href: '/deals' },
    { label: 'Sellers', href: '/sellers' },
];

export default function NavLinks() {
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {/* Categories Dropdown Trigger */}
            <div
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <button className="flex items-center gap-1.5 py-2 text-foreground-theme/80 hover:text-foreground-theme font-medium transition-colors cursor-pointer select-none">
                    <FiLayers className="w-4 h-4 text-primary-500" />
                    <span>Categories</span>
                    <motion.div
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FiChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-full pt-2 z-50 w-72 origin-top-left"
                        >
                            <div className="glass-effect rounded-2xl shadow-premium-lg border border-white/20 dark:border-slate-800/40 p-3 bg-white/75 dark:bg-slate-900/80 backdrop-blur-lg">
                                <div className="grid gap-1">
                                    {CATEGORIES.map((cat, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/category/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-850/40 transition-colors group/item"
                                        >
                                            <div className="p-2 rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400 group-hover/item:scale-110 transition-transform">
                                                {cat.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-foreground-theme">{cat.name}</p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{cat.desc}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Links */}
            {LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="relative py-2 text-foreground-theme/80 hover:text-foreground-theme transition-colors font-medium"
                    >
                        <span>{link.label}</span>
                        {isActive && (
                            <motion.span
                                layoutId="activeUnderline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-500 to-accent-500 rounded-full"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
