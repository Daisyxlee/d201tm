'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src="/toastmasters-logo.png"
                alt="Toastmasters International"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.18em] text-tm-blue font-semibold">
                Toastmasters International
              </span>
              <span className="font-bold text-lg text-tm-maroon">
                District 201
              </span>
            </div>
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
