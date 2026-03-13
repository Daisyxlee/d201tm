/**
 * Dynamic content layer - reads from JSON files for now.
 * Admin portal updates these files. For production with Firebase/DB,
 * replace file reads with API calls.
 */

const DATA_DIR = process.cwd() + '/src/data';

export interface TrioOfficer {
  role: string;
  name?: string;
  email?: string;
}

export interface AppointedOfficer {
  role: string;
  name?: string;
  email?: string;
}

export interface OfficersContent {
  trio: TrioOfficer[];
  appointed: AppointedOfficer[];
}

export interface Event {
  title: string;
  date: string;
  location?: string;
  description?: string;
  url?: string;
  archived?: boolean;
}

export interface ResourcesContent {
  operatingManualUrl: string;
  operatingManualNote: string;
  googleCalendarEmbedUrl?: string;
}

export interface ContactContent {
  notes: string;
}

export interface HistoryEntry {
  id: string;
  year: string;
  title: string;
  description?: string;
  category: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

// Default data - matches Operation Manual structure
const defaultOfficers: OfficersContent = {
  trio: [
    { role: 'District Director', name: 'TBD' },
    { role: 'Program Quality Director', name: 'TBD' },
    { role: 'Club Growth Director', name: 'TBD' },
  ],
  appointed: [
    { role: 'Administration Manager', name: 'TBD' },
    { role: 'Finance Manager', name: 'TBD' },
    { role: 'Public Relations Manager', name: 'TBD' },
    { role: 'Immediate Past District Director', name: 'TBD' },
    { role: 'District Chief Judge', name: 'TBD' },
    { role: 'District Parliamentarian', name: 'TBD' },
    { role: 'Logistics Manager', name: 'TBD' },
    { role: 'Webmaster', name: 'TBD' },
  ],
};

const defaultResources: ResourcesContent = {
  operatingManualUrl: '/District201_Operation_Manual.pdf',
  operatingManualNote:
    'Effective July 1, 2026 — Inaugural Edition. Posted per Section 1.5 of the manual.',
  googleCalendarEmbedUrl: '',
};

const defaultContact: ContactContent = {
  notes:
    'For questions about District 201, please contact the District Director through the Leadership directory. All member lists are confidential and for official Toastmasters business only.',
};

async function readJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const fs = await import('fs/promises');
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

export const officersData = {
  get: () =>
    readJson<OfficersContent>(
      `${DATA_DIR}/officers.json`,
      defaultOfficers
    ),
};

export const eventsData = {
  get: () =>
    readJson<Event[]>(`${DATA_DIR}/events.json`, []),
};

export const resourcesData = {
  get: () =>
    readJson<ResourcesContent>(
      `${DATA_DIR}/resources.json`,
      defaultResources
    ),
};

export const contactData = {
  get: () =>
    readJson<ContactContent>(
      `${DATA_DIR}/contact.json`,
      defaultContact
    ),
};

export const historyData = {
  get: () => readJson<HistoryEntry[]>(`${DATA_DIR}/history.json`, []),
};
