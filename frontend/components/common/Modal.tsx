'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';
import { modalVariants } from '@/utils/framer-variants';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    /**
     * Modal size options
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /**
     * Close modal when clicking on the overlay backdrop
     * @default true
     */
    closeOnOverlayClick?: boolean;
}

/**
 * Portal-based Modal Component in components/common
 * Injects overlays, manages client portal hydration, keyboard escape bounds, and body scroll locks.
 */
export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlayClick = true,
}) => {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => {
            clearTimeout(timer);
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const sizeClasses = {
        sm: 'max-w-md w-full',
        md: 'max-w-lg w-full',
        lg: 'max-w-2xl w-full',
        xl: 'max-w-5xl w-full',
        full: 'max-w-full h-full rounded-none',
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        variants={modalVariants.backdrop}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        onClick={handleOverlayClick}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    <motion.div
                        ref={modalRef}
                        variants={modalVariants.content}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'modal-title' : undefined}
                        className={clsx(
                            'bg-card-theme border relative shadow-premium-2xl flex flex-col overflow-hidden',
                            sizeClasses[size],
                            {
                                'rounded-2xl max-h-[90vh]': size !== 'full',
                                'h-screen': size === 'full',
                            }
                        )}
                    >
                        <div className="flex items-center justify-between px-6 py-4.5 border-b">
                            {title ? (
                                <h3 id="modal-title" className="text-base font-bold text-foreground-theme tracking-tight">
                                    {title}
                                </h3>
                            ) : (
                                <div />
                            )}

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close dialog"
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                            >
                                <IoClose className="text-xl shrink-0" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-5">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

Modal.displayName = 'Modal';
export default Modal;
