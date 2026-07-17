'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiLogOut, FiShoppingBag, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-tr from-primary-500 to-accent-500 p-[1.5px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/25"
            >
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 overflow-hidden flex items-center justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 z-50 w-56 origin-top-right"
                    >
                        <div className="glass-effect rounded-2xl shadow-premium-lg border border-white/20 dark:border-slate-800/40 p-2 bg-white/75 dark:bg-slate-900/80 backdrop-blur-lg">
                            <div className="px-3 py-2 border-b border-white/10 dark:border-slate-800/30 mb-1">
                                <p className="text-xs font-semibold text-foreground-theme">Sarah Jenkins</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">sarah.j@example.com</p>
                            </div>

                            <div className="grid gap-0.5">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-foreground-theme/80 hover:text-foreground-theme hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FiUser className="w-3.5 h-3.5 text-slate-400" />
                                    <span>My Profile</span>
                                </Link>
                                <Link
                                    href="/orders"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-foreground-theme/80 hover:text-foreground-theme hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FiShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Orders & Purchases</span>
                                </Link>
                                <Link
                                    href="/wishlist"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-foreground-theme/80 hover:text-foreground-theme hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FiHeart className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Wishlist</span>
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-foreground-theme/80 hover:text-foreground-theme hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FiSettings className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Settings</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        console.log('Logging out...');
                                    }}
                                    className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-xl text-xs text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-955/20 transition-colors cursor-pointer"
                                >
                                    <FiLogOut className="w-3.5 h-3.5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
