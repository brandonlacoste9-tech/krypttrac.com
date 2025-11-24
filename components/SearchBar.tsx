'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchBar({ onSearch, placeholder = 'Search cryptocurrencies...', debounceMs = 300 }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
      />
    </div>
  );
}
