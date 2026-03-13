import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const LOG_FILE = path.join(DATA_DIR, 'auth-log.json');

export interface AuthLogEntry {
  timestamp: string;
  email: string | null;
  status: 'success' | 'denied';
  source: string;
}

export async function logAuthAttempt(entry: {
  email: string | null;
  status: 'success' | 'denied';
  source: string;
}) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let current: AuthLogEntry[] = [];
    try {
      const raw = await fs.readFile(LOG_FILE, 'utf-8');
      current = JSON.parse(raw);
      if (!Array.isArray(current)) current = [];
    } catch {
      current = [];
    }
    const nextEntry: AuthLogEntry = {
      timestamp: new Date().toISOString(),
      email: entry.email,
      status: entry.status,
      source: entry.source,
    };
    current.push(nextEntry);
    if (current.length > 5000) {
      current = current.slice(-2000);
    }
    await fs.writeFile(LOG_FILE, JSON.stringify(current, null, 2));
  } catch {
    // Logging should never break auth flow
  }
}

