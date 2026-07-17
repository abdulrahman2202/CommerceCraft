'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Input from '../common/Input';

export default function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', query);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-[280px] lg:max-w-[340px] flex items-center search-bar-container">
            <Input
                type="text"
                placeholder="Search products, brands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="glass"
                className="w-full text-slate-700 dark:text-slate-100 rounded-full!"
                leftIcon={<FiSearch className="w-4 h-4 transition-colors peer-focus:text-primary-500" />}
            />
        </form>
    );
}
