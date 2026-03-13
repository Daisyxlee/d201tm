import { NextResponse } from 'next/server';
import { eventsData, officersData, historyData } from '@/lib/dynamic-content';

interface SearchItem {
  href: string;
  title: string;
  description?: string;
  section: string;
  external?: boolean;
}

export async function GET() {
  const items: SearchItem[] = [
    {
      href: '/',
      title: 'Home',
      description: 'District 201 Toastmasters – mission and quick links.',
      section: 'Pages',
    },
    {
      href: '/about',
      title: 'About District 201',
      description: 'District structure, mission, divisions and areas, remote leaders.',
      section: 'Pages',
    },
    {
      href: '/officers',
      title: 'District Leadership',
      description: 'District Director, Program Quality Director, Club Growth Director, appointed officers.',
      section: 'Pages',
    },
    {
      href: '/resources',
      title: 'Resources',
      description: 'Operating Procedures Manual and key Toastmasters links.',
      section: 'Pages',
    },
    {
      href: '/calendar',
      title: 'Calendar',
      description: 'District events, contests, trainings, and meetings.',
      section: 'Pages',
    },
    {
      href: '/contact',
      title: 'Contact',
      description: 'How to contact District 201 leadership and find a club.',
      section: 'Pages',
    },
    {
      href: 'https://www.toastmasters.org/find-a-club',
      title: 'Find a Club (Toastmasters.org)',
      description: 'Search for clubs by location, meeting type, and schedule.',
      section: 'External',
      external: true,
    },
  ];

  // Include active (non-archived) events so calendar content is searchable
  try {
    const events = await eventsData.get();
    for (const e of events) {
      if (e.archived) continue;
      items.push({
        href: e.url || '/calendar',
        title: e.title,
        description: [e.date, e.location, e.description]
          .filter(Boolean)
          .join(' – '),
        section: 'Events calendar',
        external: !!e.url && e.url.startsWith('http'),
      });
    }
  } catch {
    // If events fail to load, still return static index
  }

  // Include current leadership so officer names are searchable
  try {
    const officers = await officersData.get();
    for (const o of officers.trio) {
      items.push({
        href: '/officers',
        title: `${o.role} – ${o.name || 'TBD'}`,
        description: o.email || '',
        section: 'Leadership',
      });
    }
    for (const o of officers.appointed) {
      items.push({
        href: '/officers',
        title: `${o.role} – ${o.name || 'TBD'}`,
        description: o.email || '',
        section: 'Leadership',
      });
    }
  } catch {
    // ignore
  }

  // Include history records so Hall of Fame names and descriptions are searchable
  try {
    const history = await historyData.get();
    for (const h of history) {
      items.push({
        href: '/history',
        title: `${h.year} – ${h.title}`,
        description: h.description || '',
        section: h.category || 'History',
      });
    }
  } catch {
    // ignore
  }

  return NextResponse.json({ items });
}

