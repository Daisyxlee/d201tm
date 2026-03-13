'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type SearchItem = {
  href: string;
  title: string;
  description?: string;
  section: string;
  external?: boolean;
};

function normalize(str: string) {
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Minimal static fallback so search still works if the API is unavailable
const staticFallback: SearchItem[] = [
  {
    href: '/',
    title: 'Home',
    description: 'District 201 Toastmasters – mission and quick links.',
    section: 'Pages',
  },
  {
    href: '/about',
    title: 'About District 201',
    description: 'District structure, mission, divisions and areas.',
    section: 'Pages',
  },
  {
    href: '/calendar',
    title: 'Calendar',
    description: 'District events, contests, trainings, and meetings.',
    section: 'Pages',
  },
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [items, setItems] = useState<SearchItem[]>(staticFallback);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadIndex() {
      try {
        const res = await fetch('/api/search-index');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setItems(data.items);
          setLoaded(true);
        }
      } catch {
        // fall back to static index
      }
    }
    // Load once on first focus/open
    if (open && !loaded) {
      loadIndex();
    }
  }, [open, loaded]);

  const q = normalize(query);
  const results =
    q.length >= 2
      ? items.filter((item) => {
          const haystack = normalize(
            `${item.title} ${item.description || ''} ${item.section} ${item.href}`,
          );
          return haystack.includes(q);
        })
      : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.closest('.search-wrap')?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const showResults = open && (focused || results.length > 0);

  return (
    <div className="search-wrap relative">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search site..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setOpen(true);
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          className="w-36 sm:w-44 px-3 py-1.5 text-sm border border-tm-charcoal/20 rounded focus:outline-none focus:ring-1 focus:ring-tm-maroon"
        />
      </div>
      {showResults && (
        <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-lg shadow-lg border border-tm-charcoal/10 py-2 z-50">
          {results.length === 0 ? (
            <p className="px-4 py-2 text-sm text-tm-charcoal/70">No results</p>
          ) : (
            <ul>
              {results.slice(0, 8).map((item) => (
                <li key={item.href + item.title}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-tm-charcoal hover:bg-tm-cream"
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.section && (
                        <div className="text-xs text-tm-charcoal/70">{item.section}</div>
                      )}
                      {item.description && (
                        <div className="text-xs text-tm-charcoal/80 mt-0.5 line-clamp-2">
                          {item.description}
                        </div>
                      )}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        setQuery('');
                      }}
                      className="block px-4 py-2 text-sm text-tm-charcoal hover:bg-tm-cream"
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.section && (
                        <div className="text-xs text-tm-charcoal/70">{item.section}</div>
                      )}
                      {item.description && (
                        <div className="text-xs text-tm-charcoal/80 mt-0.5 line-clamp-2">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
