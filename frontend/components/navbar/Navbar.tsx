'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiBell } from 'react-icons/fi';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Badge from '../common/Badge';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import ProfileMenu from './ProfileMenu';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP Entrance Animations
            gsap.fromTo(
                navbarRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );

            gsap.fromTo(
                logoRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)' }
            );

            gsap.fromTo(
                '.search-bar-container',
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: 'power2.out' }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={navbarRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3.5 glass-effect shadow-premium-md'
                : 'py-5 bg-transparent border-b border-transparent'
                }`}
        >
            <Container size="wide">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo Area */}
                    <div ref={logoRef} className="flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold bg-linear-to-r from-primary-500 via-primary-600 to-accent-600 bg-clip-text -webkit-background-clip-text text-transparent flex items-center gap-1.5 select-none hover:opacity-90 transition-opacity"
                        >
                            <span className="w-8 h-8 rounded-xl bg-linear-to-tr from-primary-500 to-accent-600 flex items-center justify-center text-white text-base shadow-neon-primary shrink-0">
                                C
                            </span>
                            <span className="hidden sm:inline font-extrabold tracking-tight">CommerceCraft</span>
                        </Link>
                    </div>

                    {/* Nav Links - Desktop */}
                    <NavLinks />

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:block">
                        <SearchBar />
                    </div>

                    {/* Right-Side Actions Group */}
                    <div className="flex items-center gap-2.5 sm:gap-4">
                        {/* Wishlist - Desktop */}
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                            <Link
                                href="/wishlist"
                                className="relative p-2 text-foreground-theme/80 hover:text-rose-500 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 transition-colors flex items-center justify-center"
                            >
                                <FiHeart className="w-5 h-5" />
                                <Badge
                                    variant="solid"
                                    color="danger"
                                    pill
                                    className="absolute -top-0.5 -right-0.5 px-1.5! py-0.5! min-w-[18px] h-[18px] text-[9px] flex items-center justify-center shadow-premium-sm"
                                >
                                    3
                                </Badge>
                            </Link>
                        </motion.div>

                        {/* Cart - Desktop */}
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                            <Link
                                href="/cart"
                                className="relative p-2 text-foreground-theme/80 hover:text-primary-500 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 transition-colors flex items-center justify-center"
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                <Badge
                                    variant="solid"
                                    color="primary"
                                    pill
                                    className="absolute -top-0.5 -right-0.5 px-1.5! py-0.5! min-w-[18px] h-[18px] text-[9px] flex items-center justify-center shadow-premium-sm"
                                >
                                    5
                                </Badge>
                            </Link>
                        </motion.div>

                        {/* Notifications - Desktop */}
                        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                            <Link
                                href="/notifications"
                                className="relative p-2 text-foreground-theme/80 hover:text-amber-500 rounded-xl hover:bg-slate-100/55 dark:hover:bg-slate-900/50 transition-colors flex items-center justify-center"
                            >
                                <FiBell className="w-5 h-5" />
                                <Badge
                                    variant="solid"
                                    color="warning"
                                    pill
                                    className="absolute -top-0.5 -right-0.5 px-1.5! py-0.5! min-w-[18px] h-[18px] text-[9px] flex items-center justify-center shadow-premium-sm"
                                >
                                    2
                                </Badge>
                            </Link>
                        </motion.div>

                        {/* Become a Seller Badge / Button - Desktop */}
                        <div className="hidden xl:block">
                            <Button variant="ghost" size="sm" className="font-semibold text-xs tracking-wide">
                                Become a Seller
                            </Button>
                        </div>

                        {/* User Account / Profile Button */}
                        <ProfileMenu />

                        {/* Mobile Side Menu */}
                        <MobileMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
}
