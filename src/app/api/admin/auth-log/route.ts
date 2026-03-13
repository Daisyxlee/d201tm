import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { adminsData } from '@/lib/admin-users';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const LOG_FILE = path.join(DATA_DIR, 'auth-log.json');

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isSuperadmin = await adminsData.isSuperadmin(session.user.email);
  if (!isSuperadmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const raw = await fs.readFile(LOG_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      return NextResponse.json([]);
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

