import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { adminsData } from '@/lib/admin-users';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const isAllowed = await adminsData.isAllowed(session.user.email);
  if (!isAllowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const [admins, superadmins] = await Promise.all([
    adminsData.listAdmins(),
    adminsData.listSuperadmins(),
  ]);
  const adminList = admins.filter((e) => !superadmins.includes(e));
  return NextResponse.json({ admins: adminList, superadmins });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const isSuperadmin = await adminsData.isSuperadmin(session.user.email);
  if (!isSuperadmin) {
    return NextResponse.json({ error: 'Superadmin only' }, { status: 403 });
  }
  const body = await req.json();
  const { action, email } = body;
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  const normalized = email.trim().toLowerCase();
  if (action === 'add') {
    await adminsData.addAdmin(normalized);
  } else if (action === 'remove') {
    await adminsData.removeAdmin(normalized);
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
  const [admins, superadmins] = await Promise.all([
    adminsData.listAdmins(),
    adminsData.listSuperadmins(),
  ]);
  const adminList = admins.filter((e) => !superadmins.includes(e));
  return NextResponse.json({ admins: adminList, superadmins });
}
