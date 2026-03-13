'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [admins, setAdmins] = useState<string[]>([]);
  const [superadmins, setSuperadmins] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/users')
        .then((r) => r.json())
        .then((data) => {
          setAdmins(data.admins || []);
          setSuperadmins(data.superadmins || []);
        })
        .catch(() => setMessage('Failed to load users'))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const isSuperadmin = superadmins.includes(session?.user?.email || '');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !isSuperadmin) return;
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', email: newEmail.trim() }),
    });
    const data = await res.json();
    if (res.ok) {
      setAdmins(data.admins || []);
      setNewEmail('');
      setMessage('Admin added.');
    } else {
      setMessage(data.error || 'Failed to add admin');
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    if (!isSuperadmin || superadmins.includes(email)) return;
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', email }),
    });
    const data = await res.json();
    if (res.ok) {
      setAdmins(data.admins || []);
      setMessage('Admin removed.');
    } else {
      setMessage(data.error || 'Failed to remove admin');
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  if (!isSuperadmin) {
    return (
      <div className="py-16 px-4 text-center">
        <p className="text-tm-charcoal">Only superadmins can manage users.</p>
        <Link href="/admin/dashboard" className="text-tm-maroon mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">User Management</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-bold text-tm-maroon mb-4">Add Admin</h2>
          <form onSubmit={handleAddAdmin} className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="admin@example.com"
              className="flex-1 border rounded px-3 py-2"
              required
            />
            <button type="submit" className="btn-primary">
              Add
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-bold text-tm-maroon mb-4">Admins</h2>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <ul className="space-y-2">
              {[...superadmins, ...admins].map((email) => (
                <li
                  key={email}
                  className="flex items-center justify-between p-3 bg-white rounded border"
                >
                  <span>{email}</span>
                  {superadmins.includes(email) ? (
                    <span className="text-xs text-tm-navy font-semibold">Superadmin</span>
                  ) : (
                    <button
                      onClick={() => handleRemoveAdmin(email)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
              {superadmins.length === 0 && admins.length === 0 && (
                <li className="text-tm-charcoal/80">No admins yet.</li>
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
