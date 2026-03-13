/**
 * Admin / superadmin user management.
 * For static export we use JSON files. Replace with Firebase Admin SDK in production.
 */

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const SUPERADMINS_FILE = path.join(DATA_DIR, 'superadmins.json');

export interface AdminsConfig {
  admins: string[];
  superadmins: string[];
}

async function loadConfig(): Promise<AdminsConfig> {
  let admins: string[] = [];
  let superadmins: string[] = [];
  try {
    const adminsData = await fs.readFile(ADMINS_FILE, 'utf-8');
    admins = JSON.parse(adminsData).admins || [];
  } catch {}
  try {
    const superData = await fs.readFile(SUPERADMINS_FILE, 'utf-8');
    superadmins = JSON.parse(superData).superadmins || [];
  } catch {}
  return { admins, superadmins };
}

export const adminsData = {
  isAllowed: async (email: string | null | undefined): Promise<boolean> => {
    if (!email) return false;
    const { admins, superadmins } = await loadConfig();
    return superadmins.includes(email) || admins.includes(email);
  },
  isSuperadmin: async (email: string | null | undefined): Promise<boolean> => {
    if (!email) return false;
    const { superadmins } = await loadConfig();
    return superadmins.includes(email);
  },
  listAdmins: async (): Promise<string[]> => {
    const { admins, superadmins } = await loadConfig();
    return [...new Set([...superadmins, ...admins])];
  },
  listSuperadmins: async (): Promise<string[]> => {
    const { superadmins } = await loadConfig();
    return superadmins;
  },
  addAdmin: async (email: string): Promise<void> => {
    const { admins } = await loadConfig();
    if (admins.includes(email)) return;
    admins.push(email);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(ADMINS_FILE, JSON.stringify({ admins }, null, 2));
  },
  removeAdmin: async (email: string): Promise<void> => {
    const { admins, superadmins } = await loadConfig();
    if (superadmins.includes(email)) return; // don't remove superadmins from admins list
    const next = admins.filter((e) => e.toLowerCase() !== email.toLowerCase());
    await fs.writeFile(ADMINS_FILE, JSON.stringify({ admins: next }, null, 2));
  },
  addSuperadmin: async (email: string): Promise<void> => {
    const { superadmins } = await loadConfig();
    if (superadmins.includes(email)) return;
    superadmins.push(email);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      SUPERADMINS_FILE,
      JSON.stringify({ superadmins }, null, 2)
    );
  },
  removeSuperadmin: async (email: string): Promise<void> => {
    const { superadmins } = await loadConfig();
    const next = superadmins.filter((e) => e.toLowerCase() !== email.toLowerCase());
    await fs.writeFile(
      SUPERADMINS_FILE,
      JSON.stringify({ superadmins: next }, null, 2)
    );
  },
};
