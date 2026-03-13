'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/officers', label: 'Leadership' },
  { href: '/resources', label: 'Resources' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/history', label: 'History' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-tm-maroon">
              District 201
            </span>
            <span className="text-tm-navy">Toastmasters</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-tm-charcoal hover:text-tm-maroon font-medium"
              >
                {link.label}
              </Link>
            ))}
            <SearchBar />
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <SearchBar />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-tm-maroon"
              aria-label="Toggle menu"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-tm-charcoal hover:text-tm-maroon font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
