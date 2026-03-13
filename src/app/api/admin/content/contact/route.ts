import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { adminsData } from '@/lib/admin-users';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'contact.json');

export async function GET() {
  const data = await fs.readFile(DATA_PATH, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const allowed = await adminsData.isAllowed(session.user.email);
  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const body = await req.json();
  await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true });
}
