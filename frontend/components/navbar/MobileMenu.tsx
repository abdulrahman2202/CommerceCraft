'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiShoppingBag, FiPercent, FiUsers, FiHeart, FiBell } from 'react-icons/fi';
import Button from '../ui/Button';
import SearchBar from './SearchBar';
import Link from 'next/link';

const menuVariants: Variants = {
    closed: {
        x: '100%',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    open: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.07,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
};

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden flex items-center">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 text-foreground-theme cursor-pointer select-none"
            >
                <FiMenu className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggle}
                            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-l border-white/20 dark:border-slate-800/40 p-6 flex flex-col justify-between shadow-premium-2xl"
                        >
                            {/* Header */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold bg-linear-to-r from-primary-500 to-accent-500 bg-clip-text -webkit-background-clip-text text-transparent select-none">
                                        CommerceCraft
                                    </span>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggle}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 text-foreground-theme cursor-pointer"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </motion.button>
                                </div>

                                {/* Mobile Search */}
                                <motion.div variants={itemVariants}>
                                    <SearchBar />
                                </motion.div>

                                {/* Nav Items */}
                                <div className="flex flex-col gap-3 mt-4">
                                    <motion.div variants={itemVariants}>
                                        <Link
                                            href="/"
                                            onClick={toggle}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 text-sm font-semibold text-foreground-theme/80 hover:text-foreground-theme transition-colors"
                                        >
                                            <FiHome className="w-4 h-4 text-primary-500" />
                                            Home
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Link
                                            href="/shop"
                                            onClick={toggle}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 text-sm font-semibold text-foreground-theme/80 hover:text-foreground-theme transition-colors"
                                        >
                                            <FiShoppingBag className="w-4 h-4 text-primary-500" />
                                            Shop
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Link
                                            href="/deals"
                                            onClick={toggle}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 text-sm font-semibold text-foreground-theme/80 hover:text-foreground-theme transition-colors"
                                        >
                                            <FiPercent className="w-4 h-4 text-primary-500" />
                                            Deals
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Link
                                            href="/sellers"
                                            onClick={toggle}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 text-sm font-semibold text-foreground-theme/80 hover:text-foreground-theme transition-colors"
                                        >
                                            <FiUsers className="w-4 h-4 text-primary-500" />
                                            Sellers
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="border-t border-slate-100 dark:border-slate-900 my-2" />

                                    <motion.div variants={itemVariants}>
                                        <Link
                                            href="/wishlist"
                                            onClick={toggle}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 text-sm font-semibold text-foreground-theme/80 hover:text-foreground-theme transition-colors animate-pulse-glow"
                                        >
                                            <FiHeart className="w-4 h-4 text-rose-500" />
                                            Wishlist
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Link
                                            href="/notifications"
                                            onClick={toggle}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 text-sm font-semibold text-foreground-theme/80 hover:text-foreground-theme transition-colors"
                                        >
                                            <FiBell className="w-4 h-4 text-amber-500" />
                                            Notifications
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-6">
                                <Button variant="outline" fullWidth onClick={toggle}>
                                    Become a Seller
                                </Button>
                                <Button variant="primary" fullWidth onClick={toggle}>
                                    Login / Register
                                </Button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
